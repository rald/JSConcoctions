var MY_SCREEN_SIZE = { width:768, height:856 };
var APRIL_SCREEN_SIZE = { width:360, height:676 };
var JINKI_SCREEN_SIZE = { width:375, height:535 };

var SCREEN_SIZES=[
  MY_SCREEN_SIZE,
  APRIL_SCREEN_SIZE,
  JINKI_SCREEN_SIZE
];

var lowestWidth=SCREEN_SIZES[0].width;
var lowestHeight=SCREEN_SIZES[0].height;
for(var i=1;i<SCREEN_SIZES.length;i++) {
  if(lowestWidth>SCREEN_SIZES[i].width) lowestWidth=SCREEN_SIZES[i].width;
  if(lowestHeight>SCREEN_SIZES[i].height) lowestHeight=SCREEN_SIZES[i].height;
}

var SCREEN_WIDTH=lowestWidth;
var SCREEN_HEIGHT=lowestHeight;

var FPS=12;

var backColor=palette[0];
var screenColor=palette[1]+"80";
var gridColor=palette[12];
var cellColor=palette[12];

var buttonFont="16px sans-serif";

var buttonDownColor=palette[10];
var buttonDownBorderColor=palette[9];
var buttonDownTextColor=palette[9];

var buttonUpColor=palette[9];
var buttonUpBorderColor=palette[10];
var buttonUpTextColor=palette[10];
