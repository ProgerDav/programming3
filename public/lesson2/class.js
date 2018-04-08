class Creature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index
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
            matrix[slot[1]][slot[0]] = this.index;
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
                matrix[slot[1]][slot[0]] = this.index;
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
}   