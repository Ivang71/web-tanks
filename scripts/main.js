import { Tank } from './Tank.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight

const tank = new Tank({
  x: width / 2,
  y: height / 2,
  size: 70,
  color: '#000000',
})

const bullets = []

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
    bullet.move({ width, height })
  }
  tank.draw(ctx)
  tank.move()
  tank.normalizeDegrees()
  tank.fire(bullets)

  requestAnimationFrame(gameLoop)
}
gameLoop()
