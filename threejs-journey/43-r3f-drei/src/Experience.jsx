import { useThree, extend } from '@react-three/fiber'
import {useRef} from 'react';

import { MeshReflectorMaterial, Float, Text, Html, TransformControls, OrbitControls, PivotControls } from '@react-three/drei';

// all of the above are used in Drei, documetnation can be found on github drei pmndrs/drei

// remove below
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// extend({ OrbitControls })

// this is now going to be testing and using drei
// need access to drei helpers, add drei lib

// r3f will create an object inside another object (mesh inside mesh as children)


// For fonts we can use SDF (Signed Distanec Field) - used in fragment shaders to draw shapes
// we send a 2D or 3D point to an SDF shape function that returns how far that point is from that shape..
// and then if you are in or outside of the shape




export default function Experience()
{
    const cubeRef = useRef();
    const ballRef = useRef();
    // const { camera, gl } = useThree()

    return <>

        {/* <orbitControls args={ [ camera, gl.domElement ] } /> */}

        {/* now use drei! , put make default so that the TransformControls won't take over */}
        <OrbitControls makeDefault /> 

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls
            anchor={ [0,0,0]} // anchor units are from -1 to 1 in relation to the object
            depthTest={false}
            lineWidth={1}
            axisColors={['blue', 'white', 'red']}
            scale={1}
            fixed={false} // fix the size as true, false to have perspective
        >
            <mesh ref={ballRef} position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    position={ [1,1,0]}
                    wrapperClass='label' // this is to add a class name
                    center // pivot point is in the center of the div
                    distanceFactor={8} // put a perspective on it
                    occlude={ [ ballRef, cubeRef]} // can hide if objects are in front of this HTML (need references)
                >Test</Html>
            </mesh>
        </PivotControls>

         {/* now that we added Transform Controls, the position is off because it's an obj within an obc */}
         {/* so we move it to the parent  */}
         {/* another solutions is to separate the objs and then assign  */}

         <mesh ref={cubeRef} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cubeRef} mode="translate" />

        {/* end */}

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            {/* this below is from Drei, is a reflection floor */}
            <MeshReflectorMaterial 
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={0.2}
                mirror={1} // 0 to 1
                // color
            />
        </mesh>
        <Float speed={5} floatIntensity={2}>
            <Text 
                font='./bangers-v20-latin-regular.woff' // loaded fonts, Troika supports woff, ttf and otf formats. Woff is usually lighter
                // can convert fonts using transfonter.org, fontsquirrel.com/tool/font-converter
                fontSize={1}
                color='blue'
                // position 
                // rotation 
                // scale
                // textAlign
                // maxWidth

                
            >I love R3F
                {/* <meshNormalMaterial /> // can provide even materials as obj */}
            </Text>

        </Float>

    </>
}