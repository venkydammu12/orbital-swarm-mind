import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Starfield = () => {
  const ref = useRef<THREE.Points>(null);
  const sphere = useRef<THREE.Points>(null);
  
  // Generate random star positions in sphere
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Random spherical distribution
      const radius = Math.random() * 25 + 25;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      
      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(theta);
      
      // Random colors - white to cyan
      const intensity = Math.random();
      colors[i * 3] = intensity; // R
      colors[i * 3 + 1] = intensity; // G  
      colors[i * 3 + 2] = 1; // B (slight blue tint)
    }
    
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 15;
    }
    if (sphere.current) {
      sphere.current.rotation.x += delta / 30;
      sphere.current.rotation.y += delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={2}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Additional floating particles */}
      <Points ref={sphere} positions={positions.slice(0, 600)} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00E6FF"
          size={1}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

const StarfieldBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <Starfield />
      </Canvas>
    </div>
  );
};

export default StarfieldBackground;