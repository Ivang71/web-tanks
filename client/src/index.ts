import { io } from 'socket.io-client';
import { Effect, GameState, Player, PlayerInput, Projectile } from './types';

// Connect to the server
const socket = io('http://localhost:3000');

// Game canvas
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
if (!canvas) {
  console.error('Canvas element not found! Make sure gameCanvas element exists in HTML.');
  throw new Error('Canvas element not found');
}

// Get canvas context
const ctx = canvas.getContext('2d') as  CanvasRenderingContext2D;
if (!ctx) {
  console.error('Failed to get canvas context');
  throw new Error('Canvas context not available');
}

// Set explicit dimensions for the canvas
canvas.width = 800;
canvas.height = 600;

// Game dimensions
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

console.log(`Canvas initialized with dimensions: ${GAME_WIDTH}x${GAME_HEIGHT}`);

// Player input state
const playerInput: PlayerInput = {
  up: false,
  down: false,
  left: false,
  right: false,
  shoot: false,
  turretAngle: 0
};

// Current game state
let gameState: GameState = {
  players: {},
  projectiles: [],
  effects: []
};

// Local player ID
let playerId: string | undefined;

// Handle socket connection
socket.on('connect', () => {
  console.log('Connected to server');
  playerId = socket.id;
  
  // Add click event for shooting
  canvas.addEventListener('click', () => {
    // Set shoot to true
    playerInput.shoot = true;
    
    // Update turret angle before shooting to ensure accuracy
    updateTurretAngle();
    
    // Send updated input to server
    socket.emit('playerInput', playerInput);
    
    // Reset shoot flag after a short delay on client side
    // This ensures the shoot flag isn't kept true for other key events
    setTimeout(() => {
      playerInput.shoot = false;
    }, 100);
  });
});

// Handle game state updates
socket.on('gameState', (state: GameState) => {
  gameState = state;
  
  // If this is the first time we're receiving our player in the game state,
  // make sure to update the turret angle
  if (playerId && state.players[playerId] && 
      (!gameState.players[playerId] || state.players[playerId].x !== gameState.players[playerId].x)) {
    // Force update turret angle on position change
    lastTurretUpdateTime = 0; // Reset throttle
    updateTurretAngle();
  }
});

// Handle player death
socket.on('died', () => {
  console.log('You died!');
  // You could add respawn logic here
});

// Mouse position tracking
let mouseX = 0;
let mouseY = 0;
let lastTurretUpdateTime = 0; // Timestamp of last turret angle update
const TURRET_UPDATE_THROTTLE = 50; // Milliseconds between turret updates (20 updates per second)

// Set up keyboard controls
document.addEventListener('keydown', (event) => {
  handleKeyDown(event.key);
});

document.addEventListener('keyup', (event) => {
  handleKeyUp(event.key);
});

// Track mouse position
canvas.addEventListener('mousemove', (event) => {
  // Get the canvas position relative to the viewport
  const rect = canvas.getBoundingClientRect();
  
  // Calculate mouse position within the canvas, accounting for scaling
  mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
  mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);
  
  // Debug mouse coordinates
  console.log(`Mouse canvas position: (${mouseX.toFixed(0)}, ${mouseY.toFixed(0)})`);
  
  // Update turret angle immediately
  updateTurretAngle();
});

function updateTurretAngle() {
  // Check if we should throttle updates
  const now = Date.now();
  if (now - lastTurretUpdateTime < TURRET_UPDATE_THROTTLE) {
    return; // Skip this update to avoid flooding the network
  }
  
  if (!playerId) {
    console.log("Player ID not set yet");
    return;
  }
  
  if (!gameState.players[playerId]) {
    console.log("Player not found in game state");
    return;
  }
  
  const player = gameState.players[playerId];
  
  // Calculate angle between player and mouse cursor
  const dx = mouseX - player.x;
  const dy = mouseY - player.y;
  
  // Skip update if mouse is too close to player (to avoid jittering)
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < 5) {
    return;
  }
  
  // Calculate angle in radians
  const newAngle = Math.atan2(dy, dx);
  
  // Only update if angle has changed significantly
  if (Math.abs(playerInput.turretAngle - newAngle) < 0.01) {
    return; // Skip insignificant changes
  }
  
  playerInput.turretAngle = newAngle;
  lastTurretUpdateTime = now;
  
  // Debug detailed tracking information
  console.log(`
  Player position: (${player.x.toFixed(0)}, ${player.y.toFixed(0)})
  Mouse position: (${mouseX.toFixed(0)}, ${mouseY.toFixed(0)})
  Delta: (${dx.toFixed(0)}, ${dy.toFixed(0)})
  Turret angle: ${newAngle.toFixed(2)} radians (${(newAngle * 180 / Math.PI).toFixed(0)}°)
  `);
  
  // Send updated input to server
  socket.emit('playerInput', playerInput);
}

