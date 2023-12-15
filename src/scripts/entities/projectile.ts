import { vec2 } from 'gl-matrix'
import { BaseEntity } from './baseEntity'
import { FixedArray4 } from '../types/genericTypes'
import { renderManager } from '../rendering/renderManager'
import { Renderable } from '../types/entityTypes'

export class Projectile extends BaseEntity implements Renderable {
    constructor(
        public position: vec2,
        public velocity: vec2,
        public color: FixedArray4<number> = [0.7, 0.7, 0.7, 1],
        public vertices = new Float32Array(),        
        public size: vec2 = [5.5, 5.5],
        public rotation = 0,

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

        // Add additional logic like collision detection or behavior changes here
        renderManager.enqueue(this)
    }

    render() {

    }
}

function generateCircleVertices(radius: number, segments: number): Float32Array {
    const vertices: number[] = [];

    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI;
        for (let j = 0; j <= segments; j++) {
            const phi = (j / segments) * 2 * Math.PI;

            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);

            vertices.push(x, y, z);
        }
    }

    return new Float32Array(vertices);
}