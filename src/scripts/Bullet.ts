export class Bullet {
  x: number
  y: number
  r: number
  xSpeed: number
  ySpeed: number
  color: string[]

  constructor(
    x: number,
    y: number,
    r: number,
    xSpeed: number,
    ySpeed: number,
    color: string[],
  ) {
    this.x = x
    this.y = y
    this.r = r
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    const normalFillStyle = ctx.fillStyle
    ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]},)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    ctx.fillStyle = normalFillStyle
  }

  move(width: number, height: number) {
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
