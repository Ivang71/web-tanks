import { Bullet } from './Bullet.js'

const directions = {
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  space: 'Space',
}

export class Tank {
  constructor({x, y, size, color = '#000', deg = 0}) {
    // x, y - coordinates of center
    this.x = x
    this.y = y
    this.size = size
    // degree of tank rotation in radians; positive rotation is clockwise
    this.deg = deg
    this.color = color
    this.keysPressed = {}
  }

  draw(ctx) {
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
      yTopLeft - this.size / 2 + 1, //add 1 to draw barrel correctly
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

    /*if (this.x + this.size / 2 > width) {
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

    if (this.keysPressed[directions.left]) {
      this.deg -= rotationSpeed
    }
    if (this.keysPressed[directions.right]) {
      this.deg += rotationSpeed
    }
    if (this.keysPressed[directions.up]) {
      this.x += xSpeed
      this.y -= ySpeed
    }
    if (this.keysPressed[directions.down]) {
      this.x -= xSpeed
      this.y += ySpeed
    }
  }

  fireABullet() {
    const r = this.size / 6
    return new Bullet({
      x: this.x + (this.size - r) * Math.sin(this.deg),
      y: this.y - (this.size - r) * Math.cos(this.deg),
      r,
      ySpeed: -Math.cos(this.deg) * 10,
      xSpeed: Math.sin(this.deg) * 10,
    })
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
