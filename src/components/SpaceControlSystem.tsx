import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Text, Html, Line, Float, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Play, 
  Pause, 
  RotateCcw,
  Activity,
  Battery,
  Radar,
  Target,
  MapPin,
  Zap,
  Shield,
  Settings,
  Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as THREE from 'three';
import { LineChart, Line as RechartsLine, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Types
interface DebrisObject {
  id: string;
  name: string;
  type: 'metallic' | 'plastic' | 'non-metallic';
  position: [number, number, number];
  speed: number;
  weight: number;
  size: number;
  collected: boolean;
}

interface Robot {
  id: string;
  position: [number, number, number];
  targetPosition: [number, number, number];
  isMoving: boolean;
  currentTask: string;
  health: number;
  battery: number;
  speed: number;
  sensors: {
    radar: boolean;
    lidar: boolean;
    magnetic: boolean;
    vacuum: boolean;
  };
}

interface MissionState {
  phase: 'scanning' | 'planning' | 'moving' | 'collecting' | 'returning' | 'submitting';
  targetDebris: string | null;
  isActive: boolean;
  completedMissions: number;
}

// 3D Components
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={earthRef} args={[2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1e40af" 
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
      {/* Atmosphere */}
      <Sphere args={[2.1]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.15}
        />
      </Sphere>
    </group>
  );
};

const DebrisField = ({ debris, onDebrisClick }: { 
  debris: DebrisObject[], 
  onDebrisClick: (debris: DebrisObject) => void 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const getDebrisColor = (type: string) => {
    switch (type) {
      case 'metallic': return '#C0C0C0';
      case 'plastic': return '#FF6B6B';
      case 'non-metallic': return '#4ECDC4';
      default: return '#FFFFFF';
    }
  };

  return (
    <group ref={groupRef}>
      {debris.map((piece) => {
        if (piece.collected) return null;
        
        return (
          <Float key={piece.id} speed={piece.speed * 0.1} rotationIntensity={0.5}>
            <group position={piece.position}>
              <Box 
                args={[piece.size, piece.size, piece.size]}
                onClick={() => onDebrisClick(piece)}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'default';
                }}
              >
                <meshStandardMaterial 
                  color={getDebrisColor(piece.type)}
                  emissive={getDebrisColor(piece.type)}
                  emissiveIntensity={0.3}
                />
              </Box>
              
              <Html distanceFactor={8}>
                <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-mono border border-cyan-400/50 min-w-max">
                  <div className="text-cyan-400 font-bold">{piece.name}</div>
                  <div>Speed: {piece.speed.toFixed(1)} km/s</div>
                  <div>Weight: {piece.weight.toFixed(1)} kg</div>
                </div>
              </Html>
            </group>
          </Float>
        );
      })}
    </group>
  );
};

