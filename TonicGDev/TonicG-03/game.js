var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var FPS = 12;

var bitmapFont;

var colors=["#000000","#FFFFFF"];

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


function drawWindow(font,x0,y0,x1,y1,colors) {

	if(x0>x1) { var t=x0; x0=x1; x1=t; }
	if(y0>y1) { var t=y0; y0=y1; y1=t; }

	var x=x0;
	var y=y0;
	var w=x1-x0+1;
	var h=y1-y0+1;

	for(var j=0;j<h-2;j++) {
		for(var i=0;i<w-2;i++) {
			drawBitmap(font,32,(x+i+1)*font.width*font.size,(y+j+1)*font.height*font.size,colors);
		}
	}			

	drawBox(font,x0,y0,x1,y1,colors);

}



function draw() {	

	drawWindow(bitmapFont,i,j,k,l,colors);

	i+=1;
	j+=1;
	k-=1;
	l-=1;

	if(i>maxx) i=0;
	if(j>maxy) j=0;
	if(k<0) k=maxx;
	if(l<0) l=maxy;
}



function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	maxx=Math.floor(canvas.width/(bitmapFont.width*bitmapFont.size))-1;
	maxy=Math.floor(canvas.height/(bitmapFont.height*bitmapFont.size))-1;

	i=0; j=0; k=maxx; l=maxy;

}



function main() {

	bitmapFont=new Bitmap(8,8,256,4,font);

	resize();

	window.onresize=resize;

	setInterval(draw,1000/FPS);
}



main();
