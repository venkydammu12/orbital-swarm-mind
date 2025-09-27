import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Text } from '@react-three/drei';
import { 
  Camera, 
  Target, 
  Crosshair, 
  Radar, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Circle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as THREE from 'three';

interface DetectedObject {
  id: string;
  type: 'debris' | 'satellite' | 'spacecraft';
  distance: number;
  size: number;
  risk: 'low' | 'medium' | 'high';
  position: [number, number, number];
  velocity: [number, number, number];
}

interface Robot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  alt: number;
  battery: number;
  status: string;
}

interface RobotEyesFeedProps {
  selectedRobot?: Robot | null;
  onTargetSelect?: (target: DetectedObject) => void;
}

// 3D Scene Component for Robot POV
const RobotPOVScene = ({ detectedObjects }: { detectedObjects: DetectedObject[] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Space Environment */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E6FF" />
      
      {/* Earth in background */}
      <Sphere args={[20]} position={[0, -30, -50]}>
        <meshStandardMaterial color="#4A90E2" roughness={0.8} />
      </Sphere>

      {/* Detected Objects */}
      {detectedObjects.map((obj, index) => (
        <group key={obj.id} position={obj.position}>
          <Box 
            args={[obj.size, obj.size, obj.size]}
            onClick={() => console.log('Object clicked:', obj.id)}
          >
            <meshStandardMaterial 
              color={obj.risk === 'high' ? '#FF4444' : obj.risk === 'medium' ? '#FFB86B' : '#FFA500'}
              emissive={obj.risk === 'high' ? '#FF4444' : obj.risk === 'medium' ? '#FFB86B' : '#FFA500'}
              emissiveIntensity={0.3}
            />
          </Box>
          
          {/* Object label */}
          <Text
            position={[0, obj.size + 1, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {obj.id}
          </Text>
        </group>
      ))}

      {/* Targeting Reticle */}
      <group position={[0, 0, 5]}>
        <Box args={[0.1, 2, 0.1]}>
          <meshBasicMaterial color="#00E6FF" transparent opacity={0.8} />
        </Box>
        <Box args={[2, 0.1, 0.1]}>
          <meshBasicMaterial color="#00E6FF" transparent opacity={0.8} />
        </Box>
      </group>
    </group>
  );
};

const RobotEyesFeed: React.FC<RobotEyesFeedProps> = ({ 
  selectedRobot, 
  onTargetSelect 
}) => {
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [scanMode, setScanMode] = useState<'auto' | 'manual'>('auto');
  const [targetLocked, setTargetLocked] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('Scanning for debris...');

  // Mock detected objects
  useEffect(() => {
    const mockObjects: DetectedObject[] = [
      {
        id: 'DBR-001',
        type: 'debris',
        distance: 150,
        size: 1.2,
        risk: 'high',
        position: [2, 1, 8],
        velocity: [0.1, -0.05, 0.02]
      },
      {
        id: 'DBR-002', 
        type: 'debris',
        distance: 89,
        size: 0.8,
        risk: 'medium',
        position: [-3, 2, 12],
        velocity: [-0.08, 0.03, -0.01]
      },
      {
        id: 'SAT-445',
        type: 'satellite',
        distance: 1200,
        size: 2.5,
        risk: 'low',
        position: [8, -4, 20],
        velocity: [0.02, 0.01, 0.0]
      },
      {
        id: 'DBR-003',
        type: 'debris',
        distance: 67,
        size: 0.5,
        risk: 'medium',
        position: [1, -2, 6],
        velocity: [0.12, 0.08, -0.03]
      }
    ];

    setDetectedObjects(mockObjects);

    // Simulate AI analysis updates
    const analysisTexts = [
      'Analyzing debris composition...',
      'Calculating optimal capture trajectory...',
      'Assessing collision risk factors...',
      'Debris pattern identified: satellite fragment',
      'Recommendation: Proceed with caution',
      'High-priority target detected'
    ];

    const analysisInterval = setInterval(() => {
      setAiAnalysis(analysisTexts[Math.floor(Math.random() * analysisTexts.length)]);
    }, 3000);

    return () => clearInterval(analysisInterval);
  }, [selectedRobot]);

  const handleTargetLock = (obj: DetectedObject) => {
    setTargetLocked(obj.id);
    onTargetSelect?.(obj);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 border-red-400';
      case 'medium': return 'text-orange-400 border-orange-400';
      default: return 'text-green-400 border-green-400';
    }
  };

  if (!selectedRobot) {
    return (
      <Card className="p-8 glass-card text-center">
        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-foreground">Robot-Eyes Feed</h3>
        <p className="text-muted-foreground">Select a robot to view its live camera feed</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-xl font-bold text-foreground">LIVE FEED</h3>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            {selectedRobot.name}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={scanMode === 'auto' ? 'default' : 'outline'}
            onClick={() => setScanMode('auto')}
          >
            Auto Scan
          </Button>
          <Button
            size="sm"
            variant={scanMode === 'manual' ? 'default' : 'outline'}
            onClick={() => setScanMode('manual')}
          >
            Manual
          </Button>
        </div>
      </div>

      {/* Main Feed Display */}
      <Card className="p-4 glass-card border border-accent/30">
        <div className="relative">
          {/* 3D Camera Feed */}
          <div className="w-full h-80 bg-black rounded-lg overflow-hidden relative border border-accent/30">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
              <RobotPOVScene detectedObjects={detectedObjects} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Crosshair */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Crosshair className="h-8 w-8 text-accent" />
              </div>
              
              {/* Corner Brackets */}
              <div className="absolute top-4 left-4">
                <div className="w-8 h-8 border-l-2 border-t-2 border-accent" />
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 border-r-2 border-t-2 border-accent" />
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-8 h-8 border-l-2 border-b-2 border-accent" />
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-8 h-8 border-r-2 border-b-2 border-accent" />
              </div>

              {/* Status Info */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded">
                <span className="text-accent text-sm font-mono">
                  ALT: {selectedRobot.alt}km | BAT: {selectedRobot.battery}% | STATUS: {selectedRobot.status.toUpperCase()}
                </span>
              </div>

              {/* AI Analysis */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded">
                <div className="flex items-center gap-2">
                  <Radar className="h-4 w-4 text-accent animate-pulse" />
                  <span className="text-accent text-sm">{aiAnalysis}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Detected Objects Panel */}
      <Card className="p-4 glass-card">
        <h4 className="text-lg font-semibold mb-4 text-foreground">Detected Objects</h4>
        <div className="grid gap-3">
          {detectedObjects.map((obj) => (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-3 rounded-lg border ${
                targetLocked === obj.id ? 'bg-accent/10 border-accent' : 'bg-card/50 border-border/30'
              } hover:border-accent/50 transition-smooth cursor-pointer`}
              onClick={() => handleTargetLock(obj)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    obj.risk === 'high' ? 'bg-red-400' : 
                    obj.risk === 'medium' ? 'bg-orange-400' : 'bg-green-400'
                  } animate-pulse`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground">{obj.id}</span>
                      <Badge variant="outline" className={getRiskColor(obj.risk)}>
                        {obj.risk.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {obj.type} • {obj.distance}m • {obj.size}m³
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {targetLocked === obj.id && (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTargetLock(obj);
                    }}
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Target
                  </Button>
                </div>
              </div>

              {/* Velocity info */}
              <div className="mt-2 text-xs font-mono text-muted-foreground">
                VEL: {obj.velocity.map(v => v.toFixed(3)).join(', ')} m/s
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* AI Detection Controls */}
      <Card className="p-4 glass-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">AI Detection Systems</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">ACTIVE</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">LiDAR Range</span>
              <span className="text-foreground font-mono">500m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Camera FOV</span>
              <span className="text-foreground font-mono">120°</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Detection Rate</span>
              <span className="text-foreground font-mono">15 Hz</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">AI Confidence</span>
              <span className="text-accent font-mono">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Objects Tracked</span>
              <span className="text-foreground font-mono">{detectedObjects.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">High Risk</span>
              <span className="text-red-400 font-mono">
                {detectedObjects.filter(o => o.risk === 'high').length}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RobotEyesFeed;