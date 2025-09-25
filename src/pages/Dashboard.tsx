import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Zap
} from 'lucide-react';

interface Robot {
  id: string;
  name: string;
  battery: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  task: string;
  position: { x: number; y: number };
  temperature: number;
  signalStrength: number;
  status: 'active' | 'returning' | 'maintenance' | 'offline';
}

const mockRobots: Robot[] = [
  {
    id: 'RSW-001',
    name: 'Alpha Collector',
    battery: 87,
    health: 'excellent',
    task: 'Debris Collection',
    position: { x: 45.2, y: -12.8 },
    temperature: 23,
    signalStrength: 94,
    status: 'active'
  },
  {
    id: 'RSW-002', 
    name: 'Beta Scanner',
    battery: 62,
    health: 'good',
    task: 'Orbital Scan',
    position: { x: 51.7, y: -8.3 },
    temperature: 28,
    signalStrength: 89,
    status: 'active'
  },
  {
    id: 'RSW-003',
    name: 'Gamma Processor',
    battery: 34,
    health: 'warning',
    task: 'Material Processing',
    position: { x: 38.9, y: -15.1 },
    temperature: 31,
    signalStrength: 76,
    status: 'returning'
  },
  {
    id: 'RSW-004',
    name: 'Delta Repair',
    battery: 91,
    health: 'excellent',
    task: 'System Maintenance',
    position: { x: 47.1, y: -10.5 },
    temperature: 25,
    signalStrength: 98,
    status: 'maintenance'
  }
];

const Dashboard = () => {
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);
  const [missionStatus, setMissionStatus] = useState('active');
  const [liveData, setLiveData] = useState({
    totalDebrisCollected: 1247,
    activeRobots: 4,
    missionProgress: 73,
    orbitAltitude: 408.5
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        totalDebrisCollected: prev.totalDebrisCollected + Math.floor(Math.random() * 3),
        missionProgress: Math.min(100, prev.missionProgress + Math.random() * 0.5),
        orbitAltitude: 408.5 + (Math.random() - 0.5) * 2
      }));
    }, 5000);

    return () => clearInterval(interval);
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
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mission <span className="text-accent">Control</span>
          </h1>
          <p className="text-xl text-white/70 mb-6">
            Real-time monitoring and control of AI swarm robotics fleet
          </p>
          
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="w-3 h-3 mr-1" />
              MISSION ACTIVE
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/30">
              <Wifi className="w-3 h-3 mr-1" />
              ALL SYSTEMS ONLINE
            </Badge>
          </div>
        </motion.div>

        {/* Mission Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Debris Collected</p>
                  <p className="text-2xl font-bold text-accent">{liveData.totalDebrisCollected}</p>
                </div>
                <Activity className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Active Robots</p>
                  <p className="text-2xl font-bold text-green-400">{liveData.activeRobots}</p>
                </div>
                <Navigation className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Mission Progress</p>
                  <p className="text-2xl font-bold text-blue-400">{liveData.missionProgress.toFixed(1)}%</p>
                </div>
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Orbit Altitude</p>
                  <p className="text-2xl font-bold text-yellow-400">{liveData.orbitAltitude.toFixed(1)} km</p>
                </div>
                <Activity className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Robot Fleet Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/80 border-border/50 h-full">
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

                      <div className="grid grid-cols-3 gap-4 text-sm">
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
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/30">
                        <p className="text-sm text-white/60">Current Task:</p>
                        <p className="text-white">{robot.task}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Robot Detail Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {selectedRobot ? (
              <>
                <Card className="bg-card/80 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Robot-Eye Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Eye className="w-8 h-8 text-accent mx-auto mb-2" />
                          <p className="text-sm text-white/60">Live Feed: {selectedRobot.name}</p>
                          <p className="text-xs text-accent">Simulated Camera View</p>
                        </div>
                      </div>
                      {/* Simulated scan lines */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-pulse" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white">Robot Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-accent text-black hover:bg-accent/90">
                      <Navigation className="w-4 h-4 mr-2" />
                      Send Navigation Command
                    </Button>
                    <Button variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Current Task
                    </Button>
                    <Button variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Return to Mothership
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white">Telemetry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Health Status</span>
                        <span className={getHealthColor(selectedRobot.health)}>
                          {selectedRobot.health.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Position</span>
                        <span className="text-accent">
                          {selectedRobot.position.x.toFixed(1)}, {selectedRobot.position.y.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">CPU Load</span>
                        <span className="text-green-400">67%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Last Heartbeat</span>
                        <span className="text-white">2.3s ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-card/80 border-border/50">
                <CardContent className="p-8 text-center">
                  <Activity className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60">Select a robot to view detailed telemetry and controls</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;