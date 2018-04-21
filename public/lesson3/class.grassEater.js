class grassEater extends Creature{
    multiplyF() {
        if (this.count >= 5) {
            var slot = random(this.findSlots(0).concat(this.findSlots(1)));
            var chance = [true, true, true, true, true, true, true, true, false];
            var genotip = random(chance);
            if (genotip) {     // normal multiply

                if(matrix[slot[1]][slot[0]] == 1){

                }

                var eater = new grassEater(slot[0], slot[1], 2);
                grassEaterArray.push(eater);
                matrix[slot[1]][slot[0]] = 2;

                
            }
            else {    // an predator

                
                var mutant = new predator(slot[0], slot[1], 3);
                predatorArray.push(mutant);
                matrix[slot[1]][slot[0]] = 3;
            }
            this.count = 0;
        }
        this.count++;
    }

}