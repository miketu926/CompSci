import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three';



const root = ReactDOM.createRoot(document.querySelector('#root'))

// to create a mesh in r3f
// <mesh>
    // <boxGeometry position={[1,2,3]} rotation-x={0.5}/>
    // <meshBasicMaterial color = 'red'/> 
// </mesh>

// grouping: (add method will be called on group components)
// <group> <mesh1><mesh2><mesh3> </group>

// attach="" this is used to assign an attribute to the parent 
// <mesh>
    // <boxGeometry attach="geometry" position={[1,2,3]} rotation-x={0.5}/>
    // <meshBasicMaterial attach="material" color = 'red'/> 
// </mesh>
// so by adding attach, it is assigning the attribute to the mesh, NOT .add() to the mesh
// aka mesh.geometry = new THREE.BoxGeometry() and mesh.material = new THREE.MeshBasicMaterial()

// canvas created by r3f will take the size of its parent (in this case the root)

// r3f hooks will ONLY work inside Canvas

const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 3, 2, 6 ],
    // zoom: 100,
}

const glSettings = {
    antialias: true,
    // toneMapping: THREE.CineonToneMapping,
    toneMapping: THREE.ACESFilmicToneMapping, // default
    // outputEncoding: THREE.LinearEncoding,
    outputEncoding: THREE.sRGBEncoding,  // default
}

// r3f sets toneMapping to AECSFilmicToneMapping

root.render(
    <Canvas
        // dpr={ [1,2] } // limits between 1 to 2 if 2 or above is available which is default so can be removed
        // flat // updates to NoToneMapping
        // orthographic // update camera directly declaring it
        gl={glSettings}
        camera={cameraSettings}
    >
        <Experience />
    </Canvas>
)