var Main = require("./class.main.js");
module.exports = class Grass extends Main{
	constructor(x, y, index){
		super(x, y, index);
		this.multiply = 0;
        if(global.weather == "summer"){
            this.multiply_interval = 12;
        }else if(global.weather == "spring" || global.weather == "autumn"){
            this.multiply_interval = 8;
        }else if(global.weather == "winter"){
            this.multiply_interval = 16;
        }
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
        if(global.weather == "summer"){
            this.multiply_interval = 13;
        }else if(global.weather == "spring"){
            this.multiply_interval = 8;
        }else if(global.weather == "winter"){
            this.multiply_interval = 30;
        }else if(global.weather == "autumn"){
			this.multiply_interval = 8;
		}
        console.log(this.multiply_interval);
        this.multiply++;
        var norVandak = random(this.findSlots(0));
        if (this.multiply >= this.multiply_interval && norVandak) {
            var norXot = new Grass(norVandak[0], norVandak[1]);
            global.grassArray.push(norXot);
            global.matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
    }
}
	var random = require("./random.js");