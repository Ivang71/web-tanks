import { mat3, vec2 } from 'gl-matrix'
import { BaseEntity } from './baseEntity'
import { renderManager } from '../rendering/renderManager'
import { FixedArray4 } from '../types/genericTypes'
import { gui } from '../main'

export class Tank extends BaseEntity {
    constructor(
        position: vec2,
        public size: vec2 = [10, 10],
        /** Rrotatin in radians, posiitve is counter-clockwise */
        public rotation = 0,
        public speed = 0,
        public health = 100,
        public isAlive = true,
        public cooldown = false,
        public transform = mat3.create(),
        public vertices = new Float32Array(),
        /** Color in rgba */
        public color: FixedArray4<number> = [0.3, 0.5, 0.5, 1],
    ) {
        super(position)
        this.updateVertices()
        gui.add({ posiitonX: 400 }, 'posiitonX', -100, 1000).onChange((n: number) => this.position[0] = n)
        gui.add({ positionY: 400 }, 'positionY', -100, 1000).onChange((n: number) => this.position[1] = n)
        gui.add(this, 'rotation', 0, Math.PI)
        gui.add({ sizeX: 10 }, 'sizeX', -30, 30).onChange((n: number) => this.size[0] = n)
        gui.add({ sizeY: 10 }, 'sizeY', -30, 30).onChange((n: number) => this.size[1] = n)
    }

    update() {
        // handle input
        // physics
        // health
        // animation, vfx
        // audio
        // ai behavior
        renderManager.enqueue(this)
    }

    render() {

    }

    updateVertices() {
        const hullBack = 0 - this.size[0] / 2,
            hullFront = 0 + this.size[0] / 2,
            hullLeft = 0 - this.size[1] / 2,
            hullRight = 0 + this.size[1] / 2,
            muzzleEnd = hullFront + this.size[0] * 0.6,
            muzzleLeft = hullLeft + this.size[1] / 3,
            muzzleRight = hullRight - this.size[1] / 3

        this.vertices = new Float32Array([
            // hull
            hullBack, hullLeft,
            hullFront, hullLeft,
            hullBack, hullRight,
            hullBack, hullRight,
            hullFront, hullLeft,
            hullFront, hullRight,

            // muzzle
            hullFront, muzzleLeft,
            muzzleEnd, muzzleLeft,
            hullFront, muzzleRight,
            hullFront, muzzleRight,
            muzzleEnd, muzzleLeft,
            muzzleEnd, muzzleRight
        ])
    }
}
