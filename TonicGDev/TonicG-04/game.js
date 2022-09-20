var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var FPS = 12;

var bitmapFont;

var i,j,k,l;

var maxx,maxy;



function radians(degrees) {
	return degrees*Math.PI/180; 
}



function rnd(x) {
	return Math.floor(Math.random()*x);
}



function Bitmap(width,height,frames,size,pixels) {
	this.width=width;
	this.height=height;
	this.frames=frames;
	this.size=size;
	this.pixels=pixels;
}



function drawBitmap(bitmap,frame,x,y,colors) {
	for(var j=0;j<bitmap.height;j++) {
		for(var i=0;i<bitmap.width;i++) {
			var index=bitmap.pixels[i+j*bitmap.width+frame*bitmap.width*bitmap.height];
			var color=colors[index];
			if(color!="transparent"){
				ctx.fillStyle=color;
				ctx.fillRect(x+i*bitmap.size,y+j*bitmap.size,bitmap.size,bitmap.size);
			}
		}
	}
}



function print(font,text,x,y,colors) {
	var px=x*font.width*font.size,py=y*font.height*font.size;
	for(var i=0;i<text.length;i++) {
		drawBitmap(font,text.charCodeAt(i),px,py,colors);
		px+=font.width*font.size;
		if(px+font.width*font.size>canvas.width) {
			py+=font.height*font.size;
		}
	}
}



function drawBox(font,x0,y0,x1,y1,colors) {

	if(x0>x1) { var t=x0; x0=x1; x1=t; }
	if(y0>y1) { var t=y0; y0=y1; y1=t; }

	var x=x0;
	var y=y0;
	var w=x1-x0+1;
	var h=y1-y0+1;

	for(var i=0;i<w-2;i++) {
		drawBitmap(font,196,(x+i+1)*font.width*font.size,y*font.height*font.size,colors);
		drawBitmap(font,196,(x+i+1)*font.width*font.size,(y+h-1)*font.height*font.size,colors);
	}

	for(var j=0;j<h-2;j++) {
		drawBitmap(font,179,x*font.width*font.size,(y+j+1)*font.height*font.size,colors);
		drawBitmap(font,179,(x+w-1)*font.width*font.size,(y+j+1)*font.height*font.size,colors);
	}

	drawBitmap(font,218,x*font.width*font.size,y*font.height*font.size,colors);
	drawBitmap(font,191,(x+w-1)*font.width*font.size,y*font.height*font.size,colors);
	drawBitmap(font,192,x*font.width*font.size,(y+h-1)*font.height*font.size,colors);
	drawBitmap(font,217,(x+w-1)*font.width*font.size,(y+h-1)*font.height*font.size,colors);

}



function fillWindow(font,frame,x,y,w,h,colors) {

	for(var j=0;j<h;j++) {
		for(var i=0;i<w;i++) {
			drawBitmap(font,frame,(x+i)*font.width*font.size,(y+j)*font.height*font.size,colors);
		}
	}			

}



function drawWindow(font,x,y,w,h,colors) {

	fillWindow(font,32,x,y,w,h,colors);

	drawBox(font,x,y,x+w-1,y+h-1,colors);

}



function draw() {	
	fillWindow(bitmapFont,177,0,0,maxx,maxy,["#000000","#FFFFFF"]);
	drawWindow(bitmapFont,3,3,16,8,["#0000FF","#FFFFFF"]);
	print(bitmapFont,"Hello World",4,4,["#000000","#00FF00"]);
}



function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	maxx=Math.floor(canvas.width/(bitmapFont.width*bitmapFont.size));
	maxy=Math.floor(canvas.height/(bitmapFont.height*bitmapFont.size));

	i=0; j=0; k=maxx; l=maxy;

	draw();

}



function main() {

	bitmapFont=new Bitmap(8,8,256,2,font);

	resize();

	window.onresize=resize;

	draw();
}



main();
