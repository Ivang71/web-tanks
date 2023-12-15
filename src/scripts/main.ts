import { entityManager } from './entities/managers/entityManager'
import { renderManager } from './rendering/renderManager'
import GUI from 'lil-gui'

export const gui = new GUI({
    width: 400
})

entityManager.createTank([400, 400], true)

let then = Date.now() - 16, deltaTime = 0

const gameLoop = (now: number) => {
    // get input data from user
    // ai
    // game loginc and physics
    // rendering
    // audio
    
    deltaTime = now - then
    then = now
    

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