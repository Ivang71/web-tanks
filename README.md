# 2D Tank Game

A simple multiplayer top-down tank game with a Node.js/Socket.IO server and a TypeScript/Canvas client.

## Features

- Real-time multiplayer gameplay
- 2D top-down tank movement and combat
- Client-side rendering with Canvas
- Server-side game logic and state management

## Project Structure

- `server/`: Server-side code
  - Express and Socket.IO for real-time communication
  - Game logic, physics, and state management
- `client/`: Client-side code
  - TypeScript and Canvas for rendering
  - Keyboard controls and game interface

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Game

1. Start the server:

```bash
cd server
npm run dev
```

2. In another terminal, start the client:

```bash
cd client
npm start
```

3. Open your browser to `http://localhost:8080`

## How to Play

- Use WASD or arrow keys to move
- A/D or Left/Right arrow keys to rotate
- Spacebar to shoot
- Try to destroy other tanks while avoiding getting hit

## Development

- Server: `npm run dev` in the server directory
- Client: `npm start` in the client directory
- Build production: `npm run build` in respective directories