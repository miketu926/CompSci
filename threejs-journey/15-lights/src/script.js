import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
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
 * !!!!TOPIC !!!! LIGHTS
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// all rays are parallel coming from 1 direction
const directionalLight = new THREE.DirectionalLight('white', 0.5);
// scene.add(directionalLight)

// red from the top, blue from the bottom, purple mixed
// grass and sky is a good example
const hemisphereLight = new THREE.HemisphereLight('red', 'blue', 0.3);
// scene.add(hemisphereLight);

const pointLight = new THREE.PointLight('white', 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight);
// the 3rd parameter is the distance that the point light will travel to
// and the 4th parameter is decay is how fast the light will decay

const rectAreaLight = new THREE.RectAreaLight('blue', 2, 1, 1)
scene.add(rectAreaLight)
// 3rd and 4th params are width and height of light
rectAreaLight.lookAt(new THREE.Vector3(0,0,0))

// these are params for the spot light - aka flash light 
const spotLight = new THREE.SpotLight('green', 0.5, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0,2,3);
scene.add(spotLight);
// there is on main diff between this and other lights
// spot light has a target to point its light at
// in order to update the target, we need to add the target to scene
spotLight.target.position.x = -1;
scene.add(spotLight.target);


// additional info -> light costs performance!
// this is because light renders right before the paint render. Light renders the number of lights before the paint.
// this is because it first captures the image from the light, and then another image at the camera position
// during light renders, all Meshes get replaced w/ MeshDepthMaterial in order to get depth
// light renders are store as texture shadow maps (textures of what the light can see)
// 

// THEREFORE:
// add as few lights as possible, add efficient lights, list from efficient to not below
// (ambient, hemisphere), (directional, point), (spotlight, rectarealight)

// !!!!!!!!TOPIC BAKING!
// use a 3D software to bake in light, downside is you can't move objects the shadow will remain


// !!!!!!!!!TOPIC HELPERS!!!
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
window.requestAnimationFrame(()=> spotLightHelper.update()) // this is diff and needs to be done for spotLighHelper

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper)


/**
 * !!!!TOPIC !!!! END LIGHTS
 */


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()