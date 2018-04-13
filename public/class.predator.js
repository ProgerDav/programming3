class predator extends Creature{
    constructor(x, y, index) {
        super(x, y, index)
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
}