const SpaceRobot = ({ robot, cameraStream, missionState }: { 
  robot: Robot, 
  cameraStream: MediaStream | null,
  missionState: MissionState
}) => {
  const robotRef = useRef<THREE.Group>(null);
  const [scanningAngle, setScanningAngle] = useState(0);
  
  useFrame((state, delta) => {
    if (robotRef.current) {
      // Smooth movement towards target
      if (robot.isMoving) {
        const currentPos = new THREE.Vector3(...robot.position);
        const targetPos = new THREE.Vector3(...robot.targetPosition);
        const direction = targetPos.sub(currentPos).normalize();
        
        robotRef.current.position.lerp(targetPos, delta * 0.5);
      }
      
      // Scanning animation
      if (missionState.phase === 'scanning') {
        setScanningAngle(prev => prev + delta * 2);
      }
    }
  });

  return (
    <group ref={robotRef} position={robot.position}>
      {/* Main Robot Body */}
      <Box args={[0.8, 0.6, 1.2]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#00E6FF"
          emissiveIntensity={0.1}
        />
      </Box>
      
      {/* Robot Head with Camera */}
      <group position={[0, 0.5, 0]}>
        <Sphere args={[0.3]}>
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.9} 
            roughness={0.1}
          />
        </Sphere>
        
        {/* Camera Display */}
        {cameraStream && (
          <Html distanceFactor={4} position={[0, 0, 0.31]}>
            <div className="w-16 h-12 rounded border-2 border-cyan-400 overflow-hidden">
              <video 
                ref={(video) => {
                  if (video && cameraStream) {
                    video.srcObject = cameraStream;
                    video.play();
                  }
                }}
                className="w-full h-full object-cover"
                muted
                autoPlay
              />
            </div>
          </Html>
        )}
      </group>
      
      {/* Robotic Arms */}
      <group position={[-0.5, 0, 0.3]}>
        <Box args={[0.1, 0.1, 0.6]}>
          <meshStandardMaterial color="#00E6FF" emissive="#00E6FF" emissiveIntensity={0.3} />
        </Box>
      </group>
      <group position={[0.5, 0, 0.3]}>
        <Box args={[0.1, 0.1, 0.6]}>
          <meshStandardMaterial color="#00E6FF" emissive="#00E6FF" emissiveIntensity={0.3} />
        </Box>
      </group>
      
      {/* Sensor Arrays */}
      {robot.sensors.radar && (
        <group position={[0, 0.8, 0]} rotation={[0, scanningAngle, 0]}>
          <Box args={[0.2, 0.05, 0.4]}>
            <meshStandardMaterial color="#FFB86B" emissive="#FFB86B" emissiveIntensity={0.5} />
          </Box>
        </group>
      )}
      
      {/* Thruster Effects */}
      {robot.isMoving && (
        <group position={[0, 0, -0.8]}>
          <Sphere args={[0.1]}>
            <meshBasicMaterial color="#00E6FF" transparent opacity={0.8} />
          </Sphere>
        </group>
      )}
      
      {/* Robot Status Label */}
      <Html distanceFactor={6} position={[0, -1, 0]}>
        <div className="bg-black/90 text-white px-3 py-2 rounded border border-cyan-400/50 text-center min-w-max">
          <div className="text-cyan-400 font-bold text-sm">SWARM-01</div>
          <div className="text-xs">Task: {robot.currentTask}</div>
          <div className="text-xs">Battery: {robot.battery}%</div>
        </div>
      </Html>
    </group>
  );
};

const MotherStation = () => {
  return (
    <group position={[6, 2, 0]}>
      <Box args={[2, 1, 3]}>
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#90EE90"
          emissiveIntensity={0.1}
        />
      </Box>
      
      {/* Solar Panels */}
      <Box args={[4, 0.1, 1]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#1a1a2e" emissive="#00E6FF" emissiveIntensity={0.2} />
      </Box>
      
      <Html distanceFactor={8} position={[0, -1, 0]}>
        <div className="bg-black/90 text-white px-3 py-2 rounded border border-green-400/50 text-center">
          <div className="text-green-400 font-bold">MOTHER STATION</div>
          <div className="text-xs">Status: OPERATIONAL</div>
        </div>
      </Html>
    </group>
  );
};

const PathVisualization = ({ robot, targetDebris }: { 
  robot: Robot, 
  targetDebris: DebrisObject | null 
}) => {
  if (!targetDebris || targetDebris.collected) return null;
  
  const points = [
    robot.position,
    targetDebris.position
  ];
  
  return (
    <Line
      points={points}
      color="#00E6FF"
      lineWidth={3}
      dashed
    />
  );
};

// Voice Synthesis Hook
const useSpeechSynthesis = () => {
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 0.8;
      utterance.volume = 0.7;
      speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
};

// Voice Recognition Hook
const useVoiceRecognition = (onCommand: (command: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        onCommand(command);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [onCommand]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, startListening, stopListening };
};

// Camera Hook
const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      setStream(mediaStream);
      setIsActive(true);
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  };

  return { stream, isActive, startCamera, stopCamera };
};

