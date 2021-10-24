const pi = Math.PI
const cos = Math.cos
const sin = Math.sin

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight

/*const grassTexture = new Image()
grassTexture.src = 'images/grass.jpg'
ctx.fillStyle = ctx.createPattern(grassTexture, 'repeat')
ctx.fillRect(0, 0, height, width)*/

const directions = {
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  space: 'Space',
}

function modifyRgbColor(colors) {
  //accepts array of rgb colors as numbers
  const epsilon = 5
  return colors.map((color) => {
    do {
      color += Math.round(Math.random() * 2 * epsilon - epsilon)
    } while (color <= 0 || color >= 255)
    return color
  })
}

const rgbToHex = (colors) =>
  '#' +
  colors
    .map((x) => {
      const hex = Number(x).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')

class Bullet {
  constructor({
    x,
    y,
    r,
    xSpeed,
    ySpeed,
    lifetime = 1e5,
    color = [128, 128, 128],
  }) {
    this.x = x
    this.y = y
    this.r = r
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    // this.lifetime = lifetime
    this.color = color
  }

  draw() {
    this.color = modifyRgbColor(this.color)
    const normalFillStyle = ctx.fillStyle
    ctx.fillStyle = rgbToHex(this.color)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * pi)
    ctx.fill()
    ctx.closePath()
    ctx.fillStyle = normalFillStyle
  }

  move() {
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

class Tank {
  constructor({x, y, size, color = '#000', deg = 0}) {
    // x, y - coordinates of center
    this.x = x
    this.y = y
    this.size = size
    // degree of tank rotation in radians; clockwise though
    this.deg = deg
    this.color = color
    this.keysPressed = {}
  }

  draw() {
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
    const ySpeed = cos(tank.deg) * speedCoefficient
    const xSpeed = sin(tank.deg) * speedCoefficient
    const rotationSpeed = pi / 90

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
      tank.deg -= rotationSpeed
    }
    if (this.keysPressed[directions.right]) {
      tank.deg += rotationSpeed
    }
    if (this.keysPressed[directions.up]) {
      tank.x += xSpeed
      tank.y -= ySpeed
    }
    if (this.keysPressed[directions.down]) {
      tank.x -= xSpeed
      tank.y += ySpeed
    }
  }

  fire() {
    const r = this.size / 6
    const bullet = new Bullet({
      x: this.x + (this.size - r) * sin(this.deg),
      y: this.y - (this.size - r) * cos(this.deg),
      r,
      ySpeed: -cos(this.deg) * 10,
      xSpeed: sin(this.deg) * 10,
    })
    bullets.push(bullet)
  }

  normalizeDegrees() {
    if (this.deg > pi * 2) {
      this.deg = this.deg % pi * 2
    }
    if (this.deg < 0) {
      this.deg += pi * 2
    }
  }
}

window.onkeydown = (e) => {
  tank.keysPressed[e.code] = true
  if (e.code === directions.space) {
    tank.fire()
  }
}

window.onkeyup = (e) => {
  delete tank.keysPressed[e.code]
}

const tank = new Tank({
  x: width / 2,
  y: height / 2,
  size: 70,
  color: '#000000',
})

const bullets = []

const gameLoop = () => {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  ctx.clearRect(0, 0, width, height)

  for (const bullet of bullets) {
    bullet.draw()
    bullet.move()
  }
  tank.draw()
  tank.move()
  tank.normalizeDegrees()

  requestAnimationFrame(gameLoop)
}
gameLoop()
