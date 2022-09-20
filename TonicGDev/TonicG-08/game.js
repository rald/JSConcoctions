let view=document.getElementById("view");

let trie;
let boardSize;
let board;
let graph;
let choices;
let words;
let html;



function rnd(x) {
	return Math.floor(Math.random()*x);
}



function shuffle(array) {
	for(let i=array.length-1;i>0;i--) {
		let j=rnd(i+1);
		let tmp=array[i];
		array[i]=array[j]
		array[j]=tmp;		
	}
}



function dfs(x,y,depth,trie) {

	if(x<0 || x>=boardSize || y<0 || y>=boardSize) return;

  if(graph[y][x]) return;
  
  let k=board[y][x].toUpperCase().charCodeAt(0)-65;
  
	let trieNode=trie.next[k];

	if(trieNode==null) return;

	choices[depth++]=board[y][x];

	if(trieNode.mark) {
    let l=""; for(let i=0;i<depth;i++) l+=choices[i];
	  if(l.length>=3 && words.indexOf(l)==-1) words.push(l);
	}

	graph[y][x]=true;
	
	for(let j=-1;j<=1;j++) {
		for(let i=-1;i<=1;i++) {
			if(i || j) dfs(x+i,y+j,depth,trieNode);
		}
	}

	graph[y][x]=false;
}



function load() {
  trie=new Trie("");
	for(let i=0;i<dict.length;i++) {
		Trie.add(trie,dict[i].toUpperCase());	
	}
}



function init() {

	boardSize=4;

  load();

	shuffle(dice);
	board=new Array(boardSize);
	let k=0;
	for(let j=0;j<boardSize;j++) {
		board[j]=new Array(boardSize);
		for(let i=0;i<boardSize;i++) {
			board[j][i]=dice[k][rnd(dice[j].length)].toUpperCase();
			k++;
		}
	}

	graph=new Array(boardSize);
	for(let j=0;j<boardSize;j++) {
		graph[j]=new Array(boardSize);
		for(let i=0;i<boardSize;i++) {
			graph[j][i]=false;
		}
	}

	choices=new Array(boardSize*boardSize);
	words=[];	
  for(let j=0;j<boardSize;j++) {
		for(let i=0;i<boardSize;i++) {
			dfs(i,j,0,trie);
		}
	}

}


function walk(trie,depth) {
  if(trie.mark) {
    let l=""; for(let i=0;i<depth;i++) l+=choices[i];
    html+=l+"<br>";
  }
  for(let i=0;i<26;i++) {
    if(trie.next[i]!=null) {
      choices[depth]=String.fromCharCode(i+65);
      walk(trie.next[i],depth+1);
    }
  }
}


function main() {

	html="";

  init();

	for(let j=0;j<boardSize;j++) {
		for(let i=0;i<boardSize;i++) {
			html+=board[j][i];
		}
		html+="<br>";
	}

	html+="<br>";

	
	for(let i=0;i<words.length;i++) {
		if(i!=0) html+=", "
	  html+=words[i];
	}
	
	view.innerHTML=html;	
}



main();
