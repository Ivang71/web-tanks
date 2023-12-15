import { mat3 } from 'gl-matrix'
import { Renderable } from '../types/entityTypes'
import { initShaderProgram, resizeCanvasToDisplaySize } from './renderUtils'
import vsSource from './shaders/shader.vert'
import fsSource from './shaders/shader.frag'

class RenderManager {
    private gl: WebGL2RenderingContext
    private program: WebGLProgram
    private renderQueue: Renderable[] = []
    private positionAttribLoc: number
    private positionBuffer: WebGLBuffer
    private vao: WebGLVertexArrayObject
    private colorLoc: WebGLUniformLocation
    private matrixLoc: WebGLUniformLocation

    constructor() {
        const canvas = document.querySelector("#canvas") as HTMLCanvasElement
        const gl = canvas.getContext("webgl2") as WebGL2RenderingContext
        this.gl = gl
        this.program = initShaderProgram(gl, vsSource, fsSource)
        this.positionAttribLoc = gl.getAttribLocation(this.program, 'a_position') // there goes vertex data
        this.positionBuffer = gl.createBuffer() as WebGLBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        this.vao = gl.createVertexArray() as WebGLVertexArrayObject
        gl.bindVertexArray(this.vao)
        gl.enableVertexAttribArray(this.positionAttribLoc)
        this.colorLoc = gl.getUniformLocation(this.program, "u_color") as WebGLUniformLocation
        this.matrixLoc = gl.getUniformLocation(this.program, 'u_matrix') as WebGLUniformLocation
    }

    render() {
        if (this.renderQueue.length < 1) return

        const gl = this.gl, canvas = gl.canvas as HTMLCanvasElement
        resizeCanvasToDisplaySize(canvas)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.clearColor(0, 0, 0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.useProgram(this.program)
        gl.bindVertexArray(this.vao)
        const baseMatrix = mat3.create()
        mat3.projection(baseMatrix, canvas.clientWidth, canvas.clientHeight)

        for (const entity of this.renderQueue) {
            const buffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.bufferData(gl.ARRAY_BUFFER, entity.vertices, gl.DYNAMIC_DRAW)

            // Set up the attribute pointer inside the loop
            gl.vertexAttribPointer(this.positionAttribLoc, 2, gl.FLOAT, false, 0, 0)
            gl.enableVertexAttribArray(this.positionAttribLoc)

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, entity.vertices)
            gl.uniform4f(this.colorLoc, ...entity.color)

            const matrix = mat3.clone(baseMatrix)
            mat3.translate(matrix, matrix, entity.position)
            mat3.rotate(matrix, matrix, entity.rotation)
            mat3.scale(matrix, matrix, entity.size)

            gl.uniformMatrix3fv(this.matrixLoc, false, matrix)

            // Draw the arrays for each entity
            gl.drawArrays(gl.TRIANGLES, 0, entity.vertices.length / 2)

            // Clean up the buffer after drawing
            gl.deleteBuffer(buffer)
        }
        

        this.renderQueue = []
    }

    enqueue(entity: Renderable) {
        this.renderQueue.push(entity)
    }
}

export const renderManager = new RenderManager()