const SpaceControlSystem = () => {
  // State Management
  const [debris, setDebris] = useState<DebrisObject[]>([]);
  const [robot, setRobot] = useState<Robot>({
    id: 'SWARM-01',
    position: [4, 1, 2],
    targetPosition: [4, 1, 2],
    isMoving: false,
    currentTask: 'Standby',
    health: 98,
    battery: 87,
    speed: 0,
    sensors: {
      radar: true,
      lidar: true,
      magnetic: true,
      vacuum: true
    }
  });
  
  const [missionState, setMissionState] = useState<MissionState>({
    phase: 'scanning',
    targetDebris: null,
    isActive: false,
    completedMissions: 0
  });

  const [robotMessage, setRobotMessage] = useState('');
  const [showDashboard, setShowDashboard] = useState(true);
  const [missionMetrics, setMissionMetrics] = useState([
    { time: '00:00', battery: 100, debris: 0, efficiency: 0 },
    { time: '00:30', battery: 95, debris: 1, efficiency: 20 },
    { time: '01:00', battery: 87, debris: 3, efficiency: 45 },
    { time: '01:30', battery: 82, debris: 5, efficiency: 67 },
    { time: '02:00', battery: 78, debris: 8, efficiency: 85 }
  ]);

  // Hooks
  const { speak } = useSpeechSynthesis();
  const { stream, isActive: cameraActive, startCamera, stopCamera } = useCamera();

  // Voice Commands Handler
  const handleVoiceCommand = useCallback((command: string) => {
    console.log('Voice command received:', command);
    
    if (command.includes('start mission')) {
      startMission();
      speak('Mission started. Scanning for debris now.');
      setRobotMessage('Mission started. Scanning for debris now.');
    } else if (command.includes('pause mission')) {
      pauseMission();
      speak('Mission paused. Awaiting new command.');
      setRobotMessage('Mission paused. Awaiting new command.');
    } else if (command.includes('return to station')) {
      returnToStation();
      speak('Returning to Mother Station.');
      setRobotMessage('Returning to Mother Station.');
    } else if (command.includes('show dashboard')) {
      setShowDashboard(true);
      speak('Dashboard activated.');
      setRobotMessage('Dashboard activated.');
    } else if (command.includes('scan for debris')) {
      scanForDebris();
      speak('Activating debris scanning systems.');
      setRobotMessage('Activating debris scanning systems.');
    }
  }, []);

  const { isListening, startListening, stopListening } = useVoiceRecognition(handleVoiceCommand);

  // Initialize debris field
  useEffect(() => {
    const debrisTypes = ['metallic', 'plastic', 'non-metallic'] as const;
    const initialDebris: DebrisObject[] = Array.from({ length: 15 }, (_, i) => {
      const angle = (i / 15) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      const type = debrisTypes[Math.floor(Math.random() * debrisTypes.length)];
      
      return {
        id: `DBR-${String(i + 1).padStart(3, '0')}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Debris`,
        type,
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius
        ] as [number, number, number],
        speed: 5 + Math.random() * 10,
        weight: 0.5 + Math.random() * 5,
        size: 0.1 + Math.random() * 0.2,
        collected: false
      };
    });
    
    setDebris(initialDebris);
  }, []);

  // Mission Logic
  const startMission = () => {
    setMissionState(prev => ({ ...prev, isActive: true, phase: 'scanning' }));
    setRobot(prev => ({ ...prev, currentTask: 'Scanning for debris' }));
  };

  const pauseMission = () => {
    setMissionState(prev => ({ ...prev, isActive: false }));
    setRobot(prev => ({ ...prev, currentTask: 'Mission paused', isMoving: false }));
  };

  const returnToStation = () => {
    setRobot(prev => ({ 
      ...prev, 
      targetPosition: [6, 2, 0], 
      isMoving: true, 
      currentTask: 'Returning to station' 
    }));
    setMissionState(prev => ({ ...prev, phase: 'returning' }));
  };

  const scanForDebris = () => {
    setMissionState(prev => ({ ...prev, phase: 'scanning' }));
    setRobot(prev => ({ ...prev, currentTask: 'Scanning for debris' }));
  };

  // Mission Loop
  useEffect(() => {
    if (!missionState.isActive) return;

    const missionLoop = setInterval(() => {
      switch (missionState.phase) {
        case 'scanning':
          // Find nearest uncollected debris
          const availableDebris = debris.filter(d => !d.collected);
          if (availableDebris.length > 0) {
            const target = availableDebris[0];
            setMissionState(prev => ({ 
              ...prev, 
              phase: 'planning', 
              targetDebris: target.id 
            }));
            setRobot(prev => ({ ...prev, currentTask: 'Planning route' }));
            speak(`Debris detected: ${target.name}, Speed ${target.speed.toFixed(1)} km/s, Weight ${target.weight.toFixed(1)} kg.`);
            setRobotMessage(`Debris detected: ${target.name}, Speed ${target.speed.toFixed(1)} km/s, Weight ${target.weight.toFixed(1)} kg.`);
          }
          break;
          
        case 'planning':
          setTimeout(() => {
            setMissionState(prev => ({ ...prev, phase: 'moving' }));
            const target = debris.find(d => d.id === missionState.targetDebris);
            if (target) {
              setRobot(prev => ({ 
                ...prev, 
                targetPosition: target.position, 
                isMoving: true, 
                currentTask: 'Moving to target' 
              }));
              speak('Planning shortest and safest path.');
              setRobotMessage('Planning shortest and safest path.');
            }
          }, 2000);
          break;
          
        case 'moving':
          // Check if robot reached target
          const target = debris.find(d => d.id === missionState.targetDebris);
          if (target) {
            const distance = new THREE.Vector3(...robot.position)
              .distanceTo(new THREE.Vector3(...target.position));
            
            if (distance < 0.5) {
              setMissionState(prev => ({ ...prev, phase: 'collecting' }));
              setRobot(prev => ({ ...prev, isMoving: false, currentTask: 'Collecting debris' }));
            }
          }
          break;
          
        case 'collecting':
          setTimeout(() => {
            // Mark debris as collected
            setDebris(prev => prev.map(d => 
              d.id === missionState.targetDebris ? { ...d, collected: true } : d
            ));
            setMissionState(prev => ({ ...prev, phase: 'returning' }));
            setRobot(prev => ({ 
              ...prev, 
              targetPosition: [6, 2, 0], 
              isMoving: true, 
              currentTask: 'Returning to station' 
            }));
            speak('Collection complete. Returning to Mother Station.');
            setRobotMessage('Collection complete. Returning to Mother Station.');
          }, 3000);
          break;
          
        case 'returning':
          const stationDistance = new THREE.Vector3(...robot.position)
            .distanceTo(new THREE.Vector3(6, 2, 0));
          
          if (stationDistance < 0.5) {
            setMissionState(prev => ({ 
              ...prev, 
              phase: 'submitting',
              completedMissions: prev.completedMissions + 1
            }));
            setRobot(prev => ({ ...prev, isMoving: false, currentTask: 'Submitting debris' }));
          }
          break;
          
        case 'submitting':
          setTimeout(() => {
            setMissionState(prev => ({ ...prev, phase: 'scanning', targetDebris: null }));
            setRobot(prev => ({ ...prev, currentTask: 'Scanning for debris' }));
            speak('Debris submitted successfully. Starting new mission.');
            setRobotMessage('Debris submitted successfully. Starting new mission.');
          }, 2000);
          break;
      }
    }, 1000);

    return () => clearInterval(missionLoop);
  }, [missionState, robot, debris, speak]);

  // Real-time metrics update
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setRobot(prev => ({
        ...prev,
        battery: Math.max(20, prev.battery - 0.1),
        health: 95 + Math.random() * 5
      }));
      
      const currentTime = new Date().toLocaleTimeString().slice(0, 5);
      setMissionMetrics(prev => [
        ...prev.slice(-4),
        {
          time: currentTime,
          battery: robot.battery,
          debris: missionState.completedMissions,
          efficiency: Math.min(100, missionState.completedMissions * 12)
        }
      ]);
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, [robot.battery, missionState.completedMissions]);

  const handleDebrisClick = (debrisObj: DebrisObject) => {
    if (!missionState.isActive) return;
    
    setMissionState(prev => ({ 
      ...prev, 
      phase: 'planning', 
      targetDebris: debrisObj.id 
    }));
    setRobot(prev => ({ ...prev, currentTask: 'Target acquired' }));
    speak(`Target acquired: ${debrisObj.name}`);
    setRobotMessage(`Target acquired: ${debrisObj.name}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-cyan-400">ORBITAL CONTROL SYSTEM</h1>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            LIVE MISSION
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Voice Control */}
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-400 hover:bg-cyan-500'} text-black`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? 'Stop' : 'Voice Control'}
          </Button>
          
          {/* Camera Control */}
          <Button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`${cameraActive ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-400 hover:bg-cyan-500'} text-black`}
          >
            {cameraActive ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
            Robot Eyes
          </Button>
          
          {/* Mission Control */}
          <Button
            onClick={missionState.isActive ? pauseMission : startMission}
            className={`${missionState.isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-black`}
          >
            {missionState.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {missionState.isActive ? 'Pause' : 'Start'} Mission
          </Button>
        </div>
      </div>

      {/* Main 3D Scene */}
      <div className="h-screen">
        <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00E6FF" />
          
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />
          
          <Earth />
          <MotherStation />
          <SpaceRobot robot={robot} cameraStream={stream} missionState={missionState} />
          <DebrisField debris={debris} onDebrisClick={handleDebrisClick} />
          <PathVisualization 
            robot={robot} 
            targetDebris={debris.find(d => d.id === missionState.targetDebris) || null} 
          />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            maxDistance={20}
            minDistance={5}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* Robot Communication Panel */}
      <AnimatePresence>
        {robotMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
          >
            <Card className="bg-black/90 border-cyan-400/50 p-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <div>
                  <div className="text-cyan-400 font-bold text-sm">SWARM-01 COMMUNICATION</div>
                  <div className="text-white text-sm">{robotMessage}</div>
                </div>
                <Volume2 className="h-4 w-4 text-cyan-400" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mission Dashboard */}
      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -400 }}
            className="absolute left-4 top-20 bottom-4 w-80 z-20"
          >
            <Card className="bg-black/90 border-cyan-400/30 p-4 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cyan-400 font-bold">MISSION CONTROL</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDashboard(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
              
              {/* Robot Status */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-gray-400">HEALTH</span>
                    </div>
                    <div className="text-xl font-bold text-green-400">{robot.health.toFixed(1)}%</div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery className="h-4 w-4 text-orange-400" />
                      <span className="text-xs text-gray-400">BATTERY</span>
                    </div>
                    <div className="text-xl font-bold text-orange-400">{robot.battery.toFixed(1)}%</div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">CURRENT TASK</span>
                  </div>
                  <div className="text-sm text-white">{robot.currentTask}</div>
                </div>
              </div>

              {/* Sensor Status */}
              <div className="mb-6">
                <h4 className="text-cyan-400 font-bold text-sm mb-3">SENSOR STATUS</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(robot.sensors).map(([sensor, active]) => (
                    <div key={sensor} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-gray-300">{sensor.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Metrics Chart */}
              <div className="mb-6">
                <h4 className="text-cyan-400 font-bold text-sm mb-3">MISSION METRICS</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={missionMetrics}>
                      <defs>
                        <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFB86B" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#FFB86B" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Area 
                        type="monotone" 
                        dataKey="battery" 
                        stroke="#FFB86B" 
                        fillOpacity={1} 
                        fill="url(#batteryGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Mission Stats */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Missions Completed:</span>
                  <span className="text-cyan-400 font-bold">{missionState.completedMissions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phase:</span>
                  <span className="text-white font-mono">{missionState.phase.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Debris Remaining:</span>
                  <span className="text-orange-400">{debris.filter(d => !d.collected).length}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="mt-6 space-y-2">
                <Button 
                  className="w-full bg-cyan-400 text-black hover:bg-cyan-500"
                  onClick={() => {
                    setRobot(prev => ({ ...prev, battery: 100 }));
                    speak('Recharge complete.');
                    setRobotMessage('Recharge complete.');
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Emergency Recharge
                </Button>
                
                <Button 
                  className="w-full bg-orange-500 text-black hover:bg-orange-600"
                  onClick={() => {
                    setRobot(prev => ({ ...prev, health: 100 }));
                    speak('Repair systems activated.');
                    setRobotMessage('Repair systems activated.');
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Run Diagnostics
                </Button>
                
                <Button 
                  className="w-full bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    pauseMission();
                    returnToStation();
                  }}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Emergency Return
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbital Map Panel */}
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute right-4 top-20 bottom-4 w-80 z-20"
      >
        <Card className="bg-black/90 border-cyan-400/30 p-4 h-full">
          <h3 className="text-cyan-400 font-bold mb-4">ORBITAL MAP</h3>
          
          {/* Mini Map */}
          <div className="relative w-full h-48 bg-gray-900 rounded border border-cyan-400/30 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Earth center */}
              <div className="w-8 h-8 bg-blue-500 rounded-full" />
              
              {/* Robot position */}
              <div 
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${50 + robot.position[0] * 8}%`,
                  top: `${50 + robot.position[2] * 8}%`
                }}
              />
              
              {/* Debris positions */}
              {debris.filter(d => !d.collected).map((d) => (
                <div
                  key={d.id}
                  className="absolute w-1 h-1 bg-red-400 rounded-full"
                  style={{
                    left: `${50 + d.position[0] * 8}%`,
                    top: `${50 + d.position[2] * 8}%`
                  }}
                />
              ))}
              
              {/* Mother Station */}
              <div 
                className="absolute w-3 h-3 bg-green-400 rounded-full"
                style={{ left: '75%', top: '35%' }}
              />
            </div>
            
            <div className="absolute bottom-2 left-2 text-xs text-cyan-400">
              REAL-TIME ORBITAL MAP
            </div>
          </div>

          {/* Mission Progress */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Mission Phase:</span>
              <span className="text-cyan-400 font-mono">{missionState.phase.toUpperCase()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Target:</span>
              <span className="text-orange-400 font-mono">
                {missionState.targetDebris || 'NONE'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Completed:</span>
              <span className="text-green-400 font-bold">{missionState.completedMissions}</span>
            </div>
          </div>

          {/* Voice Commands Help */}
          <div className="mt-6 p-3 bg-gray-800/50 rounded border border-gray-600">
            <h4 className="text-cyan-400 font-bold text-sm mb-2">VOICE COMMANDS</h4>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• "Start mission"</div>
              <div>• "Pause mission"</div>
              <div>• "Return to station"</div>
              <div>• "Scan for debris"</div>
              <div>• "Show dashboard"</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Voice Recognition Indicator */}
      {isListening && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <div className="bg-red-500/20 border-2 border-red-500 rounded-full p-8">
            <Mic className="h-12 w-12 text-red-400 animate-pulse" />
            <div className="text-center mt-2 text-red-400 font-bold">LISTENING...</div>
          </div>
        </motion.div>
      )}

      {/* Mission Status Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <Card className="bg-black/90 border-cyan-400/50 px-6 py-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${missionState.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-gray-300">Mission Status: </span>
              <span className="text-cyan-400 font-bold">
                {missionState.isActive ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            
            <div className="h-4 w-px bg-gray-600" />
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="text-gray-300">Debris Tracked: </span>
              <span className="text-orange-400 font-bold">{debris.length}</span>
            </div>
            
            <div className="h-4 w-px bg-gray-600" />
            
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Collected: </span>
              <span className="text-green-400 font-bold">{debris.filter(d => d.collected).length}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpaceControlSystem;