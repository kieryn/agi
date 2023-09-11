# A little tiny AGI sandbox experiment

## 2D World Simulation with Agents
Initial setup: https://chat.openai.com/share/ee423a94-edcf-49f2-b125-fa448cd2f6de

This project simulates a 2D environment where objects and agents (playable or NPC) exist. It uses HTML5 Canvas for rendering and is written in JavaScript.

## Features

- **Canvas Rendering**: Renders a 2D world on a 1024x1024 canvas, scaling to fit the screen.
- **Agent Interaction**: Agents can be clicked to become the 'selected' agent. A white circle and yellow field-of-view arc indicate the selected agent.
- **World Objects and Agents**: Objects and agents can have customizable shapes, sizes, and colors.
- **Field of View**: Each agent has a 120-degree FOV and can only see objects and agents within 200 units.
- **Textual Description**: Each agent generates a detailed text description of its environment, which can be displayed for testing.
- **Debugging Canvas**: A separate 200x200 canvas provides a debug view from the selected agent's perspective.

## Components

- `index.html`: The main HTML file containing canvas elements and script references.
- `styles.css`: Contains all the styling information, including canvas positioning and debug canvas.
- `world.js`: The main script that sets up the game loop and rendering logic.
- `Agent.js`: Defines the `Agent` class with methods for sensing the world and managing states.
- `WorldObject.js`: Defines the `WorldObject` class for creating customizable shapes.

## Functionality Awaiting Implementation

- More detailed text descriptions for the language AI.
