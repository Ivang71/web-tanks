import { mat3, vec2 } from 'gl-matrix'
import { Bullet } from '../entities/bullet'
import { FixedArray4 } from './genericTypes'

export interface Position {
    x: number
    y: number
}

export interface Entity {
    id: number
    position: vec2
    color: FixedArray4<number>
    vertices: Float32Array
    rotation: number
    size: vec2
}

export interface IEntityManager {
    createTank: (...args: any) => void
    createBullet: (...args: any) => void
}