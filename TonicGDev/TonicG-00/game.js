var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");



var FPS;
var size;
var bitmapFont;



function rnd(n) {
	return Math.floor(Math.random()*n);
}



function Bitmap(width,height,frames,pixels) {
	this.width=width;
	this.height=height;
	this.frames=frames;
	this.pixels=pixels;
}



function drawBitmap(bitmap,colors,frame,size,x,y) {
	for(var j=0;j<bitmap.height;j++) {
		for(var i=0;i<bitmap.width;i++) {
			var index=bitmap.pixels[i+j*bitmap.width+frame*bitmap.width*bitmap.height];
			var color=colors[index];
			if(index!=0) {
				ctx.fillStyle="rgb(0,"+(j/bitmap.height*128+80)+",0)";
				ctx.fillRect(x+i*size,y+j*size,size,size);
			} else {
				ctx.fillStyle=color;
				ctx.fillRect(x+i*size,y+j*size,size,size);
			}
		}
	}
}



function draw() {
	var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	drawBitmap(
			bitmapFont,
			["#000000","rgb(0,"+(rnd(128)+64)+",0)"],		
			rnd(2)?c[rnd(c.length)].charCodeAt(0):32,
			size,
			rnd(Math.floor(canvas.width/(bitmapFont.width*size)))*bitmapFont.width*size,
			rnd(Math.floor(canvas.height/(bitmapFont.height*size)))*bitmapFont.height*size);
}



function main() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	FPS=60;
	size=2;
	bitmapFont=new Bitmap(8,8,256,font);

	setInterval(draw,1000/FPS);
}

main();
