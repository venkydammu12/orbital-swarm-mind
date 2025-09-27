import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere, OrbitControls } from '@react-three/drei';
import { 
  Route, 
  Navigation, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Zap,
  Shield
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import anime from 'animejs';
import * as THREE from 'three';

interface PathPoint {
  x: number;
  y: number;
  z: number;
  risk: number;
  timestamp: number;
}

interface PathPlan {
  id: string;
  name: string;
  type: 'shortest' | 'safest' | 'efficient';
  points: PathPoint[];
  distance: number;
  duration: number;
  energyCost: number;
  riskLevel: 'low' | 'medium' | 'high';
  selected: boolean;
}

interface Robot {
  id: string;
  name: string;
  position: [number, number, number];
}

interface Target {
  id: string;
  position: [number, number, number];
  risk: 'low' | 'medium' | 'high';
}

// Animated path line component
const AnimatedPath = ({ points, color, selected }: { points: PathPoint[], color: string, selected: boolean }) => {
  const pathPoints = points.map(p => [p.x, p.y, p.z] as [number, number, number]);

  return (
    <Line
      points={pathPoints}
      color={color}
      lineWidth={selected ? 4 : 2}
    />
  );
};

// 3D Scene for path visualization
const PathScene = ({ 
  robot, 
  target, 
  paths, 
  selectedPath 
}: { 
  robot: Robot, 
  target: Target, 
  paths: PathPlan[], 
  selectedPath: string | null 
}) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E6FF" />
      
      {/* Robot */}
      <Sphere args={[0.3]} position={robot.position}>
        <meshStandardMaterial color="#00E6FF" emissive="#00E6FF" emissiveIntensity={0.3} />
      </Sphere>
      
      {/* Target */}
      <Sphere args={[0.2]} position={target.position}>
        <meshStandardMaterial 
          color={target.risk === 'high' ? '#FF4444' : target.risk === 'medium' ? '#FFB86B' : '#90EE90'} 
          emissive={target.risk === 'high' ? '#FF4444' : target.risk === 'medium' ? '#FFB86B' : '#90EE90'}
          emissiveIntensity={0.4}
        />
      </Sphere>
      
      {/* Paths */}
      {paths.map((path) => (
        <AnimatedPath
          key={path.id}
          points={path.points}
          color={path.type === 'shortest' ? '#00E6FF' : path.type === 'safest' ? '#90EE90' : '#FFB86B'}
          selected={selectedPath === path.id}
        />
      ))}
      
      {/* Danger zones (red spheres) */}
      <Sphere args={[1]} position={[2, 1, 3]}>
        <meshStandardMaterial color="#FF4444" transparent opacity={0.2} />
      </Sphere>
      <Sphere args={[0.8]} position={[-1, -2, 2]}>
        <meshStandardMaterial color="#FF4444" transparent opacity={0.2} />
      </Sphere>
    </>
  );
};

