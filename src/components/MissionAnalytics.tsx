import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  Battery, 
  Clock,
  Zap,
  Shield,
  Activity,
  Download
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MissionAnalyticsProps {
  timeRange?: '1h' | '6h' | '24h' | '7d';
}

const MissionAnalytics: React.FC<MissionAnalyticsProps> = ({ timeRange = '24h' }) => {
  const [missionData, setMissionData] = useState({
    totalDebrisCollected: 45,
    activeRobots: 3,
    missionEfficiency: 87.5,
    totalMissionTime: 28800, // 8 hours
    energyUsed: 62.3,
    safetyScore: 94.2
  });

  // Mock time series data
  const [timeSeriesData] = useState([
    { time: '00:00', debris: 0, energy: 100, robots: 4 },
    { time: '02:00', debris: 5, energy: 95, robots: 4 },
    { time: '04:00', debris: 12, energy: 88, robots: 4 },
    { time: '06:00', debris: 21, energy: 78, robots: 3 },
    { time: '08:00', debris: 28, energy: 65, robots: 3 },
    { time: '10:00', debris: 35, energy: 52, robots: 3 },
    { time: '12:00', debris: 42, energy: 38, robots: 3 },
    { time: '14:00', debris: 45, energy: 25, robots: 2 }
  ]);

  const [debrisTypeData] = useState([
    { name: 'Satellite Fragments', value: 18, color: '#FF6B6B' },
    { name: 'Rocket Parts', value: 12, color: '#4ECDC4' },
    { name: 'Paint Flecks', value: 8, color: '#45B7D1' },
    { name: 'Metal Debris', value: 5, color: '#96CEB4' },
    { name: 'Other', value: 2, color: '#FCEA2B' }
  ]);

  const [robotPerformance] = useState([
    { robot: 'SW-001', collected: 15, efficiency: 92 },
    { robot: 'SW-002', collected: 12, efficiency: 88 },
    { robot: 'SW-003', collected: 18, efficiency: 95 },
    { robot: 'SW-004', collected: 0, efficiency: 0 }
  ]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    unit, 
    trend, 
    color = 'accent' 
  }: {
    icon: any;
    title: string;
    value: number | string;
    unit?: string;
    trend?: number;
    color?: string;
  }) => (
    <Card className="p-4 glass-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-${color}/10`}>
            <Icon className={`h-5 w-5 text-${color}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
            trend > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            <TrendingUp className="h-3 w-3" />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Mission Analytics</h3>
          <p className="text-muted-foreground">Real-time performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            {timeRange.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={Target}
          title="Debris Collected"
          value={missionData.totalDebrisCollected}
          unit="items"
          trend={12}
          color="accent"
        />
        <StatCard
          icon={Activity}
          title="Active Robots"
          value={missionData.activeRobots}
          unit="units"
          color="green-400"
        />
        <StatCard
          icon={TrendingUp}
          title="Efficiency"
          value={missionData.missionEfficiency}
          unit="%"
          trend={5}
          color="blue-400"
        />
        <StatCard
          icon={Clock}
          title="Mission Time"
          value={formatTime(missionData.totalMissionTime)}
          color="purple-400"
        />
        <StatCard
          icon={Battery}
          title="Energy Used"
          value={missionData.energyUsed}
          unit="%"
          color="orange-400"
        />
        <StatCard
          icon={Shield}
          title="Safety Score"
          value={missionData.safetyScore}
          unit="%"
          trend={2}
          color="green-400"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Debris Collection Over Time */}
        <Card className="p-6 glass-card">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Debris Collection Timeline</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="debrisGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E6FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00E6FF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #00E6FF',
                  borderRadius: '8px' 
                }}
              />
              <Area 
                type="monotone" 
                dataKey="debris" 
                stroke="#00E6FF" 
                fillOpacity={1} 
                fill="url(#debrisGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Energy Consumption */}
        <Card className="p-6 glass-card">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Energy Consumption</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #FFB86B',
                  borderRadius: '8px' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#FFB86B" 
                strokeWidth={3}
                dot={{ fill: '#FFB86B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Debris Types Distribution */}
        <Card className="p-6 glass-card">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Debris Types Collected</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={debrisTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {debrisTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #00E6FF',
                  borderRadius: '8px' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Robot Performance */}
        <Card className="p-6 glass-card">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Robot Performance</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={robotPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="robot" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #90EE90',
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="collected" fill="#90EE90" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Mission Insights */}
      <Card className="p-6 glass-card">
        <h4 className="text-lg font-semibold mb-4 text-foreground">AI-Generated Insights</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
              <TrendingUp className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground">Efficiency Improvement</h5>
                <p className="text-sm text-muted-foreground">
                  Robot SW-003 shows 12% higher efficiency than fleet average. 
                  Consider replicating its path optimization algorithm.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <Battery className="h-5 w-5 text-orange-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground">Energy Optimization</h5>
                <p className="text-sm text-muted-foreground">
                  Current energy consumption is 15% above optimal. 
                  Recommend reducing maximum speed by 10% to extend mission duration.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <Shield className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground">Safety Analysis</h5>
                <p className="text-sm text-muted-foreground">
                  Zero collision incidents recorded. Safety protocols are functioning optimally. 
                  Current trajectory calculations maintain 50m safety buffer.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <Target className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground">Target Prioritization</h5>
                <p className="text-sm text-muted-foreground">
                  High-risk debris concentration detected in sector 7. 
                  Recommend deploying additional robot to this area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MissionAnalytics;