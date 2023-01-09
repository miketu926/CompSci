import './style.css'
import * as THREE from 'three'
console.log('==> THREE', THREE)

// canvas
const canvas = document.getElementById('webgl');

// scene
const scene = new THREE.Scene();


const renderer = new THREE.WebGLRenderer({
    canvas,
});
const sizes = {
    width: 700,
    height: 400,
}
renderer.setSize(sizes.width, sizes.height)

// camera
const FOV = 100;
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(FOV, aspectRatio)


// object
const geo = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'blue' })
const mesh = new THREE.Mesh(geo, material)

// mesh.position.x = 1
// mesh.position.y = 1
// mesh.position.set(x, y, z)
mesh.position.set(2, 0.5, 0.5)


camera.position.z = 3


console.log('==> mesh length from center of scene to obj position =>', mesh.position.length())
console.log('==> distanceTo =>', mesh.position.distanceTo(camera.position))


// axesHelper (num is length of axes)
const axesHelper = new THREE.AxesHelper(3);


// !!!!topic: transforming ! (position, scale, rotation)


scene.add(axesHelper)

// camera.position.x = 1;
// camera.position.y = 1;

// scale
mesh.scale.x = 3
mesh.scale.y = 0.2
mesh.scale.z = 0.2



// rotation

mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25


// there is EULER (xyz sticks) vs Quaternion 
// one updates the other and vice versa


// !!!!topic lookAt:

// camera looking right (x+ direction) now (center moves left)
camera.lookAt(new THREE.Vector3(3, 0, 0))
camera.lookAt(0, 0, 0);



// !!!topic: Group class (put THINGS inside GROUPS)
const group = new THREE.Group()

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'blue' })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' })
)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'yellow' })
)

cube2.position.set(3, 0, 0)
cube3.position.set(-3, 0, 0)
group.add(cube1)
group.add(cube2)
group.add(cube3)

console.log('==> group obj', group)



scene.add(camera)
scene.add(mesh)
scene.add(group)

scene.remove(group)


// !!!!Topic: requestAnimationFrame => purpose is to run a function provided on the next frame
mesh.position.set(0, 0, 0)
mesh.rotation.set(0, 0, 0)
mesh.scale.set(1, 1, 1)


/// !!!!Topic: Clock (need this in Animations)
const clock = new THREE.Clock()

// !!!!Topic: Animations
const animationLoop = () => {
    const elapsedTime = clock.getElapsedTime();


    // 1 rotation per second is this forumla (Math.PI is half a rotation)
    mesh.rotation.y = elapsedTime * Math.PI * 2
    mesh.rotation.x = elapsedTime * Math.PI * 2

    mesh.position.y = Math.sin(elapsedTime * 2)
    mesh.position.x = Math.cos(elapsedTime * 2)


    // rerender 
    renderer.render(scene, camera)
    // calls a fn on the next frame
    window.requestAnimationFrame(animationLoop)
}

animationLoop()



// render: this is default rendering
// or put in animationLoop
// renderer.render(scene, camera)