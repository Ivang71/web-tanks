import { Bullet } from './bullet'

const keys = {
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  space: 'Space',
}

export class Tank {
  x: number
  y: number
  size: number
  color: string
  /** Tank rotation in radians, positive rotation is clockwise */
  deg: number
  keysPressed: {[k: string]: boolean} = {}
  isCooldown = false

  constructor(x: number, y: number, size: number, color = '#000', deg = 0) {
    // x, y - coordinates of center
    this.x = x
    this.y = y
    this.size = size
    this.deg = deg
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.deg)

    const normalX = this.x
    const normalY = this.y
    const normalFillStyle = ctx.fillStyle

    this.x = 0
    this.y = 0
    const xTopLeft = this.x - this.size / 2
    const yTopLeft = this.y - this.size / 2
    ctx.fillStyle = this.color

    ctx.fillRect(xTopLeft, yTopLeft, this.size, this.size)
    ctx.fillRect(
      xTopLeft + this.size / 3,
      yTopLeft - this.size / 2, //add 1 to draw barrel correctly
      this.size / 3,
      this.size / 2,
    )

    this.x = normalX
    this.y = normalY
    ctx.fillStyle = normalFillStyle

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.closePath()
  }

  move() {
    const speedCoefficient = 3
    const ySpeed = Math.cos(this.deg) * speedCoefficient
    const xSpeed = Math.sin(this.deg) * speedCoefficient
    const rotationSpeed = Math.PI / 90

    /*if (this.x + this.size / 2 > width) { todo collision detection
      this.x -= xSpeed * 2
    }
    if (this.x - this.size / 2 < 0) {
      this.x += xSpeed * 2
    }
    if (this.y - this.size / 2 < 0) {
      this.y += ySpeed * 2
    }
    if (this.y + this.size / 2 > height) {
      this.y -= ySpeed * 2
    }*/

    if (this.keysPressed[keys.left]) {
      this.deg -= rotationSpeed
    }
    if (this.keysPressed[keys.right]) {
      this.deg += rotationSpeed
    }
    if (this.keysPressed[keys.up]) {
      this.x += xSpeed
      this.y -= ySpeed
    }
    if (this.keysPressed[keys.down]) {
      this.x -= xSpeed
      this.y += ySpeed
    }
  }

  fire(bullets: Bullet[]) {
    if (!this.isCooldown && this.keysPressed[keys.space]) {
      bullets.push(this.launchABullet())
      // this.isCooldown = true
      setTimeout(() => this.isCooldown = false, 200)
    }
  }

  launchABullet() {
    const r = this.size / 6
    return new Bullet(
      this.x + (this.size - r) * Math.sin(this.deg),
      this.y - (this.size - r) * Math.cos(this.deg),
      r,
      Math.sin(this.deg) * 10,
      -Math.cos(this.deg) * 10,
      ['f', '0', '10'],
    )
  }

  normalizeDegrees() {
    if (this.deg > Math.PI * 2) {
      this.deg = this.deg % Math.PI * 2
    }
    if (this.deg < 0) {
      this.deg += Math.PI * 2
    }
  }
}
