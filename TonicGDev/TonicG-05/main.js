let fps = 24;
let game=new Game();

game.resize();

window.onresize=()=>game.resize();

let interval=setInterval(()=>game.draw(),1000/fps);
