import { vec2 } from 'gl-matrix'
import { BaseEntity } from './baseEntity'
import { FixedArray4 } from '../types/genericTypes'
import { canvas, renderManager } from '../rendering/renderManager'
import { Renderable } from '../types/entityTypes'

export class Projectile extends BaseEntity implements Renderable {
    constructor(
        public position: vec2,
        public velocity: vec2,
        public color: FixedArray4<number> = [0.7, 0.7, 0.7, 1],
        public vertices = new Float32Array(),        
        public size: vec2 = [5.5, 5.5],
        public rotation = 0,
        public zIndex = 1000,
    ) {
        super(position)
        const radius = this.size[0] / 2
        const segments = 12
        this.vertices = generateCircleVertices(radius, segments)
    }

    update(deltaTime: number): void {
        const deltaX = this.velocity[0] * deltaTime
        const deltaY = this.velocity[1] * deltaTime
        
        this.position[0] += deltaX
        this.position[1] += deltaY

        const p = this.position

        if (canvas) {
            if (p[0] > canvas.width) {
                p[0] = 0
            } else if (p[0] < 0) {
                p[0] = canvas.width
            }
        
            if (p[1] > canvas.height) {
                p[1] = 0
            } else if (p[1] < 0) {
                p[1] = canvas.height
            }
        }

        renderManager.enqueue(this)
    }

    render() {

    }
}

function generateCircleVertices(radius: number, segments: number): Float32Array {
    const vertices: number[] = []

   Array.from({ length: segments}).forEach((_, i) => {
        const theta = (i / segments) * Math.PI
        Array.from({ length: segments}).forEach((_, j) => {
            const phi = (j / segments) * 2 * Math.PI

            const x = radius * Math.sin(theta) * Math.cos(phi)
            const y = radius * Math.sin(theta) * Math.sin(phi)
            const z = radius * Math.cos(theta)

            vertices.push(x, y, z)
        })
    })

    return new Float32Array(vertices)
}