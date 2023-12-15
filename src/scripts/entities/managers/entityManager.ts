import { vec2 } from 'gl-matrix'
import { Projectile } from '../projectile'
import { Tank } from '../tank'
import { inputMananager } from '../../input/inputManager'

class EntityManager {
    private entities: (Tank | Projectile)[] = []
    private userTank: Tank | null = null

    tick(deltaTime: number) {
        this.userTank && inputMananager.updateUserTank(this.userTank)
        
        for (const entity of this.entities) {
            entity.update(deltaTime)
        }
    }

    createTank(position: vec2, isUserTank: boolean, ...args: any) {
        const tank = new Tank(position, ...args)
        this.entities.push(tank)
        if (isUserTank) this.userTank = tank
    }

    fireTank(tank: Tank) {
        const projectile = tank.fire()
        if (!projectile) return
        this.entities.push(projectile)
    }
}

export const entityManager = new EntityManager()
