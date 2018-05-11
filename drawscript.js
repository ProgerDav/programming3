
var socket = io.connect('http://localhost:3000'); // connect 

var side = 20;

function setup() {
    frameRate(4);
    noStroke();
    createCanvas(60 * side, 40 * side);
    background('#acacac');
}


socket.on("display new matrix", function (data) {
    background("#acacac");
    var matrix = data.matrix;
    weather_text.innerHTML = data.weather;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if(data.weather == "summer"){
                    fill("green");
                }else if(data.weather == "autumn"){
                    fill("#17ff4c");
                }else if(data.weather == "spring"){
                    fill("#28a745");
                }else if(data.weather == "winter"){
                    fill("white")
                }
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