function handleKeyDown(key: string) {
  // Keep track of the previous state to see if anything changed
  const previousInput = { ...playerInput };
  
  switch(key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      playerInput.up = true;
      break;
    case 's':
    case 'arrowdown':
      playerInput.down = true;
      break;
    case 'a':
    case 'arrowleft':
      playerInput.left = true;
      break;
    case 'd':
    case 'arrowright':
      playerInput.right = true;
      break;
    case ' ':
      // Handle spacebar shooting
      if (!playerInput.shoot) {
        playerInput.shoot = true;
        
        // Reset shoot flag after a short delay on client side
        setTimeout(() => {
          playerInput.shoot = false;
          socket.emit('playerInput', playerInput);
        }, 100);
      }
      break;
    default:
      // Don't emit for keys we don't care about
      return;
  }
  
  // Only send update if something actually changed
  if (playerInput.up !== previousInput.up ||
      playerInput.down !== previousInput.down ||
      playerInput.left !== previousInput.left ||
      playerInput.right !== previousInput.right ||
      playerInput.shoot !== previousInput.shoot) {
    socket.emit('playerInput', playerInput);
  }
}

function handleKeyUp(key: string) {
  switch(key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      playerInput.up = false;
      break;
    case 's':
    case 'arrowdown':
      playerInput.down = false;
      break;
    case 'a':
    case 'arrowleft':
      playerInput.left = false;
      break;
    case 'd':
    case 'arrowright':
      playerInput.right = false;
      break;
    default:
      // Don't emit for keys we don't care about
      return;
  }
  
  // Send updated input to server
  socket.emit('playerInput', playerInput);
}

// Render loop
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
  // Draw background grid
  drawGrid();
  
  // Draw players
  Object.values(gameState.players).forEach(player => {
    drawTank(player);
    
    // Draw health bar
    drawHealthBar(player);
  });
  
  // Draw projectiles
  gameState.projectiles.forEach(projectile => {
    drawProjectile(projectile);
  });
  
  // Draw effects
  (gameState.effects || []).forEach(effect => {
    drawEffect(effect);
  });
  
  // Request next frame
  requestAnimationFrame(render);
}

function drawGrid() {
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 0.5;
  
  // Draw vertical lines
  for (let x = 0; x <= GAME_WIDTH; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GAME_HEIGHT);
    ctx.stroke();
  }
  
  // Draw horizontal lines
  for (let y = 0; y <= GAME_HEIGHT; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(GAME_WIDTH, y);
    ctx.stroke();
  }
}

