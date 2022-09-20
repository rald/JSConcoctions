import GButton from "./gbutton.js";

class Keyboard {
  
  constructor(renderer,font,buttonWidth,buttonHeight,alpha) {


    this.KEYMAP = {
  		49: 0x1, // 1
  		50: 0x2, // 2
  		51: 0x3, // 3
  		52: 0xC, // 4
  		81: 0x4, // Q
  		87: 0x5, // W
  		69: 0x6, // E
  		82: 0xD, // R
  		65: 0x7, // A
  		83: 0x8, // S
  		68: 0x9, // D
  		70: 0xE, // F
  		90: 0xA, // Z
  		88: 0x0, // X
  		67: 0xB, // C
  		86: 0xF  // V
  	};
  
    this.BUTTON_MAP = {
      "1": 49,
      "2": 50,
      "3": 51,
      "4": 52,
      "Q": 81,
      "W": 87,
      "E": 69,
      "R": 82,
      "A": 65,
      "S": 83,
      "D": 68,
      "F": 70,
      "Z": 90,
      "X": 88,
      "C": 67,
      "V": 86
    };
  
    this.renderer=renderer;
    
    this.font=font;
    
    this.buttonWidth=buttonWidth;
    this.buttonHeight=buttonHeight;

    this.alpha=alpha;

    this.buttons = [];
    
    this.autoDelayMax=10;
    this.autoDelay=0;
    
    this.auto=false;

    this.keysPressed = new Array(this.KEYMAP.length);
    
    for(let i=0;i<this.keysPressed.length;i++) {
      this.keysPressed[i]=false;
    }
    
    this.createKeyPad();
    
    this.onNextKeyPressed=null;
    
    window.addEventListener('keydown', this.onKeyDown.bind(this), false);
    
    window.addEventListener('keyup', this.onKeyUp.bind(this), false);

  }

  createKeyPad() {
    let offsetX=(this.renderer.screenWidth-this.buttonWidth*4)+this.renderer.screenX;
    let offsetY=(this.renderer.screenHeight-this.buttonHeight*4)+this.renderer.screenY;
 
    let objKeys=Object.keys(this.BUTTON_MAP);

    for(let i=0;i<objKeys.length;i++) {
      let x=(i%4)*this.buttonWidth+offsetX;
      let y=Math.floor(i/4)*this.buttonHeight+offsetY;
      let text=objKeys[i];
      this.buttons.push(new GButton(this.font,text,x,y,this.buttonWidth,this.buttonHeight,this.alpha));
    }
  }
  
  draw(ctx) {
    for(let i=0;i<this.buttons.length;i++) {
      this.buttons[i].draw(ctx);
    }
  }
  
  handleEvents(gInput) {

    if(this.auto) {
      this.autoDelay--;
      if(this.autoDelay<=0) {
        this.autoDelay=0;
      }
    } else {
      this.autoDelay=0;
    }
    
    if(this.autoDelay<=0) {
      let buttonsAllUp=true;
      for(let i=0;i<this.buttons.length;i++) {
        if(this.buttons[i].handleEvents(gInput)) {
          window.dispatchEvent(new KeyboardEvent("keydown",{keyCode:this.BUTTON_MAP[this.buttons[i].text]}),false);
          buttonsAllUp=false;
        } else {
          window.dispatchEvent(new KeyboardEvent("keyup",{keyCode:this.BUTTON_MAP[this.buttons[i].text]}),false);
        }
        if(buttonsAllUp) {
          this.autoDelay=0;
          this.auto=false;
        } else {
          this.autoDelay=this.autoDelayMax;
          this.auto=true;
        }
        this.keysPressed[this.KEYMAP[this.BUTTON_MAP[this.buttons[i].text]]]=(this.buttons[i].state==GButton.DOWN);
        }
      }
    }
  
  update() {
    let offsetX=(this.renderer.screenWidth-this.buttonWidth*4)+this.renderer.screenX;
    let offsetY=(this.renderer.screenHeight-this.buttonHeight*4)+this.renderer.screenY;
  
    for(let i=0;i<this.buttons.length;i++) {
      let x=(i%4)*this.buttonWidth+offsetX;
      let y=Math.floor(i/4)*this.buttonHeight+offsetY;
      this.buttons[i].x=x;
      this.buttons[i].y=y;
    }
  }
  
  isKeyPressed(key) {
    return this.keysPressed[key];
  }
  
  onKeyDown(event) {
    let key = this.KEYMAP[event.keyCode];
    this.keysPressed[key] = true;
  
    // Make sure onNextKeyPress is initialized and the pressed key is actually mapped to a Chip-8 key
    if(this.onNextKeyPress !== null && key) {
      this.onNextKeyPress(parseInt(key));
      this.onNextKeyPress = null;
    }
  }
  
  onKeyUp(event) {
    let key = this.KEYMAP[event.which];
    this.keysPressed[key] = false;
  }

}

export default Keyboard;
