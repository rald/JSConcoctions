import * as GButtonModule from "./GButton.js";

export class GKeyboard {
  
  static KEYMODE_SHW=1;
  static KEYMODE_ALP=1;
  static KEYMODE_SHF=2;
  static KEYMODE_SYM=3;
  static KEYMODE_NUM=4;
  static KEYMODE_FUN=5;
  static KEYMODE_ARW=6;
  static KEYMODE_HID=0;
  
  constructor(gConfig) {
    this.x=0;
    this.y=0;
    this.keyMode=GKeyboard.KEYMODE_ALP;
    this.keys=gConfig.keys;
    this.btnKeys=this.createButtons(gConfig);
  }
  
  createButtons(gConfig) {
    let x=0;
    let y=0;
    let size=32;
    let gap=4;
    
    let btnKeys=new Array(this.keys.length);
    for(let k=0;k<this.keys.length;k++) {
      btnKeys[k]=new Array(this.keys[k].length);
      for(let j=0;j<this.keys[k].length;j++) {
        btnKeys[k][j]=new Array(this.keys[k][j].length);
        let sum=0;
        for(let i=0;i<this.keys[k][j].length;i++) {
          sum+=(this.keys[k][j][i].length>1?this.keys[k][j][i].length*0.50:1)*size+gap;
        }
        x=(gConfig.screenWidth-sum)/2;
        for(let i=0;i<this.keys[k][j].length;i++) {
          var width=(this.keys[k][j][i].length>1?this.keys[k][j][i].length*0.50:1)*size;
          let height=size;
          y=(gConfig.screenHeight-(this.keys[k].length*(height+gap)))+(j*(height+gap));
          if(this.keys[k][j][i]=="SHW") {
            btnKeys[k][j][i]=new GButtonModule.GButton(gConfig,this.keys[k][j][i],gConfig.screenOffsetX+gConfig.screenWidth-width-gap,gConfig.screenOffsetY+gConfig.screenHeight-height-gap,width,height);
          } else if(this.keys[k][j][i]=="") {
            
          } else {
            btnKeys[k][j][i]=new GButtonModule.GButton(gConfig,this.keys[k][j][i],x+gConfig.screenOffsetX,y+gConfig.screenOffsetY,width,height);
          }
          x+=width+gap;
        }
      }
    }
    return btnKeys;
  }
  
  draw(ctx) {
    for(let j=0;j<this.btnKeys[this.keyMode].length;j++) {
      for(let i=0;i<this.btnKeys[this.keyMode][j].length;i++) {
        if(this.keys[this.keyMode][j][i]!=="") {
          this.btnKeys[this.keyMode][j][i].draw(ctx);
        }
      }
    }
  }
  
  handleEvents(gInput) {
    for(let j=0;j<this.btnKeys[this.keyMode].length;j++) {
      for(let i=0;i<this.btnKeys[this.keyMode][j].length;i++) {
        if(this.keys[this.keyMode][j][i]!=="") {
  
          let result=this.btnKeys[this.keyMode][j][i].handleEvents(gInput);
          if(result!=null) {
            switch(result.text) {
              case "SHW": 
                this.keyMode=GKeyboard.KEYMODE_SHW;
                this.upAllKeys();
                break;
              case "HID": 
                this.keyMode=GKeyboard.KEYMODE_HID; 
                this.upAllKeys();
                break;
              case "ALP": 
                this.keyMode=GKeyboard.KEYMODE_ALP; 
                this.upAllKeys();
                break;
              case "SHF": 
                this.keyMode=this.keyMode==GKeyboard.KEYMODE_SHF?GKeyboard.KEYMODE_ALP:GKeyboard.KEYMODE_SHF; 
                break;
              case "SYM": 
                this.keyMode=GKeyboard.KEYMODE_SYM; 
                this.upAllKeys();
                break;
              case "NUM": 
                this.keyMode=GKeyboard.KEYMODE_NUM; 
                this.upAllKeys();
                break;
              case "FUN": 
                this.keyMode=GKeyboard.KEYMODE_FUN; 
                this.upAllKeys();
                break;
              case "ARW": 
                this.keyMode=GKeyboard.KEYMODE_ARW; 
                this.upAllKeys();
                break;              
              default: break;
            }
            return result;
          }
        }
      }
    }
  }

  upAllKeys() {
    for(let k=0;k<this.btnKeys.length;k++) {
      for(let j=0;j<this.btnKeys[k].length;j++) {
        for(let i=0;i<this.btnKeys[k][j].length;i++) {
          if(this.keys[k][j][i]!=="") {
            this.btnKeys[k][j][i].state=GButtonModule.GButton.UP;
          }
        }
      }
    }
  }

}

