let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");

let boardSize;
let board;
let fontSize;



function rnd(x) {
	return Math.floor(Math.random()*x);
}



function resize() {
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
}



function shuffle(array) {
	for(let i=array.length-1;i>0;i--) {
		let j=rnd(i+1);
		let tmp=array[i];
		array[i]=array[j]
		array[j]=tmp;		
	}
}



function draw() {

	Graphics.fillRect(ctx,0,0,canvas.width,canvas.height,palette[0]);

	for(let j=0;j<boardSize;j++) {
		for(let i=0;i<boardSize;i++) {


			let boxWidth=Math.floor(canvas.width/boardSize);
			let boxHeight=Math.floor(canvas.height/boardSize);

			let x=i*boxWidth+(boxWidth-font.width*fontSize)/2;
			let y=j*boxHeight+(boxHeight-font.height*fontSize)/2;

//      Graphics.drawRect(ctx,i*boxWidth,j*boxHeight,boxWidth,boxHeight,palette[6]);

			Graphics.drawText(ctx,board[j][i],x,y,fontSize,font,["transparent",palette[6]]);
		}
	}

}



function init() {
	boardSize=4;
  fontSize=4;

	shuffle(dice);
	
	board=new Array(boardSize);
	let k=0;
	for(let j=0;j<boardSize;j++) {
		board[j]=new Array(boardSize);
		for(let i=0;i<boardSize;i++) {
			board[j][i]=dice[k][rnd(dice[j].length)];
			k++;
		}
	}
	
}



function main() {
	resize();
	window.onresize=resize;
	
	init();

	setInterval(draw,1000/60);
}



main();
