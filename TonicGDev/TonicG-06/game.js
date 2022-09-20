let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");



function rnd(x) {
	return Math.floor(Math.random()*x);
}


function resize() {
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

	Graphics.fillRect(ctx,0,0,canvas.width,canvas.height,palette[0]);
}



function draw() {
	let size=4;
	let maxX=Math.floor(canvas.width/(font.width*size));
	let maxY=Math.floor(canvas.height/(font.height*size));
	let x=rnd(maxX)*font.height*size;
	let y=rnd(maxY)*font.width*size;
	let ch="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	let fg,bg;
	do {
		fg=rnd(palette.length);
		bg=rnd(palette.length);
	} while(fg==bg);

	Graphics.drawBitmap(ctx,ch[rnd(ch.length)].charCodeAt(0),x,y,size,font,[palette[bg],palette[fg]]);
}



function main() {
	resize();
	window.onresize=resize;

	setInterval(draw,10);
}



main();
