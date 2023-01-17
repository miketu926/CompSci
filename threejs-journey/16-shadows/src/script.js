import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { DirectionalLight } from 'three'


/**
 * Baked Shadow Texture
 * 
 */

const textureLoader = new THREE.TextureLoader();
const bakedShadow  = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadowTexture = textureLoader.load('/textures/simpleShadow.jpg')

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
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)


//////// TOPIC!!!!!!!!! SHADOW PROPERTIES 
// we can make the shadow render texture image larger in width and height in order to get a better shadow pic quality
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024 // use a power of 2!
directionalLight.shadow.mapSize.height = 1024 // use a power of 2!
// we can improve the shadowMap by adjusting the camera (this is a OrthoCamera)
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.near = 1

// attributes of shadow
directionalLight.shadow.radius = 10


// directional light shadows!!!

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
directionalLightCameraHelper.visible = false; /// this can be a toggle
scene.add(directionalLightCameraHelper)

gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)


// spotlight shadows!!

const spotLight = new THREE.SpotLight('white', 0.1, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
// now we can play with FOV for perspective cam vs near/far for Ortho
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 2;
spotLight.shadow.camera.far = 5;

spotLight.position.set(-1,1,0);
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(spotLightCameraHelper)


// point light shadows!!! 
// this is strange is because there are perspectiveCameras doing renders in every direction (6 directions total)
// this is a lot of renders!!!
const pointLight = new THREE.PointLight('white', 0.5)
pointLight.castShadow = true;

pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 2

pointLight.position.set(-1,1,0);
scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
// scene.add(pointLightHelper);
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)

/// !!!!TOPIC!!! BACKING IN SHADOWS INTO A TEXTURE!!!!!


///////

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)

///////// TOPIC!!! SHADOWS AFTER SHADOWMAP ENABLED!!!!!!
// this is for shadowMapping! the obj that casts and receives shadows!!!
// pointlight, directional light and spotlight supports shadows
sphere.castShadow = true;


/////// CONT. BAKING TEXTURES USING bakedShadow

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    // material
    new THREE.MeshBasicMaterial({map: bakedShadow}) // but if you move your sphere obj shadow won't work
)

// another baked shadow solution that can move!!!!!!!
// DIFFUSION -> 


plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

plane.receiveShadow = true;



scene.add(sphere, plane)


const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: '0x000000',
        transparent: true,
        alphaMap: simpleShadowTexture,
    })
)

sphereShadow.rotation.x = Math.PI * -0.5
sphereShadow.position.y = plane.position.y + 0.01; // we wnat it on the plane level to mimic a shadow so move it up just a bit
scene.add(sphereShadow);



///////// TOPIC!!! SHADOWS AFTER SHADOWMAP ENABLED!!!!!!



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// !!!!!!!!!! ADD SHADOW MAP!! FOR SHADOWS!! IN RENDERER!!!!

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
///////// TOPIC!!! SHADOWS AFTER SHADOWMAP ENABLED!!!!!!
// this is turned off b/c we are using alternatives to shadows
// turn on to cast and receive shadows!!!
// renderer.shadowMap.enabled = true; <- cast or receive shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap // raidus doesnt work with PCFSoftShadowMap


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update sphere
    sphere.position.x = Math.cos(elapsedTime) 
    sphere.position.z = Math.sin(elapsedTime)
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    // update the shadow by moving the shadow floor up and down w/ the ball
    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = 1 - sphere.position.y
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()