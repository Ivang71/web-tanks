import { vec2 } from 'gl-matrix'
import { Position } from '../types/entityTypes'

export abstract class BaseEntity {
    id = Math.random()

    constructor(
        public position: vec2
    ) {}

    abstract update(): void
    abstract render(): void
}
