var Main = require("./class.main.js");
var predator = require("./predator.js");
module.exports = class grassEater extends Main {
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
    moveAndEat() {
        if(global.weather == "spring"){
            this.multiply_interval = 8;
        }else{
            this.multiply_interval = 6;
        }
        this.multiplyF();
        var aviableSlots = this.findSlots(1);  //eat function part --> grass detected
        if (aviableSlots[0]) {
            var slot = random(aviableSlots);
            global.matrix[this.y][this.x] = 0;
            this.x = slot[0];
            this.y = slot[1];
            this.energy = 5;
            global.matrix[slot[1]][slot[0]] = 2 + this.genderNum;
            for (var i = 0; i < global.grassArray.length; i++) {
                if (this.x == global.grassArray[i].x && this.y == global.grassArray[i].y) {
                    global.grassArray.splice(i, 1);
                    break;
                }
            }
        }
        else {   //move function part --> no grass detected
            var slot = random(this.findSlots(0));
            if (slot) {
                global.matrix[this.y][this.x] = 0;
                this.x = slot[0];
                this.y = slot[1];
                global.matrix[slot[1]][slot[0]] = 2 + this.genderNum;
            }
            this.death();
        }
    }
    multiplyF() {
        if(global.weather == "spring"){
            if (this.count >= 8) {
                var slot = random(this.findSlots(0).concat(this.findSlots(1)));
                var chance = [true, true, true, true, true, true, true, true, false];
                var genotip = random(chance);
				if(slot){
					if (genotip) {     // normal multiply
						var randomGender = Math.round(Math.random()) / 2;
						if(global.matrix[slot[1]][slot[0]] == 1){        // if grass -- remove
							for(var i = 0; i < global.grassArray.length; i++) {
								if(slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
								global.grassArray.splice(i, 1);
								break;
								}
							}
						}
						var eater = new grassEater(slot[0], slot[1], 2, randomGender);
						global.totalGrassEaterCounter++;
						global.grassEaterArray.push(eater);
						global.matrix[slot[1]][slot[0]] = 2+randomGender; 
					}
					else {    // an predator
						if(matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
							for(var i = 0; i < global.grassArray.length; i++) {
								if(slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
								global.grassArray.splice(i, 1);
								break;
								}
							}
						}
						var mutant = new predator(slot[0], slot[1], 3);
						global.totalPredatorCounter++;
						global.predatorArray.push(mutant);
						global.matrix[slot[1]][slot[0]] = 3;
					}
					this.count = 0;
				}
            }
        }else{
            if (this.count >= this.multiply_interval) {
                if (this.gender == "male") {
                    var oppositeGender = random(this.findSlots(2.5));
                    if(oppositeGender){
                        var slot = random(this.findSlots(0).concat(this.findSlots(1)));
                        var chance = [true, true, true, true, false];
                        var randomGender = Math.round(Math.random()) / 2;
                        var genotip = random(chance);
                        if (genotip && slot) {     // normal multiply
                            if (global.matrix[slot[1]][slot[0]] == 1) {        // if grass -- remove
                                for (var i = 0; i < global.grassArray.length; i++) {
                                    if (slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
                                        global.grassArray.splice(i, 1);
                                        break;
                                    }
                                }
                            }
                            var eater = new grassEater(slot[0], slot[1], 2, randomGender);
							global.totalGrassEaterCounter++;
                            global.grassEaterArray.push(eater);
                            global.matrix[slot[1]][slot[0]] = 2 + randomGender;
                        }
                        else {    // an predator
                            if (global.matrix[slot[1]][slot[0]] == 1) {        // is grass -- remove
                                for (var i = 0; i < global.grassArray.length; i++) {
                                    if (slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
                                        global.grassArray.splice(i, 1);
                                        break;
                                    }
                                }
                            }
                            var mutant = new predator(slot[0], slot[1], 3);
							global.totalPredatorCounter++;
                            global.predatorArray.push(mutant);
                            global.matrix[slot[1]][slot[0]] = 3;
                        }
                        this.count = 0;
                    }
                }
            }
        }
		this.count++;
    }
    death() {
        if (this.energy <= 0) {
            for (var i = 0; i < global.grassEaterArray.length; i++) {
                if (global.grassEaterArray[i].x == this.x && global.grassEaterArray[i].y == this.y) {
                    global.grassEaterArray.splice(i, 1);
                    break;
                }
            }
            global.matrix[this.y][this.x] = 0;
        }
        this.energy--;
    }
}

var random = require("./random.js");