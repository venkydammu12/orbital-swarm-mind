import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Battery, 
  Wifi, 
  AlertTriangle, 
  Eye, 
  Navigation, 
  Cpu, 
  Thermometer,
  Signal,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Clock,
  Bell,
  MapPin,
  Target,
  Satellite,
  Radio,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';

interface Robot {
  id: string;
  name: string;
  battery: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  task: string;
  position: { x: number; y: number; z: number };
  temperature: number;
  signalStrength: number;
  status: 'active' | 'returning' | 'maintenance' | 'offline';
  speed: number;
  debrisCollected: number;
}

interface DebrisObject {
  id: string;
  position: { x: number; y: number; z: number };
  size: 'small' | 'medium' | 'large';
  risk: 'low' | 'medium' | 'high';
  type: string;
}

const mockRobots: Robot[] = [
  {
    id: 'RSW-001',
    name: 'Alpha Collector',
    battery: 87,
    health: 'excellent',
    task: 'Debris Collection',
    position: { x: 45.2, y: -12.8, z: 408.5 },
    temperature: 23,
    signalStrength: 94,
    status: 'active',
    speed: 7.8,
    debrisCollected: 23
  },
  {
    id: 'RSW-002', 
    name: 'Beta Scanner',
    battery: 62,
    health: 'good',
    task: 'Orbital Scan',
    position: { x: 51.7, y: -8.3, z: 412.1 },
    temperature: 28,
    signalStrength: 89,
    status: 'active',
    speed: 6.4,
    debrisCollected: 18
  },
  {
    id: 'RSW-003',
    name: 'Gamma Processor',
    battery: 34,
    health: 'warning',
    task: 'Material Processing',
    position: { x: 38.9, y: -15.1, z: 405.2 },
    temperature: 31,
    signalStrength: 76,
    status: 'returning',
    speed: 5.2,
    debrisCollected: 31
  },
  {
    id: 'RSW-004',
    name: 'Delta Repair',
    battery: 91,
    health: 'excellent',
    task: 'System Maintenance',
    position: { x: 47.1, y: -10.5, z: 410.8 },
    temperature: 25,
    signalStrength: 98,
    status: 'maintenance',
    speed: 0,
    debrisCollected: 8
  }
];

const mockDebris: DebrisObject[] = [
  { id: 'DEB-001', position: { x: 50, y: -10, z: 415 }, size: 'large', risk: 'high', type: 'Satellite Fragment' },
  { id: 'DEB-002', position: { x: 42, y: -14, z: 407 }, size: 'medium', risk: 'medium', type: 'Rocket Stage' },
  { id: 'DEB-003', position: { x: 48, y: -8, z: 411 }, size: 'small', risk: 'low', type: 'Paint Flake' },
];

const speedData = [
  { time: '00:00', 'RSW-001': 7.8, 'RSW-002': 6.4, 'RSW-003': 5.2, 'RSW-004': 0 },
  { time: '00:15', 'RSW-001': 8.1, 'RSW-002': 6.7, 'RSW-003': 4.9, 'RSW-004': 0 },
  { time: '00:30', 'RSW-001': 7.9, 'RSW-002': 6.2, 'RSW-003': 5.4, 'RSW-004': 2.1 },
  { time: '00:45', 'RSW-001': 8.3, 'RSW-002': 6.9, 'RSW-003': 5.1, 'RSW-004': 3.2 },
  { time: '01:00', 'RSW-001': 7.6, 'RSW-002': 6.5, 'RSW-003': 4.8, 'RSW-004': 2.8 },
];

const debrisTypeData = [
  { name: 'Satellite Fragments', value: 342, color: '#ff6b6b' },
  { name: 'Rocket Stages', value: 187, color: '#4ecdc4' },
  { name: 'Paint Flakes', value: 523, color: '#45b7d1' },
  { name: 'Metal Debris', value: 195, color: '#96ceb4' },
];

const missionEvents = [
  { time: '14:32:15', robot: 'RSW-001', event: 'Debris collection initiated', type: 'info' },
  { time: '14:31:48', robot: 'RSW-002', event: 'High-risk debris detected', type: 'warning' },
  { time: '14:30:22', robot: 'RSW-003', event: 'Battery optimization activated', type: 'success' },
  { time: '14:29:55', robot: 'RSW-004', event: 'Maintenance cycle completed', type: 'success' },
  { time: '14:28:31', robot: 'RSW-001', event: 'Path recalculation completed', type: 'info' },
];

