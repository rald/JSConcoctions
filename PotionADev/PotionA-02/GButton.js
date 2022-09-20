import * as GUtilModule from "./GUtil.js";



export class GButton {

  static UP=0;
  static DOWN=1;
  static hold=false;

  constructor(gConfig,text,x,y,width,height) {
    this.gConfig=gConfig;
  	this.x=x;
  	this.y=y;
  	this.width=width;
  	this.height=height;
  	this.palette=gConfig.palette;
  	this.text=text;
  	this.state=GButton.UP;
  }
  
  draw(ctx) {
    
    ctx.font=this.gConfig.font;
    
		switch(this.state) {
			case GButton.UP:

	      ctx.fillStyle=this.palette[this.gConfig.buttonUpBackColorPaletteIndex]+this.gConfig.ALPHA1;
				ctx.fillRect(this.x,this.y,this.width,this.height);
				
				ctx.strokeStyle=this.palette[this.gConfig.buttonUpBorderColorPaletteIndex]+this.gConfig.ALPHA1;
				ctx.strokeRect(this.x,this.y,this.width,this.height);
				
				ctx.textAlign="center";
				ctx.textBaseline="middle";
				ctx.fillStyle=this.palette[this.gConfig.buttonUpTextColorPaletteIndex]+this.gConfig.ALPHA1;
				ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);

				break;

			case GButton.DOWN:
	      
	      ctx.fillStyle=this.palette[this.gConfig.buttonDownBackColorPaletteIndex]+this.gConfig.ALPHA1;
				ctx.fillRect(this.x,this.y,this.width,this.height);
			
				ctx.strokeStyle=this.palette[this.gConfig.buttonDownBorderColorPaletteIndex]+this.gConfig.ALPHA1;
				ctx.strokeRect(this.x,this.y,this.width,this.height);
				
				ctx.textAlign="center";
				ctx.textBaseline="middle";
				ctx.fillStyle=this.palette[this.gConfig.buttonDownTextColorPaletteIndex]+this.gConfig.ALPHA1;
			  ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);

				break;
		}

	}

	handleEvents(gInput) {
	  let result=null;
	  if(gInput.mouse.isDown) {
      if(!GButton.hold) {
  		  if(GUtilModule.GUtil.inrect(gInput.mouse.x,gInput.mouse.y,this.x,this.y,this.width,this.height)) {
  				this.state=GButton.DOWN;
          GButton.hold=true;
          result=this;
  		  }
      }
	  } else {
	    if(this.state==GButton.DOWN) {
        this.state=GButton.UP;
	    } 
	    if(GButton.hold==true) {
        GButton.hold=false;
	    }
	  }
	 return result;
	}

}

