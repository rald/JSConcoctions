function Button(font,text,x,y,w,h) {
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.font=font;
	this.text=text;
	this.state=Button.UP;
  this.hold=false;

	this.draw=function() {

		switch(this.state) {
			case Button.UP:

				setFillStyle(buttonUpColor);
				setStrokeStyle(buttonUpBorderColor);
				fillRect(this.x,this.y,this.w,this.h);
				drawRect(this.x,this.y,this.w,this.h);

				setFillStyle(buttonUpTextColor);
				setTextAlign("center");
				setTextBaseline("middle");
				setFont(this.font);
				fillText(this.text,this.x+this.w/2,this.y+this.h/2);

				break;

			case Button.DOWN:

				setFillStyle(buttonDownColor);
				setStrokeStyle(buttonDownBorderColor);
				fillRect(this.x,this.y,this.w,this.h);
				drawRect(this.x,this.y,this.w,this.h);

				setFillStyle(buttonDownTextColor);
				setTextAlign("center");
				setTextBaseline("middle");
				setFont(this.font);
				fillText(this.text,this.x+this.w/2,this.y+this.h/2);

				break;
		}
	}

	this.handleEvents=function() {
	  if(mouse.isDown) {
      if(!this.hold) {
  		  if(inrect(mouse.x,mouse.y,this.x,this.y,this.w,this.h)) {
  				this.state=Button.DOWN;
          this.hold=true;
  		  }
      }
	  } else {
	    if(this.hold) {
  	    this.state=Button.UP;
  		  this.hold=false;
  	    return true;
	    }
	  }
		return false;
	}

}

Button.UP=0;
Button.DOWN=1;
