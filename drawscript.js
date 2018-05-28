
var socket = io.connect('http://localhost:3000'); // connect 

var side = 18;
var w = 60;
var h = 40;
var overlay = document.getElementById("overlay");
var center_text = document.getElementById("center_text");


function setup() {
	frameRate(4);
	noStroke();
	createCanvas(w * side, h * side);
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
            else if (matrix[y][x] == 3.5) {
                fill('white');
               // ellipse(x * side, y * side, side, side);
                //fill('black');
            }
            else if (matrix[y][x] == 3) {
                fill('black');
            }
            else if (matrix[y][x] == 4) {
                //image(img_exp, x*side, y*side);
                fill('red');
            }
            else if (matrix[y][x] == 7) {
                fill("#404efd");
            }
            else if (matrix[y][x] == 10) {
                fill("#563d7c");
            }
            else if (matrix[y][x] == 11) {
                fill("#563d7c");
            }
            else {
                fill('#acacac');
            }
            rect(x * side, y * side, side, side);
        }
    }
})

var data_rows = [
	['Minutes', 'Number of grass'],
];
socket.on("display new chart", function(data_row){
	var div = document.getElementById('chart_div');
	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
	data_rows.push(data_row);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(data_rows);

        var options = {
          title: 'Matix Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(div)

        chart.draw(data, options);
      }
})

socket.on("game over", function(data){
	overlay.style.display = 'block';
	center_text.innerHTML = data.text;
	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
	var gNum = data.grassNum;
	var gENum = data.grassEaterNum;
	var pNum = data.predatorNum;
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Total number of spawned characters', 'Number'],
          ['Number of grass', gNum],
          ['Number of grassEaters', gENum],
		  ['Number of predators', pNum]
        ]);

        var options = {
          title: 'Comperison of total numbers'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
})