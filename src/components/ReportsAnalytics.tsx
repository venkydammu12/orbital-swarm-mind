import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Activity, 
  Target, 
  Battery,
  FileText,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import anime from 'animejs';

interface MissionData {
  timestamp: string;
  debrisCollected: number;
  robotsActive: number;
  energyUsed: number;
  efficiency: number;
  safetyScore: number;
}

interface RobotPerformance {
  robotId: string;
  debrisCollected: number;
  missionTime: number;
  energyEfficiency: number;
  status: string;
}

const ReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('24h');
  const [missionData, setMissionData] = useState<MissionData[]>([]);
  const [robotPerformance, setRobotPerformance] = useState<RobotPerformance[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Generate mock data
  useEffect(() => {
    const generateMissionData = () => {
      const data: MissionData[] = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          timestamp: timestamp.toISOString().split('T')[1].slice(0, 5),
          debrisCollected: Math.floor(Math.random() * 10) + i * 2,
          robotsActive: Math.floor(Math.random() * 2) + 3,
          energyUsed: Math.floor(Math.random() * 20) + 40 + i,
          efficiency: Math.floor(Math.random() * 15) + 80,
          safetyScore: Math.floor(Math.random() * 10) + 90
        });
      }
      
      setMissionData(data);
    };

    const generateRobotData = () => {
      const robots: RobotPerformance[] = [
        { robotId: 'SW-001', debrisCollected: 15, missionTime: 8.5, energyEfficiency: 92, status: 'Active' },
        { robotId: 'SW-002', debrisCollected: 12, missionTime: 7.2, energyEfficiency: 88, status: 'Collecting' },
        { robotId: 'SW-003', debrisCollected: 18, missionTime: 9.1, energyEfficiency: 95, status: 'Transit' },
        { robotId: 'SW-004', debrisCollected: 8, missionTime: 5.8, energyEfficiency: 85, status: 'Maintenance' }
      ];
      
      setRobotPerformance(robots);
    };

    generateMissionData();
    generateRobotData();

    // Animate charts on load
    anime({
      targets: '.chart-container',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(200),
      duration: 800,
      easing: 'easeOutElastic(1, .6)'
    });
  }, [timeRange]);

  const debrisTypeData = [
    { name: 'Satellite Fragments', value: 35, color: '#FF6B6B' },
    { name: 'Rocket Parts', value: 28, color: '#4ECDC4' },
    { name: 'Paint Flecks', value: 20, color: '#45B7D1' },
    { name: 'Metal Debris', value: 12, color: '#96CEB4' },
    { name: 'Other', value: 5, color: '#FCEA2B' }
  ];

  const handleExport = async (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create downloadable content
    if (format === 'csv') {
      const csvContent = [
        'Timestamp,Debris Collected,Robots Active,Energy Used,Efficiency,Safety Score',
        ...missionData.map(d => 
          `${d.timestamp},${d.debrisCollected},${d.robotsActive},${d.energyUsed},${d.efficiency},${d.safetyScore}`
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mission-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    setIsExporting(false);
    
    // Success animation
    anime({
      targets: '.export-success',
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0],
      duration: 1500,
      easing: 'easeOutElastic(1, .6)'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Mission Analytics & Reports</h2>
          <p className="text-gray-400">Comprehensive performance metrics and operational insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Time Range Selector */}
          <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
            {(['1h', '6h', '24h', '7d'] as const).map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? 'default' : 'ghost'}
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 'bg-cyan-400 text-black' : 'text-gray-400'}
              >
                {range.toUpperCase()}
              </Button>
            ))}
          </div>
          
          {/* Export Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              className="bg-green-500 text-black hover:bg-green-600"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'CSV'}
            </Button>
            <Button
              size="sm"
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            icon: Target, 
            title: 'Total Debris Collected', 
            value: missionData.reduce((sum, d) => sum + d.debrisCollected, 0),
            unit: 'objects',
            trend: '+12%',
            color: 'cyan'
          },
          { 
            icon: Activity, 
            title: 'Active Robots', 
            value: missionData[missionData.length - 1]?.robotsActive || 0,
            unit: 'units',
            trend: 'stable',
            color: 'green'
          },
          { 
            icon: Battery, 
            title: 'Energy Efficiency', 
            value: Math.round(missionData.reduce((sum, d) => sum + d.efficiency, 0) / missionData.length) || 0,
            unit: '%',
            trend: '+5%',
            color: 'orange'
          },
          { 
            icon: TrendingUp, 
            title: 'Mission Success Rate', 
            value: Math.round(missionData.reduce((sum, d) => sum + d.safetyScore, 0) / missionData.length) || 0,
            unit: '%',
            trend: '+2%',
            color: 'purple'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-900 border-gray-700 p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 text-${metric.color}-400`} />
                <Badge variant="outline" className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metric.value}{metric.unit}
              </div>
              <div className="text-sm text-gray-400">{metric.title}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Debris Collection Timeline */}
        <Card className="bg-gray-900 border-gray-700 p-6 chart-container">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            Debris Collection Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={missionData}>
              <defs>
                <linearGradient id="debrisGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E6FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00E6FF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #00E6FF',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="debrisCollected" 
                stroke="#00E6FF" 
                fillOpacity={1} 
                fill="url(#debrisGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Energy Consumption */}
        <Card className="bg-gray-900 border-gray-700 p-6 chart-container">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Battery className="h-5 w-5 text-orange-400" />
            Energy Consumption
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={missionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #FFB86B',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="energyUsed" 
                stroke="#FFB86B" 
                strokeWidth={3}
                dot={{ fill: '#FFB86B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Robot Performance */}
        <Card className="bg-gray-900 border-gray-700 p-6 chart-container">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400" />
            Robot Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={robotPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="robotId" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #90EE90',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Bar dataKey="debrisCollected" fill="#90EE90" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Debris Types Distribution */}
        <Card className="bg-gray-900 border-gray-700 p-6 chart-container">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-purple-400" />
            Debris Types Collected
          </h3>
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
                  backgroundColor: '#1F2937', 
                  border: '1px solid #A855F7',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Mission Summary Report */}
      <Card className="bg-gray-900 border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-cyan-400" />
          Mission Summary Report
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-cyan-400 font-semibold">Mission Overview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Mission Duration:</span>
                <span className="text-white font-mono">24h 15m 32s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Debris Collected:</span>
                <span className="text-cyan-400 font-mono">
                  {missionData.reduce((sum, d) => sum + d.debrisCollected, 0)} objects
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Efficiency:</span>
                <span className="text-green-400 font-mono">
                  {Math.round(missionData.reduce((sum, d) => sum + d.efficiency, 0) / missionData.length)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Safety Score:</span>
                <span className="text-green-400 font-mono">
                  {Math.round(missionData.reduce((sum, d) => sum + d.safetyScore, 0) / missionData.length)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-orange-400 font-semibold">Fleet Performance</h4>
            <div className="space-y-2 text-sm">
              {robotPerformance.map((robot) => (
                <div key={robot.robotId} className="flex justify-between">
                  <span className="text-gray-400">{robot.robotId}:</span>
                  <span className="text-white font-mono">{robot.debrisCollected} collected</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-purple-400 font-semibold">Key Achievements</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-gray-300">Zero collision incidents</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-gray-300">98.5% mission success rate</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full" />
                <span className="text-gray-300">15% energy efficiency improvement</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-gray-300">All safety protocols maintained</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Export Success Indicator */}
      <div className="export-success fixed top-4 right-4 opacity-0">
        <Card className="bg-green-500 border-green-400 p-4">
          <div className="flex items-center gap-2 text-black">
            <Download className="h-4 w-4" />
            <span className="font-semibold">Report exported successfully!</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalytics;