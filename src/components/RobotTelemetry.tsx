import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Battery, 
  MapPin, 
  Signal, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  Eye
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Robot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  alt: number;
  battery: number;
  status: 'idle' | 'collecting' | 'returning' | 'maintenance' | 'active';
  speed: number;
  debris_collected: number;
  last_update: string;
  mission_time: number;
  signals: {
    gps: boolean;
    lidar: boolean;
    camera: boolean;
    communications: boolean;
  };
}

interface RobotTelemetryProps {
  onRobotSelect?: (robot: Robot) => void;
  onViewRobotEyes?: (robot: Robot) => void;
}

const RobotTelemetry: React.FC<RobotTelemetryProps> = ({ 
  onRobotSelect, 
  onViewRobotEyes 
}) => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null);

  // Mock real-time robot data
  useEffect(() => {
    const mockRobots: Robot[] = [
      {
        id: 'SW-001',
        name: 'Alpha Explorer',
        lat: 40.7128,
        lng: -74.0060,
        alt: 408,
        battery: 85,
        status: 'active',
        speed: 7.2,
        debris_collected: 12,
        last_update: new Date().toISOString(),
        mission_time: 14400, // 4 hours
        signals: { gps: true, lidar: true, camera: true, communications: true }
      },
      {
        id: 'SW-002', 
        name: 'Beta Collector',
        lat: 51.5074,
        lng: -0.1278,
        alt: 395,
        battery: 67,
        status: 'collecting',
        speed: 3.1,
        debris_collected: 8,
        last_update: new Date().toISOString(),
        mission_time: 10800, // 3 hours
        signals: { gps: true, lidar: true, camera: true, communications: false }
      },
      {
        id: 'SW-003',
        name: 'Gamma Guardian',
        lat: 35.6762,
        lng: 139.6503,
        alt: 412,
        battery: 92,
        status: 'returning',
        speed: 8.5,
        debris_collected: 15,
        last_update: new Date().toISOString(),
        mission_time: 7200, // 2 hours
        signals: { gps: true, lidar: false, camera: true, communications: true }
      },
      {
        id: 'SW-004',
        name: 'Delta Scout',
        lat: -33.8688,
        lng: 151.2093,
        alt: 378,
        battery: 23,
        status: 'maintenance',
        speed: 0,
        debris_collected: 5,
        last_update: new Date().toISOString(),
        mission_time: 18000, // 5 hours
        signals: { gps: true, lidar: true, camera: false, communications: true }
      }
    ];

    setRobots(mockRobots);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRobots(prev => prev.map(robot => ({
        ...robot,
        battery: Math.max(15, robot.battery + (Math.random() - 0.5) * 2),
        speed: robot.status === 'active' ? 5 + Math.random() * 5 : 
               robot.status === 'collecting' ? 1 + Math.random() * 3 :
               robot.status === 'returning' ? 6 + Math.random() * 4 : 0,
        mission_time: robot.mission_time + 5,
        last_update: new Date().toISOString()
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Robot['status']) => {
    switch (status) {
      case 'active': return 'bg-accent text-black';
      case 'collecting': return 'bg-orange-500 text-black';
      case 'returning': return 'bg-green-500 text-black';
      case 'maintenance': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleRobotClick = (robot: Robot) => {
    setSelectedRobot(robot.id);
    onRobotSelect?.(robot);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Swarm Fleet Status</h3>
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
          {robots.filter(r => r.status === 'active' || r.status === 'collecting').length} Active
        </Badge>
      </div>

      <div className="grid gap-4">
        {robots.map((robot, index) => (
          <motion.div
            key={robot.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`p-4 glass-card border-l-4 hover:shadow-glow transition-smooth cursor-pointer ${
                selectedRobot === robot.id ? 'border-l-accent shadow-glow' : 'border-l-border'
              }`}
              onClick={() => handleRobotClick(robot)}
            >
              <div className="space-y-3">
                {/* Robot Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
                    <div>
                      <h4 className="font-semibold text-foreground">{robot.name}</h4>
                      <p className="text-sm text-muted-foreground">{robot.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(robot.status)}>
                    {robot.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Robot Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  {/* GPS Location */}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <div>
                      <div className="text-foreground font-mono">
                        {robot.lat.toFixed(4)}°, {robot.lng.toFixed(4)}°
                      </div>
                      <div className="text-muted-foreground">ALT: {robot.alt}km</div>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="flex items-center gap-2">
                    <Battery className={`h-4 w-4 ${getBatteryColor(robot.battery)}`} />
                    <div>
                      <div className={`font-mono ${getBatteryColor(robot.battery)}`}>
                        {robot.battery.toFixed(0)}%
                      </div>
                      <div className="text-muted-foreground">Power</div>
                    </div>
                  </div>

                  {/* Speed & Collection */}
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-accent" />
                    <div>
                      <div className="text-foreground font-mono">
                        {robot.speed.toFixed(1)} km/s
                      </div>
                      <div className="text-muted-foreground">{robot.debris_collected} collected</div>
                    </div>
                  </div>

                  {/* Mission Time */}
                  <div className="flex items-center gap-2">
                    <Signal className="h-4 w-4 text-accent" />
                    <div>
                      <div className="text-foreground font-mono">
                        {formatTime(robot.mission_time)}
                      </div>
                      <div className="text-muted-foreground">Mission Time</div>
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${robot.signals.gps ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-xs text-muted-foreground">GPS</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${robot.signals.lidar ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-xs text-muted-foreground">LiDAR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${robot.signals.camera ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-xs text-muted-foreground">Camera</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${robot.signals.communications ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-xs text-muted-foreground">Comms</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewRobotEyes?.(robot);
                      }}
                      className="h-8 px-3 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Feed
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => e.stopPropagation()}
                      className="h-8 px-3 text-xs"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Control
                    </Button>
                  </div>
                </div>

                {/* Alerts */}
                {robot.battery < 30 && (
                  <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/30 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">Low Battery Warning</span>
                  </div>
                )}
                
                {!robot.signals.communications && (
                  <div className="flex items-center gap-2 p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-orange-400">Communication Issue</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RobotTelemetry;