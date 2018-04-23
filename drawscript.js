
var socket = io.connect('http://localhost:3000'); // connect 
var matrix = [];

socket.on("send image", function (data) {
	   matrix = data;
})

var side = 20;


function setup() {
    frameRate(4);
    noStroke();
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#ee4400');
}


function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill('black');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill("#404efd");
                rect(x * side, y * side, side, side);
            }
            else {
                fill('#acacac');
                rect(x * side, y * side, side, side);
            }
        }
    }
}