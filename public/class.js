
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
    }

    findEmptySlots(identifier) {
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

    multiplyF() {
        this.multiply++;
        var norVandak = random(this.findEmptySlots(0));
        if (this.multiply >= 10 && norVandak) {
            var norXot = new Grass(norVandak[0], norVandak[1]);
            grassArray.push(norXot);
            matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
    }

}




class grassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.count = 0;
        this.energy = 5;
        this.directions = [];
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == identifier) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    moveAndEat() {
        var aviableSlots = this.findSlots(1);  //eat function part --> grass detected
        if (aviableSlots[0]) {
            var slot = random(aviableSlots);
            matrix[this.y][this.x] = 0;
            this.x = slot[0];
            this.y = slot[1];
            this.energy = 5;
            matrix[slot[1]][slot[0]] = 2;
            this.multiplyF();
            for (var i = 0; i < grassArray.length; i++) {
                if (this.x == grassArray[i].x && this.y == grassArray[i].y) {
                    grassArray.splice(i, 1);
                    break;
                }
            }
        }
        else {   //move function part --> no grass detected
            var slot = random(this.findSlots(0));
            if (slot) {
                matrix[this.y][this.x] = 0;
                this.x = slot[0];
                this.y = slot[1];
                matrix[slot[1]][slot[0]] = 2;
            }
            this.death();
        }
    }
    death() {
        if (this.energy <= 0) {
            for (var i = 0; i < grassEaterArray.length; i++) {
                if (grassEaterArray[i].x == this.x && grassEaterArray[i].y == this.y) {
                    grassEaterArray.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
        }
        this.energy--;
    }
    multiplyF() {
        if (this.count >= 5) {
            var slot = random(this.findSlots(0).concat(this.findSlots(1)));
            var chance = [true, true, true, true, true, true, true, true, false];
            var genotip = random(chance);
            if (genotip) {     // normal multiply
                var eater = new grassEater(slot[0], slot[1]);
                grassEaterArray.push(eater);
                matrix[slot[1]][slot[0]] = 2;
            }
            else {    // an predator
                var mutant = new predator(slot[0], slot[1]);
                predatorArray.push(mutant);
                matrix[slot[1]][slot[0]] = 3;
            }
            this.count = 0;
        }
        this.count++;
    }

}

class predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.count = 0;
        this.energy = 5;
        this.directions = [];
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == identifier) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    moveAndEat() {
        var aviableSlots = this.findSlots(2);  //eat function part --> grassEater detected
        if (aviableSlots[0]) {
            var slot = random(aviableSlots);
            matrix[this.y][this.x] = 0;
            this.x = slot[0];
            this.y = slot[1];
            this.energy = 5;
            matrix[slot[1]][slot[0]] = 3;
            for (var i = 0; i < grassEaterArray.length; i++) {
                if (slot[0] == grassEaterArray[i].x && slot[1] == grassEaterArray[i].y) {
                    grassEaterArray.splice(i, 1);
                    break;
                }
            }
        }
        else {   //move function part --> no grassEater detected
            var slot = random(this.findSlots(0).concat(this.findSlots(1)));
            if (slot) {
                if(matrix[slot[1]][slot[0]] == 1){
                    for (var i = 0; i < grassArray.length; i++) {
                        if (slot[0] == grassArray[i].x && slot[1] == grassArray[i].y) {
                            grassArray.splice(i, 1);
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
    death() {
        if (this.energy <= 0) {
            for(var i = 0; i < predatorArray.length; i++) {
                if (predatorArray[i].x == this.x && predatorArray[i].y == this.y) {
                    predatorArray.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
        }
        this.energy--;
    }
}


class human{
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != identifier && matrix[y][x] != 4) {  // everything except --> human(himself) and fire
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
            if(matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                for(var i = 0; i < grassArray.length; i++) {
                   if(slot[0] == grassArray[i].x && slot[1] == grassArray[i].y) {
                     grassArray.splice(i, 1);
                     break;
                    }
                }
            }
            else if(matrix[slot[1]][slot[0]] == 2){    // is grassEater -- remove
                for(var i = 0; i < grassEaterArray.length; i++) {
                   if(slot[0] == grassEaterArray[i].x && slot[1] == grassEaterArray[i].y) {
                     grassEaterArray.splice(i, 1);
                     break;
                    }
                }
            }
            else if(matrix[slot[1]][slot[0]] == 3){    // is predator -- remove
                for(var i = 0; i < predatorArray.length; i++) {
                   if(slot[0] == predatorArray[i].x && slot[1] == predatorArray[i].y) {
                     predatorArray.splice(i, 1);
                     break;
                    }
                }
            }
            matrix[this.y][this.x] = 0;
            matrix[slot[1]][slot[0]] = 7;
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
    	for(x=this.x,y=this.y;x<matrix[0].length,y<matrix.length;x++,y++){  // depi verev -- arajin ankyunagic
    		var Dslot = [x, y];
    		diagonals.push(Dslot);
    	}
    	return diagonals;
    }
    findDiagonals2(){
    	var diagonals = [];
    	for(var x=this.x,y=this.y;x<matrix[0].length,y>=0;y--,x++){  // depi verev -- erkrord ankyunagic
    		var Dslot = [x, y];
    		diagonals.push(Dslot);
    	}
    	for(x=this.x,y=this.y;x>=0,y<matrix.length;y++,x--){ // depi nerqev -- arajin ankyunagic
    		var Dslot = [x, y];
    		diagonals.push(Dslot);
    	}
    	return diagonals;
    }
    shoot(){
    	var slots = this.findDiagonals1().concat(this.findDiagonals2());  // merge diagonal slots arrays
    	for(var e in slots){
    		if(matrix[slots[e][1]][slots[e][0]] == 3){
    			for(var i = 0; i < predatorArray.length; i++) {
               		if(slots[e][0] == predatorArray[i].x && slots[e][1] == predatorArray[i].y) {
                 		predatorArray.splice(i, 1);
                 		break;
                	}
           		}
    			matrix[this.y][this.x] = 0;
    			matrix[slots[e][1]][slots[e][0]] = 7;
    			this.x = slots[e][0];
    			this.y = slots[e][1];
    		}
    	}
    }
    balance(){
    	if(grassArray.length >= (matrix[0].length*matrix.length)*50/100 && this.count >= 10){
            var x = parseInt(random(0, matrix[0].length - 1));  // get random coordinates to place the fire
            var y = parseInt(random(0, matrix.length - 1));
            var slot = [x, y];
    		var pajar = new fire(slot[0], slot[1]);
            if(matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                for(var i = 0; i < grassArray.length; i++) {
                    if(slot[0] == grassArray[i].x && slot[1] == grassArray[i].y) {
                        grassArray.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[slot[1]][slot[0]] == 2){    // is grassEater -- remove
                for(var i = 0; i < grassEaterArray.length; i++) {
                    if(slot[0] == grassEaterArray[i].x && slot[1] == grassEaterArray[i].y) {
                        grassEaterArray.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[slot[1]][slot[0]] == 3){    // is predator -- remove
                for(var i = 0; i < predatorArray.length; i++) {
                    if(slot[0] == predatorArray[i].x && slot[1] == predatorArray[i].y) {
                        predatorArray.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[slot[1]][slot[0]] = 4;
    		fireArray.push(pajar);
    		this.count = 0;
    	}
    }
}

class fire{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.count = 0;
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
        this.toRemove = [];
    }
    spread(){                 // spread once per 2 tacts
    	if(this.count == 1){
	    	for(var i in this.directions){
	    		var slot = this.directions[i];
                if(matrix[slot[1]]){
                    if(matrix[slot[1]][slot[0]] != undefined){
                        this.toRemove.push(slot);   // add slot to an array
                        if(matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                            for(var i = 0; i < grassArray.length; i++) {
                               if(slot[0] == grassArray[i].x && slot[1] == grassArray[i].y) {
                                 grassArray.splice(i, 1);
                                 break;
                                }
                            }
                        }
                        else if(matrix[slot[1]][slot[0]] == 2){    // is grassEater -- remove
                            for(var i = 0; i < grassEaterArray.length; i++) {
                               if(slot[0] == grassEaterArray[i].x && slot[1] == grassEaterArray[i].y) {
                                 grassEaterArray.splice(i, 1);
                                 break;
                                }
                            }
                        }
                        else if(matrix[slot[1]][slot[0]] == 3){    // is predator -- remove
                            for(var i = 0; i < predatorArray.length; i++) {
                               if(slot[0] == predatorArray[i].x && slot[1] == predatorArray[i].y) {
                                 predatorArray.splice(i, 1);
                                 break;
                                }
                            }
                        }
                    matrix[slot[1]][slot[0]] = 4;
                    }
                }
	    	}
	    } 
        else if(this.count == 2){
            this.directions = [            //another 16 slots =(
                [this.x - 2, this.y - 2],
                [this.x - 1, this.y - 2],
                [this.x, this.y - 2],
                [this.x + 1, this.y - 2],
                [this.x + 2, this.y - 2],
                [this.x + 2, this.y - 1],
                [this.x + 2, this.y],
                [this.x + 2, this.y + 1],
                [this.x + 2, this.y + 2],
                [this.x + 1, this.y + 2],
                [this.x, this.y + 2],
                [this.x - 1, this.y + 2],
                [this.x - 2, this.y + 2],
                [this.x - 2, this.y + 1],
                [this.x - 2, this.y],
                [this.x - 2, this.y - 1],
            ];
            for(var i in this.directions){
                var slot = this.directions[i];
                if(matrix[slot[1]]){
                    if(matrix[slot[1]][slot[0]] != undefined){
                        this.toRemove.push(slot);  // add slot to the toRemove array
                        if(matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                            for(var i = 0; i < grassArray.length; i++) {
                               if(slot[0] == grassArray[i].x && slot[1] == grassArray[i].y) {
                                 grassArray.splice(i, 1);
                                 break;
                                }
                            }
                        }
                        else if(matrix[slot[1]][slot[0]] == 2){    // is grassEater -- remove
                            for(var i = 0; i < grassEaterArray.length; i++) {
                               if(slot[0] == grassEaterArray[i].x && slot[1] == grassEaterArray[i].y) {
                                 grassEaterArray.splice(i, 1);
                                 break;
                                }
                            }
                        }
                        else if(matrix[slot[1]][slot[0]] == 3){    // is predator -- remove
                            for(var i = 0; i < predatorArray.length; i++) {
                               if(slot[0] == predatorArray[i].x && slot[1] == predatorArray[i].y) {
                                 predatorArray.splice(i, 1);
                                 break;
                                }
                            }
                        }
                    matrix[slot[1]][slot[0]] = 4;
                    }
                }
                
            }
        }
        else if(this.count >= 5){     // clean the area with fire at the end
            for(var e in this.toRemove){
                var slot = this.toRemove[e];
                matrix[slot[1]][slot[0]] = 0;
            }
            matrix[fireArray[0].y][fireArray[0].x] = 0;
            fireArray = [];  // empty fireArray
        }
        this.count++;  
    }
}

