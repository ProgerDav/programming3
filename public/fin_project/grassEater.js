var main = require("./class.main.js");
module.exports = class Grass extends main{
	constructor(x, y, index){
		super(x, y, index);
		this.hungry = true;
	}
	getInfo(){
		return "x: " + this.x + ", y: " + this.y + ", index: " + this.index + " isHungry: "+this.hungry;
	}
}