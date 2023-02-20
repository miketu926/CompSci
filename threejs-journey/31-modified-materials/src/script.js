import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
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
 * Loaders
 */
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMapIntensity = 1
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

/**
 * Material
 */

// Textures
const mapTexture = textureLoader.load('/models/LeePerrySmith/color.jpg')
mapTexture.encoding = THREE.sRGBEncoding

const normalTexture = textureLoader.load('/models/LeePerrySmith/normal.jpg')

// Material
const material = new THREE.MeshStandardMaterial( {
    map: mapTexture,
    normalMap: normalTexture
})


// TOPIC!!! shadow ( after cont. fix shadows using MeshDepthMaterial custom hook)

const depthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
})

const customUniforms = {
    uTime: { value: 0 },
}

// !!!! TOPIC!! HOOK INTO MATERIAL and modify the material 
// exercise is to rotate the still head.
// always replace in order of the original code includes

material.onBeforeCompile = (shader) => {
    // called before the material gets loaded
    // access all of the settings of a material aka uniforms, shaders etc
    console.log(shader); 
    shader.uniforms.uTime = customUniforms.uTime; // add our own uniform var
    
    // replace code in vertex shader and write our own
    // will need a outside fn to help w/ the head rotation animation
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>

            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle) {
                return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
            }
            
        `
    )

    // (cont fix for "core shadow" update)
    // this goes between common and begin_vertex because that's the order of the original
    shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
            #include <beginnormal_vertex>
            float angle = (position.y + uTime) * 0.9;
            // we can now use get2RotateMatrix b/c we replaced a common fn!

            mat2 rotateMatrix = get2dRotateMatrix(angle);

            // now we replace biginnormal var
            objectNormal.xz = rotateMatrix * objectNormal.xz;

        `
    )
    
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            // float angle = (position.y + uTime) * 0.9; // we need to comment out this line
            // now that we redefined in the fix for core shadow
            // we can now use get2RotateMatrix b/c we replaced a common fn!

            // mat2 rotateMatrix = get2dRotateMatrix(angle); // also this too due to redefinition

            transformed.xz = rotateMatrix * transformed.xz;
        `
    )


    
}

// !!!!! TOPIC!!! We created depthMaterial so that we can update it in
// the loaded glb and point it to mesh.customDepthMaterial and modify it in shader
// MeshDepthMaterial is what is used to bake in shadows. We now need to animate its "drop shadows"
// another problem will exist after this is the "core shadows" will not be the same as "drop shadows"
// core shadows are on the model and (cont to part 2)

depthMaterial.onBeforeCompile = (shader) => {
    console.log(shader);

    shader.uniforms.uTime = customUniforms.uTime; // add uTime var again to be used
    // this is to now animate the "drop shadow" since we animated it to the model
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
            #include <common>

            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle) {
                return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
            }
            
        `
    )

    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
            #include <begin_vertex>

            float angle = (position.y + uTime) * 0.9;
            mat2 rotateMatrix = get2dRotateMatrix(angle);

            transformed.xz = rotateMatrix * transformed.xz;
        `
    )
    
}

/**
 * Models
 */
gltfLoader.load(
    '/models/LeePerrySmith/LeePerrySmith.glb',
    (gltf) =>
    {
        // Model
        const mesh = gltf.scene.children[0]
        mesh.rotation.y = Math.PI * 0.5
        mesh.material = material
        
        // update the material (for shadows)
        mesh.customDepthMaterial = depthMaterial;

        scene.add(mesh)

        // Update materials
        updateAllMaterials()
    }
)

// !!! TOPIC!! fix shadows after the animation (cont) 

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(15, 15, 15),
    new THREE.MeshStandardMaterial()
)

plane.rotation.y = Math.PI;
plane.position.y = - 5;
plane.position.z = 5;
scene.add(plane)



/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, - 2.25)
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
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // !!! cont TOPIC!!! uTime value that we scoped out
    customUniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()