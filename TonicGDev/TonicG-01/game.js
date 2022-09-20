var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var FPS = 60;

var bitmapFont;

var explodes;

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



function drawBitmap(bitmap,frame,x,y) {
	for(var j=0;j<bitmap.height;j++) {
		for(var i=0;i<bitmap.width;i++) {
			var index=bitmap.pixels[i+j*bitmap.width+frame*bitmap.width*bitmap.height];
			var color=colors[index];
			if(index!=0) {
				ctx.fillStyle="rgb(0,"+(j/bitmap.height*128+80)+",0)";
				ctx.fillRect(x+i*bitmap.size,y+j*bitmap.size,bitmap.size,bitmap.size);
			} else {
				ctx.fillStyle=color;
				ctx.fillRect(x+i*bitmap.size,y+j*bitmap.size,bitmap.size,bitmap.size);
			}
		}
	}
}



function Pixel(x,y,color,size) {

	this.ox=x;
	this.oy=y;

	this.x=x;
	this.y=y;

	this.color=color;
	this.size=size;

	this.vx=0;
	this.vy=0;

	this.dx=x;
	this.dx=y;

	this.delay=10;

	this.epsilon=0.0001;

	this.draw=function() {
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x*this.size,this.y*this.size,this.size,this.size);		
	}

	this.update=function() {
		this.vx=(this.dx-this.x)/this.delay;
		this.vy=(this.dy-this.y)/this.delay;

		this.x+=this.vx;
		this.y+=this.vy;
		
		if(	Math.abs(this.dx-this.x)<this.epsilon &&
				Math.abs(this.dy-this.y)<this.epsilon) {
			this.dx=this.x;
			this.dy=this.y;
			return true;
		}

		return false;
	}

} 



function Explode(bitmap,x,y,colors,frame) {
	this.bitmap=bitmap;
	this.x=x;
	this.y=y;
	this.pixels=[];
	this.toggle=false;

	for(var j=0;j<bitmap.height;j++) {
		for(var i=0;i<bitmap.width;i++) {
			var index=bitmap.pixels[i+j*bitmap.width+frame*bitmap.width*bitmap.height];
			var color=colors[index];
			if(index!=0) {
				color="rgb(0,"+(j/bitmap.height*128+80)+",0)";
				this.pixels.push(new Pixel(x+i,y+j,color,bitmap.size));		
			}
		}
	}

	this.draw=function() {
		for(var i=0;i<this.pixels.length;i++) {
			this.pixels[i].draw();
		}
	}

	this.update=function() {
		var finish=true;
		for(var i=0;i<this.pixels.length;i++) {
			if(!this.pixels[i].update()) finish=false;
		}
		return finish;
	}

	this.boom=function() {
		for(var i=0;i<this.pixels.length;i++) {
			var r=rnd(20);
			var a=radians(rnd(360));
			this.pixels[i].dx=this.pixels[i].x+r*Math.cos(a);
			this.pixels[i].dy=this.pixels[i].y+r*Math.sin(a);
		}
	}


	this.moob=function() {
		for(var i=0;i<this.pixels.length;i++) {
			this.pixels[i].dx=this.pixels[i].ox;
			this.pixels[i].dy=this.pixels[i].oy;
		}
	}

	
}


function draw() {
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	for(var i=0;i<explodes.length;i++) {
		explodes[i].draw();
	}

	for(var i=0;i<explodes.length;i++) {
		if(explodes[i].update()) {
			if(explodes[i].toggle) {
				explodes[i].boom();
			} else {
				explodes[i].moob();
			}
			explodes[i].toggle=!explodes[i].toggle;
		}
	}
}


function main() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	toggle=false;

	bitmapFont=new Bitmap(8,8,256,4,font);

	explodes=[];

	var text="Hello World";

	for(var i=0;i<text.length;i++) {
		explodes.push(new Explode(
				bitmapFont,
				(canvas.width/bitmapFont.size-bitmapFont.width*text.length)/2+i*bitmapFont.width,
				(canvas.height/bitmapFont.size-bitmapFont.height)/2,
				["transparent","#00FF00"],text.charCodeAt(i)));
	}
	
	for(var i=0;i<explodes.length;i++) {
		explodes[i].boom();
	}

	setInterval(draw,1000/FPS);
}



main();
