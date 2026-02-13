import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars } from '@react-three/drei';

const FloatingShape = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={1.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#4f46e5"
                    emissive="#3730a3"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
            <mesh scale={1.4}>
                <icosahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#818cf8"
                    roughness={0}
                    metalness={0.2}
                    transmission={0.5}
                    thickness={2}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
};

const Scene = () => {
    return (
        <div className="absolute inset-0">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} color="#4f46e5" intensity={1} />

                <FloatingShape />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default Scene;
