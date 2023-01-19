import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap';

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded',
}

gui.addColor(parameters, 'materialColor').onChange(()=> {
    material.color.set(parameters.materialColor)
    particles.material.color.set(parameters.materialColor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter // using this will not mix gradient colors but support the jpg original colors

/**
 * !!! OBJECTS!!!
 */
const objectsDistance = 4;


const material = new THREE.MeshToonMaterial({
    // color: parameters.materialColor, // light based!
    gradientMap: gradientTexture,
})

const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

mesh1.position.y = - objectsDistance * 0 // this is later used to adjust camera scroll positioning
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2

mesh1.position.x = 2;
mesh2.position.x = -2;
mesh3.position.x = 2;

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [ mesh1, mesh2, mesh3 ]

// !!!!!!!!! creating particles!!!
// CFBs

const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3)
positions.forEach((position, i) => {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length // ??????????????????????? i guess how to spread particles on the Y w/ some objects
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
})

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// !!!! Material

const particleMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
})

// !!! POINTS!!

const particles = new THREE.Points(particlesGeometry, particleMaterial)
scene.add(particles);


/**
 * !!!! directional light
 */

const directionalLight = new THREE.DirectionalLight('white', 1)
directionalLight.position.set(1,1,0)
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

const cameraGroup = new THREE.Group();
scene.add(cameraGroup)


// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera);
scene.add(cameraGroup)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * !!! scroll
 */

let scrollY = window.scrollY
let currentSection = 0;

const cursor = {
    x: 0,
    y: 0,
}
window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height);
    if (newSection !== currentSection) {
        currentSection = newSection;
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1'
            }
        )

    }

})
window.addEventListener('mousemove', (e) => {
    cursor.x = (e.clientX / sizes.width) - 0.5
    cursor.y = (e.clientY / sizes.height) - 0.5
})

// !!!!!! TOPIC: Parallax
// this is when objects in the back move slower than objects in the front to mimic depth
// this is a depth trick when there are 2 POVs or line of sights (like the eyes see depth)


/**
 * Animate
 */
const clock = new THREE.Clock()

// this is how you normalize for diff Hz screens
let previousTime = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;


    //!!! Animate Camera
    camera.position.y = - (scrollY / sizes.height) * objectsDistance

    const parallaxX = cursor.x
    const parallaxY = - cursor.y

    // for to follow cursor movements w/ EASING or SMOOTHING or aka LERPING
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 2 * deltaTime; // this is now normalized for hertz by deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 2 * deltaTime;
    
    //!!!! Animate Meshes
    sectionMeshes.forEach( mesh => {
        mesh.rotation.x += deltaTime * 0.25 // we updated this from elapsedTime to deltaTime because we want to add x and y in all cases, not have a fixed number to go off of (make our own timer starting from 0) !!
        mesh.rotation.y += deltaTime * 0.25
    })

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()