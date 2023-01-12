import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/**
 * Textures
 */

// "under the hood" method
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.src = '/textures/door/color.jpg'
// image.onload = () => {
//     texture.needsUpdate = true
// }

// efficient method
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('onStart')
}
loadingManager.onLoaded = () => {
    console.log('onLoaded')
}
loadingManager.onProgress = () => {
    console.log('onProgress')
}
loadingManager.onError = () => {
    console.log('onError')
}
const textureLoader = new THREE.TextureLoader(loadingManager); // only one loader is needed for codebase
// params:
// str : url
// fn : onStart
// fn : onProrgess
// fn : onError
const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;
// rotation will be around 0,0, so for a center rotation we'll need to offset center by vector2
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// rotation is in radians so Math.PI is half a circle, Math.PI*2 is a FULL circle
// an eighth would be Math.PI * .25

// minification is when the texture is being squeezed into a small rendered obj (zoom out)
// magnification is when the texture is being stretched onto a large rendered obj (zoom in)
// we can apply different Filters to magFilter and maxFilter to avoid artifacts
// called moire patterns

// NearestFilter is the cheapest (performant FPS)
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter; // with this combo minFilter to NearestFilter, no need for mipmapping
// gain perfromance by generateMipmaps = false
colorTexture.magFilter = THREE.NearestFilter;

// when creating textures think about the weight, the size, and the data
// jpg is lossy compression but files are lighter, png is lossless compression but heavier with transparency
// use tinypng.com, use basis.

// use power of 2 textures so that mipmapping is more efficient otherwise threejs will resize which takes more time

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

// use texture inside material
const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({ map: colorTexture }) // here

// UV Unwrapping is how the texture is applied to the geometry 

const mesh = new THREE.Mesh(geometry, material)
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()