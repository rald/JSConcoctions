var mouse={x:0,y:0,isDown:false};

function getMousePos(canvas, mouseEvent) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}

function mouseDown(event) {
	event.preventDefault();
  var mousePos=getMousePos(canvas,event);
  mouse.x=mousePos.x;
  mouse.y=mousePos.y;
	mouse.isDown=true;
}

function mouseUp(event) {
	event.preventDefault();
  var mousePos=getMousePos(canvas,event);
  mouse.x=mousePos.x;
  mouse.y=mousePos.y;
	mouse.isDown=false;
}

function mouseMove(event) {
	event.preventDefault();
  var mousePos=getMousePos(canvas,event);
  mouse.x=mousePos.x;
  mouse.y=mousePos.y;
}

canvas.addEventListener("mousedown", mouseDown, {passive:false});
canvas.addEventListener("mouseup", mouseUp, {passive:false});
canvas.addEventListener("mousemove", mouseMove, {passive:false});
