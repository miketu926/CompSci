import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const _gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/5.png')

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 10, 10, 10),
    new THREE.MeshBasicMaterial()
)

cube.material.wireframe = true;
// cube.material.color = new THREE.Color('red')


const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);









///////// !!!!TOPIC FONT LOADER

// 1. load font
const fontLoader = new FontLoader();
// console.log(fontLoader);

const group = new THREE.Group();
// cube.position.x = -2
group.add(cube);

// first param is string
// second param are attributes
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        // 2. create geometry
        const textGeometry = new TextGeometry(
            'Scene',
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            }
        );

        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox) // this is null if we don't compute first. This is a Box3 Class
        // min and max means the start and the ends of box/spheres

        
        // translate moves every vertex
        // textGeometry.translate(
        //     - 0.5 * (textGeometry.boundingBox.max.x - 0.02), // the off center is because of bevelSize
        //     - 0.5 * (textGeometry.boundingBox.max.y - 0.02), // the off center is because of bevelSize
        //     - 0.5 * (textGeometry.boundingBox.max.z - 0.03) // the off center is because of bevelThickness
        // ) // this is not the exact center b/c of bevelThickness and bevelSize
        console.log(textGeometry.boundingBox)

        // OR JUST USE TEXTGEOMETRY.CENTER!!!!!!!!!!!!!!! ^ the above is the how*

        textGeometry.center()
        console.log(textGeometry.boundingBox)

        const textMaterial = new THREE.MeshStandardMaterial(); // in order to use matcap, we need a meshmatcap material and not a meshbasicmaterial
        textMaterial.matcap = matcapTexture;
        console.log(matcapTexture)
        console.log(textMaterial);
        console.log(textGeometry);

        // _gui.add(textGeometry, 'parameters.options.bevelSize').min(0).max(1).step(0.01)
        // _gui.add(textMaterial, 'roughness').min(0).max(10).step(0.001);
        // _gui.add(textMaterial, 'metalness').min(0).max(10).step(0.001);

        
        const text = new THREE.Mesh(textGeometry, textMaterial);

        const ambientLight = new THREE.AmbientLight('white', 0.5)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight('white', 0.5);
        pointLight.position.set(-2,3,3)
        scene.add(pointLight);

        console.time('test')
        
        for (let i = 0; i < 1; i++) {
            const anotherText = new THREE.Mesh(textGeometry, textMaterial);
            const scaleNum = Math.random() * 10

            anotherText.position.x = scaleNum
            anotherText.position.y = scaleNum
            anotherText.position.z = scaleNum
            anotherText.rotation.x = scaleNum
            anotherText.rotation.y = scaleNum
            anotherText.rotation.z = scaleNum

            anotherText.scale.set(scaleNum, scaleNum, scaleNum)
            // scene.add(anotherText)
        }
        
        console.timeEnd('test')
        
        // text.material.wireframe = true;
        // text.position.x = 1;
        // text.position.y = -0.5
        // group.add(text)
        scene.add(group)
    }
)

// !! TOPIC: Bounding - Info associated w/ geometry that tells what SPACE IS TAKEN BY THAT GEOMETRY
// BOUNDING wireframes can be a box or a sphere. What space does the geometry take up
// this helps to know what the camera should render (in or out of bounds)
// called frustum culling




///////// !!!!TOPIC FONT LOADER








scene.add(cube)

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

    // update objects
    // cube.rotation.x = elapsedTime * 0.5;
    // cube.rotation.y = elapsedTime * 0.5;
    // cube.rotation.z = elapsedTime * 0.5;
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()