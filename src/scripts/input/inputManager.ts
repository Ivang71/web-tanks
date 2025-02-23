import { entityManager } from '../entities/managers/entityManager'
import { Tank } from '../entities/tank'

class InputMananager {
    public keys: { [key: string]: boolean } = {}
    public mouse = { 
        x: 0,
        y: 0,
    }

    constructor() {
        addEventListener('keydown', (e) => {            
            this.keys[e.code] = true
        })
        addEventListener('keyup', (e) => {
            delete this.keys[e.code]
        })
        addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX
            this.mouse.y = e.clientY
        })
    }

    updateUserTank(tank: Tank) {
        if (this.keys['KeyW']) tank.accelerate(0.4)
        if (this.keys['KeyS']) tank.accelerate(-0.4)
        if (this.keys['KeyA']) tank.rotate(-0.007)
        if (this.keys['KeyD']) tank.rotate(0.007)
        if (this.keys['Space']) entityManager.fireTank(tank)
    }
}

export const inputMananager = new InputMananager()