function drawTank(player: Player) {
  const { x, y, angle, turretAngle, color } = player;
  
  // Draw tank body
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  
  // Tank body - now a rounded rectangle with clear direction
  ctx.fillStyle = color;
  
  // Main body (rounded rectangle)
  const tankWidth = 36;
  const tankHeight = 28;
  const radius = 8;
  
  ctx.beginPath();
  ctx.moveTo(-tankWidth/2 + radius, -tankHeight/2);
  ctx.lineTo(tankWidth/2 - radius, -tankHeight/2);
  ctx.arcTo(tankWidth/2, -tankHeight/2, tankWidth/2, -tankHeight/2 + radius, radius);
  ctx.lineTo(tankWidth/2, tankHeight/2 - radius);
  ctx.arcTo(tankWidth/2, tankHeight/2, tankWidth/2 - radius, tankHeight/2, radius);
  ctx.lineTo(-tankWidth/2 + radius, tankHeight/2);
  ctx.arcTo(-tankWidth/2, tankHeight/2, -tankWidth/2, tankHeight/2 - radius, radius);
  ctx.lineTo(-tankWidth/2, -tankHeight/2 + radius);
  ctx.arcTo(-tankWidth/2, -tankHeight/2, -tankWidth/2 + radius, -tankHeight/2, radius);
  ctx.closePath();
  ctx.fill();
  
  // Draw tank tracks
  ctx.fillStyle = '#333333';
  // Left track
  ctx.fillRect(-tankWidth/2 - 3, -tankHeight/2, 4, tankHeight);
  // Right track
  ctx.fillRect(tankWidth/2 - 1, -tankHeight/2, 4, tankHeight);
  
  // Direction indicator on body
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(tankWidth/2 - 5, 0);
  ctx.lineTo(tankWidth/2 - 12, -6);
  ctx.lineTo(tankWidth/2 - 12, 6);
  ctx.fill();
  
  // Restore context for turret
  ctx.restore();
  
  // Draw turret
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(turretAngle);
  
  // Turret base (circle)
  ctx.fillStyle = '#444444';
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw tank barrel/turret
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, -3, 30, 6);
  
  // Barrel end reinforcement
  ctx.fillStyle = color;
  ctx.fillRect(25, -4, 5, 8);
  
  // Restore context
  ctx.restore();
  
  // Highlight local player
  if (player.id === playerId) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawHealthBar(player: Player) {
  const { x, y, health } = player;
  
  // Health bar background
  ctx.fillStyle = '#333333';
  ctx.fillRect(x - 15, y - 30, 30, 5);
  
  // Health bar fill
  ctx.fillStyle = health > 50 ? '#00ff00' : health > 25 ? '#ffff00' : '#ff0000';
  ctx.fillRect(x - 15, y - 30, (health / 100) * 30, 5);
}

function drawProjectile(projectile: Projectile) {
  const { x, y } = projectile;
  
  // Draw bullet
  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw trail/glow
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#ffaa00';
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

function drawEffect(effect: Effect) {
  const { x, y, type, size, currentTime, duration, color, angle } = effect;
  
  // Calculate effect progress (0 to 1)
  const progress = currentTime / duration;
  
  ctx.save();
  ctx.translate(x, y);
  
  if (type === 'muzzleFlash') {
    // Draw muzzle flash
    ctx.globalAlpha = 1 - progress; // Fade out
    ctx.fillStyle = color;
    ctx.rotate(angle);
    
    // First draw circular base
    ctx.beginPath();
    ctx.arc(0, 0, size * (1 - progress * 0.5), 0, Math.PI * 2);
    ctx.fill();
    
    // Then draw triangle shape for the muzzle flash
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size * 2 * (1 - progress * 0.5), -size * (1 - progress));
    ctx.lineTo(size * 3 * (1 - progress * 0.3), 0);
    ctx.lineTo(size * 2 * (1 - progress * 0.5), size * (1 - progress));
    ctx.closePath();
    ctx.fill();
  } else if (type === 'explosion') {
    // Draw explosion
    const maxSize = size * (0.2 + progress * 0.8); // Grow then stabilize
    
    // Outer glow
    ctx.globalAlpha = 0.4 * (1 - progress);
    ctx.fillStyle = '#ff9900';
    ctx.beginPath();
    ctx.arc(0, 0, maxSize * 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Bright center
    ctx.globalAlpha = 1 - progress;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, maxSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner core
    ctx.globalAlpha = 0.8 * (1 - progress);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, maxSize * 0.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'hit') {
    // Draw hit effect
    ctx.globalAlpha = 1 - progress;
    ctx.fillStyle = color;
    
    // Expanding circle
    ctx.beginPath();
    ctx.arc(0, 0, size * (0.5 + progress * 1.5), 0, Math.PI * 2);
    ctx.fill();
    
    // Inner bright spot
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.7 * (1 - progress);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

// Start the render loop
render();