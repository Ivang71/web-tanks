export class Bullet {
  constructor({
    x,
    y,
    r,
    xSpeed,
    ySpeed,
    color = [0, 0, 0],
  }) {
    this.x = x
    this.y = y
    this.r = r
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    this.color = color
  }

  draw(ctx) {
    const normalFillStyle = ctx.fillStyle
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    ctx.fillStyle = normalFillStyle
  }

  move({ width, height }) {
    this.x += this.xSpeed
    this.y += this.ySpeed

    if (this.x + this.r > width || this.x - this.r < 0) {
      this.xSpeed = -this.xSpeed
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.ySpeed = -this.ySpeed
    }
  }
}
