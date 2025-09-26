import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring, Html } from '@react-three/drei';
import { Mesh } from 'three';
import anime from 'animejs';

interface Robot {
  id: string;
  lat: number;
  lng: number;
  alt: number;
  status: 'active' | 'collecting' | 'returning' | 'idle';
  battery: number;
}

interface Debris {
  id: string;
  lat: number;
  lng: number;
  alt: number;
  size: number;
  risk: 'low' | 'medium' | 'high';
}

const Earth = () => {
  const earthRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#4A90E2" 
        roughness={0.8}
        metalness={0.2}
        wireframe={false}
      />
      {/* Atmosphere effect */}
      <Sphere args={[2.1]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.1}
        />
      </Sphere>
    </Sphere>
  );
};

const RobotMarker = ({ robot, onClick }: { robot: Robot, onClick: (robot: Robot) => void }) => {
  const markerRef = useRef<Mesh>(null);
  
  // Convert lat/lng to 3D coordinates on sphere surface
  const lat = (robot.lat * Math.PI) / 180;
  const lng = (robot.lng * Math.PI) / 180;
  const radius = 2.05 + (robot.alt / 1000) * 0.5; // Scale altitude
  
  const x = radius * Math.cos(lat) * Math.cos(lng);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lng);

  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      markerRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getStatusColor = () => {
    switch (robot.status) {
      case 'active': return '#00E6FF';
      case 'collecting': return '#FFB86B';
      case 'returning': return '#90EE90';
      default: return '#808080';
    }
  };

  return (
    <group position={[x, y, z]}>
      <mesh 
        ref={markerRef} 
        onClick={() => onClick(robot)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial 
          color={getStatusColor()} 
          emissive={getStatusColor()}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Robot ID label */}
      <Html distanceFactor={10}>
        <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-mono border border-accent/30">
          {robot.id}
        </div>
      </Html>
    </group>
  );
};

const DebrisMarker = ({ debris, onClick }: { debris: Debris, onClick: (debris: Debris) => void }) => {
  const markerRef = useRef<Mesh>(null);
  
  const lat = (debris.lat * Math.PI) / 180;
  const lng = (debris.lng * Math.PI) / 180;
  const radius = 2.05 + (debris.alt / 1000) * 0.5;
  
  const x = radius * Math.cos(lat) * Math.cos(lng);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lng);

  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.rotation.y += 0.02;
      // Pulsing effect for high risk debris
      if (debris.risk === 'high') {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
        markerRef.current.scale.setScalar(scale);
      }
    }
  });

  const getRiskColor = () => {
    switch (debris.risk) {
      case 'high': return '#FF4444';
      case 'medium': return '#FFB86B';
      default: return '#FFA500';
    }
  };

  return (
    <group position={[x, y, z]}>
      <mesh 
        ref={markerRef} 
        onClick={() => onClick(debris)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[debris.size * 0.05]} />
        <meshStandardMaterial 
          color={getRiskColor()} 
          emissive={getRiskColor()}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};

interface SpaceEarthProps {
  onRobotClick?: (robot: Robot) => void;
  onDebrisClick?: (debris: Debris) => void;
}

const SpaceEarth: React.FC<SpaceEarthProps> = ({ onRobotClick, onDebrisClick }) => {
  // Mock data for demonstration
  const robots: Robot[] = [
    { id: 'R001', lat: 40.7128, lng: -74.0060, alt: 400, status: 'active', battery: 85 },
    { id: 'R002', lat: 51.5074, lng: -0.1278, alt: 380, status: 'collecting', battery: 92 },
    { id: 'R003', lat: 35.6762, lng: 139.6503, alt: 420, status: 'returning', battery: 67 },
    { id: 'R004', lat: -33.8688, lng: 151.2093, alt: 395, status: 'idle', battery: 78 },
  ];

  const debris: Debris[] = [
    { id: 'D001', lat: 45.0, lng: -90.0, alt: 410, size: 2, risk: 'high' },
    { id: 'D002', lat: 30.0, lng: 60.0, alt: 390, size: 1.5, risk: 'medium' },
    { id: 'D003', lat: -20.0, lng: 120.0, alt: 405, size: 1, risk: 'low' },
    { id: 'D004', lat: 60.0, lng: 30.0, alt: 385, size: 2.5, risk: 'high' },
    { id: 'D005', lat: 0.0, lng: 0.0, alt: 400, size: 1.2, risk: 'medium' },
  ];

  return (
    <div className="w-full h-full bg-background rounded-lg overflow-hidden border border-border/30">
      <Canvas camera={{ position: [6, 3, 6], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00E6FF" />
        
        {/* Earth */}
        <Earth />
        
        {/* Orbital Rings */}
        <Ring args={[3.8, 3.85, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00E6FF" opacity={0.2} transparent />
        </Ring>
        <Ring args={[4.2, 4.25, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00E6FF" opacity={0.15} transparent />
        </Ring>
        
        {/* Robots */}
        {robots.map((robot) => (
          <RobotMarker 
            key={robot.id} 
            robot={robot} 
            onClick={onRobotClick || (() => {})} 
          />
        ))}
        
        {/* Debris */}
        {debris.map((debris) => (
          <DebrisMarker 
            key={debris.id} 
            debris={debris} 
            onClick={onDebrisClick || (() => {})} 
          />
        ))}
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          maxDistance={15}
          minDistance={4}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border/30 rounded-lg p-3">
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded"></div>
            <span className="text-white">Active Robots</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded"></div>
            <span className="text-white">Collecting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span className="text-white">High Risk Debris</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceEarth;