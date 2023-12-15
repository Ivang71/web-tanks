import { mat3, vec2 } from 'gl-matrix'
import { Projectile } from '../entities/projectile'
import { FixedArray4 } from './genericTypes'
import { Tank } from '../entities/tank'

export interface Renderable {
    id: number
    position: vec2
    color: FixedArray4<number>
    vertices: Float32Array
    rotation: number
    size: vec2
    zIndex: number
}
