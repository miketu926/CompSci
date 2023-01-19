import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    width: 400,
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * !!!! START GALAXY!!!
 */

const parameters = {
    count: 100000, // count of particles or stars in this case
    size: 0.01, // size of each particle
    radius: 5, // the radius of the galaxy
    branches: 3, // number of branches from the middle
    spin: 1,
    randomness: 0.02,
    randomnessPower: 3,
    insideColor: 'orange',
    outsideColor: 'blue',
}

// !!!!TOPIC DESTROY!!! set these outside in order to destroy!!!
let geometry, material, points

const generateGalaxy = () => {

    // dispose!!! // ensure to dispose geometry and material and then remove the mesh from the scene
    if (points) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3) // x y z values
    const colors = new Float32Array(parameters.count * 3) // R G B values

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        /// the start of creating the galaxy!!!

        // position
        const radius = Math.random() * parameters.radius
        // module here provides the repeating position of branches
        // then convert it to % of the angle of a circle so they are evenly anglely spaced in circle
        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2  // this then becomes the % of a circle  
        // we don't want to place anythign on the z, just the x and y

        // spin (* radius because the further out the more + angle applied)
        const spinAngle = radius * parameters.spin

        // const randomX = (Math.random() - 0.5) * parameters.randomness;
        // const randomY = (Math.random() - 0.5) * parameters.randomness;
        // const randomZ = (Math.random() - 0.5) * parameters.randomness;

        // this power 0->1 % is a parabolic trick to get randomness in lower numbers and changes of getting high numbers are slim
        // in this case, there will be more particles concentrated near original branch and less particles further out
        // then at the end we will take the inverse 50% of the time
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX// x
        positions[i3 + 1] = 0 + randomY// y
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ // z

        // colors attribute - all buffer info are in geometry
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / parameters.radius)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )
    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )

    // material
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })

    // points
    points = new THREE.Points(geometry, material);
    scene.add(points);
}

generateGalaxy();

gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)



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
camera.position.x = 3
camera.position.y = 3
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