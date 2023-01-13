import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// the material will put color on each pixel of the geometry
// the algo are written in programs called shaders - this 'shades' the geometry or color them
// decides the color of each pixel

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



// having 1 material is better for performance

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

//////// TESTING DIFFERENT material methods
// THERE ARE
// MeshBasicMaterial
// MeshNormalMaterial
// MeshMatcapMaterial
// MeshDepthMaterial
// **
// const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('pink') }) // can use in multiple meshes
// const material = new THREE.MeshBasicMaterial() // can use in multiple meshes
// material.map = colorTexture; // two ways of doing this, direct assign or pass into material as obj
// material.color.set('red') // once material is set there are classes like Color. So we need to use set
// material.color = new THREE.Color('green')
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = alphaTexture;
// material.side = THREE.DoubleSide; // try avoiding this, this requires more calcs
// material.flatShading = true;
// material.matcap = matcapTexture; // simulate light in the scene!!!
// // it will take a texture/referenced image and position it on the geometry 

// properties like wireframe or opacity can be used w/ other types of materials
// **
//////// TESTING DIFFERENT material methods


// !!!!!REVIEW -> MGM Mesh -> Geometry (YOU CAN CREATE YOUR OWN GEOMETRY!!!! using float32Array!!!) -> Material


// const material = new THREE.MeshNormalMaterial(); // pretty performant w/ cool colors
// normals are info that contains the direction of the outside of the face (vector info)
// normals are used for lighting, reflection, or refraction (how does it now where to bounce or which side has light)
// normals have points -> points at light which is light side, points away from light is the shadow side
// material.wireframe = true;

// MeshMatcapMaterial will display a color by using the normals as a reference
// to pick the right color on a texture that looks like a sphere
// const material = new THREE.MeshMatcapMaterial()
// const material = new THREE.MeshDepthMaterial(); // colors white as the camera moves closer, darkens as it goes further
// creates a false sense of fog etc

// material.side = THREE.DoubleSide;
// material.matcap = matcapTexture;



//////////// Lights
// color, intensity as params
const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight('white', 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
// these materials react to light
// this is performant
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial - this will bounce light onto the camera
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100; // shiny
// material.specular = new THREE.Color('red') // reflection of light

// MeshToonMaterial - cartoon ish
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// always better to deactivate mipmaps and we can using nearestFilter
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture; // this gradientTexture only has 3 shades

// super lightweight but more realistic and more parameters
// this uses PBR principles (physically based rendering === realistic physics) same as MeshPhongMaterial

const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45
// material.roughness = 0.45
// material.map = colorTexture;


// adding shadows via ambient occlusion, but this needs UV Coords
// we need to dupe current UV Coords


//////////// Lights



//// objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

sphere.position.x = -1.5
torus.position.x = 1.5

const group1 = new THREE.Group()
group1.position.y = 1

group1.add(sphere)
group1.add(plane)
group1.add(torus)
scene.add(group1)


// Objects

//////// LGIHT (cont. because UV coords it needs objects)
// // start of doubly commented out below
console.log(plane.geometry.attributes)
// const currentPlaneArray = plane.geometry.attributes.uv.array
// const currentSphereArr = sphere.geometry.attributes.uv.array
// const currentTorusArr = torus.geometry.attributes.uv.array
// // uv2 is needed for shadowing (ambientOcclusion), the first set of uv is for texture
// // UV coords are vector2
// plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(currentPlaneArray, 2))
// sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(currentSphereArr, 2))
// torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(currentTorusArr, 2))

// material.aoMap = ambientOcTexture; // adds shadows in crevaces of the door 
// material.aoMapIntensity = 1; // controls shadow intensity
// // displacementMap will move the verticies to create relief (or height)
// material.displacementMap = heightTexture; // displace and height are the same, updates height
// // the heightTexure has white and black, when white it goes up, when black it goes down
// // when its gray it doesn't move
// // will need more subdivisions for each verticies
// material.displacementScale = 0.05
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5)

// material.alphaMap = alphaTexture; // sets what gets removed and what is the actual obj
// material.transparent = true; // need transparent = true for alpha to work

// another material is similar to MeshStandardMaterial
// const material = new THREE.MeshPhysicalMaterial(); // has a clearcoat (less performant)
// ShaderMaterial and RawShaderMaterial => create your own own shader materials
// // ends this is doubly commented out below
//////// LGIHT (cont. because UV coords it needs objects)





// !!!!!!!TOPIC environment map - an image of what is surrounding the scene
// uses lighting, reflection, refraction

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
// we are using 6 images to load this cube texture
// use website matheowis.github.io/HDRI-to-CubeMap to change a 360 into cubeMap and load it
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg', // positive x etc
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
])
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;
// !!!!!!!!TOPIC environment map





//////////// debug
const gui = new dat.GUI()
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(10).step(0.0001)
// gui.add(material, 'normalScale')

//////////// debug



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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update objects
    // group1.rotation.y = 0.2 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()