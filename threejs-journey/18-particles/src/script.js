import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'


// !!!!TOPIC: Particles: each particle composes of 1 plane (2 triangles)
// Creating a threejs Class Points


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
const particleTexture = textureLoader.load('/textures/particles/2.png')

// !!!! START PARTICLES
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true, // this allows perspective (depth large to small)
    color: 'pink',
    alphaMap: particleTexture,
    transparent: true,
    // these tests are to get rid of the black square surrounding alphaMap (the black still renders)
    // alphaTest: 0.001, // alphaTest tells the GPU to not even draw black areas where it should be transparent - from the docs it says the material will not be rendered if the opacity is lower than this value
    // depthTest: false, // this fixes the opacity blocking issue but causes other bugs like other meshes in your scene or particles w/ another color. This toggle will ignore objects whether it's in front or back, it'll just draw everything w/o perspective.
    depthWrite: false, // Also another thing is depth uses depthBuffer, so having this false says to not draw or put info inside this depth buffer and not check perspective
    blending: THREE.AdditiveBlending, // when particles overlay, it gets brighter or adds colors together (glowing effect) // this impacts performance
    vertexColors: true, // this is needed when building Float32Array bufferAttributes
})

// this exercise is to make your own
// note that the GPU draws partciles as they are created, so
// some particles in the front will overlap the partciles drawn later in the back
// there are multiple ways to fix this in material properties
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const positions = new Float32Array(particlesCount * 3) // position array x y z vector3
const colors = new Float32Array(particlesCount * 3) // we can create our own color attributes array, but this is R, G, B instead of X Y Z

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10 // adjusting the position and amplitude
    colors[i] = Math.random()
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)
particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);



// !!!!TOPIC Animate particles!!!!




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.z = 3
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate particles!!
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3 // another method of looping - and then add 1 or add 2 to get the 2nd and 3rd increment

        const x = particles.geometry.attributes.position.array[i3 + 0];
        particles.geometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x) // for y value - this attribute change needs to update

    }

    particlesGeometry.attributes.position.needsUpdate = true; // this needs update after attributes are updated

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// tick()