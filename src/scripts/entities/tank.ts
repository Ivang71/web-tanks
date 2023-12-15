import { mat3, vec2 } from 'gl-matrix'
import { BaseEntity } from './baseEntity'
import { renderManager } from '../rendering/renderManager'
import { FixedArray4 } from '../types/genericTypes'
import { gui } from '../main'
import { entityManager } from './managers/entityManager'
import { Projectile } from './projectile'

export class Tank extends BaseEntity {
    constructor(
        position: vec2,
        public size: vec2 = [10, 10],
        /** Rrotatin in radians, posiitve is counter-clockwise */
        public rotation = 0,
        public speed = 0,
        public rotationSpeed = 0,
        public maxSpeed = 3,
        public health = 100,
        public isAlive = true,
        public isCooldown = false,
        public cooldown = 1000, // in ms
        public transform = mat3.create(),
        public vertices = new Float32Array(),
        public zIndex = 10000,
        public color: FixedArray4<number> = [0.3, 0.5, 0.5, 1], // color in rgba
    ) {
        super(position)
        this.updateVertices()
        gui.add({ posiitonX: 400 }, 'posiitonX', -100, 1000).onChange((n: number) => this.position[0] = n)
        gui.add({ positionY: 400 }, 'positionY', -100, 1000).onChange((n: number) => this.position[1] = n)
        gui.add(this, 'rotation', 0, Math.PI)
        gui.add({ sizeX: 10 }, 'sizeX', -30, 30).onChange((n: number) => this.size[0] = n)
        gui.add({ sizeY: 10 }, 'sizeY', -30, 30).onChange((n: number) => this.size[1] = n)
    }

    update(deltaTime: number) {
        // handle input
        // physics
        // health
        // animation, vfx
        // audio
        // ai behavior

        this.position[0] += Math.cos(this.rotation) * this.speed
        this.position[1] += Math.sin(this.rotation) * this.speed

        if (Math.abs(this.speed) > 0) this.speed = this.speed * 0.93

        this.rotation += this.rotationSpeed
        if (Math.abs(this.rotationSpeed) > 0.001) {
            this.rotationSpeed *= 0.83
        } else {
            this.rotationSpeed = 0
        }

        renderManager.enqueue(this)
    }

    rotate(radians: number) {
        this.rotationSpeed += radians
    }

    accelerate(speed: number) { 
        if (this.speed + Math.abs(speed) > this.maxSpeed) return       
        this.speed = Math.sign(speed) * this.maxSpeed
    }

    fire() {
        if (this.isCooldown) return
        this.isCooldown = true
        setTimeout(() => this.isCooldown = false, this.cooldown)
        const gunLength = 90, speed = 0.4

        const velocity: vec2 = [speed * Math.cos(this.rotation), speed * Math.sin(this.rotation)]
        const position: vec2 = [
            this.position[0] + gunLength * Math.cos(this.rotation),
            this.position[1] + gunLength * Math.sin(this.rotation),
        ]

        return new Projectile(position, velocity)
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
