export class GConfig {
    
  constructor() {

    this.screenResolutions = [
      { name: "gerald", width: 768, height: 856 },
      { name: "april",  width: 360, height: 676 },
      { name: "jinki",  width: 375, height: 535 }
    ];

    this.keys=[
      [
        ["SHW"]
      ],
      
      [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"],
        ["CTL","SPC","ENT","BSP","ALT"],
        ["SHF","SYM","NUM","FUN","ARW","SHF","HID"]
      ],

      [
        ["q","w","e","r","t","y","u","i","o","p"],
        ["a","s","d","f","g","h","j","k","l"],
        ["z","x","c","v","b","n","m"],
        ["CTL","SPC","ENT","BSP","ALT"],
        ["SHF","SYM","NUM","FUN","ARW","SHF","HID"]
      ],
      
      [
        ["(",")","[","]"],
        ["!","'","#","+","$","%","&","/","@"],
        ["{","}","=","*","?","\\","-","_","|"],
        ["~","<",">",",",";",".",":","`","\""],
        ["ALP","NUM","FUN","BSP","ARW","HID"]
      ],

      [
        ["1","2","3"],
        ["4","5","6"],
        ["7","8","9"],
        [".","0","-"],
        ["+","*","/"],
        ["ALP","SYM","FUN","BSP","ARW","HID"]
      ],
      
      [
        ["F1","F2","F3","F4"],
        ["F5","F6","F7","F8"],
        ["F9","F10","F11","F12"],
        ["ALP","NUM","SYM","ARW","HID"]
      ],
      
      [
        ["",  "UP", "", "", "", "",""],
        ["LF","DN","RT","","A","","B"],
        [],
        ["ALP","NUM","SYM","FUN","HID"]
      ]
      
    ];

    this.palette = [
      "#1a1c2c",
      "#5d275d",
      "#b13e53",
      "#ef7d57",
      "#ffcd75",
      "#a7f070",
      "#38b764",
      "#257179",
      "#29366f",
      "#3b5dc9",
      "#41a6f6",
      "#73eff7",
      "#f4f4f4",
      "#94b0c2",
      "#566c86",
      "#333c57"
    ];

    this.FPS=60;

    this.font="24px monospace";
    
    this.gap=4;
    
    this.ALPHA0="20";
    this.ALPHA1="40";
    this.ALPHA2="60";
    this.ALPHA3="80";
    
    
    this.termPointSize=4;
    
    this.backgroundColorPaletteIndex=0;
    this.screenBackColorPaletteIndex=1;
    this.borderColorPaletteIndex=12;
    
    this.buttonUpBackColorPaletteIndex=9;
    this.buttonUpTextColorPaletteIndex=10;
    this.buttonUpBorderColorPaletteIndex=10;
 
    this.buttonDownBackColorPaletteIndex=10;
    this.buttonDownTextColorPaletteIndex=9;
    this.buttonDownBorderColorPaletteIndex=9;

    this.termForeColorPaletteIndex=2;
    this.termBackColorPaletteIndex=1;
    this.termBorderColorPaletteIndex=12;
    this.termCursorColorPaletteIndex=12;
    
    
    this.messageTextColorPaletteIndex=12;
    
    this.canvas=document.getElementById("canvas");

    this.canvas.width=window.innerWidth;
    this.canvas.height=window.innerHeight;
    
    this.ctx=this.canvas.getContext("2d");
  
    this.screenResolutions.push({ name:"you", width: this.canvas.width, height: this.canvas.height });
  
    this.smallestScreenResolution=this.screenResolutions[0];
    this.smallestScreenResolution.name="smallest";
  
    for(var i=0;i<this.screenResolutions.length;i++) {
      if(this.smallestScreenResolution.width>this.screenResolutions[i].width) this.smallestScreenResolution.width=this.screenResolutions[i].width;
      if(this.smallestScreenResolution.height>this.screenResolutions[i].height) this.smallestScreenResolution.height=this.screenResolutions[i].height;
    }
  
    this.screenWidth=this.smallestScreenResolution.width;
    this.screenHeight=this.smallestScreenResolution.height;
  
    this.screenOffsetX=Math.floor((this.canvas.width-this.screenWidth)/2);
    this.screenOffsetY=Math.floor((this.canvas.height-this.screenHeight)/2);
  }

}
