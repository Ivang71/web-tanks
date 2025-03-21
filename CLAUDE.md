# 2D Tank Game - Development Guidelines

## Build/Dev Commands
- Server: `cd server && yarn dev` - Start server in development mode
- Client: `cd client && yarn start` - Start client with webpack-dev-server
- Build server: `cd server && yarn build` - Compile TypeScript to JavaScript
- Build client: `cd client && yarn build` - Bundle client code with webpack

## Project Structure
- `client/` - TypeScript/Canvas frontend
- `server/` - Node.js/Socket.IO backend with game logic

## Code Style Guidelines
- **Types**: Use TypeScript interfaces for shared data structures, strict type checking
- **Imports**: Group imports by external libraries first, then local modules
- **Naming**: camelCase for variables/functions, PascalCase for interfaces/types
- **Error Handling**: Log errors on server, handle connection issues on client
- **States**: Keep client and server state representations aligned
- **Game Logic**: Server authoritative - validate all client inputs
- **Constants**: Define gameplay constants at the top of files
- **Comments**: Document complex logic and game mechanics
- **Formatting**: 2-space indentation, consistent braces on same line