// 3D Space Map Component
const SpaceMap3D = ({ robots, debris }: { robots: Robot[], debris: DebrisObject[] }) => {
  return (
    <div className="h-96 w-full bg-black rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <color attach="background" args={['#000008']} />
        <Stars radius={300} depth={60} count={20000} factor={7} />
        
        {/* Earth */}
        <Sphere args={[20]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#4A90E2" wireframe />
        </Sphere>
        
        {/* Robots */}
        {robots.map((robot, index) => (
          <group key={robot.id} position={[robot.position.x - 45, robot.position.y + 10, robot.position.z - 408]}>
            <Sphere args={[1.5]}>
              <meshStandardMaterial 
                color={robot.status === 'active' ? '#00ff88' : '#ffaa00'} 
                emissive={robot.status === 'active' ? '#004422' : '#442200'}
              />
            </Sphere>
          </group>
        ))}
        
        {/* Debris */}
        {debris.map((deb, index) => (
          <group key={deb.id} position={[deb.position.x - 45, deb.position.y + 10, deb.position.z - 408]}>
            <Sphere args={[0.8]}>
              <meshStandardMaterial 
                color={deb.risk === 'high' ? '#ff4444' : deb.risk === 'medium' ? '#ffaa44' : '#44ff44'} 
                emissive={deb.risk === 'high' ? '#440000' : deb.risk === 'medium' ? '#442200' : '#004400'}
              />
            </Sphere>
          </group>
        ))}
        
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
      
      <div className="absolute top-4 left-4 text-white text-sm space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span>Active Robots</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <span>High-Risk Debris</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span>Earth Orbit</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [liveData, setLiveData] = useState({
    totalDebrisCollected: 1247,
    activeRobots: 4,
    missionProgress: 73,
    orbitAltitude: 408.5,
    debrisDetected: 1847,
    safetyCriticalEvents: 3
  });

  // Real-time clock and data updates
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const dataInterval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        totalDebrisCollected: prev.totalDebrisCollected + Math.floor(Math.random() * 3),
        missionProgress: Math.min(100, prev.missionProgress + Math.random() * 0.5),
        orbitAltitude: 408.5 + (Math.random() - 0.5) * 2,
        debrisDetected: prev.debrisDetected + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      returning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      maintenance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      offline: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return variants[status as keyof typeof variants] || variants.offline;
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-16 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Mission Control Center</h1>
                <p className="text-sm text-white/60">Space Debris Management System</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  OPERATIONAL
                </Badge>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Satellite className="w-3 h-3 mr-1" />
                  ALL SYSTEMS NOMINAL
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-white/60">Mission Time</p>
                <p className="text-lg font-mono text-accent">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-accent/50 text-accent">
                <Bell className="w-4 h-4 mr-2" />
                Alerts (3)
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mission Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
        >
          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-4">
              <div className="text-center">
                <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs text-white/60">Debris Collected</p>
                <p className="text-xl font-bold text-accent">{liveData.totalDebrisCollected}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-4">
              <div className="text-center">
                <Navigation className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Active Robots</p>
                <p className="text-xl font-bold text-green-400">{liveData.activeRobots}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Mission Progress</p>
                <p className="text-xl font-bold text-blue-400">{liveData.missionProgress.toFixed(1)}%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-4">
              <div className="text-center">
                <Satellite className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Orbit Altitude</p>
                <p className="text-xl font-bold text-yellow-400">{liveData.orbitAltitude.toFixed(1)} km</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-4">
              <div className="text-center">
                <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Debris Detected</p>
                <p className="text-xl font-bold text-orange-400">{liveData.debrisDetected}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-4">
              <div className="text-center">
                <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Critical Events</p>
                <p className="text-xl font-bold text-red-400">{liveData.safetyCriticalEvents}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mapping">Reality Map</TabsTrigger>
            <TabsTrigger value="telemetry">Robot Telemetry</TabsTrigger>
            <TabsTrigger value="feed">Robot-Eyes Feed</TabsTrigger>
            <TabsTrigger value="insights">Mission Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Robot Speed Chart */}
              <Card className="bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Robot Speed Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={speedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="time" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="RSW-001" stroke="#00ff88" strokeWidth={2} />
                      <Line type="monotone" dataKey="RSW-002" stroke="#4ecdc4" strokeWidth={2} />
                      <Line type="monotone" dataKey="RSW-003" stroke="#ffaa44" strokeWidth={2} />
                      <Line type="monotone" dataKey="RSW-004" stroke="#ff6b6b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Debris Collection Pie Chart */}
              <Card className="bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Debris Collection by Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={debrisTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {debrisTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-6">
            <Card className="bg-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Real-Time Orbital Mapping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SpaceMap3D robots={mockRobots} debris={mockDebris} />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-background/50 border-border/30">
                    <CardContent className="p-4">
                      <h4 className="text-white font-medium mb-2">Path Planning</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Shortest Route:</span>
                          <span className="text-green-400">2.4 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Safest Route:</span>
                          <span className="text-blue-400">3.1 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">ETA:</span>
                          <span className="text-accent">14:38</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border-border/30">
                    <CardContent className="p-4">
                      <h4 className="text-white font-medium mb-2">Risk Analysis</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">High Risk Zones:</span>
                          <span className="text-red-400">3 active</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Safe Corridors:</span>
                          <span className="text-green-400">7 available</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Collision Risk:</span>
                          <span className="text-yellow-400">Medium</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border-border/30">
                    <CardContent className="p-4">
                      <h4 className="text-white font-medium mb-2">Mission Assignment</h4>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full bg-accent text-black hover:bg-accent/90">
                          Assign RSW-001
                        </Button>
                        <Button size="sm" variant="outline" className="w-full border-blue-500/50 text-blue-400">
                          Alternative Route
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="telemetry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Robot Fleet */}
              <div className="lg:col-span-2">
                <Card className="bg-card/80 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Robot Fleet Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRobots.map((robot, index) => (
                        <motion.div
                          key={robot.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                            selectedRobot?.id === robot.id 
                              ? 'border-accent bg-accent/10' 
                              : 'border-border/30 bg-card/30 hover:border-accent/50'
                          }`}
                          onClick={() => setSelectedRobot(robot)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                robot.status === 'active' ? 'bg-green-400 animate-pulse' : 
                                robot.status === 'returning' ? 'bg-blue-400' :
                                robot.status === 'maintenance' ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`} />
                              <div>
                                <h3 className="text-white font-medium">{robot.name}</h3>
                                <p className="text-sm text-white/60">{robot.id}</p>
                              </div>
                            </div>
                            <Badge className={getStatusBadge(robot.status)}>
                              {robot.status.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Battery className="w-4 h-4 text-green-400" />
                              <span className="text-white/70">{robot.battery}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Signal className="w-4 h-4 text-blue-400" />
                              <span className="text-white/70">{robot.signalStrength}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Thermometer className="w-4 h-4 text-orange-400" />
                              <span className="text-white/70">{robot.temperature}°C</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-purple-400" />
                              <span className="text-white/70">{robot.debrisCollected}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Robot Controls */}
              <div className="space-y-6">
                {selectedRobot && (
                  <Card className="bg-card/80 border-border/50">
                    <CardHeader>
                      <CardTitle className="text-white">Robot Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-accent text-black hover:bg-accent/90">
                        <Navigation className="w-4 h-4 mr-2" />
                        Navigate to Target
                      </Button>
                      <Button variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Mission
                      </Button>
                      <Button variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Return to Base
                      </Button>
                      <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Emergency Stop
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Robot-Eye Feed */}
              <Card className="bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Robot-Eye Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black rounded-lg relative overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="w-12 h-12 text-accent mx-auto mb-3" />
                        <p className="text-white/60">Live Camera Feed</p>
                        <p className="text-sm text-accent">RSW-001 • Alpha Collector</p>
                      </div>
                    </div>
                    {/* AI Detection Overlay */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <div className="bg-red-500/20 border border-red-500/50 px-2 py-1 rounded text-xs text-red-400">
                        DEBRIS DETECTED
                      </div>
                      <div className="bg-green-500/20 border border-green-500/50 px-2 py-1 rounded text-xs text-green-400">
                        AI VISION ACTIVE
                      </div>
                    </div>
                    {/* Simulated scan lines */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-pulse" />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {mockRobots.map(robot => (
                      <Button 
                        key={robot.id}
                        size="sm" 
                        variant={selectedRobot?.id === robot.id ? "default" : "outline"}
                        className="text-xs"
                      >
                        {robot.name.split(' ')[0]}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Detection Analysis */}
              <Card className="bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    AI Detection Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-medium">High-Risk Debris</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-white/70">Type: Satellite Fragment</p>
                        <p className="text-white/70">Size: 2.4m x 1.8m</p>
                        <p className="text-white/70">Distance: 245m</p>
                        <p className="text-white/70">Confidence: 94%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">Medium-Risk Debris</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-white/70">Type: Metal Fragment</p>
                        <p className="text-white/70">Size: 0.8m x 0.6m</p>
                        <p className="text-white/70">Distance: 312m</p>
                        <p className="text-white/70">Confidence: 87%</p>
                      </div>
                    </div>

                    <Button className="w-full bg-accent text-black hover:bg-accent/90">
                      <Target className="w-4 h-4 mr-2" />
                      Initiate Collection Sequence
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mission Timeline */}
              <Card className="bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Mission Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {missionEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/30"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          event.type === 'success' ? 'bg-green-400' :
                          event.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-accent font-mono">{event.time}</span>
                            <span className="text-xs text-white/60">{event.robot}</span>
                          </div>
                          <p className="text-sm text-white/80">{event.event}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Predictions */}
              <Card className="bg-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    AI Predictions & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h4 className="text-green-400 font-medium mb-2">Mission Efficiency</h4>
                      <p className="text-sm text-white/70 mb-2">Current efficiency: 94%</p>
                      <p className="text-xs text-white/60">Optimal debris collection pattern detected</p>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <h4 className="text-yellow-400 font-medium mb-2">Maintenance Alert</h4>
                      <p className="text-sm text-white/70 mb-2">RSW-003 battery degradation predicted</p>
                      <p className="text-xs text-white/60">Recommend service in 4.2 days</p>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <h4 className="text-blue-400 font-medium mb-2">Path Optimization</h4>
                      <p className="text-sm text-white/70 mb-2">Alternative route saves 23% fuel</p>
                      <p className="text-xs text-white/60">Safety score: 96%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;