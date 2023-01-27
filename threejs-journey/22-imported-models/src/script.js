import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


// random thing to note, PBRs (physically based renders gets converted to meshstandardmaterial which needs lights!!!)

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
 * !!!! TOPIC!!! GLTF Loaders
 * there are multiple ways to add the 'duck' in this gltf
 * add the whole scene to scene, add the children of the scene and ignore perspective camera
 * 
 * filter the children before adding to the scene (whatever it is you want to filer)
 * 
 * add only the mesh if you traverse through the children and then the obj (duck) and then it's mesh
 * this causes a problem becasue if you add that mesh, it will scale relative to it's parent, meaning it will get as big as its parent
 * 
*/

const loadingManager = new THREE.LoadingManager();

const gltfLoader = new GLTFLoader();
console.log(gltfLoader)

/// load draco! -> this may need some pro/con -> if loading a small geometry, then no need to import these files in static/draco/ 
// that comes from node_modules/three/examples/jsm/draco/ and copy this to use in code. this is because of VERSIONING.
const dracoLoader = new DRACOLoader() // can run draco in a worker (cpu working for efficiency w/ uncompression)
dracoLoader.setDecoderPath('/draco/') // this can use draco loader and web assembly .wasm (this is a worker that in this file)
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null;

gltfLoader.load(
    //  '/models/Duck/glTF/Duck.gltf',
    //  '/models/Duck/glTF-Binary/Duck.glb', // this works too!
    //  '/models/Duck/glTF-Embedded/Duck.gltf', // this work
    // '/models/Duck/glTF-Draco/Duck.gltf', // this does NOT work (cont pt 2) -> this needs draco loader from jsm/
    '/models/Fox/glTF/Fox.gltf', // this does NOT work (cont pt 2) -> this needs draco loader from jsm/
    //  '/models/FlightHelmet/glTF/FlightHelmet.gltf', // this has more children!!!
    // success
    (gltf) => {
        console.log(gltf)
    // scene.add(gltf.scene.children[0]) // this is used to add only 1 children

    // we do while because when you add a mesh from 1 scene to another, it automatically gets removed (so for loop can't track shortening array lengths)
    // while (gltf.scene.children.length) {
    //     scene.add(gltf.scene.children[0]) 
    // } 
    
    // OR make a copy of the array so it doesn't have ref to the original and add to scene. (this won't remove from original scene)
    // const children = [...gltf.scene.children]

    // for (const mesh of children) {
    //     scene.add(mesh)
    // }

    // !!! TOPIC DRACO ( CONT 2)
    // draco is light, compression is applied to buffer data (the geometry) it's not explicit to gltf and became popular in exporting and importing
    // developed by Google by Apache 


    
    
    // OR ADD SCENE TO YOUR SCENE -> heavier?

    /// !!!! TOPIC ANIMATIONS!! in the animations map in gltf file
    // think of these as key frames (Animation Clip from threejs, which needs Animation Mixer to play these key frames)

    mixer = new THREE.AnimationMixer(gltf.scene) // this needs to be outer scope 
    const action = mixer.clipAction(gltf.animations[0]) // get an action // indexes are different actions of this fox
    // walking running etc
    console.log(action) // => gets first animation action, then we have access to play methods

    action.play() // the problem with this is to tell the mixer to update
    
    gltf.scene.scale.set(0.025,0.025,0.025)
    scene.add(gltf.scene)
    
    

    
    },
    // progress
    () => {
        console.log('progress')
    },
    // success error
    () => {
        console.log('error')
    }
 )
 





/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // add mixer update

    if (mixer) {
        mixer.update(deltaTime)
    }
    // mixer && mixer.update(deltaTime)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()