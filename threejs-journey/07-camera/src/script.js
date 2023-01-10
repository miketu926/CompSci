import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// !!!!TOPIC: Camera 
// ArrayCamera => split screen display (think of 2 player video games)
// StereoCamera => depth effect for VR devices (red/blue glasses, cardboard VR, etc, 1 eye in 1 camera, and the other in another)
// CubeCamera => environment cameras (6 renders for each direction)
// Orthographic Camera => just a render of scene but without depth/perspective (kind of like age of empires)
// PerspectiveCamera is the most used
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// FOV 45-75 is a good range
// Aspect ratio
// 2 NEW parameters -> NEAR and FAR parameteres
// any objects within this range will show
// do not set arbritrary extreme low and high near and fars, this will result in z-fighting when the GPU doesn't know which obj is in front of another

// values for OrthoCamera (the 'render size')
const perspective = {
    left: -1,
    right: 1,
    top: 1,
    bottom: -1,
} // the aspect ratio should be considered as camera perspectives

const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1, 100)
// this is an example of OrthographicCamera and taking in the sides of a square/view

camera.position.set(0, 0, 3)
// camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// !!!!TOPIC: Controls
const cursor = {
    x: 0,
    y: 0,
}

// normalize window cursor position within the canvas
// subtract 0.5 to get the center point and direction
// window.addEventListener('mousemove', (e) => {
//     cursor.x = e.clientX / sizes.width - 0.5;
//     // console.log(cursor.x)
//     cursor.y = e.clientY / sizes.height - 0.5;
//     // console.log(cursor.y)
// }) this is a sample; control APIs help with this 

// !!!!TOPIC: Controls 
// DeviceOrientationControls (device gyro, except doesn't work on iOS)
// FlyControls -> space shape like controls that pulls you one way or another
// FirstPersonControls => same as FlyControls except you lose Y axes
// PointerLockControls => as all AWSD and mouse controls (using Pointer Lock JS API)
// OrbitControls => Using mouse to control rotation and panning w/ locks 
// TrackballControls => Using mouse to control rotation and panning w/o locks
// TransformControls => an "editor" like grid controller
// DragControls => moving objects using drag


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects

    // update camera on a flat plane in front of the cube
    // camera.position.x = cursor.x * 3;
    // camera.position.y = -cursor.y * 3;


    // now update camera to circle the cube 360 in depth
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position) // or right now in Vector3(0,0,0)

    // update Controls (required for any control updates like damping)
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()