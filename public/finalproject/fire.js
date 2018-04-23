module.exports = class fire{
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