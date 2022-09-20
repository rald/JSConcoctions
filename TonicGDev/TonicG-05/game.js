class Game {

	constructor() {
		this.canvas=document.getElementById("canvas");
		this.ctx=canvas.getContext("2d");
		this.frame=0;
		this.bitmap=new Bitmap(8,8,256,2,font);
	}

	resize() {
		this.canvas.width=window.innerWidth;
		this.canvas.height=window.innerHeight;
		this.centerX=this.canvas.width/2;
		this.centerY=this.canvas.height/2;
		Graphics.fillRect(this.ctx,0,0,this.canvas.width,this.canvas.height,"#000000");
	}

	draw() {
		Graphics.fillRect(this.ctx,0,0,this.canvas.width,this.canvas.height,"#00000008");

		this.x0=this.centerX+Math.cos(this.frame/ 7)*100;
		this.y0=this.centerY+Math.sin(this.frame/11)*200;
		this.x1=this.centerX+Math.cos(this.frame/ 7)*200;
		this.y1=this.centerY+Math.sin(this.frame/11)*100;
		this.x2=this.centerX+Math.cos(this.frame/11)*200;
		this.y2=this.centerY+Math.sin(this.frame/ 7)*200;
		
		this.bitmap.draw(this.ctx,Math.floor(Math.random()*26)+65,this.x0,this.y0,["transparent","#FF0000"]);
		this.bitmap.draw(this.ctx,Math.floor(Math.random()*26)+65,this.x1,this.y1,["transparent","#00FF00"]);
		this.bitmap.draw(this.ctx,Math.floor(Math.random()*26)+65,this.x2,this.y2,["transparent","#0000FF"]);

		this.frame++;
	}

}
