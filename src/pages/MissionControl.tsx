import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Html, Line, Float, Stars, Ring } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Camera, CameraOff, Play, Pause, RotateCcw, Activity, Battery, Radar, Target, MapPin, Zap, Shield, Settings, Volume2, Eye, Navigation, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as THREE from 'three';
import anime from 'animejs';

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
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  gpsCoords: {
    lat: number;
    lng: number;
    alt: number;
  };
}

interface Robot {
  id: string;
  name: string;
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
  gpsCoords: {
    lat: number;
    lng: number;
    alt: number;
  };
}

interface MissionState {
  phase: 'scanning' | 'planning' | 'moving' | 'collecting' | 'returning' | 'processing';
  targetDebris: string | null;
  isActive: boolean;
  completedMissions: number;
  missionTime: number;
}

// 3D Components
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      <Sphere ref={earthRef} args={[2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1e40af" 
          roughness={0.8}
          metalness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </Sphere>
      {/* Atmosphere with water torch effect */}
      <Sphere args={[2.15]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#00E6FF" 
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
    // Update orbital positions with realistic GPS coordinates
    debris.forEach((piece, index) => {
      if (!piece.collected) {
        piece.orbitAngle += delta * piece.orbitSpeed;
        const x = Math.cos(piece.orbitAngle) * piece.orbitRadius;
        const z = Math.sin(piece.orbitAngle) * piece.orbitRadius;
        const y = Math.sin(piece.orbitAngle * 0.3) * 0.4;
        piece.position = [x, y, z];
        
        // Update GPS coordinates based on orbital position
        piece.gpsCoords.lat = (y / 2) * 90;
        piece.gpsCoords.lng = (Math.atan2(z, x) * 180) / Math.PI;
        piece.gpsCoords.alt = 400 + (piece.orbitRadius - 3) * 50;
      }
    });
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
          <Float key={piece.id} speed={piece.speed * 0.05} rotationIntensity={0.3}>
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
                <div className="bg-black/90 text-white px-3 py-2 rounded border border-cyan-400/50 min-w-max text-xs">
                  <div className="text-cyan-400 font-bold">{piece.name}</div>
                  <div>Type: {piece.type}</div>
                  <div>Speed: {piece.speed.toFixed(1)} km/s</div>
                  <div>Weight: {piece.weight.toFixed(1)} kg</div>
                  <div className="text-orange-400 font-mono">
                    GPS: {piece.gpsCoords.lat.toFixed(2)}°, {piece.gpsCoords.lng.toFixed(2)}°
                  </div>
                  <div className="text-orange-400 font-mono">
                    ALT: {piece.gpsCoords.alt.toFixed(0)} km
                  </div>
                </div>
              </Html>
            </group>
          </Float>
        );
      })}
    </group>
  );
};

const SpaceRobot = ({ robot, cameraStream, missionState, onRobotClick }: { 
  robot: Robot, 
  cameraStream: MediaStream | null,
  missionState: MissionState,
  onRobotClick: (robot: Robot) => void
}) => {
  const robotRef = useRef<THREE.Group>(null);
  const [scanningAngle, setScanningAngle] = useState(0);
  
  useFrame((state, delta) => {
    if (robotRef.current) {
      // Smooth movement towards target
      if (robot.isMoving) {
        const currentPos = new THREE.Vector3(...robot.position);
        const targetPos = new THREE.Vector3(...robot.targetPosition);
        
        robotRef.current.position.lerp(targetPos, delta * 0.3);
        
        // Update GPS coordinates based on 3D position
        const pos = robotRef.current.position;
        robot.gpsCoords.lat = (pos.y / 2) * 90;
        robot.gpsCoords.lng = (Math.atan2(pos.z, pos.x) * 180) / Math.PI;
        robot.gpsCoords.alt = 400 + ((pos.length() - 2) / 2) * 100;
      }
      
      // Scanning animation
      if (missionState.phase === 'scanning') {
        setScanningAngle(prev => prev + delta * 3);
      }
    }
  });

  return (
    <group ref={robotRef} position={robot.position}>
      {/* Main Robot Body */}
      <Box 
        args={[0.8, 0.6, 1.2]}
        onClick={() => onRobotClick(robot)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#00E6FF"
          emissiveIntensity={0.2}
        />
      </Box>
      
      {/* Robot Head with Camera */}
      <group position={[0, 0.5, 0]}>
        <Sphere args={[0.3]}>
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#00E6FF"
            emissiveIntensity={0.1}
          />
        </Sphere>
        
        {/* Camera Eye */}
        <Sphere args={[0.1]} position={[0, 0, 0.25]}>
          <meshStandardMaterial 
            color="#FF0000" 
            emissive="#FF0000"
            emissiveIntensity={cameraStream ? 0.8 : 0.2}
          />
        </Sphere>
      </group>
      
      {/* Robotic Arms */}
      <group position={[-0.5, 0, 0.3]}>
        <Box args={[0.1, 0.1, 0.6]}>
          <meshStandardMaterial color="#00E6FF" emissive="#00E6FF" emissiveIntensity={0.4} />
        </Box>
      </group>
      <group position={[0.5, 0, 0.3]}>
        <Box args={[0.1, 0.1, 0.6]}>
          <meshStandardMaterial color="#00E6FF" emissive="#00E6FF" emissiveIntensity={0.4} />
        </Box>
      </group>
      
      {/* Sensor Arrays with scanning animation */}
      {robot.sensors.radar && (
        <group position={[0, 0.8, 0]} rotation={[0, scanningAngle, 0]}>
          <Box args={[0.3, 0.05, 0.6]}>
            <meshStandardMaterial color="#FFB86B" emissive="#FFB86B" emissiveIntensity={0.6} />
          </Box>
        </group>
      )}
      
      {/* Thruster Effects */}
      {robot.isMoving && (
        <group position={[0, 0, -0.8]}>
          <Sphere args={[0.15]}>
            <meshBasicMaterial color="#00E6FF" transparent opacity={0.8} />
          </Sphere>
        </group>
      )}
      
      {/* Robot Status Label with GPS */}
      <Html distanceFactor={6} position={[0, -1.2, 0]}>
        <div className="bg-black/95 text-white px-4 py-3 rounded border border-cyan-400/50 text-center min-w-max">
          <div className="text-cyan-400 font-bold text-sm">{robot.id}</div>
          <div className="text-xs mt-1">Task: {robot.currentTask}</div>
          <div className="text-xs">Battery: {robot.battery.toFixed(0)}%</div>
          <div className="text-xs">Health: {robot.health.toFixed(0)}%</div>
          <div className="text-xs text-orange-400 font-mono">
            GPS: {robot.gpsCoords.lat.toFixed(4)}°, {robot.gpsCoords.lng.toFixed(4)}°
          </div>
          <div className="text-xs text-orange-400 font-mono">
            ALT: {robot.gpsCoords.alt.toFixed(0)} km
          </div>
        </div>
      </Html>
    </group>
  );
};

const MotherStation = () => {
  const stationRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={stationRef} position={[6, 2, 0]}>
      <Box args={[3, 1.5, 4]}>
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#90EE90"
          emissiveIntensity={0.2}
        />
      </Box>
      
      {/* Solar Panels */}
      <Box args={[6, 0.1, 1.5]} position={[0, 1.2, 0]}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive="#00E6FF" 
          emissiveIntensity={0.3}
        />
      </Box>
      
      {/* Processing Module */}
      <Box args={[1.5, 0.8, 1.5]} position={[0, -1, 0]}>
        <meshStandardMaterial 
          color="#FFB86B" 
          emissive="#FFB86B" 
          emissiveIntensity={0.3}
        />
      </Box>
      
      <Html distanceFactor={8} position={[0, -2, 0]}>
        <div className="bg-black/95 text-white px-4 py-3 rounded border border-green-400/50 text-center">
          <div className="text-green-400 font-bold">MOTHER STATION</div>
          <div className="text-xs">Status: OPERATIONAL</div>
          <div className="text-xs">Processing: ACTIVE</div>
          <div className="text-xs">Power: 98%</div>
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
    // Intermediate waypoint for curved path
    [
      (robot.position[0] + targetDebris.position[0]) / 2,
      Math.max(robot.position[1], targetDebris.position[1]) + 1,
      (robot.position[2] + targetDebris.position[2]) / 2
    ] as [number, number, number],
    targetDebris.position
  ];
  
  return (
    <>
      {/* Shortest path (cyan dashed) */}
      <Line
        points={[robot.position, targetDebris.position]}
        color="#00E6FF"
        lineWidth={3}
        dashed
      />
      {/* Safest path (orange solid) */}
      <Line
        points={points}
        color="#FFB86B"
        lineWidth={4}
      />
    </>
  );
};

