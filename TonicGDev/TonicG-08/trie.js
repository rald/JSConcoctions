class Trie {

	constructor(letter) {
		this.letter=letter;
		this.mark=false;
		this.next=new Array(26);
		for(let i=0;i<this.next.length;i++) {
			this.next[i]=null;
		}
	}	

	static add(root,word) {
		let curr=root;
		for(let i=0;i<word.length;i++) {
			let j=word[i].toUpperCase();
			let k=j.charCodeAt(0)-65;
			if(curr.next[k]==null) {
				curr.next[k]=new Trie(j);
			}
			curr=curr.next[k];
		}
		curr.mark=true;
	}

}
