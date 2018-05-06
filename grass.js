var Main = require("./class.main.js");
module.exports = class Grass extends Main{
	constructor(x, y, index){
		super(x, y, index);
		this.multiply = 0;
	}
	findSlots(identifier) {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < global.matrix[0].length && y >= 0 && y < global.matrix.length) {
                if (global.matrix[y][x] == identifier) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
	multiplyF() {
        this.multiply++;
        var norVandak = random(this.findSlots(0));
        if (this.multiply >= 12 && norVandak) {
            var norXot = new Grass(norVandak[0], norVandak[1]);
            global.grassArray.push(norXot);
            global.matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
    }
}
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