//var Main = require("./class.main.js");
var predator = require("./predator.js");

module.exports = class superPredator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.shotInterval = 20;
        this.health = 5;
        this.toRemove = [];
        this.count = 0;
    }
    findSlots(identifier){
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
        for(var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < global.matrix[0].length && y >= 0 && y < global.matrix.length) {
                if (global.matrix[y][x] != identifier && global.matrix[y][x] != 4) {  // everything except --> superPredator(himself) and fire
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move(){
        var slot = random(this.findSlots(7));
    	if(slot){
            if(global.matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                for(var i = 0; i < global.grassArray.length; i++) {
                   if(slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
                     global.grassArray.splice(i, 1);
                     break;
                    }
                }
            }
            else if(global.matrix[slot[1]][slot[0]] == 2 || global.matrix[slot[1]][slot[0]] == 2.5){    // is grassEater -- remove
                for(var i = 0; i < global.grassEaterArray.length; i++) {
                   if(slot[0] == global.grassEaterArray[i].x && slot[1] == global.grassEaterArray[i].y) {
                     global.grassEaterArray.splice(i, 1);
                     break;
                    }
                }
            }
            else if(global.matrix[slot[1]][slot[0]] == 3 || global.matrix[slot[1]][slot[0]] == 3.5){    // is predator -- remove
                for(var i = 0; i < global.predatorArray.length; i++) {
                   if(slot[0] == global.predatorArray[i].x && slot[1] == global.predatorArray[i].y) {
                     global.predatorArray.splice(i, 1);
                     break;
                    }
                }
            }
            global.matrix[this.y][this.x] = 0;
            global.matrix[slot[1]][slot[0]] = 10;
            this.x = slot[0];
            this.y = slot[1];
        }
        this.specialEvent();
    }
    specialEvent() {
        this.shotInterval--;
        if (this.shotInterval <= 0) {
            this.shotInterval = 10;
            var slots = this.findDiagonals1().concat(this.findDiagonals2());  // merge diagonal slots arrays
            for (var e in slots) {
                var slot = slots[e];
                if (global.matrix[slot[1]][slot[0]] == 1) {        // is grass -- remove
                    for (var i = 0; i < global.grassArray.length; i++) {
                        if (slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
                            global.grassArray.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (global.matrix[slot[1]][slot[0]] == 3) {    // is predator -- remove
                    for (var i = 0; i < global.predatorArray.length; i++) {
                        if (slot[0] == global.predatorArray[i].x && slot[1] == global.predatorArray[i].y) {
                            global.predatorArray.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (global.matrix[slot[1]][slot[0]] == 7) {    // reduce human's health
                    global.humanHealth--;
                    console.log(global.superPredatorHealth, global.humanHealth);
                }
                if (global.matrix[slot[1]][slot[0]] == 2 || global.matrix[slots[e][1]][slots[e][0]] == 2.5) {
                    for (var i = 0; i < global.grassEaterArray.length; i++) {
                        if (slot[0] == global.grassEaterArray[i].x && slot[1] == global.grassEaterArray[i].y) {
                            global.grassEaterArray.splice(i, 1);
                            break;
                        }
                    }
                }
                if (global.matrix[slot[1]][slot[0]] != 7 && global.matrix[slot[1]][slot[0]] != this.index) {
                    global.matrix[slot[1]][slot[0]] = 11; //like empty
                    this.toRemove.push(slot);
                }
            }
        } else {
            this.count++;
            if (this.count >= 5) {
                this.count = 0;
                for (var i in this.toRemove) {
                    var x = this.toRemove[i][0];
                    var y = this.toRemove[i][1];
                    global.matrix[y][x] = 0;
                }
                this.toRemove = [];
            }
        }
    }
    findDiagonals1() {
        var diagonals = [];
        for (var x = this.x, y = this.y; x >= 0, y >= 0; x-- , y--) {  // to bottom -- first diagonal
            var Dslot = [x, y];
            diagonals.push(Dslot);
        }
        for (x = this.x, y = this.y; x < global.matrix[0].length, y < global.matrix.length; x++ , y++) {  // to above -- second diagonal
            var Dslot = [x, y];
            diagonals.push(Dslot);
        }
        return diagonals;
    }
    findDiagonals2() {
        var diagonals = [];
        for (var x = this.x, y = this.y; x < global.matrix[0].length, y >= 0; y-- , x++) {  // depi verev -- erkrord ankyunagic
            var Dslot = [x, y];
            diagonals.push(Dslot);
        }
        for (x = this.x, y = this.y; x >= 0, y < global.matrix.length; y++ , x--) { // depi nerqev -- arajin ankyunagic
            var Dslot = [x, y];
            diagonals.push(Dslot);
        }
        return diagonals;
    }
}

    var random = require('./random.js');