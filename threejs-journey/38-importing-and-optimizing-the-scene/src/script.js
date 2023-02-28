import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

//// !!!! TOPIC!!! background: baked.hdr is the texture (UV Unwrapped)
//// in a square that was created in the previous lesson. Then it was saved as baked.jpg
/// after a denoiser was applied (along with filmic) to clean out the material.
//// this combined with portal.glb is what will be used in JS


/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Object
 */
/// !!!! TOPIC: IMPORT MODEL!!

const bakedTexture = textureLoader.load('baked.jpg');
bakedTexture.flipY = false; // we need to unflip
// now we need to get all of the colors back as seen in the blender render,
bakedTexture.encoding = THREE.sRGBEncoding // we input sRGB texture, the renderer needs to know to OUTPUT in sRGBTexture
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

/// now the lamps and then the portal (these are the emissions objects in blender .. that emits light)
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 'white' })


gltfLoader.load(
    'portal.glb',
    (gltf) => {

        gltf.scene.traverse((child) => {
            console.log(child)
            child.material = bakedMaterial;
            if (child.name === 'poleLightA' || child.name === 'poleLightB') {
                child.material = poleLightMaterial;
            } else if (child.name === 'portalLight') {
                child.material = portalLightMaterial;
            } 
            
        })
        
        // or this for cleaner code on all children name/type
        const poleLightAMesh = gltf.scene.children.find(child => child.name === 'poleLightA');
        poleLightAMesh.material = poleLightMaterial;
        // or you can set it after finding the mesh
        
        scene.add(gltf.scene);
        // it's black! because it is gltf eports to PBR materials, which converts into MeshStandardMaterial (needs light!)
        // but we don't want light, we want to use baked JPG so we don't want MeshStandardMaterial\
    }
)


///// !!!! TOPIC OPTIMIZATION!! REDUCE DRAW CALLS!!!!!!!!! 1 big geometry to draw.
//// in blender => create new collection called merged, select everything + duplicate shift D, and move it to merged collection
//// ctrl+j to merge everything in that collection

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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
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
renderer.outputEncoding = THREE.sRGBEncoding; /// here it is added to output proper colors from blender!!

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()