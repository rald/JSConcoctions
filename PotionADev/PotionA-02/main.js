import * as GConfigModule from "./GConfig.js";
import * as GUtilModule from "./GUtil.js";
import * as GInputModule from "./GInput.js";
import * as GButtonModule from "./GButton.js";
import * as GKeyboardModule from "./GKeyboard.js";
import * as GTermModule from "./GTerm.js";


window.onload=function() {

  const gConfig=new GConfigModule.GConfig();
  const gInput=new GInputModule.GInput(gConfig);
  const gKeyboard=new GKeyboardModule.GKeyboard(gConfig);
  const gTerm=new GTermModule.GTerm(gConfig,gFont);

  let ctx=gConfig.ctx;
  let GUtil=GUtilModule.GUtil;
  let btnKey=null;
  let currBtnKey=null;

  function draw() {

    ctx.font=gConfig.font;
    
    ctx.fillStyle=gConfig.palette[gConfig.backgroundColorPaletteIndex];
    ctx.fillRect(0,0,gConfig.canvas.width,gConfig.canvas.height);
 
    ctx.fillStyle=gConfig.palette[gConfig.screenBackColorPaletteIndex];
    ctx.fillRect(gConfig.screenOffsetX,gConfig.screenOffsetY,gConfig.screenWidth,gConfig.screenHeight);


    gTerm.draw(ctx);

    gKeyboard.draw(ctx);
    
    btnKey=gKeyboard.handleEvents(gInput);
    
    if(btnKey instanceof GButtonModule.GButton) {
      currBtnKey=btnKey;
      gTerm.print(btnKey.text);
    }
    
    if(currBtnKey instanceof GButtonModule.GButton) {
      ctx.textAlign="left";
      ctx.textBaseline="top";
      ctx.fillStyle=gConfig.palette[gConfig.messageTextColorPaletteIndex]+gConfig.ALPHA;
      ctx.fillText(
        "BTN: "+currBtnKey.text,
        gConfig.screenOffsetX+gConfig.gap*2,
        gConfig.screenOffsetY+gConfig.gap*2);
        
    }
    
  
    window.requestAnimationFrame(draw);  
  }



  window.requestAnimationFrame(draw);

};

