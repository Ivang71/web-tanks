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
        public maxSpeed = 3,
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

        this.position[0] += Math.cos(this.rotation) * this.speed
        this.position[1] += Math.sin(this.rotation) * this.speed

        if (Math.abs(this.speed) > 0) this.speed = this.speed * 0.93


        renderManager.enqueue(this)
    }

    rotate(radians: number) {
        this.rotation += radians // TODO test with inertia
    }

    accelerate(speed: number) { 
        if (this.speed + Math.abs(speed) > this.maxSpeed) return       
        this.speed += speed // TODO inertia
    }

    render() {

    }

    updateVertices() {
        const hullBack = -this.size[0] / 2,
            hullFront = this.size[0] / 2,
            hullLeft = -this.size[1] / 2,
            hullRight = this.size[1] / 2,
            gunEnd = hullFront + this.size[0] * 0.6,
            gunLeft = hullLeft + this.size[1] / 3,
            gunRight = hullRight - this.size[1] / 3

        this.vertices = new Float32Array([
            // hull
            hullBack, hullLeft,
            hullFront, hullLeft,
            hullBack, hullRight,
            hullBack, hullRight,
            hullFront, hullLeft,
            hullFront, hullRight,

            // gun
            hullFront, gunLeft,
            gunEnd, gunLeft,
            hullFront, gunRight,
            hullFront, gunRight,
            gunEnd, gunLeft,
            gunEnd, gunRight
        ])
    }
}
