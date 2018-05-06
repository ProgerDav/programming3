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
                if(global.matrix[slot[1]]){
                    if(global.matrix[slot[1]][slot[0]] != undefined){
                        this.toRemove.push(slot);   // add slot to an array
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
                if(global.matrix[slot[1]]){
                    if(global.matrix[slot[1]][slot[0]] != undefined){
                        this.toRemove.push(slot);  // add slot to the toRemove array
                        if(global.matrix[slot[1]][slot[0]] == 1){        // is grass -- remove
                            for(var i = 0; i < global.grassArray.length; i++) {
                               if(slot[0] == global.grassArray[i].x && slot[1] == global.grassArray[i].y) {
                                 global.grassArray.splice(i, 1);
                                 break;
                                }
                            }
                        }
                        else if(global.matrix[slot[1]][slot[0]] == 2){    // is grassEater -- remove
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
                    }
                }
                
            }
        }
        else if(this.count >= 5){     // clean the area with fire at the end
            for(var e in this.toRemove){
                var slot = this.toRemove[e];
                global.matrix[slot[1]][slot[0]] = 0;
            }
            global.matrix[global.fireArray[0].y][global.fireArray[0].x] = 0;
            global.fireArray = [];  // empty global.fireArray
        }
        this.count++;  
    }
}
	function random(arg1, arg2) {  // there is no p5.js on server side so need to replace all it's functions
        if (Array.isArray(arguments[0])) {  //in case argument is a massive -- return random element from it;
            var index = Math.floor(Math.random() * arguments[0].length);
            return arguments[0][index];
        }else if(typeof arguments[0] == 'number' && typeof arguments[1] == 'number'){ // return random number from set interval
			var max = arguments[1] - arguments[0];
			var min = arguments[0];
			return Math.round(Math.random() * max + min);
		}
    }