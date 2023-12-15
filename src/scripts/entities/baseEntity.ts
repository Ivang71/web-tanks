import { vec2 } from 'gl-matrix'

export abstract class BaseEntity {
    id = Math.random()

    constructor(
        public position: vec2
    ) {}

    abstract update(deltaTime: number): void
    abstract render(): void
}
