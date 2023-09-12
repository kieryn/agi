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

  getRelativeCoordinates(entity) {
    const dx = entity.x - this.x;
    const dy = entity.y - this.y;
  
    // Convert direction from degrees to radians
    const directionInRadians = -this.direction * (Math.PI / 180);
  
    // Rotate coordinates to match agent's direction
    const dx_rotated = Math.cos(-directionInRadians) * dx - Math.sin(-directionInRadians) * dy;
    const dy_rotated = Math.sin(-directionInRadians) * dx + Math.cos(-directionInRadians) * dy;
  
    return [dx_rotated, dy_rotated];
  }

  isWithinDistance(other, distance) {
    const [dx, dy] = this.getRelativeCoordinates(other);
    return Math.sqrt(dx * dx + dy * dy) <= distance;
  }


  isWithinFOV(entity, fovDegrees) {
    const [dx_rotated, dy_rotated] = this.getRelativeCoordinates(entity);
    
    // Return false if the object is right on top of the agent
    if (dx_rotated === 0 && dy_rotated === 0) {
      return false;
    }
    
    // Calculate the angle in radians
    const angle = Math.atan2(dy_rotated, dx_rotated) - Math.PI / 2;
    
    // Convert FOV to radians
    const fovRadians = fovDegrees * (Math.PI / 180);
    
    // Check if the angle is within the FOV
    return angle >= -fovRadians / 2 && angle <= fovRadians / 2;
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
      if (this.isWithinDistance(entity, Agent.viewDistance) && this.isWithinFOV(entity, Agent.fieldOfView)) {
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
    if (boundaryDistance < Agent.viewDistance) {
      const boundaryDescription = `The boundary of the world is ${boundaryDistance.toFixed(2)} units away.`;
      descriptions.push(boundaryDescription);
    }
  
    return descriptions;
  }
}

Agent.viewDistance = 200;
Agent.fieldOfView = 120;