const PathPlanning = () => {
  const [robot] = useState<Robot>({
    id: 'SW-001',
    name: 'Alpha Explorer',
    position: [0, 0, 0]
  });

  const [target] = useState<Target>({
    id: 'DBR-001',
    position: [5, 3, 4],
    risk: 'high'
  });

  const [paths, setPaths] = useState<PathPlan[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);

  // Generate path plans
  useEffect(() => {
    setCalculating(true);
    
    // Simulate path calculation delay
    setTimeout(() => {
      const generatedPaths: PathPlan[] = [
        {
          id: 'shortest',
          name: 'Shortest Route',
          type: 'shortest',
          points: [
            { x: 0, y: 0, z: 0, risk: 0.1, timestamp: 0 },
            { x: 1.7, y: 1, z: 1.3, risk: 0.6, timestamp: 45 },
            { x: 3.2, y: 2, z: 2.8, risk: 0.8, timestamp: 85 },
            { x: 5, y: 3, z: 4, risk: 0.2, timestamp: 120 }
          ],
          distance: 6.4,
          duration: 120,
          energyCost: 35,
          riskLevel: 'high',
          selected: false
        },
        {
          id: 'safest',
          name: 'Safest Route',
          type: 'safest',
          points: [
            { x: 0, y: 0, z: 0, risk: 0.1, timestamp: 0 },
            { x: -1, y: 1, z: 1, risk: 0.1, timestamp: 50 },
            { x: 0, y: 3, z: 2, risk: 0.2, timestamp: 110 },
            { x: 2, y: 4, z: 3, risk: 0.1, timestamp: 160 },
            { x: 5, y: 3, z: 4, risk: 0.2, timestamp: 220 }
          ],
          distance: 9.2,
          duration: 220,
          energyCost: 55,
          riskLevel: 'low',
          selected: false
        },
        {
          id: 'efficient',
          name: 'Energy Efficient',
          type: 'efficient',
          points: [
            { x: 0, y: 0, z: 0, risk: 0.1, timestamp: 0 },
            { x: 1, y: 0.5, z: 1, risk: 0.3, timestamp: 40 },
            { x: 3, y: 1.5, z: 2.5, risk: 0.4, timestamp: 90 },
            { x: 4.5, y: 2.5, z: 3.5, risk: 0.3, timestamp: 140 },
            { x: 5, y: 3, z: 4, risk: 0.2, timestamp: 170 }
          ],
          distance: 7.8,
          duration: 170,
          energyCost: 28,
          riskLevel: 'medium',
          selected: false
        }
      ];
      
      setPaths(generatedPaths);
      setCalculating(false);
    }, 2000);
  }, []);

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    setPaths(prev => prev.map(p => ({ ...p, selected: p.id === pathId })));
    
    // Animate path selection
    anime({
      targets: `#path-${pathId}`,
      scale: [1, 1.05, 1],
      duration: 300,
      easing: 'easeOutElastic(1, .6)'
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      default: return 'text-green-400 bg-green-500/10 border-green-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shortest': return 'bg-accent/10 text-accent border-accent/30';
      case 'safest': return 'bg-green-500/10 text-green-400 border-green-500/30';
      default: return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Path Planning System</h3>
          <p className="text-muted-foreground">AI-powered route optimization for debris collection</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            {robot.name}
          </Badge>
          <Badge variant="outline" className={getRiskColor(target.risk)}>
            Target: {target.risk.toUpperCase()} RISK
          </Badge>
        </div>
      </div>

      {/* 3D Visualization */}
      <Card className="p-4 glass-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">Route Visualization</h4>
          {calculating && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent">Calculating optimal paths...</span>
            </div>
          )}
        </div>
        
        <div className="w-full h-80 bg-black rounded-lg overflow-hidden border border-accent/30">
          <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
            <PathScene
              robot={robot}
              target={target}
              paths={paths}
              selectedPath={selectedPath}
            />
            <OrbitControls enableZoom={true} enablePan={true} />
          </Canvas>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Robot Position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-muted-foreground">Target Debris</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 opacity-30" />
            <span className="text-muted-foreground">Danger Zones</span>
          </div>
        </div>
      </Card>

      {/* Path Options */}
      <div className="grid lg:grid-cols-3 gap-4">
        {paths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              id={`path-${path.id}`}
              className={`p-4 glass-card cursor-pointer transition-smooth hover:shadow-glow ${
                selectedPath === path.id ? 'border-accent shadow-glow' : 'border-border/30'
              }`}
              onClick={() => handlePathSelect(path.id)}
            >
              <div className="space-y-4">
                {/* Path Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Route className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold text-foreground">{path.name}</h4>
                  </div>
                  <Badge variant="outline" className={getTypeColor(path.type)}>
                    {path.type.toUpperCase()}
                  </Badge>
                </div>

                {/* Path Metrics */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-mono">{path.distance.toFixed(1)} km</div>
                      <div className="text-muted-foreground">Distance</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-mono">{formatDuration(path.duration)}</div>
                      <div className="text-muted-foreground">Duration</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-mono">{path.energyCost}%</div>
                      <div className="text-muted-foreground">Energy</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className={`font-mono ${
                        path.riskLevel === 'high' ? 'text-red-400' : 
                        path.riskLevel === 'medium' ? 'text-orange-400' : 'text-green-400'
                      }`}>
                        {path.riskLevel.toUpperCase()}
                      </div>
                      <div className="text-muted-foreground">Risk</div>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedPath === path.id && (
                  <div className="flex items-center gap-2 p-2 bg-accent/10 border border-accent/30 rounded">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-accent">Selected Route</span>
                  </div>
                )}

                {/* Risk Warnings */}
                {path.riskLevel === 'high' && (
                  <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/30 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">High collision risk detected</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Path Analysis */}
      {selectedPath && (
        <Card className="p-6 glass-card">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Route Analysis</h4>
          {(() => {
            const path = paths.find(p => p.id === selectedPath);
            if (!path) return null;
            
            return (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-foreground">Trajectory Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Waypoints:</span>
                      <span className="text-foreground">{path.points.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Speed:</span>
                      <span className="text-foreground">
                        {(path.distance / (path.duration / 3600)).toFixed(1)} km/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Risk Point:</span>
                      <span className="text-foreground">
                        {Math.max(...path.points.map(p => p.risk)).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-foreground">Recommendations</h5>
                  <div className="space-y-2 text-sm">
                    {path.type === 'shortest' && (
                      <p className="text-muted-foreground">
                        Fastest route but passes through high-risk zones. 
                        Maintain maximum sensor vigilance.
                      </p>
                    )}
                    {path.type === 'safest' && (
                      <p className="text-muted-foreground">
                        Longest route but minimal collision risk. 
                        Recommended for high-value missions.
                      </p>
                    )}
                    {path.type === 'efficient' && (
                      <p className="text-muted-foreground">
                        Balanced approach optimizing time, energy, and safety. 
                        Best for extended operations.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </Card>
      )}

      {/* Execute Button */}
      {selectedPath && (
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-accent text-black hover:bg-accent/90 font-medium px-8 py-4 text-lg shadow-glow"
          >
            <Target className="h-5 w-5 mr-2" />
            Execute Selected Route
          </Button>
        </div>
      )}
    </div>
  );
};

export default PathPlanning;