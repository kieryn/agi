// WorldObject.js

class WorldObject extends Renderable {
  constructor(x, y, path, color) {
    super(x, y, path, color);
  }

  rotate(degrees) {
    this.rotatePath(degrees);
  }

  update() {
    // Update object state, if necessary
  }

  getBoundingBox() {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    this.path.forEach(([x, y]) => {
      minX = Math.min(minX, x + this.x);
      minY = Math.min(minY, y + this.y);
      maxX = Math.max(maxX, x + this.x);
      maxY = Math.max(maxY, y + this.y);
    });
    return { width: maxX - minX, height: maxY - minY };
  }
}
