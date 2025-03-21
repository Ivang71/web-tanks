export interface Player {
  id: string;
  x: number;
  y: number;
  angle: number;
  turretAngle: number; // Angle for the turret based on mouse position
  color: string;
  health: number;
}

export interface GameState {
  players: { [id: string]: Player };
  projectiles: Projectile[];
  effects: Effect[];
}

export interface Projectile {
  id: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  playerId: string;
}

export interface Effect {
  id: string;
  type: 'muzzleFlash' | 'explosion' | 'hit';
  x: number;
  y: number;
  angle: number;
  size: number;
  duration: number;
  currentTime: number;
  color: string;
}

export interface PlayerInput {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  shoot: boolean;
  turretAngle: number;
}