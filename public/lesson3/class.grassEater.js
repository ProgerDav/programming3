class grassEater extends Creature{
    multiplyF() {
        if (this.count >= 8) {
            var slot = random(this.findSlots(0).concat(this.findSlots(1)));
            var chance = [true, true, true, true, true, true, true, true, false];
            var genotip = random(chance);
            if (genotip) {     // normal multiply
				if(matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                    for(var i = 0; i < grassArray.length; i++) {
                        if(slot[0] == grassArray[i].x && slot[1] == grassArray[i].y) {
                           grassArray.splice(i, 1);
                           break;
                        }
                    }
				}
				var eater = new grassEater(slot[0], slot[1], 2);
				grassEaterArray.push(eater);
				matrix[slot[1]][slot[0]] = 2; 
            }
            else {    // an predator
				if(matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                    for(var i = 0; i < grassArray.length; i++) {
                        if(slot[0] == grassArray[i].x && slot[1] == grassArray[i].y) {
                           grassArray.splice(i, 1);
                           break;
                        }
                    }
				}
                var mutant = new predator(slot[0], slot[1], 3);
                predatorArray.push(mutant);
                matrix[slot[1]][slot[0]] = 3;
            }
            this.count = 0;
        }
        this.count++;
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
}