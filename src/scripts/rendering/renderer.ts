import { initBuffers } from "./initBuffers"
import { drawScene } from "./drawScene"

let squareRotation = 0.0
let deltaTime = 0


const main = () => {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement
  const gl = canvas.getContext("webgl2") as WebGL2RenderingContext

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    )
    return
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

  if (!shaderProgram) throw "Failed to create shader program"

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVertexColor and also
  // look up uniform locations.
  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  }
  
  // Call the routine that builds all the objects we'll be drawing.
  const buffers = initBuffers(gl)

  let then = 0

  const render = (now: number) => {
    now *= 0.001
    deltaTime = now - then
    then = now

    drawScene(gl, programInfo, buffers, squareRotation)
    squareRotation += deltaTime

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

// Initialize a shader program, so WebGL knows how to draw our data
const initShaderProgram = (gl: WebGL2RenderingContext, vsSource: string, fsSource: string) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  if (!vertexShader || !fragmentShader) throw "Failed to load shader"


  const shaderProgram = gl.createProgram()

  if (!shaderProgram) throw "Failed to create shader program"

  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)


  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    )
    return null
  }

  return shaderProgram
}

// creates a shader of the given type, uploads the source and compiles it
const loadShader = (
  gl: WebGL2RenderingContext,
  type: typeof WebGL2RenderingContext.VERTEX_SHADER | typeof WebGL2RenderingContext.FRAGMENT_SHADER,
  source: string
  ) => {
  const shader = gl.createShader(type)

  if (!shader) throw "failed to create shader"

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    )
    gl.deleteShader(shader)
    return null
  }

  return shader
}

main()
