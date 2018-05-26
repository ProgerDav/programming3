// NPM moudles
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('.'));

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});


global.grassArray = [];
global.grassEaterArray = [];
global.predatorArray = [];
global.humanArray = [];
global.fireArray = [];
global.weather = "summer";
var count = 0;
var weather_interval = 30;
/*global.matrix = [    //xotakerner@ ev gishatichner@ stugox matric -- piti uten xoter@ bazmanan heto satken (hnarhavor e cnvi gishatich)
		[1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 2, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]*/
function getRandomMatrix() {
    var n = 40;  // y arancq
    var m = 60; // x arancq
    var percent1 = 30;
    var percent2 = 2;
    var greenNumber = parseInt(n * m * percent1 / 100);
    var greenEaterNumber = parseInt(n * m * percent2 / 100);
    var humanNumber = 1;
    var matrix = [];
    for (var i = 0; i < n; i++) { //create empty array
        var arr = [];
        for (var j = 0; j < m; j++) {
            arr[j] = 0;
        }
        matrix.push(arr);
    }
    for (var i = 0; i < greenNumber; i++) {  								//fill with 1 => green (random slot);
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {  							//check if the slot is empty
            matrix[y][x] = 1;
        }
        else {  								// if not try once more 
            i--;
            continue;
        }
    }

    for (var j = 0; j < greenEaterNumber; j++) {            //fill with 2 => yellow (random slot);
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {      //check if the slot is empty
            matrix[y][x] = 2;
        }
        else {         // if not try once more 
            j--;
            continue;
        }
    }

    for (var e = 0; e < humanNumber; e++) {    // add a hunter in a random empty slot
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {      //check if the slot is empty
            matrix[y][x] = 7;
        }
        else {         // if not try once more 
            e--;
            continue;
        }
    }
    for (var h = 0; h < 1; h++) {    // add a hunter in a random empty slot
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {      //check if the slot is empty
            matrix[y][x] = 10;
        }
        else {         // if not try once more 
            h--;
            continue;
        }
    }
    return matrix;
}
	global.matrix = getRandomMatrix();

    // get all the character modules
    var Grass = require("./grass.js");
    var grassEater = require("./grassEater.js");
    var predator = require("./predator.js");
    var human = require("./human.js");
    var fire = require("./fire.js");
    var superPredator = require('./class.superPredator.js');
    var random = require("./random.js");
    global.humanHealth = 5;
    global.superPredatorHealth = 5;

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var xot = new Grass(x, y, 1);
                global.grassArray.push(xot);
            }
            else if (matrix[y][x] == 2) {
                var rand = Math.round(Math.random()) / 2; 
                var xotaker = new grassEater(x, y, 2, rand);
                matrix[y][x] += rand;
                global.grassEaterArray.push(xotaker);
            }
            else if (matrix[y][x] == 3) {
                var rand = Math.round(Math.random()) / 2; 
                var gishatich = new predator(x, y, 3, rand);
                matrix[y][x] += rand;
                global.predatorArray.push(gishatich);
            }
            else if (matrix[y][x] == 7) {
                var mard = new human(x, y);
                global.humanArray.push(mard);
            }
            else if (matrix[y][x] == 10) {
                var superPredator = new superPredator(x, y, 10);
            }
        }
    }

function drawInfo(){

    for (var i in global.grassArray) {
        global.grassArray[i].multiplyF();
    }

	if (global.fireArray[0]) {
        global.fireArray[0].spread();
    }

    if(global.humanArray[0]){
        global.humanArray[0].move();
    }
	
    for (var j in global.predatorArray) {
        global.predatorArray[j].moveAndEat();
    }

    for (var e in global.grassEaterArray) {
        global.grassEaterArray[e].moveAndEat();
    }

    superPredator.move();

}

function gameCheck(){
	if(global.grassArray.length == 0 || global.grassEaterArray.length == 0){
		return false;
	}else{
		return true;
	}
}

io.on('connection', function (socket) {
    console.log('a user connected');
    setInterval(function () {
        socket.emit("display new matrix", {matrix: global.matrix, weather: global.weather});
        drawInfo();
        if(count < weather_interval){
           weather = "summer";
        }else if(count >= weather_interval && count < 2*weather_interval){
            weather = "autumn";
        }else if (count >= 2*weather_interval && count < 3*weather_interval){
            weather = "winter";
        }else if(count >= 3*weather_interval && count < 4*weather_interval){
            weather = "spring";
        }else{
            weather = "summer";
            count = 0;
        }
         count++;
        //console.log(weather);
    }, 800)
});