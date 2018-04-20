
	var socket = io.connect('http://localhost:3000'); 
	var pencil_width = 25;
	var canvas;
	var canvasImage;
	/*var buttonSub;
	var buttonDel;*/
	var source;
	function setup(){
		createCanvas(800, 600);
		background('#acacac');
		noStroke();
		var buttonSub = document.getElementById('submit');
		var buttonDel = document.getElementById('del');
		canvasImage = document.getElementById("canvasImage");
		canvas = document.getElementById("defaultCanvas0");
		function handleSubmit(evt) {
			source = canvas.toDataURL();
			//canvasImage.src = source;
			socket.emit("send image", source);
		}
		buttonSub.onclick = handleSubmit;
		function handleCanvas(src){
			canvasImage.src = src;
			var context = canvas.getContext("2d");
			context.drawImage(canvasImage, 0, 0, 800, 600);
		}
		socket.on("display image", handleCanvas);
		buttonDel.onclick = clearCanvas;		
		function clearCanvas(){
			socket.emit("delete image");
			background('#acacac');
		}
	}  
	function mouseDragged() {
	    ellipse(mouseX, mouseY, pencil_width, pencil_width);
	   // return false;
	}
	
	function getWidth(){
		pencil_width = pencilWidth.value;
	}


	
    

    


