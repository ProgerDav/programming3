var grassArray = [];
var grassEaterArray = [];
var predatorArray = [];
var humanArray = [];
var fireArray = [];
var matrix = [    //xotakerner@ ev gishatichner@ stugox matric -- piti uten xoter@ bazmanan heto satken (hnarhavor e cnvi gishatich)
		[1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 2, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]
	 // some npm installations
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
	// get all the character modules
var Grass = require("./public/finalproject/grass.js");
var grassEater = require("./public/finalproject/grassEater.js");
var predator = require("./public/finalproject/predator.js");
var human = require("./public/finalproject/human.js");
var fire = require("./public/finalproject/fire.js");

function random(array){  // there is no p5.js on server side so need to replace all it's functions
	if(Array.isArray(array)){
		var index = Math.floor(Math.random() * array.length);
		return array[index];
	}
}

app.use(express.static(".")); // set the directory

app.get("/", function(req, res){ //redirect to html file
   res.redirect("index.html");
});

app.listen(3000, function(){ // run the port 
   console.log("Example is running on port 3000");
});


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
    }

function drawInfo(){
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
setInterval(drawInfo, 1000);
io.on('connection', function (socket) {
	io.sockets.emit("get new matrix", matrix);
})