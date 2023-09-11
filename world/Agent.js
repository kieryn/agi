// Agent.js

class Agent extends WorldObject {
  constructor(x, y, path, direction, color) {
    super(x, y, path, color);
    this.direction = direction;
    this.selected = false;
  }

  rotate(degrees) {
    super.rotate(degrees);
    this.direction += degrees;

    // Keep direction within [0, 360)
    this.direction = (this.direction + 360) % 360;
  }

  update() {
    // Update agent state
    // Agents can have more sophisticated behaviors
  }

  getRelativeCoordinates(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return [dx, dy];
  }

  isWithinDistance(other, distance) {
    const [dx, dy] = this.getRelativeCoordinates(other);
    return Math.sqrt(dx * dx + dy * dy) <= distance;
  }

  isWithinFOV(other, fov) {
    const [dx, dy] = this.getRelativeCoordinates(other);
    const angle = (Math.atan2(dy, dx) - this.direction * (Math.PI / 180)) % (2 * Math.PI);
    const halfFOV = fov * 0.5 * (Math.PI / 180);
    return angle >= -halfFOV && angle <= halfFOV;
  }

  getBoundaryDistance() {
    // Assuming the world is square and centered at (0, 0)
    // Replace worldHalfSize with half the size of your world
    const worldHalfSize = 512;  
    return worldHalfSize - Math.max(Math.abs(this.x), Math.abs(this.y));
  }

  senseWorld(objects, agents) {
    const descriptions = [];
  
    objects.concat(agents).forEach(entity => {
      if (this.isWithinDistance(entity, 200) && this.isWithinFOV(entity, 120)) {
        const [dx, dy] = this.getRelativeCoordinates(entity);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const boundingBox = entity.getBoundingBox();
        const shapeDescription = `shape info`; // Replace with actual shape description logic
        const direction = Math.atan2(dy, dx) * (180 / Math.PI);
        const relativeDirection = `to the ${direction < 0 ? 'left' : 'right'}`;
        const color = entity.color;
        const size = `with a width of ${boundingBox.width.toFixed(2)} units and a height of ${boundingBox.height.toFixed(2)} units`;
  
        const description = `There is a ${color} ${shapeDescription} ${size} at a distance of ${distance.toFixed(2)} units ${relativeDirection}.`;
        descriptions.push(description);
      }
    });
  
    const boundaryDistance = this.getBoundaryDistance();
    if (boundaryDistance < 200) {
      const boundaryDescription = `The boundary of the world is ${boundaryDistance.toFixed(2)} units away.`;
      descriptions.push(boundaryDescription);
    }
  
    return descriptions;
  }
}

