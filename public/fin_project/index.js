var Grass = require("./grass.js");
var grassEater = require("./grassEater.js");

var norXot = new Grass(4, 9, 1);
var norXotaker = new grassEater(8, 13, 2);

console.log(norXot.getInfo());
console.log(norXotaker.getInfo());