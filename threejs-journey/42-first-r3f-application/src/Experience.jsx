import { useRef } from 'react'
import { extend, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject.jsx'

extend({ OrbitControls }) // if there is no r3f class like mesh or group, we need to extend it to add it into react r3f



export default function Experience() {
    const three = useThree()
    const {camera, gl} = three;
    console.log(three); // all of three states

    const cubeRef = useRef()
    const groupRef = useRef()
    
    // EXERCISE!!: have the camera rotate around a center, clear orbhitControls first and by useFrame
    
    
    // useFrame can only be called inside Canvas
    useFrame((state, delta) => {
        // console.log('tick') // this is same as requestAnimationFrame
        // console.log(state)

        // instead of rerender using react state, we need a ref so it'll be performant
        cubeRef.current.rotation.y += delta; // this rotates differently based on monitor hz
        // groupRef.current.rotation.y += delta;

        // EXERCISE continued:
        // console.log(state.camera);
        // console.log(state.clock); // threejs clock! has elapsedTime
        const elapsedTime = state.clock.elapsedTime;
        state.camera.position.x = Math.sin(elapsedTime) * 8;
        state.camera.position.z = Math.cos(elapsedTime) * 8;
        state.camera.lookAt(0,0,0)
        // EXERCISE end

    })

    // don't directly update the args since it will destroy and recreate the mesh which is bad for performance
    // in this example just update scale of mesh

    // on the mesh, scale that takes in an array is the same as calling mesh.scale.set(vec3) or 1 value that applies to xyz
    



    return <>

        {/* <orbitControls args={ [camera, gl.domElement] }/> */}

        <directionalLight position={ [1,2,3] } />
        <ambientLight intensity={ 0.5 }/>
    
        <group ref={groupRef}>
            <mesh position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" intensity={ 1.5 }/>
            </mesh>

            <mesh ref={cubeRef} rotation-y={ Math.PI * 0.25 } position-x={2} scale={ 1.5 }>
                {/* <sphereGeometry args={ [ 1.5, 32, 32 ]} /> */}
                <boxGeometry scale={1.5} />
                {/* <meshStandardMaterial args={ [ {color: 'red', wireframe: true} ] }/> */}
                <meshStandardMaterial color="mediumpurple" wireframe={false} />
            </mesh>
        </group>

        <mesh position-y={-1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color='greenyellow' />
        </mesh>

        <CustomObject />
    </>
}

