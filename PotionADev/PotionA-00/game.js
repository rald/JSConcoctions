var font;

var ACells;
var BCells;

var x,y;

var hold;

var btnClear;
var btnStartStop;
var btnDrawErase;

var running;
var drawing;

var animationInterval;

var fps;

var px=0,py=0;

var color=false;

function drawBox(x,y) {
	setFillStyle(cellColor);
	var i=x*size+gridOffsetX+2;
	var j=y*size+gridOffsetY+2;
	fillRect(i,j,size-4,size-4);
}

function drawGrid(x,y,width,height,size) {
	for(var j=0;j<height;j++) {
		for(var i=0;i<width;i++) {
			setStrokeStyle(gridColor);
			drawRect(x+i*size,y+j*size,size,size);
			if(ACells[j][i]) drawBox(i,j);
		}
	}
}

function setup() {

  fps=FPS;

  size=16;
  gap=size;

  width=Math.floor(SCREEN_WIDTH/size)-2;
  height=Math.floor(SCREEN_HEIGHT/size)-5;

  screenOffsetX=(canvas.width-SCREEN_WIDTH)/2;
  screenOffsetY=(canvas.height-SCREEN_HEIGHT)/2;

  gridOffsetX=(SCREEN_WIDTH-width*size)/2+screenOffsetX;
  gridOffsetY=screenOffsetY+gap;

  setFont(font);

  ACells=new Array(height);
  BCells=new Array(height);

  for(var j=0;j<height;j++) {
    ACells[j]=new Array(width);
    BCells[j]=new Array(width);
    for(var i=0;i<width;i++) {
      ACells[j][i]=false;
      BCells[j][i]=false;
    }
  }

  hold=false;
  x=0;
  y=0;

  running=false;
  drawing=true;

  btnClear=new Button(buttonFont,"CLEAR",
      screenOffsetX+gap,
      screenOffsetY+SCREEN_HEIGHT-32-gap,64,32);

  btnStartStop=new Button(buttonFont,"START",
      screenOffsetX+SCREEN_WIDTH-64-gap,
      screenOffsetY+SCREEN_HEIGHT-32-gap,64,32);

  btnDrawErase=new Button(buttonFont,"ERASE",
      screenOffsetX+(SCREEN_WIDTH-64)/2,
      screenOffsetY+SCREEN_HEIGHT-32-gap,64,32);

//  animationInterval=setInterval(draw,1000/fps);

  window.requestAnimationFrame(draw);

}



