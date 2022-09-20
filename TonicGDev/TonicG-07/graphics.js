class Graphics {

	static drawLine(ctx,x0,y0,x1,y1,color) {
		ctx.beginPath();
		ctx.strokeStyle=color;
		ctx.moveTo(x0,y0);
		ctx.lineTo(x1,y1);
		ctx.stroke();
		ctx.closePath();
	}

	static drawCircle(ctx,x,y,r,color) {
		ctx.beginPath();
		ctx.strokeStyle=color;
		ctx.arc(x,y,r,0,2*Math.PI);
		ctx.stroke();
		ctx.closePath();
	}

	static fillCircle(ctx,x,y,r,color) {
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.arc(x,y,r,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
	}

	static drawRect(ctx,x,y,w,h,color) {
		ctx.strokeStyle=color;
		ctx.strokeRect(x,y,w,h);
	}

	static fillRect(ctx,x,y,w,h,color) {
		ctx.fillStyle=color;
		ctx.fillRect(x,y,w,h);
	}

	static drawBitmap(ctx,frame,x,y,size,bitmap,palette) {
		for(let j=0;j<bitmap.height;j++) {
			for(let i=0;i<bitmap.width;i++) {
				let colorIndex=bitmap.pixels[i+j*bitmap.width+frame*bitmap.width*bitmap.height];
				let color=palette[colorIndex];
				this.fillRect(ctx,x+i*size,y+j*size,size,size,color);
			}
		}
	}
	
	static drawText(ctx,text,x,y,size,bitmap,palette) {
		for(let i=0;i<text.length;i++) {
			this.drawBitmap(ctx,text.charCodeAt(i),x+i*bitmap.width*size,y,size,bitmap,palette);
		}
	}

}
