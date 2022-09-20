export class GGraphics {

  constructor() {
    this.pointSize=1;
  }

  drawPoint(ctx,x,y,color) {
    ctx.fillStyle=color;
    ctx.fillRect(x*this.pointSize,y*this.pointSize,this.pointSize,this.pointSize);
  }

  drawVLine(ctx,x0,y0,y1,color) {
    if(y0>y1) { let t=y0; y0=y1; y1=t; }
    for(let j=y0;j<y1;j++) {
      this.drawPoint(ctx,x0,j,color);
    }
  }

  drawHLine(ctx,x0,x1,y0,color) {
    if(x0>x1) { let t=x0; x0=x1; x1=t; }
    for(let i=x0;i<x1;i++) {
      this.drawPoint(ctx,i,y0,color);
    }
  }

  drawLine(ctx,x0,y0,x1,y1,color) {
    let dx=Math.abs(x1-x0), sx=x0<x1?1:-1;
    let dy=Math.abs(y1-y0), sy=y0<y1?1:-1;
    let e1=(dx>dy?dx:-dy)/2, e2;
    for(;;) {
      this.drawPoint(ctx,x0,y0,color);
      if(x0==x1 && y0==y1) break;
      e2=e1;
      if(e2>-dx) {e1-=dy;x0+=sx;}
      if(e2<dy) {e1+=dx;y0+=sy;}
    }
  }
  
  drawRect(ctx,x0,y0,x1,y1,color) {
    this.drawHLine(ctx,x0,x1,y0,color);
    this.drawHLine(ctx,x0,x1,y1,color);
    this.drawVLine(ctx,x0,y0,y1,color);
    this.drawVLine(ctx,x1,y0,y1,color);
  }


  fillRect(ctx,x0,y0,x1,y1,color) {
    if(x0>x1) { let t=x0; x0=x1; x1=t; }
    if(y0>y1) { let t=y0; y0=y1; y1=t; }
    for(var j=y0;j<y1;j++) {
      for(var i=x0;i<x1;i++) {
        this.drawPoint(ctx,i,j,color);
      }
    }
  }

  drawCircle(ctx,x0,y0,radius,color) {
    let f = 1 - radius;
    let ddF_x = 0;
    let ddF_y = -2 * radius;
    let x = 0;
    let y = radius;
 
    this.drawPoint(ctx, x0, y0 + radius, color);
    this.drawPoint(ctx, x0, y0 - radius, color);
    this.drawPoint(ctx, x0 + radius, y0, color);
    this.drawPoint(ctx, x0 - radius, y0, color);
 
    while(x < y) 
    {
        if(f >= 0) 
        {
            y--;
            ddF_y += 2;
            f += ddF_y;
        }
        x++;
        ddF_x += 2;
        f += ddF_x + 1;    
        this.drawPoint(ctx, x0 + x, y0 + y, color);
        this.drawPoint(ctx, x0 - x, y0 + y, color);
        this.drawPoint(ctx, x0 + x, y0 - y, color);
        this.drawPoint(ctx, x0 - x, y0 - y, color);
        this.drawPoint(ctx, x0 + y, y0 + x, color);
        this.drawPoint(ctx, x0 - y, y0 + x, color);
        this.drawPoint(ctx, x0 + y, y0 - x, color);
        this.drawPoint(ctx, x0 - y, y0 - x, color);
    }
  }
  
  drawPoly(ctx,points,color) {
    ctx.beginPath();
    ctx.moveTo(points[0].x,points[0].y);
    for(let i=1;i<points.length;i++) {
      ctx.lineTo(points[i],points[i]);
    }
    ctx.closePath();
  }
  
}
