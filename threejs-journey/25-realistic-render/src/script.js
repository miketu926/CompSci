import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Test sphere
 */
const testSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
scene.add(testSphere)



/**
 * !!!!! TOPIC UPDATE ALL MATERIALS FN!!!
 */

const updateAllMaterials = () => {
    scene.traverse((child) => { // recurvsive traversal into the scene.
        // console.log(child) // all children traversals
        // only apply map to the meshStdMaterials

        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            console.log(child)
            // child.material.envMap = environmentMap; // can remove this if you have scene.environment = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity; // instead of setting this to a hardcoded value (or a variable, fit it in the debug)

            // !!! TOPIC SHADOW!!!!!!

            child.castShadow = true
            child.receiveShadow = true

            // now how do you add this into debug for #s of meshes?! use a debugObj
        }


    })
}

/// !!!!!!!TOPIC ABOUT SHADOW MAP ARTIFACTS !!!!!! CALLED SHADOW ACNE
// THERE ARE GLBs or design files where ridges of shadows occur on the obj itself
// THIS IS DUE TO THE SHADOW MAP CASTING SHADOW OF THE OBJ ON ITSELF (due to pixel calculations)
// SOLUTION - BIAS AND NORMALBIAS properties. This is to move the obj a bit more into the their normals to cover the shadow map

/**
 * !!!!! TOPIC MODELS GLTF LOAD
 */

gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        // console.log(gltf)
        gltf.scene.scale.set(10, 10, 10)
        gltf.scene.position.set(0, -4, 0)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene) // this is just a group

        gui.add(gltf.scene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('gltfRotation')

        updateAllMaterials()

    }
) // gltf loader will have the correct encoding automatically on their the model's textures
// no need to apply sRGB (only need to apply on the envMap)


const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nx.jpg',
])

environmentMap.encoding = THREE.sRGBEncoding // encoding for sRBE (pbr lightning) for all textures and on renderers
// 

scene.background = environmentMap;
scene.environment = environmentMap; // this will update every material supporting the envMap

debugObject.envMapIntensity = 5;
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)

/**
 * !!!!!! TOPIC!!!!! ENV MAP WILL LIGHT THE OBJECTS
 */

/**
 * DIrectional light
 */

const directionalLight = new THREE.DirectionalLight('white', 1)
directionalLight.position.set(0.25, 3, -2.25)
directionalLight.castShadow = true // shadowmap!!!!!!!! another render remember?!?!?!
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024) // effiencies! 

// shadow acne adjustmnets
directionalLight.shadow.normalBias = 0.01 // test values..... 0-.01 or 0.02, 0.03 etc
// directionalLight.shadow.bias = 0.01 // test values..... 0-.01 or 0.02, 0.03 etc THIS IS FOR FLAT SURFACES
scene.add(directionalLight)

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('lightZ')



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
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true, // this activates MSAA (MULTI SAMPLING!!!!!!)
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true // makes objects look less bright
renderer.outputEncoding = THREE.sRGBEncoding // can use THREE.GammaEncoding to play w/ lighting but it is not PBR
//sRGB is similiar to using 2.2 gamma factor value (light intensity offset of the eyes)

// these tone mapping algos apply 0-> whatever color intensity and
// normalize it so it's 0->1 (look up how low dynamic range and high dynamic range works.. this is converting HDR to LDR)
// renderer.toneMapping = THREE.ReinhardToneMapping;
// renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMapping = THREE.ACESFilmicToneMapping; // this is the best one (very aesthetic)
renderer.toneMappingExposure = 3; // more light exposed

gui.add(renderer, 'toneMapping', { // test all different types of toneMapping
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
})

gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)


// !!!!!!! TOPIC!!!! ALIASING IS THE STAIRLIKE EFFECT
// THIS IS DUE TO THE RENDERER HAVING TO CHOOSE IF THE GEO IS IN THE PIXEL OR NOT
// SOLUTIONS: We can "SUPERSAMPLE" which is cut pixels in halves vert and horizontally or "SSAA"
// WE CAN FULLSCREEN SAMPLE "FSAA" - but these are not performant (again, cutting pixels even more)
// 4x more pixels to render/draw...
// another one is Multi Sampling (MSAA) -> this divides pixels ONLY on the edges of the geometry where the render has to decide!!!
// MSAA is more performant OBVIOUSLY!!!!!

// !!!!! TOPIC SHADOWMAPS!!!
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // activate shadow map here, and light, and textures

/**
 * Animate
 */
const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()