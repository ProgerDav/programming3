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
    return matrix;
}
	global.matrix = getRandomMatrix();

    // get all the character modules
    var Grass = require("./grass.js");
    var grassEater = require("./grassEater.js");
    var predator = require("./predator.js");
    var human = require("./human.js");
    var fire = require("./fire.js");

    function random(arg1, arg2) {  // there is no p5.js on server side so need to replace all it's functions
        if (Array.isArray(arguments[0])) {  //in case argument is a massive -- return random element from it;
            var index = Math.floor(Math.random() * arguments[0].length);
            return arguments[0][index];
        }else if(typeof arguments[0] == 'number' && typeof arguments[1] == 'number'){ // return random number from set interval
			var max = arguments[1] - arguments[0];
			var min = arguments[0];
			return Math.round(Math.random() * max + min);
		}
    }


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var xot = new Grass(x, y, 1);
                global.grassArray.push(xot);
            }
            else if (matrix[y][x] == 2) {
                var xotaker = new grassEater(x, y, 2);
                global.grassEaterArray.push(xotaker);
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new predator(x, y, 3);
                global.predatorArray.push(gishatich);
            }
            else if (matrix[y][x] == 7) {
                var mard = new human(x, y);
                global.humanArray.push(mard);
            }
        }
    }

function drawInfo(){
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

    for (var i in global.grassArray) {
        global.grassArray[i].multiplyF();
    }
}
setInterval(drawInfo, 200);

io.on('connection', function (socket) {
    console.log('a user connected');
    setInterval(function () {
        socket.emit("display new matrix", global.matrix);
    }, 200)
});