function draw() {

	aprilScreenOffsetX=(canvas.width-APRIL_SCREEN_SIZE.width)/2;
	aprilScreenOffsetY=(canvas.height-APRIL_SCREEN_SIZE.height)/2;

	screenOffsetX=(canvas.width-SCREEN_WIDTH)/2;
	screenOffsetY=(canvas.height-SCREEN_HEIGHT)/2;

	gridOffsetX=(SCREEN_WIDTH-width*size)/2+screenOffsetX;
	gridOffsetY=screenOffsetY+gap;

  btnClear.x=screenOffsetX+gap;
  btnClear.y=screenOffsetY+SCREEN_HEIGHT-32-gap;

  btnStartStop.x=screenOffsetX+SCREEN_WIDTH-64-gap;
  btnStartStop.y=screenOffsetY+SCREEN_HEIGHT-32-gap;

  btnDrawErase.x=screenOffsetX+(SCREEN_WIDTH-64)/2;
  btnDrawErase.y=screenOffsetY+SCREEN_HEIGHT-32-gap;

  x=Math.floor((mouse.x-gridOffsetX)/size);
  y=Math.floor((mouse.y-gridOffsetY)/size);

/*
	setFillStyle(backColor);
	fillRect(0,0,canvas.width,canvas.height);
*/

	//setFillStyle(screenColor);
	setFillStyle(screenColor);
	fillRect(screenOffsetX,screenOffsetY,SCREEN_WIDTH,SCREEN_HEIGHT);

	drawGrid(gridOffsetX,gridOffsetY,width,height,size);


/*
  for(var k=0;k<palette.length;k++) {
    var i=gap;
    var j=k*32+gap;
    setFillStyle(palette[k]);
    fillRect(i,j,32,32);
    setFillStyle("#ffffff");
    fillText(k,i+16,j+16);
  }
*/

  if(mouse.isDown) {
    if(x>=0 && x<width && y>=0 && y<height) {
      running=false;
      btnStartStop.text="START";
      if(!hold) {
        px=x; py=y;
        color=drawing;
        line(ACells,px,py,x,y,color);
        hold=true;
      } else {
        line(ACells,px,py,x,y,color);
        px=x; py=y;
      }
    }
  } else {
    hold=false;
  }

  btnClear.draw();
  btnStartStop.draw();
  btnDrawErase.draw();

  if(btnClear.handleEvents()) {
    running=false;
    btnStartStop.text="START";
    for(var j=0;j<height;j++) {
      for(var i=0;i<width;i++) {
        ACells[j][i]=false;
        BCells[j][i]=false;
      }
    }
  }

  if(btnStartStop.handleEvents()) {
    if(!running) {
      running=true;
      btnStartStop.text="STOP";
      fps=12;
    } else {
      running=false;
      btnStartStop.text="START"
      fps=FPS;
    }
//    clearInterval(animationInterval);
//    animationInterval=setInterval(draw,1000/fps);
  }

  if(btnDrawErase.handleEvents()) {
    if(!drawing) {
      drawing=true;
      btnDrawErase.text="ERASE";
    } else {
      drawing=false;
      btnDrawErase.text="DRAW";
    }
  }

  if(running) {
    for(var j=0;j<height;j++) {
      for(var i=0;i<width;i++) {
        var m=0;
        for(var k=-1;k<=1;k++) {
          for(var l=-1;l<=1;l++) {
            if(k!=0 || l!=0) {
              var n=i+l;
              var o=j+k;

              if(n<0) n=width-1;
              if(n>=width) n=0;
              if(o<0) o=height-1;
              if(o>=height) o=0;

              if(n>=0 && n<width && o>=0 && o<height) {
                if(ACells[o][n]) {
                  m++;
                }
              }
            }
          }
        }
        var isAlive=false;
        if(ACells[j][i] && m<2) isAlive=false;
        else if(ACells[j][i] && m>3) isAlive=false;
        else if(ACells[j][i] && (m==2 || m==3)) isAlive=true;
        else if(!ACells[j][i] && m==3) isAlive=true;
        BCells[j][i]=isAlive;
      }
    }

    for(var j=0;j<height;j++) {
      for(var i=0;i<width;i++) {
        ACells[j][i]=BCells[j][i];
        BCells[j][i]=false;
      }
    }
  }


/*
  for(var i=0;i<SCREEN_SIZES.length;i++) {
    offsetX=(canvas.width-SCREEN_SIZES[i].width)/2;
  	offsetY=(canvas.height-SCREEN_SIZES[i].height)/2

  	setFillStyle(gridColor);
  	drawRect(offsetX,offsetY,SCREEN_SIZES[i].width,SCREEN_SIZES[i].height);
  }
*/

  setTimeout(function() {
    window.requestAnimationFrame(draw);
  },1000/fps);

}

function line(cells, x0, y0, x1, y1, color) {
  var dx = Math.abs(x1-x0), sx = x0<x1 ? 1 : -1;
  var dy = Math.abs(y1-y0), sy = y0<y1 ? 1 : -1;
  var err = (dx>dy ? dx : -dy)/2, e2;
  for(;;) {
    cells[y0][x0]=color;
    if (x0==x1 && y0==y1) break;
    e2 = err;
    if (e2 >-dx) { err -= dy; x0 += sx; }
    if (e2 < dy) { err += dx; y0 += sy; }
  }
}


setup();
