import { vec2 } from 'gl-matrix'
import { IEntityManager } from '../../types/entityTypes'
import { Bullet } from '../bullet'
import { Tank } from '../tank'

class EntityManager implements IEntityManager {
    private entities: (Tank | Bullet)[] = []

    tick() {
        for (const entity of this.entities) {
            entity.update()
        }
    }

    createTank(position: vec2, ...args: any) {
        this.entities.push(new Tank(position, ...args))
    }

    createBullet(...args: any) {
        this.entities.push(new Bullet(args))
    }
}

export const entityManager = new EntityManager()
