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

// listen to window resize to update canvas sizing
window.addEventListener('resize', (e) => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update aspect
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
    // catpure for safari 
    const fullScreenElem = document.fullscreenElement || document.webkitFullscreenElement;
    // ensure conditions for webkitRequestFullScreen() b/c safari
    // ensure conditions for webkitExitFullScreen() b/c safari

    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
})

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
// renderer.setPixelRatio(window.devicePixelRatio) 
// limit this for devices w/ higher than 2 (not necessary beyond 2)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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



// !!!!TOPIC: Geometries
// Geometries are vertices (points) and faces (triangles)
// geometries can create particles or meshes
// particles are just on the vertices (points) and each point is a particle
// each vertex has POSITION, UV coords, NROMAL, ... everything


// Geometries < BoxGeometry || ... see geometry examples in threejsdocs
const box = {
    width: 1, // size on x axis
    height: 1, // size on y axis
    depth: 1, // size on z axis
    widthSegments: 10, // how many subdivisions in the x axis
    heightSegments: 10,
    depthSegments: 10,
} // segments how many triangles on each face


// create your own geometry!
const anotherBoxGeometry = new THREE.BoxGeometry(
    box.width,
    box.height,
    box.depth,
    box.widthSegments,
    box.heightSegments,
    box.depthSegments,
)


// use a float32array for efficiency
const positionsArray = new Float32Array(9)//

positionsArray[0] = 0 // x y z for first vertex
positionsArray[1] = 0
positionsArray[2] = 0

positionsArray[3] = 0 // x y z for second vertex
positionsArray[4] = 1
positionsArray[5] = 0

positionsArray[6] = 1 // x y z for thrid vertex
positionsArray[7] = 0
positionsArray[8] = 0

const anotherWay = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionsAttribute = new THREE.BufferAttribute(anotherWay, 3) // the 3 here contains 3 values each vertex
// for UV coords, it's 2 values per vertex, for particles, it's just 1 for 1 particle

const bufferGeometry = new THREE.BufferGeometry(); // use this to create your own vertexes
// 'position' values are used in shaders
bufferGeometry.setAttribute('position', positionsAttribute)

scene.remove(mesh)

// now to create more triangles
const count = 50; // 50 'triangle' faces have 3 vertices each and in each vertex there are 3 coords 
const anotherPositionsArray = new Float32Array(count * 3 * 3)
// fill with random values

const mapped = anotherPositionsArray.map(() => Math.random() - 0.5)
// for (let i = 0; i < count * 3 * 3; i++) {
//     anotherPositionsArray[i] = Math.random() - 0.5; // this chooses not from 0-1 but from -0.5 to 0.5
// }
console.log(mapped)
const anotherPositionsAttribute = new THREE.BufferAttribute(mapped, 3);
const anotherBufferGeometry = new THREE.BufferGeometry()
anotherBufferGeometry.setAttribute('position', anotherPositionsAttribute)


// MESH NEEDS GEOMETRY AND MATERIAL (MGM!!!!!)

const anotherMesh = new THREE.Mesh(
    // anotherBoxGeometry,
    // bufferGeometry,
    anotherBufferGeometry,
    new THREE.MeshBasicMaterial({
        color: 'blue',
        wireframe: true,
    }),
)



// test myself: create a mesh using bufferGeometry and add it to scene
// FIRST MGM

const testNumOfFaces = 1000;
const efficientArr = new Float32Array(testNumOfFaces * 3 * 3)
// provide random numbers for now
const efficientlyMapped = efficientArr.map(() => Math.random() - 0.5)

// then create BufferGeometry using some BufferedAttribute
const efficientlyBufferedAttribute = new THREE.BufferAttribute(efficientlyMapped, 3)
const efficientlyBufferedGeometry = new THREE.BufferGeometry();
efficientlyBufferedGeometry.setAttribute('position', efficientlyBufferedAttribute)

const testMesh = new THREE.Mesh(
    // G then M
    //bufferGeometry
    efficientlyBufferedGeometry,
    new THREE.MeshBasicMaterial({
        color: 'red',
        wireframe: true,
    })
)

// then add mesh to scene

scene.add(testMesh)
scene.add(anotherMesh)


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