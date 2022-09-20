var fps;
var font;
var hold;

var screenOffsetX;
var screenOffsetY;

var lowestWidth;
var lowestHeight;

var SCREEN_WIDTH;
var SCREEN_HEIGHT;

function setup() {

  SCREEN_SIZES.push({"name":"you","width":canvas.width,"height":canvas.height});

  lowestWidth=SCREEN_SIZES[0].width;
  lowestHeight=SCREEN_SIZES[0].height;
  for(var i=1;i<SCREEN_SIZES.length;i++) {
    if(lowestWidth>SCREEN_SIZES[i].width) lowestWidth=SCREEN_SIZES[i].width;
    if(lowestHeight>SCREEN_SIZES[i].height) lowestHeight=SCREEN_SIZES[i].height;
  }

  SCREEN_WIDTH=lowestWidth;
  SCREEN_HEIGHT=lowestHeight;

  SCREEN_SIZES.push({"name":"smallest","width":lowestWidth,"height":lowestHeight});


  fps=FPS;

  setFont(font);

  hold=false;

  window.requestAnimationFrame(draw);

}



function draw() {

	screenOffsetX=(canvas.width-SCREEN_WIDTH)/2;
	screenOffsetY=(canvas.height-SCREEN_HEIGHT)/2;

	setFillStyle(backColor);
	fillRect(0,0,canvas.width,canvas.height);

	setFillStyle(screenColor);
	fillRect(screenOffsetX,screenOffsetY,SCREEN_WIDTH,SCREEN_HEIGHT);

  var gap=8;
  for(var i=0;i<SCREEN_SIZES.length;i++) {
    var width=SCREEN_SIZES[i].width;
    var height=SCREEN_SIZES[i].height;
    offsetX=(canvas.width-width)/2;
  	offsetY=(canvas.height-height)/2

  	setStrokeStyle(palette[12]+"40");
  	drawRect(offsetX,offsetY,width,height);
    setTextAlign("left");
    setTextBaseline("top");
  	setFillStyle(palette[12]+"40");
    fillText(SCREEN_SIZES[i].name,offsetX+gap,offsetY+gap+i*16);

    setTextAlign("right");
    setTextBaseline("top");
    setFillStyle(palette[12]);
    fillText(width+"x"+height,width+offsetX-gap,offsetY+gap+i*16);
  }

  setTimeout(function() {
    window.requestAnimationFrame(draw);
  },1000/fps);

}

setup();
