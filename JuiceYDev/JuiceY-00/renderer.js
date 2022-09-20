var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var cols=128;
var rows=64;
var pixelSize=2;

var display=new Uint8Array(cols*rows);

function clrscr() {
	for(var i=0;i<display.length;i++) {
	  display[i]=0;
	}	
}

function setPixel(x,y,c) {

	while (x >= cols) {
  	x -= cols-1;
  }
    
	while (x < 0) {
		x += cols-1;
	}
	
	while (y >= rows) {
		y -= rows-1;
	}
	
	while (y < 0) {
		y += rows-1;
	}
	
	var p=x+(y*cols);
	
	display[p] = c;
}

function render() {
	for(var i=0;i<display.length;i++) {
		var x=i%cols;
		var y=Math.floor(i/cols);
		var p=y*cols+x;
		ctx.fillStyle=palette[display[p]];
		ctx.fillRect(x*pixelSize,y*pixelSize,pixelSize,pixelSize);
	}
}

