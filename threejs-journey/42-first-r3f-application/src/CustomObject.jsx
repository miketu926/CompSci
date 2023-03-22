import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { DoubleSide } from 'three';

export default function CustomObject() {
    const geometryRef = useRef();
    // geometryRef.current.computeVertexNormals()

    const verticesCount = 10 * 3; // triangles

    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3)

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3
        }

        return positions;
    } ,[])


    useEffect(()=> {
        geometryRef.current.computeVertexNormals()
    }, [])

    // attach="attributes-position" is like geometry.attribute.position and assign it to bufferGeometry
    
    return <mesh>
        <bufferGeometry ref={geometryRef}>
            <bufferAttribute 
                attach="attributes-position"
                count={ verticesCount }
                itemSize={3}
                array={ positions }
            />
        </bufferGeometry>
        <meshBasicMaterial color='red' side={THREE.DoubleSide} />
    </mesh>
}