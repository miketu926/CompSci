import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import CANNON from 'cannon';


/**
 * !!!!TOPIC!!! Create a invisible 'physics' world
 * the physics world will apply coordinates to the 3js world on each frame
 * 
 * use 2D physics or 3D physics?!?! you may get away with 2D physics like a pool table
 * better for performances
 * 
 * Ammo.js, Cannon.js, Oimo.js (most popular 3D)
 * Matter.js, P2.js, Planck.js, box2D.js (2D physics)
 * 
 */

// check out Cannon.js docs
const world = new CANNON.World()
// broadphase for performance gains!!!!!!!!!!!!!! broadphase is how bodies or objs test for collision
world.broadphase = new CANNON.SAPBroadphase(world) // use SAP (Sweep And Prune) for best performance
world.gravity.set(0, -9.82, 0) // this is a Vec3 in Cannon // gravity K on the Y axis
world.allowSleep = true // this improves perf by a lot (objs that are still is now asleep)

// !!!! TOPIC!! create materials for bodies!
const concreteMaterial = new CANNON.Material('concrete')
const plasticMaterial = new CANNON.Material('plastic')

// what happens when concrete meets plastic etc..
const concretePlasticContactMaterial = new CANNON.ContactMaterial(
    concreteMaterial,
    plasticMaterial,
    {
        friction: 0.2, // default is 0.3
        restitution: 0.6, // default is 0.3 // read docs!

    }
)

// hack! you can set a defaultMaterial and have a defaultContactMaterial to apply on a lot of bodies for performance gain
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.3,
        restitution: 0.3,
    }
)

world.addContactMaterial(defaultContactMaterial) // add the contacts, then apply the default material to the bodies
// we can also add a defaultContactMaterial
world.defaultContactMaterial = defaultContactMaterial;
world.addContactMaterial(concretePlasticContactMaterial)


//// !!!!TOPIC !!!! part 2: remove this sphere
// // start
// // in 3js we create meshes, in cannon we use bodies (bodies are obj that will fall and collide w/ other bodies)
// // many shapes too to make up the body

// const sphereShape = new CANNON.Sphere(0.5) // radius
// const sphereBody = new CANNON.Body({
//     mass: 1,
//     position: new CANNON.Vec3(0, 3, 0),
//     shape: sphereShape,
//     material: plasticMaterial,
// })

// sphereBody.applyLocalForce(new CANNON.Vec3(200, 0, 0), new CANNON.Vec3(0, 0, 0))

// world.addBody(sphereBody)

// // end
//// !!!!TOPIC !!!! part 2: remove this sphere

// add floor!!
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0 // static
floorBody.addShape(floorShape)
floorBody.material = concreteMaterial
// floorBody.addShape(anotherShape) // can add more shapes to the floorBody!!! 
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), // plane is facing the camera, so it's rotating about the X axies,
    Math.PI * 0.5 // this is half of 180turn. The 'back' of the Plane() is nonexistent,
    // all bodies in it will not exist (think of the bottom as dirt or you're in the ground)
)
world.addBody(floorBody)

// setup is good, now we need this to update 3js in tick









/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {};
const tries = 10

debugObject.createSphere = () => {
    for (let i = 0; i < tries; i++) {
        createSphere(
            Math.random() * 0.5,
            {
                x: (Math.random() - 0.5) * 3,
                y: 3,
                z: (Math.random() - 0.5) * 3,
            }
        )
    }
}
debugObject.createBox = () => {
    for (let i = 0; i < tries; i++) {
        createBox(
            Math.random() * 1,
            Math.random() * 1,
            Math.random() * 1,
            {
                x: (Math.random() - 0.5) * 5,
                y: 5,
                z: (Math.random() - 0.5) * 5,
            }
        )
    }
}

gui.add(debugObject, 'createSphere')
gui.add(debugObject, 'createBox')


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// !!!!TOPIC SOUNDS ON COLLISION!!!!!!
// hacks -> play slightly different hit sounds randomly
// add a short delay so that a sound cannot play again after being played once
// random volume, scale it according to impact strength

