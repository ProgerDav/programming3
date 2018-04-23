
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
/*var matrix = [    //xoter@ stugox matric -- piti bazmanan
	[1, 0, 0, 0, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 1, 0, 0, 0]
]*/


/*var matrix = [    //xotakerner@ ev gishatichner@ stugox matric -- piti uten xoter@ bazmanan heto satken (hnarhavor e cnvi gishatich)
	[1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 2, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],//petq e anjatel xoteri bazmacum@
	[1, 0, 1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]*/

/*var matrix = [    //hrdehi u mardu stugum -- mard@ shajvum e utum e ir mot ekac kam unkyunagci vrayi gishatichin ev varum e xoter@
	[3, 1, 1, 1, 3, 3, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 1], //cankali e gishatichnerin anmah darcnel, tox mardy nranc uti
	[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[3, 1, 1, 1, 1, 3, 0, 1, 0, 0, 0, 0, 3, 0, 1, 0, 0],
	[1, 1, 3, 1, 1, 3, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 7, 1, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0],
	[3, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 3, 0, 0, 0],
	[3, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 3, 0, 0, 0],
]*/



var side = 20;
var grassArray = [];
var grassEaterArray = [];
var predatorArray = [];
var humanArray = [];
var fireArray = [];

function setup() {
    frameRate(4);
    noStroke();
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
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

    if (fireArray[0]) {
        fireArray[0].spread();
    }
    //console.log(grassArray.length);
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
}