// world.js

const worldCanvasSize = 1024;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const textOutput = document.getElementById('textOutput');


const debugCanvas = document.getElementById('debugCanvas');
const debugCtx = debugCanvas.getContext('2d');

function renderDebugView(selectedAgent, objects, agents) {
  // Clear the debug canvas
  debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);

  // Set debug canvas background to be semi-transparent
  debugCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
  debugCtx.fillRect(0, 0, debugCanvas.width, debugCanvas.height);

  // Draw the yellow FOV arc (Fixed to be upwards)
  debugCtx.beginPath();
  debugCtx.moveTo(200, 200);
  debugCtx.arc(200, 200, 200,  (Math.PI / 180) * (-90-Agent.fieldOfView/2), (Math.PI / 180) * (-90+Agent.fieldOfView/2));

  debugCtx.lineTo(200, 200);
  debugCtx.closePath();
  debugCtx.strokeStyle = "yellow";
  debugCtx.stroke();

  // Translating and rotating coordinates for objects and agents
  objects.concat(agents).forEach(entity => {
    if (selectedAgent.isWithinDistance(entity, Agent.viewDistance) && selectedAgent.isWithinFOV(entity, Agent.fieldOfView)) {
      const [dx, dy] = selectedAgent.getRelativeCoordinates(entity);

      // Scale down coordinates for debug view
      const x = dx + 200;
      const y = 200 - dy / 1; 

      // Draw rectangles for simplicity
      debugCtx.fillStyle = entity.color;
      debugCtx.fillRect(x - 2.5, y - 2.5, 5, 5);
    }
  });
}


canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let found = false;
  
  agents.forEach(agent => {
    if (Math.abs(agent.x - x) <= 10 && Math.abs(agent.y - y) <= 10) {
      agent.selected = true;
      found = true;
      const descriptions = agent.senseWorld(objects, agents);
      textOutput.innerHTML = descriptions.join('<br>');
    } else {
      agent.selected = false;
    }
  });

  if (!found) {
    textOutput.innerHTML = "No agent selected.";
  }
});

// Create some agents and objects
const agents = [
  new Agent(100, 100, [[0, 0], [10, 0], [10, 10], [0, 10]], 0, "red"),
  new Agent(200, 200, [[0, 0], [10, 0], [10, 10], [0, 10]], 0, "blue")
];

const objects = [
  new WorldObject(300, 300, [[0, 0], [20, 0], [20, 20], [0, 20]], "green")
];

// Initialize the game
function init() {
  // ...
}

// Update the game state
function update() {
  // Rotate all agents and objects by 1 degree as an example
  agents.forEach(agent => {
    if (agent.selected) { 
      agent.rotate(1);
    }
  });
  //objects.forEach(object => object.rotate(1));

  agents.forEach(agent => agent.update());
  objects.forEach(object => object.update());
}

// Render the game state to the canvas
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  let selectedAgent = null;
  agents.forEach(agent => { 
    agent.render(ctx)
    if (agent.selected) {
      selectedAgent = agent;
      // Draw a white circle around the agent
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, 15, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.stroke();

      // Draw the yellow FOV arc
      const startAngle = agent.direction - 60;
      const endAngle = agent.direction + 60;
      ctx.beginPath();
      ctx.moveTo(agent.x, agent.y);
      ctx.arc(agent.x, agent.y, 200, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle);
      ctx.lineTo(agent.x, agent.y);
      ctx.closePath();
      ctx.strokeStyle = "yellow";
      ctx.stroke();
    }
  });

  if (selectedAgent) {
    renderDebugView(selectedAgent, objects, agents);
  }

  objects.forEach(object => object.render(ctx));
}

// Game loop
function gameLoop() {
  update();
  render();
  setTimeout(gameLoop, 50);
}

function setLayout() {
  const container = document.getElementById('container');
  if (window.innerWidth > window.innerHeight) {
    container.style.flexDirection = 'row';
  } else {
    container.style.flexDirection = 'column';
  }
}

window.addEventListener('resize', setLayout);
setLayout();


init();
gameLoop();
