import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Galaxy = () => {
    const pointsRef = useRef();

    const [positions, colors] = useMemo(() => {
        const positions = [];
        const colors = [];
        const galaxyColor1 = new THREE.Color('#4f46e5'); // Purple
        const galaxyColor2 = new THREE.Color('#818cf8'); // Light purple
        const galaxyColor3 = new THREE.Color('#60a5fa'); // Blue

        const count = 5000;
        const branches = 5;
        const spin = 1;
        const randomness = 0.5;
        const randomnessPower = 3;
        const radius = 5;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            const radius_pos = Math.random() * radius;
            const branchAngle = ((i % branches) / branches) * Math.PI * 2;
            const spinAngle = radius_pos * spin;

            const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_pos;
            const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_pos;
            const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_pos;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius_pos + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius_pos + randomZ;

            // Color based on distance from center
            const mixedColor = galaxyColor1.clone();
            mixedColor.lerp(radius_pos / radius < 0.5 ? galaxyColor2 : galaxyColor3, radius_pos / radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        return [new Float32Array(positions), new Float32Array(colors)];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                vertexColors={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const GalaxyScene = () => {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
                <color attach="background" args={['#000000']} />
                <Galaxy />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={2}
                    maxDistance={10}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
};

export default GalaxyScene;
