interface ProgramInfo {
    program: WebGLProgram
    attribLocations: {
      vertexPosition: number
      vertexColor: number
    }
    uniformLocations: {
      projectionMatrix: WebGLUniformLocation | null
      modelViewMatrix: WebGLUniformLocation | null
    }
  }
  