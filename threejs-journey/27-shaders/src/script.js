import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * !!!! TOPIC!!! Shaders are written in GLSL (sent to the GPU)
 * !! it positions each vertex of a geometry and another shader colorizes each visible pixel of that geometry
 * FRAGMENTS!!!! ARE PIXELS FOR THE SHADERS. We send a lot of data to the shader....
 * 
 * THERE ARE 2 TYPES OF SHADERS:
 *       VERTEX (attributes are data for each vertex aka BufferAttribute)
 *           Attributes are data that are different between each vertex, the opposite is Uniforms
 *       FRAGMENT
 *           Once the verticies are placed, Fragment is next to draw out the geometry
 *           Only Uniform and Varying data goes over, no attributes (everything that is visible is a color)
 *           There is also Varying data. These MIX or INTERPOLATED colors based on each color of each vertex
 *           
 *       Used for simple tasks or used for post processing
 * 
 *       Usage:
 *       ShaderMaterial or RawShaderMaterial (there is nothing vs ShaderMaterial with some under the hood boilerplate)
 * 
 *       SYNTAX:
 *         .glsl is close to C, there is no console print because its GPU not CPU
 *         identation is not important
 *         semicolon is IMPORTANT
 *         variables is a typed lang 
 * 
 * 
 *       Continue to RawShaderMaterial
 *       
 */


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// !!!!!!!!!! TOPIC load textures into fragment shader!!!
const flagTexture = textureLoader.load('/textures/flag-french.jpg')

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)


/// !!!!!!!!!! TOPIC!!!!!!! LETS GET THIS VAR INTO OUR SHADER!!!!

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)
for (let i = 0; i < count; i++) {
    randoms[i] = Math.random();
}
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1)) // just 1 here
// if it's attributes, you use a, if varying, use v, and if uniform use u
// now that the geometry has an attribute, can use it in shader as aRandom

// !!!!!!! TOPIC replace MeshBasicMaterial w/ RawShaderMaterial 
///// !!! END OF TOPIC: use ShaderMaterial and it'll take care of redefinition of basic attributes and uniforms in shaders
// needs verrtex and fragment programs
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    wireframe: true,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: { // uniforms get read by vertex and fragments
        uFrequency: {
            // type: 'vec2', // don't need type anymore, old threejs
            // value: 20, // this gets passed in!! now we can provide anything we want aka vectors
            value: new THREE.Vector2(10, 5),
        },
        uTime: { // can also pass in uTime into vertex to make the flag wave
            value: 0,
        },
        uColor: {
            value: new THREE.Color('blue'), // instead of controlling via dat.gui which we can do
            // we'll fetch this var from fragment
        },
        uTexture: {
            value: flagTexture,
        },
    }

    // properties that work: wireframe, side, transparent, flatShading
    // don't work: map, alphaMap, opacity, color b/c it's handled via Fragment Shader
})


// adding to dat GUI!!

gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyy')


// Mesh
const mesh = new THREE.Mesh(geometry, material)
//// this can also be modified after a mesh is created from shaders

mesh.scale.y = 2 / 3; // squeeze it to 60%ish to look like a flag


scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // we dont want to pass in Date.now() because some numbers are too big to get passed into shaders as floats 

    // update materials
    material.uniforms.uTime.value = elapsedTime; // this then gets sent into the vertex

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()