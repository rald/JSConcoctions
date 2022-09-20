export class GSurface {
  constructor(width,height) {
    this.width=width;
    this.height=height;
    this.paletteIndexes=new Array(height);
    for(let j=0;j<height;j++) {
      this.paletteIndexes[j]=new Array(width);
      for(let i=0;i<width;i++) {
        this.paletteIndexes[j][i]=-1;
      }
    }
  }
}
