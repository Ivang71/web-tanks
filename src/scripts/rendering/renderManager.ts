import { mat3 } from 'gl-matrix'
import { Entity } from '../types/entityTypes'
import { initShaderProgram, resizeCanvasToDisplaySize } from './renderUtils'
import vsSource from './shaders/shader.vert'
import fsSource from './shaders/shader.frag'

class RenderManager {
    private gl: WebGL2RenderingContext
    private program: WebGLProgram
    private renderQueue: Entity[] = []
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
        gl.vertexAttribPointer(this.positionAttribLoc, 2, gl.FLOAT, false, 0, 0)

        const baseMatrix = mat3.create()
        mat3.projection(baseMatrix, canvas.clientWidth, canvas.clientHeight)

        let totalSize = 0
        for (const entity of this.renderQueue) {
            totalSize += entity.vertices.length * Float32Array.BYTES_PER_ELEMENT
        }

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, totalSize * Float32Array.BYTES_PER_ELEMENT, gl.DYNAMIC_DRAW)
        let offset = 0

        for (const entity of this.renderQueue) {
            gl.bufferSubData(gl.ARRAY_BUFFER, offset, new Float32Array(entity.vertices))
            gl.uniform4f(this.colorLoc, ...entity.color)

            const matrix = mat3.clone(baseMatrix)
            mat3.translate(matrix, matrix, entity.position)
            mat3.rotate(matrix, matrix, entity.rotation)
            mat3.scale(matrix, matrix, entity.size)

            gl.uniformMatrix3fv(this.matrixLoc, false, matrix)
            gl.drawArrays(gl.TRIANGLES, offset, entity.vertices.length)
            offset += entity.vertices.length * Float32Array.BYTES_PER_ELEMENT
        }

        // const squareVertices = new Float32Array([
        //     -0.5, -0.5,   // Bottom-left corner
        //      0.5, -0.5,   // Bottom-right corner
        //      0.5,  0.5,   // Top-right corner
        //     -0.5,  0.5,   // Top-left corner
        //   ]);
      
        //   gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        //   gl.bufferData(gl.ARRAY_BUFFER, squareVertices, gl.STATIC_DRAW);
      
        //   gl.enableVertexAttribArray(this.positionAttribLoc);
        //   gl.vertexAttribPointer(this.positionAttribLoc, 2, gl.FLOAT, false, 0, 0);
      
        //   // Set a simple matrix (identity matrix in this case)
        //   const matrix = mat3.create();
      
        //   // You can add additional transformations if needed
      
        //   gl.uniformMatrix3fv(this.matrixLoc, false, matrix);
      
        //   // Set a color (e.g., white)
        //   gl.uniform4f(this.colorLoc, 1.0, 1.0, 1.0, 1.0);
      
        //   // Draw the square
        //   gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)

        this.renderQueue = []
    }

    enqueue(entity: Entity) {
        this.renderQueue.push(entity)
    }
}

export const renderManager = new RenderManager()
