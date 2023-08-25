import { Bullet } from './Bullet'
import { Tank } from './Tank'

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
let width = window.innerWidth
let height = window.innerHeight

const tank = new Tank(
  width / 2,
  height / 2,
  70,
  '#000000',
)

const bullets: Bullet[] = []

window.onkeydown = (e) => {
  tank.keysPressed[e.code] = true
}

window.onkeyup = (e) => {
  delete tank.keysPressed[e.code]
}

const gameLoop = () => {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  ctx.clearRect(0, 0, width, height)

  for (const bullet of bullets) {
    bullet.draw(ctx)
    bullet.move(width, height)
  }
  tank.draw(ctx)
  tank.move()
  tank.normalizeDegrees()
  tank.fire(bullets)

  requestAnimationFrame(gameLoop)
}
gameLoop()
