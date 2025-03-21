import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { GameState, Player, PlayerInput, Projectile } from './types';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

const GAME_SPEED = 1/60; // 60 FPS
const PLAYER_SPEED = 150; // pixels per second
const ROTATION_SPEED = 3; // radians per second
const PROJECTILE_SPEED = 300; // pixels per second
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const SHOOT_COOLDOWN = 0.5; // 500ms cooldown between shots

// Game state
const gameState: GameState = {
  players: {},
  projectiles: [],
  effects: []
};

// Player inputs
const playerInputs: { [id: string]: PlayerInput } = {};

// Player cooldowns
const playerCooldowns: { [id: string]: { [action: string]: number } } = {};

// Game loop
setInterval(() => {
  updateGame();
  io.emit('gameState', gameState);
}, 1000 * GAME_SPEED);

function updateGame() {
  // Update effects
  for (let i = gameState.effects.length - 1; i >= 0; i--) {
    const effect = gameState.effects[i];
    
    // Update effect time
    effect.currentTime += GAME_SPEED;
    
    // Remove expired effects
    if (effect.currentTime >= effect.duration) {
      gameState.effects.splice(i, 1);
    }
  }
  
  // Update players
  Object.keys(playerInputs).forEach(playerId => {
    const player = gameState.players[playerId];
    if (!player) return;
    
    const input = playerInputs[playerId];
    
    // Rotation
    if (input.left) {
      player.angle -= ROTATION_SPEED * GAME_SPEED;
    }
    if (input.right) {
      player.angle += ROTATION_SPEED * GAME_SPEED;
    }
    
    // Update turret angle from client input
    player.turretAngle = input.turretAngle;
    
    // Movement
    const dx = Math.cos(player.angle) * PLAYER_SPEED * GAME_SPEED;
    const dy = Math.sin(player.angle) * PLAYER_SPEED * GAME_SPEED;
    
    if (input.up) {
      player.x += dx;
      player.y += dy;
    }
    if (input.down) {
      player.x -= dx;
      player.y -= dy;
    }
    
    // Keep players within bounds
    player.x = Math.max(20, Math.min(GAME_WIDTH - 20, player.x));
    player.y = Math.max(20, Math.min(GAME_HEIGHT - 20, player.y));
    
    // Handle shooting with cooldown
    const cooldowns = playerCooldowns[playerId] || { shoot: 0 };
    
    if (input.shoot && cooldowns.shoot <= 0) {
      createProjectile(player);
      
      // Create muzzle flash effect
      const barrelLength = 30;
      createEffect({
        type: 'muzzleFlash',
        x: player.x + Math.cos(player.turretAngle) * barrelLength,
        y: player.y + Math.sin(player.turretAngle) * barrelLength,
        angle: player.turretAngle,
        size: 10,
        duration: 0.1,
        color: '#ffdd00'
      });
      
      input.shoot = false; // Reset shoot flag
      cooldowns.shoot = SHOOT_COOLDOWN; // Set cooldown
    } else if (cooldowns.shoot > 0) {
      // Reduce cooldown
      cooldowns.shoot -= GAME_SPEED;
    }
  });
  
  // Update projectiles
  for (let i = gameState.projectiles.length - 1; i >= 0; i--) {
    const projectile = gameState.projectiles[i];
    
    // Move projectile
    projectile.x += Math.cos(projectile.angle) * projectile.speed * GAME_SPEED;
    projectile.y += Math.sin(projectile.angle) * projectile.speed * GAME_SPEED;
    
    // Check for out of bounds
    if (
      projectile.x < 0 || 
      projectile.x > GAME_WIDTH || 
      projectile.y < 0 || 
      projectile.y > GAME_HEIGHT
    ) {
      // Create small hit effect when projectile goes out of bounds
      createEffect({
        type: 'hit',
        x: projectile.x,
        y: projectile.y,
        angle: 0,
        size: 5,
        duration: 0.1,
        color: '#888888'
      });
      
      gameState.projectiles.splice(i, 1);
      continue;
    }
    
    // Check for collisions with players
    Object.keys(gameState.players).forEach(playerId => {
      if (playerId === projectile.playerId) return; // Skip own projectiles
      
      const player = gameState.players[playerId];
      const dx = player.x - projectile.x;
      const dy = player.y - projectile.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 24) { // Updated tank radius for collision
        player.health -= 10;
        
        // Create hit effect
        createEffect({
          type: 'hit',
          x: projectile.x,
          y: projectile.y,
          angle: 0,
          size: 8,
          duration: 0.2,
          color: '#ff0000'
        });
        
        gameState.projectiles.splice(i, 1);
        
        // Check if player died
        if (player.health <= 0) {
          // Create explosion effect
          createEffect({
            type: 'explosion',
            x: player.x,
            y: player.y,
            angle: 0,
            size: 50,
            duration: 0.5,
            color: '#ff6600'
          });
          
          io.to(playerId).emit('died');
          delete gameState.players[playerId];
        }
        
        return;
      }
    });
  }
}

function createProjectile(player: Player): Projectile {
  // Make projectiles spawn from the end of the barrel
  const barrelLength = 35; // Increased from the visual length of 30 to match the new tank design
  
  const projectile: Projectile = {
    id: Math.random().toString(36).substring(2, 9),
    x: player.x + Math.cos(player.turretAngle) * barrelLength,
    y: player.y + Math.sin(player.turretAngle) * barrelLength,
    angle: player.turretAngle, // Use turret angle for projectile direction
    speed: PROJECTILE_SPEED,
    playerId: player.id
  };
  
  gameState.projectiles.push(projectile);
  return projectile;
}

function createEffect(params: Omit<Effect, 'id' | 'currentTime'>): Effect {
  const effect: Effect = {
    id: Math.random().toString(36).substring(2, 9),
    ...params,
    currentTime: 0
  };
  
  gameState.effects.push(effect);
  return effect;
}

function getRandomColor(): string {
  const colors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Socket connections
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  
  // Create new player
  const player: Player = {
    id: socket.id,
    x: Math.random() * (GAME_WIDTH - 40) + 20,
    y: Math.random() * (GAME_HEIGHT - 40) + 20,
    angle: Math.random() * Math.PI * 2,
    turretAngle: 0, // Initialize turret angle
    color: getRandomColor(),
    health: 100
  };
  
  // Add player to game state
  gameState.players[socket.id] = player;
  
  // Initialize player input
  playerInputs[socket.id] = {
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
    turretAngle: 0
  };
  
  // Initialize cooldowns
  playerCooldowns[socket.id] = {
    shoot: 0
  };
  
  // Player input
  socket.on('playerInput', (input: PlayerInput) => {
    // Log turret angle changes for debugging
    const previousInput = playerInputs[socket.id];
    if (previousInput && Math.abs(previousInput.turretAngle - input.turretAngle) > 0.01) {
      console.log(`Player ${socket.id} turret rotated to ${input.turretAngle.toFixed(2)} radians`);
    }
    
    // Store the updated input
    playerInputs[socket.id] = input;
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete gameState.players[socket.id];
    delete playerInputs[socket.id];
    delete playerCooldowns[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});