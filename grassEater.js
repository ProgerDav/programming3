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
        if (this.count >= 4) {
            if (this.gender == "male") {
                var oppositeGender = random(this.findSlots(2.5));
                if(oppositeGender){
                    var slot = random(this.findSlots(0).concat(this.findSlots(1)));
                    var chance = [true, true, true, true, false];
                    var randomGender = Math.round(Math.random()) / 2;
                    var genotip = random(chance);
                    if (genotip) {     // normal multiply
                        if (global.matrix[slot[1]][slot[0]] == 1) {        // if grass -- remove
                            for (var i = 0; i < global.grassArray.length; i++) {
                                if (slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
                                    global.grassArray.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        var eater = new grassEater(slot[0], slot[1], 2, randomGender);
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
                        global.predatorArray.push(mutant);
                        global.matrix[slot[1]][slot[0]] = 3;
                    }
                    this.count = 0;
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

function random(arg1, arg2) {  // there is no p5.js on server side so need to replace all it's functions
    if (Array.isArray(arguments[0])) {  //in case argument is a massive -- return random element from it;
        var index = Math.floor(Math.random() * arguments[0].length);
        return arguments[0][index];
    } else if (typeof arguments[0] == 'number' && typeof arguments[1] == 'number') { // return random number from set interval
        var max = arguments[1] - arguments[0];
        var min = arguments[0];
        return Math.round(Math.random() * max + min);
    }
}