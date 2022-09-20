var fontSurface;
var x=0,y=0;
var z=0;

var n=[
	130.81, // c      0
	138.59, // c#/db  1
	146.83, // d      2
	155.56, // e      3
	164.81, // e#/fb	 4
	174.61, // f      5
	185.00, // f#/gb  6
	196.00, // g      7
	207.65, // g#/ab  8
	220.00, // a      9 
	233.08, // a#/bb 10
	246.94  // b     11 
];

var f=[n[0],n[0],n[2],n[0],n[5],n[3]];
var d=[1000,1000,1000,1000,1000,1000];

function m() {
	play(f[z]); 
	
	setTimeout(function(){
		stop();
		z++;
		if(z>=f.length) z=0;
	},d[z]);
	
}

function radians(degrees) {
	return degrees*Math.PI/180; 
}

function rnd(x) {
	return Math.floor(Math.random()*x);
}

function Surface(pixels,width,height,frames,size) {
	this.pixels=pixels;
	this.width=width;
	this.height=height;
	this.frames=frames;
	this.size=size;
}

function drawSurface(surface,frame,x,y,colors) {
	for(var j=0;j<surface.height;j++) {
		for(var i=0;i<surface.width;i++) {
			var color=surface.pixels[i+j*surface.width+frame*surface.width*surface.height];
			if(color!="transparent"){
				setPixel(i*surface.size+x,j*surface.size+y,colors[color]);
			}
		}
	}
}

function print(font,text,x,y,colors) {
	var px=x*font.width*font.size;
	var py=y*font.height*font.size;
	for(var i=0;i<text.length;i++) {
		drawSurface(font,text.charCodeAt(i),px,py,colors);
		px+=font.width*font.size;
		if(px+font.width*font.size>cols) {
			px=0;
			py+=font.height*font.size;
		}
	}
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	draw();
}

function draw() {	
	
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	clrscr();

	if(key.isDown) {
		switch(key.keyCode) {
			case 38: y--; break;	
			case 40: y++; break;	
			case 37: x--; break;	
			case 39: x++; break;	
			case 32: 
				m();
			break;
		}
	}
	

	print(fontSurface,"\x18",0,0,[1,2]);

	setPixel(x,y,12);


	render();

	window.requestAnimationFrame(draw);
}




function main() {

	fontSurface=new Surface(font,8,8,256,1);

	resize();
	window.onresize=resize;
	window.requestAnimationFrame(draw);
}


main();
