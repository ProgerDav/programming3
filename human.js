var fire = require("./fire.js");
module.exports = class human{
    constructor(x, y){
    	this.x = x;
    	this.y = y;
    	this.directions = [];
    	this.count = 180;
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
                if (global.matrix[y][x] != identifier && global.matrix[y][x] != 4) {  // everything except --> human(himself) and fire
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move(){
    	this.count++;
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
            else if(global.matrix[slot[1]][slot[0]] == 3){    // is predator -- remove
                for(var i = 0; i < global.predatorArray.length; i++) {
                   if(slot[0] == global.predatorArray[i].x && slot[1] == global.predatorArray[i].y) {
                     global.predatorArray.splice(i, 1);
                     break;
                    }
                }
            }
            global.matrix[this.y][this.x] = 0;
            global.matrix[slot[1]][slot[0]] = 7;
            this.x = slot[0];
            this.y = slot[1];
        }
    	this.shoot();
    	this.balance();
    	}
    findDiagonals1(){
    	var diagonals = [];
    	for(var x=this.x,y=this.y;x>=0,y>=0;x--,y--){  // depi nerqev -- arajin ankyunagic
    		var Dslot = [x, y];
    		diagonals.push(Dslot);
    	}
    	for(x=this.x,y=this.y;x<global.matrix[0].length,y<global.matrix.length;x++,y++){  // depi verev -- arajin ankyunagic
    		var Dslot = [x, y];
    		diagonals.push(Dslot);
    	}
    	return diagonals;
    }
    findDiagonals2(){
    	var diagonals = [];
    	for(var x=this.x,y=this.y;x<global.matrix[0].length,y>=0;y--,x++){  // depi verev -- erkrord ankyunagic
    		var Dslot = [x, y];
    		diagonals.push(Dslot);
    	}
    	for(x=this.x,y=this.y;x>=0,y<global.matrix.length;y++,x--){ // depi nerqev -- arajin ankyunagic
    		var Dslot = [x, y];
    		diagonals.push(Dslot);
    	}
    	return diagonals;
    }
    shoot(){
    	var slots = this.findDiagonals1().concat(this.findDiagonals2());  // merge diagonal slots arrays
    	for(var e in slots){
    		if(global.matrix[slots[e][1]][slots[e][0]] == 3){
    			for(var i = 0; i < global.predatorArray.length; i++) {
               		if(slots[e][0] == global.predatorArray[i].x && slots[e][1] == global.predatorArray[i].y) {
                 		global.predatorArray.splice(i, 1);
                 		break;
                	}
           		}
    			global.matrix[this.y][this.x] = 0;
    			global.matrix[slots[e][1]][slots[e][0]] = 7;
    			this.x = slots[e][0];
    			this.y = slots[e][1];
    		}
    	}
    }
    balance(){
    	if(global.grassArray.length >= (global.matrix[0].length*global.matrix.length)*30/100 && this.count >= 10){
            var x = parseInt(random(0, global.matrix[0].length - 1));  // get random coordinates to place the fire
            var y = parseInt(random(0, global.matrix.length - 1));
            var slot = [x, y];
    		var pajar = new fire(slot[0], slot[1]);
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
            else if(global.matrix[slot[1]][slot[0]] == 3){    // is predator -- remove
                for(var i = 0; i < global.predatorArray.length; i++) {
                    if(slot[0] == global.predatorArray[i].x && slot[1] == global.predatorArray[i].y) {
                        global.predatorArray.splice(i, 1);
                        break;
                    }
                }
            }
            global.matrix[slot[1]][slot[0]] = 4;
    		global.fireArray.push(pajar);
    		this.count = 0;
    	}
    }
}

	var random = require("./random.js");