const hitSound = new Audio('/sounds/hit.mp3')
const playHitSound = (collisionEvent) => {

    const impactStrength = collisionEvent.contact.getImpactVelocityAlongNormal();
    if (impactStrength > 1.5) {
        hitSound.volume = Math.random();
        hitSound.currentTime = 0
        hitSound.play()
        console.log(collisionEvent.contact.getImpactVelocityAlongNormal())
    }

};

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

// /**
//  * Test sphere
//  */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




/**
 * !!!! TOPICS!!! UTILS FOR CREATING SPHERE FACTORIES
 */

// this is now setting up for better performance using same geometry and material
const objectsToUpdate = [];
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
})

const createSphere = (radius, position) => {
    // create threejs mesh
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // cannon.js body

    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: defaultMaterial,
    })
    body.position.copy(position)

    // adding sound!!!! body Cannon.js has listeners
    body.addEventListener('collide', playHitSound)
    world.addBody(body);

    // save in obj to update
    objectsToUpdate.push({
        mesh,
        body
    })
}

// now create boxes

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    color: 'blue',
})

const createBox = (width, height, depth, position) => {
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    mesh.castShadow = true
    mesh.position.copy(position)
    mesh.scale.set(width, height, depth)
    scene.add(mesh)

    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)) // this takes in halfExtents (w, h, d relative to center point so /2)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: defaultMaterial,
    })
    body.position.copy(position)

    body.addEventListener('collide', playHitSound)

    world.addBody(body)
    objectsToUpdate.push({ mesh, body })
}

createSphere(0.5, { x: 0, y: 3, z: 0 })
createBox(0.1, 0.1, 0.1, { x: 0, y: 5, z: 0 })
// createSphere(1, { x: 2, y: 3, z: 1 })
// createSphere(0.1, { x: 3, y: 4, z: 3 })


//// DEBUG TO REMOVE ALL OBJS
debugObject.reset = () => {
    objectsToUpdate.forEach(obj => {
        //remove body
        obj.body.removeEventListener('collide', playHitSound)
        world.removeBody(obj.body)
        //remove mesh
        scene.remove(obj.mesh)
    })
    objectsToUpdate.splice(0, objectsToUpdate.length)
}
gui.add(debugObject, 'reset')



/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // !!!!! TOPIC!!!! add physics between 3js and Cannon
    // start
    // this calcs the deltaTime (diff in time between each tick (this is diff b/c of hertz))
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime



    // udpate forces
    // applyForce is applying force in world space coords (like wind), vs applyLocalForce which is coords relative to the body/object for precision
    // !!!! TOPIC Part2: making a sphere factory, commeting out below

    // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position) // the second param is where in the body the force is applied (pretty much always center)



    // update physics world
    // parameters are
    // a fixed time step/tick (typically 60fps)
    // how much time passed since last step/tick
    // how much iterations the world can apply to catch up with a potential delay
    world.step(1 / 60, deltaTime, 3)

    objectsToUpdate.forEach(obj => {
        obj.mesh.position.copy(obj.body.position)
        obj.mesh.quaternion.copy(obj.body.quaternion)
    })

    // update 3js world
    // !!!! TOPIC Part2: making a sphere factory, commeting out below
    // sphere.position.copy(sphereBody.position) // this copies a vector3 (vec3 works here!)



    // end
    // !!!!! TOPIC!!!! add physics between 3js and Cannon



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



/// FINAL THOUGHTS ON CANNON.JS
// CREATING CONSTRAINTS

/**
 * creating constraints are interactions among bodies/objs
 * 
 * HingeConstraint - acts like a door hinge, the obj will move around another
 * DistanceConstraint - forces fixed distance between bodies
 * LockConstraint - group bodies together and the force applied to one will exactly match the others
 * PointToPointConstraint - glues bodies at a specific point but can pivot around that point
 * 
 * 
 * Classes, Methods, properties and events VIA THE DOCS!!!!!!!
 * EXAMPLES: access to demos in Cannon.js via their site
 * 
 * 
 * Workers! Spread threads around for performance gains
 * 
 * Cannon.ES (JS has not been updated for years)
 * people forked to .ES
 * 
 * 
 */