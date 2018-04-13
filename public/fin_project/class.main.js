module.exports = class Main{
	constructor(x, y, index){
		this.x = x;
		this.y = y;
		this.index = index;
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
	getInfo(){
		return "x: " + this.x + ", y: " + this.y + ", index: " + this.index;
	}
}