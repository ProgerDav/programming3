var Main = require("./class.main.js");
module.exports = class predator extends Main{
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == identifier) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
	moveAndEat() {
        if(global.weather != "winter"){ // in winter they sleep untill the spring comes
            var aviableSlots = this.findSlots(2).concat(this.findSlots(2.5));  //eat function part --> grassEater detected
            if (aviableSlots[0]) {
                var slot = random(aviableSlots);
                matrix[this.y][this.x] = 0;
                this.x = slot[0];
                this.y = slot[1];
                this.energy = 5;
                matrix[slot[1]][slot[0]] = 3;
                for (var i = 0; i < global.grassEaterArray.length; i++) {
                    if (slot[0] == global.grassEaterArray[i].x && slot[1] == global.grassEaterArray[i].y) {
                        global.grassEaterArray.splice(i, 1);
                        break;
                    }
                }
            }
            else {   //move function part --> no grassEater detected
                var slot = random(this.findSlots(0).concat(this.findSlots(1)));
                if (slot) {
                    if(matrix[slot[1]][slot[0]] == 1){
                        for (var i = 0; i < global.grassArray.length; i++) {
                            if (slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
                                global.grassArray.splice(i, 1);
                                break;
                            }
                        }
                    }
                    matrix[this.y][this.x] = 0;
                    this.x = slot[0];
                    this.y = slot[1];
                    matrix[slot[1]][slot[0]] = 3;
                }
                this.death();
            }
        }
    }
	death() {
        if (this.energy <= -10) {
			for (var i = 0; i < global.predatorArray.length; i++) {
				if (global.predatorArray[i].x == this.x && global.predatorArray[i].y == this.y) {
					global.predatorArray.splice(i, 1);
					break;
				}
			}
			matrix[this.y][this.x] = 0;
		}   
        this.energy--;
    }
}
	var random = require("./random.js");