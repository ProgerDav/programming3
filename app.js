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


var grassArray = [];
var grassEaterArray = [];
var predatorArray = [];
var humanArray = [];
var fireArray = [];
/*var matrix = [    //xotakerner@ ev gishatichner@ stugox matric -- piti uten xoter@ bazmanan heto satken (hnarhavor e cnvi gishatich)
		[1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 2, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]*/
function getRandomMatrix() {
    var n = 10;  // y arancq
    var m = 20; // x arancq
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
    // get all the character modules
    var Grass = require("./grass.js");
    var grassEater = require("./grassEater.js");
    var predator = require("./predator.js");
    var human = require("./human.js");
    var fire = require("./fire.js");

    /*function random(array) {  // there is no p5.js on server side so need to replace all it's functions
        if (Array.isArray(array)) {
            var index = Math.floor(Math.random() * array.length);
            return array[index];
        }
    }


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var xot = new Grass(x, y, 1);
                grassArray.push(xot);
            }
            else if (matrix[y][x] == 2) {
                var xotaker = new grassEater(x, y, 2);
                grassEaterArray.push(xotaker);
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new predator(x, y, 3);
                predatorArray.push(gishatich);
            }
            else if (matrix[y][x] == 7) {
                var mard = new human(x, y);
                humanArray.push(mard);
            }
        }
    }*/

/*function drawInfo(){
	if (fireArray[0]) {
        fireArray[0].spread();
    }
    
    if(humanArray[0]){
        humanArray[0].move();
    }
	
    for (var j in predatorArray) {
        predatorArray[j].moveAndEat();
    }

    for (var e in grassEaterArray) {
        grassEaterArray[e].moveAndEat();
    }

    for (var i in grassArray) {
        grassArray[i].multiplyF();
    }

	console.log(matrix);
}
setInterval(drawInfo, 1000);*/

io.on('connection', function (socket) {
    console.log('a user connected');
    setInterval(function () {
        socket.emit("display new matrix", getRandomMatrix());
    }, 200)
});