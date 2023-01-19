import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

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
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * !!!!TOPIC RAYCASTER!!!!!!!!!!!
 */


const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// // rays are noramlized (length of 1)
// rayDirection.normalize(); // this reduces to length of 1 but keeps it's direction, called a unit vector

// raycaster.set(rayOrigin, rayDirection) // orientate raycaster needs origin and direction b/c it is a vector

// const intersect = raycaster.intersectObject(object2) // gets 1 obj
// const objectsToTest = [object1, object2, object3]

// const intersects = raycaster.intersectObjects(objectsToTest) // gets an array of objs
// console.log(intersects.length)

// note, a raycaster can hit 1 obj more than once (for ex a donut)

// test rays on each frame on animated objs (this can be heavy)



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


// !!!! TOPIC CURSOR MOUSE EVENTS AND RAYCASTER

const mouse = new THREE.Vector2() // only captures x and y on a flat screen

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1 // we want this to be normalized from -1 to 1
    mouse.y = - (e.clientY / sizes.height) * 2 + 1  // we need to invert to have neg at the bottom
})


// we want to fire on the frame rate!!! for performance purposes



// !!!!TOPIC MOUSE MOUSEENTER AND MOUSELEAVE USING A WITNESS VARIABLE

let currentIntersect = null; // witness
window.addEventListener('click', () => {
    if (currentIntersect) {
        // action when clicking on a sphere!!
        console.log('clicked on a sphere')
        console.log('==> obj being clicked', currentIntersect.object)
    }
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

    // animate objects // inside is frequency or speed, outside is amp. GET AMPED OUTSIDE!!!
    object1.position.y = Math.sin(elapsedTime)
    object2.position.y = Math.sin(elapsedTime * 3) * 2
    object3.position.y = Math.sin(elapsedTime * 0.8) * 2



    // // !!!! TOPIC RAYCASTER W/ UPDATES
    
    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(10, 0, 0)
    // // rays are noramlized (length of 1)
    // rayDirection.normalize(); // this reduces to length of 1 but keeps it's direction, called a unit vector

    // raycaster.set(rayOrigin, rayDirection) // orientate raycaster needs origin and direction b/c it is a vector

    // const intersect = raycaster.intersectObject(object2) // gets 1 obj
    const objectsToTest = [object1, object2, object3]

    const intersects = raycaster.intersectObjects(objectsToTest) // gets an array of objs
    // console.log(intersects.length)

    // // we have to push a red color on every draw
    // // and then only when it touches it changes color to blue
    // // this should be very manuel
    
    // objectsToTest.forEach(obj=> {
    //     obj.material.color.set('red')
    // })
    
    // intersects.forEach(intersection => {
    //     intersection.object.material.color = new THREE.Color('blue')
    // })
    
    // // !!!! TOPIC RAYCASTER W/ UPDATES


    // !!!!TOPIC RAYCASTER USING MOUSE (CONT. from mouse settings)
    // coordinate of mouse and origin of the ray (in this case from the camera)
    raycaster.setFromCamera(mouse, camera)
    
    objectsToTest.forEach(obj=> {
        obj.material.color.set('red')
    })
    
    intersects.forEach(intersection => {
        intersection.object.material.color = new THREE.Color('blue')
    })

    if (intersects.length) { // something in hover
        if (!currentIntersect) { // this is a MOUSEENTER event
            // action
        }
        currentIntersect = intersects[0]
    } else { // something not hover
        if (currentIntersect) { // this is a MOUSELEAVE event
            // action
        }
        currentIntersect = null
    }


    
    // !!!!TOPIC RAYCASTER USING MOUSE (CONT. from mouse settings)


    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()