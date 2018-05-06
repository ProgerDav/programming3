
var socket = io.connect('http://localhost:8080'); // connect 

var side = 20;

function setup() {
    frameRate(4);
    noStroke();
    createCanvas(60 * side, 40 * side);
    background('#acacac');
}


socket.on("display new matrix", function (matrix) {
    background("#acacac");
    //console.log(matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green');
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
            }
            else if (matrix[y][x] == 2.5) {
                fill('orange');
            }
            else if (matrix[y][x] == 3) {
                fill('black');
            }
            else if (matrix[y][x] == 4) {
                fill("red");
            }
            else if (matrix[y][x] == 7) {
                fill("#404efd");
            }
            else {
                fill('#acacac');
            }
            rect(x * side, y * side, side, side);
        }
    }
})