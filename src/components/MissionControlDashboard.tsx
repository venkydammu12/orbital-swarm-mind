import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Html } from '@react-three/drei';
import { Satellite, MapPin, Battery, Signal, Eye, Target, TriangleAlert as AlertTriangle, Settings, Play, Pause, RotateCcw, Zap, Clock, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import anime from 'animejs';
import * as THREE from 'three';

interface Robot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  alt: number;
  battery: number;
  status: 'idle' | 'collecting' | 'transit' | 'maintenance';
  speed: number;
  heading: number;
  sensors: {
    gps: boolean;
    lidar: number;
    imu: { x: number; y: number; z: number };
    starTracker: boolean;
  };
  mission: {
    targetId: string | null;
    eta: number;
    fuelUsage: number;
  };
}

interface Debris {
  id: string;
  lat: number;
  lng: number;
  alt: number;
  size: number;
  risk: 'low' | 'medium' | 'high';
  velocity: { x: number; y: number; z: number };
}

interface PathPlan {
  type: 'shortest' | 'safest';
  points: Array<{ lat: number; lng: number; alt: number }>;
  distance: number;
  eta: number;
  fuelUsage: number;
  risk: number;
}

// 3D Earth with GPS tracking
const EarthWithTracking = ({ 
  robots, 
  debris, 
  selectedRobot, 
  selectedDebris,
  pathPlan,
  onRobotClick, 
  onDebrisClick 
}: {
  robots: Robot[];
  debris: Debris[];
  selectedRobot: string | null;
  selectedDebris: string | null;
  pathPlan: PathPlan | null;
  onRobotClick: (robotId: string) => void;
  onDebrisClick: (debrisId: string) => void;
}) => {
  const earthRef = React.useRef<THREE.Mesh>(null);

  // Convert GPS to 3D coordinates
  const gpsTo3D = (lat: number, lng: number, alt: number) => {
    const radius = 2 + (alt / 1000) * 0.5;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ] as [number, number, number];
  };

  return (
    <>
      {/* Earth */}
      <Sphere ref={earthRef} args={[2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1e40af" 
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* Atmosphere */}
      <Sphere args={[2.05]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#00E6FF" 
          transparent 
          opacity={0.1}
        />
      </Sphere>

      {/* Robots */}
      {robots.map((robot) => {
        const position = gpsTo3D(robot.lat, robot.lng, robot.alt);
        const isSelected = selectedRobot === robot.id;
        
        return (
          <group key={robot.id} position={position}>
            <mesh 
              onClick={() => onRobotClick(robot.id)}
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
                color={isSelected ? "#FFB86B" : "#00E6FF"}
                emissive={isSelected ? "#FFB86B" : "#00E6FF"}
                emissiveIntensity={0.5}
              />
            </mesh>
            
            <Html distanceFactor={8}>
              <div className={`bg-black/80 text-white px-2 py-1 rounded text-xs font-mono border ${
                isSelected ? 'border-orange-400' : 'border-cyan-400'
              }`}>
                {robot.id}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Debris */}
      {debris.map((piece) => {
        const position = gpsTo3D(piece.lat, piece.lng, piece.alt);
        const isSelected = selectedDebris === piece.id;
        const riskColor = piece.risk === 'high' ? '#FF4444' : 
                         piece.risk === 'medium' ? '#FFB86B' : '#90EE90';
        
        return (
          <group key={piece.id} position={position}>
            <mesh 
              onClick={() => onDebrisClick(piece.id)}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
              }}
            >
              <sphereGeometry args={[piece.size * 0.02]} />
              <meshStandardMaterial 
                color={riskColor}
                emissive={riskColor}
                emissiveIntensity={isSelected ? 0.8 : 0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* Path visualization */}
      {pathPlan && selectedRobot && selectedDebris && (
        <Line
          points={pathPlan.points.map(p => gpsTo3D(p.lat, p.lng, p.alt))}
          color={pathPlan.type === 'shortest' ? '#00E6FF' : '#FFB86B'}
          lineWidth={3}
          dashed={pathPlan.type === 'shortest'}
        />
      )}

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 3.85, 64]} />
        <meshBasicMaterial color="#00E6FF" opacity={0.2} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.25, 64]} />
        <meshBasicMaterial color="#00E6FF" opacity={0.15} transparent />
      </mesh>
    </>
  );
};

const MissionControlDashboard = () => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [debris, setDebris] = useState<Debris[]>([]);
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null);
  const [selectedDebris, setSelectedDebris] = useState<string | null>(null);
  const [pathPlan, setPathPlan] = useState<PathPlan | null>(null);
  const [missionTime, setMissionTime] = useState(0);
  const [alerts, setAlerts] = useState<Array<{ id: string; type: 'warning' | 'error' | 'info'; message: string }>>([]);

  // Initialize mock data
  useEffect(() => {
    const mockRobots: Robot[] = [
      {
        id: 'SW-001',
        name: 'Alpha Explorer',
        lat: 28.6139, lng: 77.2090, alt: 408, // Delhi
        battery: 85,
        status: 'collecting',
        speed: 7.2,
        heading: 45,
        sensors: {
          gps: true,
          lidar: 95,
          imu: { x: 0.02, y: -0.01, z: 0.03 },
          starTracker: true
        },
        mission: { targetId: 'DBR-001', eta: 120, fuelUsage: 15 }
      },
      {
        id: 'SW-002',
        name: 'Beta Collector',
        lat: 19.0760, lng: 72.8777, alt: 395, // Mumbai
        battery: 67,
        status: 'transit',
        speed: 8.1,
        heading: 120,
        sensors: {
          gps: true,
          lidar: 88,
          imu: { x: -0.01, y: 0.02, z: -0.01 },
          starTracker: false
        },
        mission: { targetId: null, eta: 0, fuelUsage: 8 }
      },
      {
        id: 'SW-003',
        name: 'Gamma Guardian',
        lat: 13.0827, lng: 80.2707, alt: 412, // Chennai
        battery: 92,
        status: 'idle',
        speed: 0,
        heading: 0,
        sensors: {
          gps: true,
          lidar: 100,
          imu: { x: 0, y: 0, z: 0 },
          starTracker: true
        },
        mission: { targetId: null, eta: 0, fuelUsage: 0 }
      }
    ];

    const mockDebris: Debris[] = [
      { id: 'DBR-001', lat: 26.9124, lng: 75.7873, alt: 405, size: 2.5, risk: 'high', velocity: { x: 0.1, y: -0.05, z: 0.02 } },
      { id: 'DBR-002', lat: 22.5726, lng: 88.3639, alt: 398, size: 1.8, risk: 'medium', velocity: { x: -0.08, y: 0.03, z: -0.01 } },
      { id: 'DBR-003', lat: 12.9716, lng: 77.5946, alt: 415, size: 3.2, risk: 'high', velocity: { x: 0.12, y: 0.08, z: -0.03 } },
      { id: 'DBR-004', lat: 23.0225, lng: 72.5714, alt: 390, size: 1.2, risk: 'low', velocity: { x: 0.05, y: -0.02, z: 0.01 } }
    ];

    setRobots(mockRobots);
    setDebris(mockDebris);

    // Mission timer
    const timer = setInterval(() => {
      setMissionTime(prev => prev + 1);
    }, 1000);

    // Real-time updates
    const updateInterval = setInterval(() => {
      setRobots(prev => prev.map(robot => ({
        ...robot,
        battery: Math.max(20, robot.battery + (Math.random() - 0.5) * 2),
        sensors: {
          ...robot.sensors,
          lidar: Math.max(80, Math.min(100, robot.sensors.lidar + (Math.random() - 0.5) * 5)),
          imu: {
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1,
            z: (Math.random() - 0.5) * 0.1
          }
        }
      })));
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(updateInterval);
    };
  }, []);

  // Path planning calculation
  const calculatePath = (robotId: string, debrisId: string) => {
    const robot = robots.find(r => r.id === robotId);
    const debrisPiece = debris.find(d => d.id === debrisId);
    
    if (!robot || !debrisPiece) return;

    // Shortest path
    const shortestPath: PathPlan = {
      type: 'shortest',
      points: [
        { lat: robot.lat, lng: robot.lng, alt: robot.alt },
        { lat: (robot.lat + debrisPiece.lat) / 2, lng: (robot.lng + debrisPiece.lng) / 2, alt: robot.alt + 10 },
        { lat: debrisPiece.lat, lng: debrisPiece.lng, alt: debrisPiece.alt }
      ],
      distance: 150,
      eta: 120,
      fuelUsage: 25,
      risk: 0.7
    };

    // Safest path (longer route)
    const safestPath: PathPlan = {
      type: 'safest',
      points: [
        { lat: robot.lat, lng: robot.lng, alt: robot.alt },
        { lat: robot.lat + 5, lng: robot.lng + 5, alt: robot.alt + 20 },
        { lat: debrisPiece.lat + 3, lng: debrisPiece.lng + 3, alt: debrisPiece.alt + 15 },
        { lat: debrisPiece.lat, lng: debrisPiece.lng, alt: debrisPiece.alt }
      ],
      distance: 280,
      eta: 220,
      fuelUsage: 18,
      risk: 0.2
    };

    setPathPlan(shortestPath); // Default to shortest

    // Animate path calculation
    anime({
      targets: '.path-calculation',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .6)'
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: Robot['status']) => {
    switch (status) {
      case 'collecting': return 'bg-orange-500 text-black';
      case 'transit': return 'bg-blue-500 text-white';
      case 'idle': return 'bg-green-500 text-black';
      case 'maintenance': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const selectedRobotData = robots.find(r => r.id === selectedRobot);
  const selectedDebrisData = debris.find(d => d.id === selectedDebris);

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      {/* Top Mission Bar */}
      <div className="h-16 bg-gray-900 border-b border-cyan-400/30 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-cyan-400 font-mono text-sm">MISSION ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span className="font-mono text-cyan-400">{formatTime(missionTime)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            size="sm" 
            className="bg-orange-500 text-black hover:bg-orange-600"
            onClick={() => {
              const newDebris = {
                id: `DBR-${Date.now()}`,
                lat: Math.random() * 60 - 30,
                lng: Math.random() * 360 - 180,
                alt: 400 + Math.random() * 50,
                size: Math.random() * 3 + 1,
                risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
                velocity: { x: Math.random() * 0.2 - 0.1, y: Math.random() * 0.2 - 0.1, z: Math.random() * 0.2 - 0.1 }
              };
              setDebris(prev => [...prev, newDebris]);
            }}
          >
            [ Spawn Debris (Demo) ]
          </Button>
          
          {alerts.length > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-red-400 text-sm">{alerts.length} Alert(s)</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Swarm Telemetry */}
        <div className="w-80 bg-gray-900 border-r border-cyan-400/30 overflow-y-auto">
          <div className="p-4 border-b border-cyan-400/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">SWARM TELEMETRY</h3>
            <div className="text-sm text-gray-400">
              {robots.filter(r => r.status !== 'maintenance').length} / {robots.length} OPERATIONAL
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {robots.map((robot) => (
              <motion.div
                key={robot.id}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  selectedRobot === robot.id 
                    ? 'border-orange-400 bg-orange-400/10' 
                    : 'border-gray-600 hover:border-cyan-400/50'
                }`}
                onClick={() => setSelectedRobot(robot.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-sm text-white">{robot.id}</span>
                  </div>
                  <Badge className={getStatusColor(robot.status)}>
                    {robot.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPS:</span>
                    <span className="text-cyan-400 font-mono">
                      {robot.lat.toFixed(4)}°, {robot.lng.toFixed(4)}°
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ALT:</span>
                    <span className="text-cyan-400 font-mono">{robot.alt}km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">BAT:</span>
                    <span className={`font-mono ${robot.battery > 60 ? 'text-green-400' : robot.battery > 30 ? 'text-orange-400' : 'text-red-400'}`}>
                      {robot.battery.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">SPD:</span>
                    <span className="text-cyan-400 font-mono">{robot.speed.toFixed(1)} km/s</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center Panel - Reality Map */}
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 z-10">
            <Card className="bg-black/80 border-cyan-400/30 p-3">
              <h3 className="text-cyan-400 font-bold text-sm mb-2">REALITY MAP</h3>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Click robots to select</div>
                <div>• Click debris to target</div>
                <div>• Drag to rotate view</div>
              </div>
            </Card>
          </div>

          <div className="w-full h-full bg-black">
            <Canvas camera={{ position: [6, 4, 6], fov: 60 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E6FF" />
              
              <EarthWithTracking
                robots={robots}
                debris={debris}
                selectedRobot={selectedRobot}
                selectedDebris={selectedDebris}
                pathPlan={pathPlan}
                onRobotClick={setSelectedRobot}
                onDebrisClick={(debrisId) => {
                  setSelectedDebris(debrisId);
                  if (selectedRobot) {
                    calculatePath(selectedRobot, debrisId);
                  }
                }}
              />
              
              <OrbitControls 
                enableZoom={true}
                enablePan={true}
                maxDistance={15}
                minDistance={4}
                autoRotate={false}
              />
            </Canvas>
          </div>

          {/* Path Planning Overlay */}
          <AnimatePresence>
            {pathPlan && selectedRobot && selectedDebris && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 path-calculation"
              >
                <Card className="bg-black/90 border-cyan-400/50 p-4 min-w-80">
                  <h4 className="text-cyan-400 font-bold mb-3">PATH CALCULATION</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-gray-400">Route Type:</div>
                      <div className="text-white font-mono">{pathPlan.type.toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Distance:</div>
                      <div className="text-cyan-400 font-mono">{pathPlan.distance}km</div>
                    </div>
                    <div>
                      <div className="text-gray-400">ETA:</div>
                      <div className="text-cyan-400 font-mono">{Math.floor(pathPlan.eta / 60)}m {pathPlan.eta % 60}s</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Fuel:</div>
                      <div className="text-orange-400 font-mono">{pathPlan.fuelUsage}%</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-cyan-400 text-black hover:bg-cyan-500 flex-1">
                      Execute Mission
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      Cancel
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Robot Control */}
        <div className="w-80 bg-gray-900 border-l border-cyan-400/30 overflow-y-auto">
          <div className="p-4 border-b border-cyan-400/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">ROBOT CONTROL</h3>
            {selectedRobotData ? (
              <div className="text-sm text-gray-400">
                {selectedRobotData.name} ({selectedRobotData.id})
              </div>
            ) : (
              <div className="text-sm text-gray-400">Select a robot to control</div>
            )}
          </div>

          {selectedRobotData ? (
            <div className="p-4 space-y-4">
              {/* Robot-Eyes Live Feed */}
              <Card className="bg-black border-cyan-400/30 p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-cyan-400 font-bold text-sm">ROBOT-EYES FEED</h4>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                
                <div className="aspect-video bg-gray-800 rounded border border-cyan-400/30 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-cyan-400" />
                  </div>
                  
                  {/* HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 left-2 text-xs font-mono text-cyan-400">
                      ALT: {selectedRobotData.alt}km | BAT: {selectedRobotData.battery.toFixed(0)}%
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Target className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs font-mono text-cyan-400">
                      STATUS: {selectedRobotData.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sensors Panel */}
              <Card className="bg-black border-cyan-400/30 p-3">
                <h4 className="text-cyan-400 font-bold text-sm mb-3">SENSORS</h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">GPS Lock:</span>
                    <div className={`w-2 h-2 rounded-full ${selectedRobotData.sensors.gps ? 'bg-green-400' : 'bg-red-400'}`} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">LiDAR Range:</span>
                    <span className="text-cyan-400 font-mono">{selectedRobotData.sensors.lidar.toFixed(0)}%</span>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 mb-1">IMU (Gyro):</div>
                    <div className="font-mono text-cyan-400 text-xs">
                      X: {selectedRobotData.sensors.imu.x.toFixed(3)}<br/>
                      Y: {selectedRobotData.sensors.imu.y.toFixed(3)}<br/>
                      Z: {selectedRobotData.sensors.imu.z.toFixed(3)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Star Tracker:</span>
                    <div className={`w-2 h-2 rounded-full ${selectedRobotData.sensors.starTracker ? 'bg-green-400' : 'bg-red-400'}`} />
                  </div>
                </div>
              </Card>

              {/* Controls */}
              <Card className="bg-black border-cyan-400/30 p-3">
                <h4 className="text-cyan-400 font-bold text-sm mb-3">CONTROLS</h4>
                
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full bg-cyan-400 text-black hover:bg-cyan-500"
                    disabled={!selectedDebris}
                  >
                    <Target className="h-3 w-3 mr-2" />
                    Assign to Debris
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300"
                  >
                    <RotateCcw className="h-3 w-3 mr-2" />
                    Return to Mothership
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300"
                  >
                    <Pause className="h-3 w-3 mr-2" />
                    Pause Mission
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300"
                  >
                    <Settings className="h-3 w-3 mr-2" />
                    Run Diagnostics
                  </Button>
                </div>
              </Card>

              {/* Mission Status */}
              {selectedRobotData.mission.targetId && (
                <Card className="bg-black border-orange-400/30 p-3">
                  <h4 className="text-orange-400 font-bold text-sm mb-3">MISSION STATUS</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target:</span>
                      <span className="text-orange-400 font-mono">{selectedRobotData.mission.targetId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ETA:</span>
                      <span className="text-orange-400 font-mono">{selectedRobotData.mission.eta}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fuel Usage:</span>
                      <span className="text-orange-400 font-mono">{selectedRobotData.mission.fuelUsage}%</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Satellite className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select a robot from the telemetry panel to view controls and sensor data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionControlDashboard;