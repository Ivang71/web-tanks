import { vec2 } from 'gl-matrix'
import { IEntityManager } from '../../types/entityTypes'
import { Bullet } from '../bullet'
import { Tank } from '../tank'
import { inputMananager } from '../../input/inputManager'

class EntityManager implements IEntityManager {
    private entities: (Tank | Bullet)[] = []
    private userTank: Tank | null = null

    tick() {
        this.userTank && inputMananager.updateUserTank(this.userTank)
        
        for (const entity of this.entities) {
            entity.update()
        }
    }

    createTank(position: vec2, isUserTank: boolean, ...args: any) {
        const tank = new Tank(position, ...args)
        this.entities.push(tank)
        if (isUserTank) this.userTank = tank
    }

    createBullet(...args: any) {
        this.entities.push(new Bullet(args))
    }
}

export const entityManager = new EntityManager()
