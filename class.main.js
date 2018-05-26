module.exports = class Main{
	constructor(x, y, index, gender){
        this.x = x;
        this.y = y;
        this.count = 0;
        this.directions = [];
        this.gender = (gender == 0 ? "male" : "female");
        this.genderNum = gender;
        if(index == 3){ //predator
            this.evergy = (this.gender == 'male' ? 25 : 5);
        }else{         //grassEater
            this.energy = 5;
        }
        if(global.weather == "spring"){
            this.multiply_interval = 1;
        }else{
            this.multiply_interval = 8;
        }
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
            if (x >= 0 && x < global.matrix[0].length && y >= 0 && y < global.matrix.length) {
                if (global.matrix[y][x] == identifier) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}
	var random = require("./random.js");