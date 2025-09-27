import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Target, 
  Battery, 
  Clock,
  Satellite,
  MapPin,
  Eye,
  Settings,
  AlertTriangle,
  Route
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MissionClock from '@/components/MissionClock';
import SpaceEarth from '@/components/SpaceEarth';
import RobotTelemetry from '@/components/RobotTelemetry';
import RobotEyesFeed from '@/components/RobotEyesFeed';
import MissionAnalytics from '@/components/MissionAnalytics';
import PathPlanning from '@/components/PathPlanning';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'telemetry' | 'eyes' | 'insights' | 'planning'>('overview');
  const [selectedRobot, setSelectedRobot] = useState<any>(null);
  const [missionStats, setMissionStats] = useState({
    activeRobots: 3,
    totalDebris: 847,
    debrisCollected: 45,
    missionCompletion: 23.5,
    energyEfficiency: 87.2,
    systemHealth: 94.8
  });

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionStats(prev => ({
        ...prev,
        debrisCollected: prev.debrisCollected + Math.round(Math.random() * 2),
        missionCompletion: Math.min(prev.missionCompletion + 0.1, 100),
        energyEfficiency: 85 + Math.random() * 10,
        systemHealth: 90 + Math.random() * 8
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, unit, trend, color = 'accent' }: {
    icon: any;
    title: string;
    value: number | string;
    unit?: string;
    trend?: string;
    color?: string;
  }) => (
    <Card className="p-4 glass-card hover:shadow-glow transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-${color}/10`}>
            <Icon className={`h-5 w-5 text-${color}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-foreground">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
        </div>
        {trend && (
          <Badge variant="outline" className="text-xs">
            {trend}
          </Badge>
        )}
      </div>
    </Card>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }: {
    id: string;
    label: string;
    icon: any;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <Button
      variant={isActive ? 'default' : 'outline'}
      onClick={onClick}
      className={`px-4 py-3 flex items-center gap-2 ${isActive ? 'bg-accent text-black' : 'text-muted-foreground'}`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden md:inline">{label}</span>
    </Button>
  );

  const handleRobotSelect = (robot: any) => {
    setSelectedRobot(robot);
    setActiveTab('eyes');
  };

  const handleViewRobotEyes = (robot: any) => {
    setSelectedRobot(robot);
    setActiveTab('eyes');
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              Mission Control Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time monitoring and control of AI swarm robotics fleet
            </p>
          </div>
          <div className="flex items-center gap-6">
            <MissionClock />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-card/30 p-2 rounded-lg backdrop-blur-sm overflow-x-auto">
          <TabButton 
            id="overview" 
            label="Overview" 
            icon={Activity}
            isActive={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <TabButton 
            id="map" 
            label="Reality Map" 
            icon={MapPin}
            isActive={activeTab === 'map'} 
            onClick={() => setActiveTab('map')} 
          />
          <TabButton 
            id="telemetry" 
            label="Fleet Status" 
            icon={Satellite}
            isActive={activeTab === 'telemetry'} 
            onClick={() => setActiveTab('telemetry')} 
          />
          <TabButton 
            id="eyes" 
            label="Robot-Eyes" 
            icon={Eye}
            isActive={activeTab === 'eyes'} 
            onClick={() => setActiveTab('eyes')} 
          />
          <TabButton 
            id="planning" 
            label="Path Planning" 
            icon={Route}
            isActive={activeTab === 'planning'} 
            onClick={() => setActiveTab('planning')} 
          />
          <TabButton 
            id="insights" 
            label="Analytics" 
            icon={Target}
            isActive={activeTab === 'insights'} 
            onClick={() => setActiveTab('insights')} 
          />
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Mission Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard
                  icon={Activity}
                  title="Active Robots"
                  value={missionStats.activeRobots}
                  unit="units"
                  color="accent"
                />
                <StatCard
                  icon={Target}
                  title="Debris Detected"
                  value={missionStats.totalDebris}
                  unit="objects"
                  color="orange-400"
                />
                <StatCard
                  icon={Satellite}
                  title="Debris Collected"
                  value={missionStats.debrisCollected}
                  unit="items"
                  trend="+12%"
                  color="green-400"
                />
                <StatCard
                  icon={Clock}
                  title="Mission Progress"
                  value={missionStats.missionCompletion.toFixed(1)}
                  unit="%"
                  color="blue-400"
                />
                <StatCard
                  icon={Battery}
                  title="Energy Efficiency"
                  value={missionStats.energyEfficiency.toFixed(1)}
                  unit="%"
                  color="purple-400"
                />
                <StatCard
                  icon={Settings}
                  title="System Health"
                  value={missionStats.systemHealth.toFixed(1)}
                  unit="%"
                  trend="98.2%"
                  color="green-400"
                />
              </div>

              {/* Quick Overview Cards */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 glass-card">
                  <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Satellite className="h-5 w-5 text-accent" />
                    Fleet Status Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                      <span className="text-muted-foreground">SW-001 Alpha Explorer</span>
                      <Badge className="bg-accent/10 text-accent border-accent/30">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                      <span className="text-muted-foreground">SW-002 Beta Collector</span>
                      <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30">COLLECTING</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                      <span className="text-muted-foreground">SW-003 Gamma Guardian</span>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/30">RETURNING</Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 glass-card">
                  <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    Mission Alerts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2" />
                      <div>
                        <p className="text-sm text-red-400 font-medium">Low Battery Alert</p>
                        <p className="text-xs text-muted-foreground">SW-004 battery at 23%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mt-2" />
                      <div>
                        <p className="text-sm text-orange-400 font-medium">High Debris Density</p>
                        <p className="text-xs text-muted-foreground">Sector 7 requires attention</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                      <div>
                        <p className="text-sm text-green-400 font-medium">Mission Milestone</p>
                        <p className="text-xs text-muted-foreground">25% completion achieved</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Reality Map Tab */}
          {activeTab === 'map' && (
            <div className="space-y-6">
              <Card className="p-6 glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Real-Time Orbital Map</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      GPS Tracking
                    </Button>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                      LIVE
                    </Badge>
                  </div>
                </div>
                <div className="h-[600px]">
                  <SpaceEarth 
                    onRobotClick={handleRobotSelect}
                    onDebrisClick={(debris) => console.log('Debris clicked:', debris)}
                  />
                </div>
              </Card>
            </div>
          )}

          {/* Robot Telemetry Tab */}
          {activeTab === 'telemetry' && (
            <RobotTelemetry 
              onRobotSelect={handleRobotSelect}
              onViewRobotEyes={handleViewRobotEyes}
            />
          )}

          {/* Robot-Eyes Feed Tab */}
          {activeTab === 'eyes' && (
            <RobotEyesFeed 
              selectedRobot={selectedRobot}
              onTargetSelect={(target) => console.log('Target selected:', target)}
            />
          )}

          {/* Path Planning Tab */}
          {activeTab === 'planning' && (
            <PathPlanning />
          )}

          {/* Mission Insights Tab */}
          {activeTab === 'insights' && (
            <MissionAnalytics timeRange="24h" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;