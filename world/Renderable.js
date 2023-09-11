// Renderable.js

class Renderable {
  constructor(x, y, path, color) {
    this.x = x;
    this.y = y;
    this.path = path;
    this.color = color;
  }

  rotatePath(degrees) {
    const radians = degrees * (Math.PI / 180);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    
    for (let i = 0; i < this.path.length; i++) {
      const [px, py] = this.path[i];
      this.path[i][0] = cos * (px) - sin * (py);
      this.path[i][1] = sin * (px) + cos * (py);
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.path[0][0] + this.x, this.path[0][1] + this.y);
    
    for (let i = 1; i < this.path.length; i++) {
      ctx.lineTo(this.path[i][0] + this.x, this.path[i][1] + this.y);
    }
    
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }
}
