class Terminal {

	constructor(windowX,windowY,width,height) {
		this.windowX=windowX;
		this.windowY=windowY;
		this.width=width;
		this.height=height;

		this.screen=new Array(width*height);

		this.clear();		
	}	

	draw(ctx,size,bitmap) {
		for(let j=0;j<this.height;j++) {
			for(let i=0;i<this.width;i++) {
				let ascii=this.screen[i+j*this.width].ascii;
				let attr=this.screen[i+j*this.width].attr;
				let x=this.windowX+i*bitmap.width*size;
				let y=this.windowY+j*bitmap.height*size;
				Graphics.drawBitmap(ctx,ascii,x,y,size,bitmap,attr);
			}
		}
	}

	putchar(ascii,x,y,attr) {
		this.screen[x+y*this.width]={"ascii":ascii,"attr":attr};
	}

	box(x,y,w,h,attr) {
		for(var i=0;i<w-2;i++) {
			this.putchar(196,x+i+1,y,attr);
			this.putchar(196,x+i+1,y+h-1,attr);
		}

		for(var j=0;j<h-2;j++) {
			this.putchar(179,x,y+j+1,attr);
			this.putchar(179,x+w-1,y+j+1,attr);
		}

		this.putchar(218,x,y,attr);
		this.putchar(191,x+w-1,y,attr);
		this.putchar(192,x,y+h-1,attr);
		this.putchar(217,x+w-1,y+h-1,attr);
	}

	clear() {
		for(let j=0;j<this.height;j++) {
			for(let i=0;i<this.width;i++) {
				this.putchar(177,i,j,["#000000","#FFFFFF"]);
			}	
		}
	}


}