// Voice Synthesis Hook
const useSpeechSynthesis = () => {
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 0.7;
      utterance.volume = 0.8;
      utterance.voice = speechSynthesis.getVoices().find(voice => 
        voice.name.includes('Google') || voice.name.includes('Microsoft')
      ) || speechSynthesis.getVoices()[0];
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
        video: { width: 1280, height: 720, facingMode: 'environment' } 
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

const MissionControl = () => {
  // State Management
  const [debris, setDebris] = useState<DebrisObject[]>([]);
  const [robot, setRobot] = useState<Robot>({
    id: 'SWARM-01',
    name: 'Alpha Explorer',
    position: [4, 1, 2],
    targetPosition: [4, 1, 2],
    isMoving: false,
    currentTask: 'Mission Standby',
    health: 98,
    battery: 87,
    speed: 0,
    sensors: {
      radar: true,
      lidar: true,
      magnetic: true,
      vacuum: true
    },
    gpsCoords: {
      lat: 28.6139, // Delhi coordinates
      lng: 77.2090,
      alt: 408
    }
  });
  
  const [missionState, setMissionState] = useState<MissionState>({
    phase: 'scanning',
    targetDebris: null,
    isActive: false,
    completedMissions: 0,
    missionTime: 0
  });

  const [robotMessage, setRobotMessage] = useState('');
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
  const [pathPlan, setPathPlan] = useState<{shortest: any, safest: any} | null>(null);

  // Hooks
  const { speak } = useSpeechSynthesis();
  const { stream, isActive: cameraActive, startCamera, stopCamera } = useCamera();

  // Voice Commands Handler
  const handleVoiceCommand = useCallback((command: string) => {
    console.log('Voice command received:', command);
    
    if (command.includes('start mission') || command.includes('launch mission')) {
      startMission();
      speak('Mission Control activated. Initiating debris scanning protocols.');
      setRobotMessage('Mission Control activated. Initiating debris scanning protocols.');
    } else if (command.includes('pause mission') || command.includes('stop mission')) {
      pauseMission();
      speak('Mission paused. All robots holding position.');
      setRobotMessage('Mission paused. All robots holding position.');
    } else if (command.includes('return to station') || command.includes('come home')) {
      returnToStation();
      speak('Roger. Returning to Mother Station for processing.');
      setRobotMessage('Roger. Returning to Mother Station for processing.');
    } else if (command.includes('scan for debris') || command.includes('find debris')) {
      scanForDebris();
      speak('Activating long-range sensors. Scanning orbital sectors for debris.');
      setRobotMessage('Activating long-range sensors. Scanning orbital sectors for debris.');
    } else if (command.includes('robot status') || command.includes('health check')) {
      speak(`Robot health at ${robot.health.toFixed(0)} percent. Battery level ${robot.battery.toFixed(0)} percent. All systems operational.`);
      setRobotMessage(`Health: ${robot.health.toFixed(0)}% | Battery: ${robot.battery.toFixed(0)}% | All systems operational.`);
    } else if (command.includes('spawn debris') || command.includes('create debris')) {
      spawnDebris();
      speak('Emergency debris detected. Updating threat assessment.');
      setRobotMessage('Emergency debris detected. Updating threat assessment.');
    }
  }, [robot.health, robot.battery]);

  const { isListening, startListening, stopListening } = useVoiceRecognition(handleVoiceCommand);

  // Initialize debris field with realistic orbital mechanics
  useEffect(() => {
    const debrisTypes = ['metallic', 'plastic', 'non-metallic'] as const;
    const debrisNames = [
      'Satellite Fragment', 'Rocket Stage', 'Paint Fleck', 'Metal Panel', 'Antenna Piece',
      'Solar Panel', 'Fuel Tank', 'Insulation', 'Wire Bundle', 'Connector'
    ];
    
    const initialDebris: DebrisObject[] = Array.from({ length: 60 }, (_, i) => {
      const type = debrisTypes[Math.floor(Math.random() * debrisTypes.length)];
      const orbitRadius = 3 + Math.random() * 2.5;
      const orbitAngle = (i / 60) * Math.PI * 2;
      const orbitSpeed = 0.05 + Math.random() * 0.2;
      
      return {
        id: `DBR-${String(i + 1).padStart(3, '0')}`,
        name: debrisNames[Math.floor(Math.random() * debrisNames.length)],
        type,
        position: [
          Math.cos(orbitAngle) * orbitRadius,
          (Math.random() - 0.5) * 1.2,
          Math.sin(orbitAngle) * orbitRadius
        ] as [number, number, number],
        speed: 5 + Math.random() * 15,
        weight: 0.1 + Math.random() * 8,
        size: 0.08 + Math.random() * 0.25,
        collected: false,
        orbitAngle,
        orbitRadius,
        orbitSpeed,
        gpsCoords: {
          lat: (Math.random() - 0.5) * 180,
          lng: (Math.random() - 0.5) * 360,
          alt: 380 + Math.random() * 80
        }
      };
    });
    
    setDebris(initialDebris);
  }, []);

  // Mission Timer
  useEffect(() => {
    if (!missionState.isActive) return;
    
    const timer = setInterval(() => {
      setMissionState(prev => ({ ...prev, missionTime: prev.missionTime + 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [missionState.isActive]);

  // Mission Logic
  const startMission = () => {
    setMissionState(prev => ({ ...prev, isActive: true, phase: 'scanning' }));
    setRobot(prev => ({ ...prev, currentTask: 'Scanning orbital sectors' }));
    
    // Animate mission start
    anime({
      targets: '.mission-indicator',
      backgroundColor: ['#374151', '#10B981'],
      duration: 1000,
      easing: 'easeOutQuart'
    });
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
      currentTask: 'Returning to Mother Station' 
    }));
    setMissionState(prev => ({ ...prev, phase: 'returning' }));
  };

  const scanForDebris = () => {
    setMissionState(prev => ({ ...prev, phase: 'scanning' }));
    setRobot(prev => ({ ...prev, currentTask: 'Long-range debris scanning' }));
    
    // Animate scanning effect
    anime({
      targets: '.radar-sweep',
      rotate: '360deg',
      duration: 2000,
      easing: 'linear',
      loop: true
    });
  };

  const spawnDebris = () => {
    const types = ['metallic', 'plastic', 'non-metallic'] as const;
    const type = types[Math.floor(Math.random() * types.length)];
    const orbitRadius = 3 + Math.random() * 2;
    const orbitAngle = Math.random() * Math.PI * 2;
    
    const newDebris: DebrisObject = {
      id: `DBR-${Date.now()}`,
      name: `Emergency ${type.charAt(0).toUpperCase() + type.slice(1)} Fragment`,
      type,
      position: [
        Math.cos(orbitAngle) * orbitRadius,
        (Math.random() - 0.5) * 1,
        Math.sin(orbitAngle) * orbitRadius
      ] as [number, number, number],
      speed: 8 + Math.random() * 12,
      weight: 0.5 + Math.random() * 6,
      size: 0.1 + Math.random() * 0.3,
      collected: false,
      orbitAngle,
      orbitRadius,
      orbitSpeed: 0.1 + Math.random() * 0.3,
      gpsCoords: {
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        alt: 380 + Math.random() * 80
      }
    };
    
    setDebris(prev => [...prev, newDebris]);
  };

  // Mission Loop with realistic phases
  useEffect(() => {
    if (!missionState.isActive) return;

    const missionLoop = setInterval(() => {
      switch (missionState.phase) {
        case 'scanning':
          const availableDebris = debris.filter(d => !d.collected);
          if (availableDebris.length > 0) {
            const target = availableDebris[Math.floor(Math.random() * Math.min(3, availableDebris.length))];
            setMissionState(prev => ({ 
              ...prev, 
              phase: 'planning', 
              targetDebris: target.id 
            }));
            setRobot(prev => ({ ...prev, currentTask: 'Calculating optimal path' }));
            speak(`Target acquired: ${target.name}. Type: ${target.type}. Weight: ${target.weight.toFixed(1)} kilograms. Speed: ${target.speed.toFixed(1)} kilometers per second.`);
            setRobotMessage(`Target: ${target.name} | Type: ${target.type} | Weight: ${target.weight.toFixed(1)}kg | Speed: ${target.speed.toFixed(1)}km/s`);
            
            // Calculate path plans
            setPathPlan({
              shortest: { distance: 150, eta: 120, fuel: 25, risk: 0.7 },
              safest: { distance: 280, eta: 220, fuel: 18, risk: 0.2 }
            });
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
                currentTask: 'En route to target debris',
                speed: 7.2
              }));
              speak('Path calculated. Executing safest route to target. Estimated time: 3 minutes 40 seconds.');
              setRobotMessage('Path calculated. Executing safest route. ETA: 3m 40s');
            }
          }, 3000);
          break;
          
        case 'moving':
          const target = debris.find(d => d.id === missionState.targetDebris);
          if (target) {
            const distance = new THREE.Vector3(...robot.position)
              .distanceTo(new THREE.Vector3(...target.position));
            
            if (distance < 0.8) {
              setMissionState(prev => ({ ...prev, phase: 'collecting' }));
              setRobot(prev => ({ 
                ...prev, 
                isMoving: false, 
                currentTask: 'Debris capture in progress',
                speed: 0
              }));
              speak(`Target reached. Deploying ${target.type === 'metallic' ? 'magnetic capture system' : target.type === 'plastic' ? 'vacuum collection system' : 'robotic grasping arms'}.`);
              setRobotMessage(`Deploying ${target.type === 'metallic' ? 'magnetic capture' : target.type === 'plastic' ? 'vacuum system' : 'grasping arms'}`);
            }
          }
          break;
          
        case 'collecting':
          setTimeout(() => {
            const target = debris.find(d => d.id === missionState.targetDebris);
            if (target) {
              setDebris(prev => prev.map(d => 
                d.id === missionState.targetDebris ? { ...d, collected: true } : d
              ));
              setMissionState(prev => ({ ...prev, phase: 'returning' }));
              setRobot(prev => ({ 
                ...prev, 
                targetPosition: [6, 2, 0], 
                isMoving: true, 
                currentTask: 'Returning with debris payload',
                speed: 6.8
              }));
              speak(`${target.name} collected successfully. Debris secured in containment unit. Returning to Mother Station for processing.`);
              setRobotMessage(`${target.name} collected. Returning to Mother Station.`);
            }
          }, 4000);
          break;
          
        case 'returning':
          const stationDistance = new THREE.Vector3(...robot.position)
            .distanceTo(new THREE.Vector3(6, 2, 0));
          
          if (stationDistance < 1.2) {
            setMissionState(prev => ({ 
              ...prev, 
              phase: 'processing',
              completedMissions: prev.completedMissions + 1
            }));
            setRobot(prev => ({ 
              ...prev, 
              isMoving: false, 
              currentTask: 'Transferring debris for processing',
              speed: 0
            }));
          }
          break;
          
        case 'processing':
          setTimeout(() => {
            setMissionState(prev => ({ ...prev, phase: 'scanning', targetDebris: null }));
            setRobot(prev => ({ ...prev, currentTask: 'Scanning for new targets' }));
            speak('Debris processing complete. Materials recycled successfully. Resuming orbital cleanup operations.');
            setRobotMessage('Processing complete. Materials recycled. Resuming operations.');
            setPathPlan(null);
          }, 3000);
          break;
      }
    }, 1000);

    return () => clearInterval(missionLoop);
  }, [missionState, robot, debris, speak]);

  // Real-time robot updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setRobot(prev => ({
        ...prev,
        battery: Math.max(15, prev.battery - (prev.isMoving ? 0.2 : 0.05)),
        health: Math.max(85, prev.health + (Math.random() - 0.5) * 2)
      }));
    }, 2000);

    return () => clearInterval(updateInterval);
  }, []);

  const handleDebrisClick = (debrisObj: DebrisObject) => {
    if (!missionState.isActive) {
      speak('Mission not active. Please start mission first.');
      setRobotMessage('Mission not active. Please start mission first.');
      return;
    }
    
    setMissionState(prev => ({ 
      ...prev, 
      phase: 'planning', 
      targetDebris: debrisObj.id 
    }));
    setRobot(prev => ({ ...prev, currentTask: 'Target manually assigned' }));
    speak(`Manual target assignment: ${debrisObj.name}. Calculating intercept trajectory.`);
    setRobotMessage(`Manual target: ${debrisObj.name}. Calculating trajectory.`);
    
    // Animate target selection
    anime({
      targets: '.target-indicator',
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
      duration: 1000,
      easing: 'easeInOutSine'
    });
  };

  const handleRobotClick = (robotData: Robot) => {
    setSelectedRobot(robotData);
    speak(`Robot ${robotData.id} selected. Current task: ${robotData.currentTask}.`);
    setRobotMessage(`Robot ${robotData.id} selected. Task: ${robotData.currentTask}`);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Mission Control Header */}
      <div className="h-20 bg-gray-900 border-b border-cyan-400/30 flex items-center justify-between px-6 relative z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full animate-pulse mission-indicator ${missionState.isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
            <span className="text-cyan-400 font-mono text-lg font-bold">
              AI SWARM MISSION CONTROL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            <span className="font-mono text-cyan-400 text-lg">
              {formatTime(missionState.missionTime)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Voice Control */}
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-cyan-400 hover:bg-cyan-500'} text-black font-bold`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            {isListening ? 'LISTENING...' : 'VOICE CONTROL'}
          </Button>
          
          {/* Robot Eyes Camera */}
          <Button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`${cameraActive ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-400 hover:bg-cyan-500'} text-black font-bold`}
          >
            {cameraActive ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
            ROBOT EYES
          </Button>
          
          {/* Mission Control */}
          <Button
            onClick={missionState.isActive ? pauseMission : startMission}
            className={`${missionState.isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-black font-bold px-6`}
          >
            {missionState.isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {missionState.isActive ? 'PAUSE MISSION' : 'START MISSION'}
          </Button>
          
          {/* Demo Controls */}
          <Button
            onClick={spawnDebris}
            className="bg-red-500 hover:bg-red-600 text-white font-bold"
          >
            [ SPAWN DEBRIS ]
          </Button>
        </div>
      </div>

      {/* Main Mission Control Layout */}
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Left Panel - Robot Telemetry */}
        <div className="w-80 bg-gray-900 border-r border-cyan-400/30 overflow-y-auto">
          <div className="p-4 border-b border-cyan-400/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">SWARM TELEMETRY</h3>
            <div className="text-sm text-gray-400">
              1 ROBOT OPERATIONAL
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Robot Status Card */}
            <motion.div
              className={`p-4 rounded border cursor-pointer transition-all ${
                selectedRobot?.id === robot.id 
                  ? 'border-orange-400 bg-orange-400/10' 
                  : 'border-gray-600 hover:border-cyan-400/50'
              }`}
              onClick={() => handleRobotClick(robot)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-sm text-white font-bold">{robot.id}</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  ACTIVE
                </Badge>
              </div>
              
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">GPS:</span>
                  <span className="text-cyan-400 font-mono">
                    {robot.gpsCoords.lat.toFixed(4)}°, {robot.gpsCoords.lng.toFixed(4)}°
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ALT:</span>
                  <span className="text-cyan-400 font-mono">{robot.gpsCoords.alt.toFixed(0)}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">HEALTH:</span>
                  <span className={`font-mono ${robot.health > 90 ? 'text-green-400' : robot.health > 70 ? 'text-orange-400' : 'text-red-400'}`}>
                    {robot.health.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">BATTERY:</span>
                  <span className={`font-mono ${robot.battery > 60 ? 'text-green-400' : robot.battery > 30 ? 'text-orange-400' : 'text-red-400'}`}>
                    {robot.battery.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SPEED:</span>
                  <span className="text-cyan-400 font-mono">{robot.speed.toFixed(1)} km/s</span>
                </div>
                <div className="mt-3 p-2 bg-gray-800/50 rounded">
                  <div className="text-gray-400 text-xs mb-1">CURRENT TASK:</div>
                  <div className="text-white text-xs font-medium">{robot.currentTask}</div>
                </div>
              </div>
            </motion.div>

            {/* Sensor Status */}
            <Card className="bg-black border-cyan-400/30 p-4">
              <h4 className="text-cyan-400 font-bold text-sm mb-3">SENSOR STATUS</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${robot.sensors.radar ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-gray-300">RADAR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${robot.sensors.lidar ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-gray-300">LIDAR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${robot.sensors.magnetic ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-gray-300">MAGNETIC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${robot.sensors.vacuum ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-gray-300">VACUUM</span>
                </div>
              </div>
            </Card>

            {/* Robot Eyes Feed */}
            {cameraActive && stream && (
              <Card className="bg-black border-red-400/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-red-400 font-bold text-sm">ROBOT EYES LIVE</h4>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                <div className="aspect-video bg-gray-800 rounded border border-red-400/30 relative overflow-hidden">
                  <video 
                    ref={(video) => {
                      if (video && stream) {
                        video.srcObject = stream;
                        video.play();
                      }
                    }}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                  />
                  {/* HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 left-2 text-xs font-mono text-red-400">
                      ROBOT CAM | ALT: {robot.gpsCoords.alt.toFixed(0)}km
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Target className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs font-mono text-red-400">
                      STATUS: {robot.currentTask.toUpperCase()}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Center Panel - 3D Reality Map */}
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 z-10">
            <Card className="bg-black/90 border-cyan-400/30 p-4">
              <h3 className="text-cyan-400 font-bold text-sm mb-3">REALITY MAP</h3>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Click robots to select and control</div>
                <div>• Click debris to assign targets</div>
                <div>• Drag to rotate orbital view</div>
                <div>• Scroll to zoom in/out</div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="text-xs text-gray-400 mb-2">LEGEND:</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-xs text-gray-300">AI Swarm Robots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-xs text-gray-300">Space Debris</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs text-gray-300">Mother Station</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="w-full h-full bg-black">
            <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00E6FF" />
              
              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
              
              <Earth />
              <MotherStation />
              <SpaceRobot 
                robot={robot} 
                cameraStream={stream} 
                missionState={missionState}
                onRobotClick={handleRobotClick}
              />
              <DebrisField debris={debris} onDebrisClick={handleDebrisClick} />
              <PathVisualization 
                robot={robot} 
                targetDebris={debris.find(d => d.id === missionState.targetDebris) || null} 
              />
              
              {/* Orbital rings */}
              <Ring args={[4.5, 4.52, 64]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#00E6FF" opacity={0.2} transparent />
              </Ring>
              <Ring args={[5.2, 5.22, 64]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#FFB86B" opacity={0.15} transparent />
              </Ring>
              
              <OrbitControls 
                enableZoom={true}
                enablePan={true}
                maxDistance={20}
                minDistance={5}
                autoRotate={false}
              />
            </Canvas>
          </div>

          {/* Path Planning Overlay */}
          <AnimatePresence>
            {pathPlan && missionState.targetDebris && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
              >
                <Card className="bg-black/95 border-cyan-400/50 p-6 min-w-96">
                  <h4 className="text-cyan-400 font-bold mb-4 text-center">PATH CALCULATION</h4>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <h5 className="text-cyan-400 font-semibold">SHORTEST PATH</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Distance:</span>
                          <span className="text-cyan-400 font-mono">{pathPlan.shortest.distance}km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">ETA:</span>
                          <span className="text-cyan-400 font-mono">{Math.floor(pathPlan.shortest.eta / 60)}m {pathPlan.shortest.eta % 60}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fuel:</span>
                          <span className="text-orange-400 font-mono">{pathPlan.shortest.fuel}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Risk:</span>
                          <span className="text-red-400 font-mono">{(pathPlan.shortest.risk * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-orange-400 font-semibold">SAFEST PATH</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Distance:</span>
                          <span className="text-orange-400 font-mono">{pathPlan.safest.distance}km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">ETA:</span>
                          <span className="text-orange-400 font-mono">{Math.floor(pathPlan.safest.eta / 60)}m {pathPlan.safest.eta % 60}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fuel:</span>
                          <span className="text-orange-400 font-mono">{pathPlan.safest.fuel}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Risk:</span>
                          <span className="text-green-400 font-mono">{(pathPlan.safest.risk * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <Button size="sm" className="bg-cyan-400 text-black hover:bg-cyan-500 flex-1">
                      Execute Shortest
                    </Button>
                    <Button size="sm" className="bg-orange-400 text-black hover:bg-orange-500 flex-1">
                      Execute Safest
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Mission Analytics */}
        <div className="w-80 bg-gray-900 border-l border-cyan-400/30 overflow-y-auto">
          <div className="p-4 border-b border-cyan-400/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">MISSION ANALYTICS</h3>
            <div className="text-sm text-gray-400">
              REAL-TIME PERFORMANCE
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Mission Stats */}
            <Card className="bg-black border-cyan-400/30 p-4">
              <h4 className="text-cyan-400 font-bold text-sm mb-3">MISSION PROGRESS</h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Phase:</span>
                  <span className="text-white font-mono uppercase">{missionState.phase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed:</span>
                  <span className="text-green-400 font-mono font-bold">{missionState.completedMissions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Debris Remaining:</span>
                  <span className="text-orange-400 font-mono">{debris.filter(d => !d.collected).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate:</span>
                  <span className="text-green-400 font-mono">
                    {missionState.completedMissions > 0 ? '100%' : '0%'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Debris Analysis */}
            <Card className="bg-black border-orange-400/30 p-4">
              <h4 className="text-orange-400 font-bold text-sm mb-3">DEBRIS ANALYSIS</h4>
              <div className="space-y-2 text-xs">
                {['metallic', 'plastic', 'non-metallic'].map(type => {
                  const count = debris.filter(d => d.type === type && !d.collected).length;
                  const collected = debris.filter(d => d.type === type && d.collected).length;
                  return (
                    <div key={type} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{type}:</span>
                      <span className="text-white font-mono">
                        {count} active, {collected} collected
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Voice Commands Help */}
            <Card className="bg-black border-green-400/30 p-4">
              <h4 className="text-green-400 font-bold text-sm mb-3">VOICE COMMANDS</h4>
              <div className="text-xs text-gray-300 space-y-1">
                <div>• "Start mission" - Begin operations</div>
                <div>• "Pause mission" - Halt all robots</div>
                <div>• "Return to station" - Recall robot</div>
                <div>• "Scan for debris" - Start scanning</div>
                <div>• "Robot status" - Health check</div>
                <div>• "Spawn debris" - Add test debris</div>
              </div>
            </Card>

            {/* Emergency Controls */}
            <div className="space-y-2">
              <Button 
                className="w-full bg-cyan-400 text-black hover:bg-cyan-500 font-bold"
                onClick={() => {
                  setRobot(prev => ({ ...prev, battery: 100, health: 100 }));
                  speak('Emergency recharge complete. All systems restored.');
                  setRobotMessage('Emergency recharge complete. All systems restored.');
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                EMERGENCY RECHARGE
              </Button>
              
              <Button 
                className="w-full bg-orange-500 text-black hover:bg-orange-600 font-bold"
                onClick={() => {
                  setRobot(prev => ({ ...prev, health: 100 }));
                  speak('Self-repair systems activated. Running full diagnostics.');
                  setRobotMessage('Self-repair activated. Running diagnostics.');
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                RUN DIAGNOSTICS
              </Button>
              
              <Button 
                className="w-full bg-red-500 text-white hover:bg-red-600 font-bold"
                onClick={() => {
                  pauseMission();
                  returnToStation();
                  speak('Emergency protocol activated. All robots returning to station immediately.');
                  setRobotMessage('Emergency protocol activated. Returning to station.');
                }}
              >
                <Shield className="h-4 w-4 mr-2" />
                EMERGENCY RETURN
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Robot Communication Panel */}
      <AnimatePresence>
        {robotMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
          >
            <Card className="bg-black/95 border-cyan-400/50 p-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="text-cyan-400 font-bold text-sm">SWARM-01 COMMUNICATION</div>
                  <div className="text-white text-sm mt-1">{robotMessage}</div>
                </div>
                <Volume2 className="h-5 w-5 text-cyan-400" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Recognition Indicator */}
      {isListening && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
        >
          <div className="bg-red-500/20 border-4 border-red-500 rounded-full p-12">
            <Mic className="h-16 w-16 text-red-400 animate-pulse" />
            <div className="text-center mt-4 text-red-400 font-bold text-xl">VOICE ACTIVE</div>
            <div className="text-center text-red-400 text-sm">Listening for commands...</div>
          </div>
        </motion.div>
      )}

      {/* Mission Status Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <Card className="bg-black/95 border-cyan-400/50 px-8 py-4">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${missionState.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-gray-300">Mission: </span>
              <span className="text-cyan-400 font-bold font-mono">
                {missionState.isActive ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            
            <div className="h-4 w-px bg-gray-600" />
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="text-gray-300">Debris: </span>
              <span className="text-orange-400 font-bold font-mono">{debris.length}</span>
            </div>
            
            <div className="h-4 w-px bg-gray-600" />
            
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Collected: </span>
              <span className="text-green-400 font-bold font-mono">{debris.filter(d => d.collected).length}</span>
            </div>
            
            <div className="h-4 w-px bg-gray-600" />
            
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-orange-400" />
              <span className="text-gray-300">Fleet Power: </span>
              <span className="text-orange-400 font-bold font-mono">{robot.battery.toFixed(0)}%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MissionControl;