import { entityManager } from './entities/managers/entityManager'
import { renderManager } from './rendering/renderManager'
import GUI from 'lil-gui'

export const gui = new GUI({
    width: 400
})

entityManager.createTank([400, 400], true)

let then = Date.now() - 16, deltaTime = 0
let DEBUG = false, fpsSum = 0, timesFpsSummed = 0, recalculateFps = true
const fpsDiv = document.getElementById('fps') as HTMLDivElement

const gameLoop = (now: number) => {
    // get input data from user
    // ai
    // game loginc and physics
    // rendering
    // audio
    
    deltaTime = now - then
    then = now

    if (DEBUG) { // fps calculations
        const fps = 1 / (deltaTime / 1000)
        fpsSum += fps
        timesFpsSummed++
        if (recalculateFps) {
            const averageFps = fpsSum / timesFpsSummed
            fpsSum = 0, timesFpsSummed = 0
            
            fpsDiv.innerText = String(Math.trunc(averageFps))
            recalculateFps = false
            setTimeout(() => recalculateFps = true, 150)
        }
    }
    

    entityManager.tick(deltaTime)
    renderManager.render()


    // width = canvas.width = window.innerWidth
    // height = canvas.height = window.innerHeight
    // ctx.clearRect(0, 0, width, height)

    // for (const bullet of bullets) {
    //   bullet.draw(ctx)
    //   bullet.move(width, height)
    // }
    // tank.draw(ctx)
    // tank.move()
    // tank.normalizeDegrees()
    // tank.fire(bullets)

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)