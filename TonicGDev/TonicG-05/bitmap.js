class Bitmap {

	constructor(width,height,frames,size,pixels) {
		this.width=width;
		this.height=height;
		this.frames=frames;
		this.size=size;
		this.pixels=pixels;
	}

	draw(ctx,frame,x,y,colors) {
		for(let j=0;j<this.height;j++) {
			for(let i=0;i<this.width;i++) {
				let colorIndex=this.pixels[i+j*this.width+frame*this.width*this.height];
				let color=colors[colorIndex];
				Graphics.fillRect(ctx,x+i*this.size,y+j*this.size,this.size,this.size,color);
			}
		}
	}
	
}
