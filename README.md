# A little tiny AGI sandbox experiment

## 2D Simulation Environment for Language AI
Initial setup: https://chat.openai.com/share/ee423a94-edcf-49f2-b125-fa448cd2f6de

This project is a browser-based 2D simulation environment designed to interact with a language AI model. Within the environment, various objects and agents co-exist and are rendered on a canvas. The primary aim is to allow the language AI to control agents through text commands while generating detailed descriptions of the agent's perspective and surroundings.

## Features

- **Canvas Rendering**: Utilizes HTML5 canvas for rendering objects, agents, and their interactions.
- **Object and Agent Classes**: Uses JavaScript classes to define generic objects and special agents, all of which can be rendered, positioned, and manipulated within the 2D world.
- **Customizable Traits**: Objects and agents can have various shapes, sizes, and colors.
- **Agent Perspective**: Special methods allow for the calculation of an agent's perspective, taking into account their direction, field of view, and distance from other entities.
- **Language AI Integration**: Designed to be controlled via a language AI model, which receives text-based descriptions of an agent's perspective and environment.
- **Debugging View**: Includes a secondary canvas that shows the world from a selected agent's perspective for debugging purposes.

## Use Cases

- **Simulation**: Simulate complex scenarios that agents controlled by language AI can navigate.
- **Training**: Serve as a platform to train language models in spatial understanding and command-based tasks.
- **Gaming**: Can be extended to implement simple 2D games where the player interacts through natural language.
- **AI Research**: Can be a tool for exploring the capabilities and limitations of AI in understanding and interacting with spatial environments.

