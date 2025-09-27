import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Camera, 
  Radar, 
  Zap, 
  Cog, 
  DollarSign,
  Clock,
  TrendingUp,
  Shield,
  Target,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TechIdea {
  id: string;
  title: string;
  problem: string;
  solution: string;
  hardware: {
    primary: string;
    sensors: string[];
    actuators: string[];
    communication: string[];
  };
  software: {
    frameworks: string[];
    languages: string[];
    libraries: string[];
    algorithms: string[];
  };
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: {
    prototype: string;
    testing: string;
    deployment: string;
  };
  benefits: string[];
  risks: string[];
  feasibility: 'high' | 'medium' | 'low';
  priority: 'critical' | 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  color: string;
}

const techIdeas: TechIdea[] = [
  {
    id: 'debris-detection',
    title: 'Real-time Debris Detection System',
    problem: 'Space debris moves at 28,000 km/h making detection extremely challenging. Current ground-based tracking has limitations in accuracy and real-time capability.',
    solution: 'AI-powered multi-sensor fusion system combining LiDAR, cameras, and radar for 360° debris detection with sub-meter accuracy.',
    hardware: {
      primary: 'NVIDIA Jetson AGX Orin (₹80,000)',
      sensors: ['Velodyne VLP-16 LiDAR (₹1,50,000)', 'High-res stereo cameras (₹25,000)', 'Millimeter-wave radar (₹45,000)'],
      actuators: ['Gimbal stabilization system (₹30,000)', 'Antenna positioning motors (₹15,000)'],
      communication: ['Ka-band transceiver (₹60,000)', 'Mesh network modules (₹20,000)']
    },
    software: {
      frameworks: ['ROS2 Humble', 'TensorFlow 2.x', 'OpenCV 4.x'],
      languages: ['Python 3.9+', 'C++17', 'CUDA'],
      libraries: ['PCL (Point Cloud)', 'NumPy', 'SciPy', 'Matplotlib'],
      algorithms: ['YOLO v8', 'Kalman Filtering', 'SLAM', 'Particle Filters']
    },
    budget: { min: 350000, max: 500000, currency: '₹' },
    timeline: {
      prototype: '8-10 weeks',
      testing: '4-6 weeks',
      deployment: '12-16 weeks'
    },
    benefits: [
      'Real-time debris tracking with 95%+ accuracy',
      'Reduced collision risk by 80%',
      'Autonomous threat assessment',
      'Multi-object simultaneous tracking'
    ],
    risks: [
      'Sensor degradation in space environment',
      'False positives in complex scenarios',
      'High computational requirements',
      'Communication latency issues'
    ],
    feasibility: 'high',
    priority: 'critical',
    icon: <Radar className="h-6 w-6" />,
    color: '#00E6FF'
  },
  {
    id: 'swarm-coordination',
    title: 'Distributed Swarm Coordination',
    problem: 'Coordinating multiple robots in space requires fault-tolerant communication and distributed decision-making without central control.',
    solution: 'Blockchain-inspired consensus algorithms with mesh networking for decentralized swarm coordination and task allocation.',
    hardware: {
      primary: 'Raspberry Pi 4B Cluster (₹15,000 each)',
      sensors: ['IMU sensors (₹5,000)', 'GPS modules (₹8,000)', 'Proximity sensors (₹3,000)'],
      actuators: ['Reaction wheels (₹25,000)', 'Ion thrusters (₹40,000)'],
      communication: ['LoRa modules (₹2,500)', 'WiFi 6 adapters (₹5,000)', 'Satellite modems (₹35,000)']
    },
    software: {
      frameworks: ['ROS2', 'Docker Swarm', 'Kubernetes'],
      languages: ['Python', 'Go', 'Rust'],
      libraries: ['NetworkX', 'Consensus algorithms', 'Distributed systems'],
      algorithms: ['Byzantine Fault Tolerance', 'Raft Consensus', 'Swarm Intelligence', 'Multi-agent RL']
    },
    budget: { min: 200000, max: 350000, currency: '₹' },
    timeline: {
      prototype: '6-8 weeks',
      testing: '8-10 weeks',
      deployment: '10-14 weeks'
    },
    benefits: [
      'Fault-tolerant operations',
      'Scalable to 100+ robots',
      'No single point of failure',
      'Adaptive task reallocation'
    ],
    risks: [
      'Network partitioning issues',
      'Consensus algorithm complexity',
      'Latency in decision making',
      'Byzantine failure scenarios'
    ],
    feasibility: 'medium',
    priority: 'high',
    icon: <Cpu className="h-6 w-6" />,
    color: '#FFB86B'
  },
  {
    id: 'precision-capture',
    title: 'Zero-G Precision Capture System',
    problem: 'Capturing debris in zero gravity without creating fragments requires precise force control and adaptive grasping mechanisms.',
    solution: 'Soft robotics with force feedback and AI-controlled adaptive gripping for safe debris capture without fragmentation.',
    hardware: {
      primary: 'Custom robotic arm controller (₹60,000)',
      sensors: ['Force/torque sensors (₹35,000)', 'Tactile feedback arrays (₹20,000)', 'Vision systems (₹25,000)'],
      actuators: ['Servo motors (₹40,000)', 'Soft pneumatic grippers (₹30,000)', 'Linear actuators (₹25,000)'],
      communication: ['CAN bus modules (₹8,000)', 'Ethernet adapters (₹5,000)']
    },
    software: {
      frameworks: ['ROS2 Control', 'MoveIt2', 'Gazebo'],
      languages: ['C++', 'Python', 'MATLAB'],
      libraries: ['Eigen3', 'Bullet Physics', 'OpenRAVE'],
      algorithms: ['Inverse Kinematics', 'Force Control', 'Grasp Planning', 'Collision Detection']
    },
    budget: { min: 250000, max: 400000, currency: '₹' },
    timeline: {
      prototype: '10-12 weeks',
      testing: '6-8 weeks',
      deployment: '14-18 weeks'
    },
    benefits: [
      '98% capture success rate',
      'Zero fragmentation incidents',
      'Adaptive to various debris shapes',
      'Force-limited safe operation'
    ],
    risks: [
      'Mechanical wear in space',
      'Sensor calibration drift',
      'Complex control algorithms',
      'Power consumption concerns'
    ],
    feasibility: 'high',
    priority: 'critical',
    icon: <Cog className="h-6 w-6" />,
    color: '#90EE90'
  },
  {
    id: 'orbital-recycling',
    title: 'On-Orbit Material Recycling',
    problem: 'Space debris contains valuable materials but current disposal methods waste these resources and require expensive Earth-based manufacturing.',
    solution: 'Automated 3D printing and material processing facility that converts debris into useful components for space construction.',
    hardware: {
      primary: 'Industrial 3D printer system (₹2,00,000)',
      sensors: ['Material analyzers (₹80,000)', 'Quality control cameras (₹30,000)', 'Temperature sensors (₹10,000)'],
      actuators: ['Robotic sorting arms (₹1,20,000)', 'Conveyor systems (₹40,000)', 'Heating elements (₹25,000)'],
      communication: ['Industrial Ethernet (₹15,000)', 'Process control modules (₹35,000)']
    },
    software: {
      frameworks: ['ROS2 Industrial', 'FreeCAD', 'Blender'],
      languages: ['Python', 'C++', 'G-code'],
      libraries: ['OpenSCAD', 'Slic3r', 'Material databases'],
      algorithms: ['CAD generation', 'Slicing algorithms', 'Quality control AI', 'Process optimization']
    },
    budget: { min: 500000, max: 800000, currency: '₹' },
    timeline: {
      prototype: '16-20 weeks',
      testing: '12-16 weeks',
      deployment: '24-30 weeks'
    },
    benefits: [
      '70% material recovery rate',
      'Reduced launch costs by 60%',
      'Sustainable space economy',
      'On-demand component manufacturing'
    ],
    risks: [
      'Complex material processing',
      'Quality control challenges',
      'High initial investment',
      'Long development timeline'
    ],
    feasibility: 'medium',
    priority: 'medium',
    icon: <Recycle className="h-6 w-6" />,
    color: '#DDA0DD'
  }
];

const IdeasHubProfessional = () => {
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const selectedIdeaData = selectedIdea ? techIdeas.find(idea => idea.id === selectedIdea) : null;

  const filteredIdeas = filter === 'all' 
    ? techIdeas 
    : techIdeas.filter(idea => idea.feasibility === filter);

  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case 'high': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-black';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Innovation <span className="text-cyan-400">Pipeline</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Detailed technical concepts with hardware specifications, software stacks, 
            budgets, and implementation timelines for space debris cleanup technology.
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-2">
            {['all', 'high', 'medium', 'low'].map((filterOption) => (
              <Button
                key={filterOption}
                size="sm"
                variant={filter === filterOption ? 'default' : 'outline'}
                onClick={() => setFilter(filterOption as any)}
                className={filter === filterOption ? 'bg-cyan-400 text-black' : 'border-gray-600 text-gray-300'}
              >
                {filterOption === 'all' ? 'All Ideas' : `${filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} Feasibility`}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="bg-gray-900 border-gray-700 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer h-full"
                onClick={() => setSelectedIdea(idea.id)}
              >
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${idea.color}20`, color: idea.color }}
                      >
                        {idea.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{idea.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge className={getPriorityColor(idea.priority)}>
                            {idea.priority.toUpperCase()}
                          </Badge>
                          <Badge className={getFeasibilityColor(idea.feasibility)}>
                            {idea.feasibility.toUpperCase()} FEASIBILITY
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="text-green-400 font-mono">
                          {idea.budget.currency}{(idea.budget.min / 1000).toFixed(0)}K-{(idea.budget.max / 1000).toFixed(0)}K
                        </div>
                        <div className="text-gray-400 text-xs">Budget</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="text-blue-400 font-mono">{idea.timeline.prototype}</div>
                        <div className="text-gray-400 text-xs">Prototype</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                      <div>
                        <div className="text-purple-400 font-mono">{idea.benefits.length}</div>
                        <div className="text-gray-400 text-xs">Benefits</div>
                      </div>
                    </div>
                  </div>

                  {/* Problem & Solution Preview */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-red-400 font-semibold text-sm mb-1">PROBLEM</h4>
                      <p className="text-gray-300 text-sm line-clamp-2">{idea.problem}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-green-400 font-semibold text-sm mb-1">SOLUTION</h4>
                      <p className="text-gray-300 text-sm line-clamp-2">{idea.solution}</p>
                    </div>
                  </div>

                  {/* Key Technologies */}
                  <div>
                    <h4 className="text-cyan-400 font-semibold text-sm mb-2">KEY TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-1">
                      {idea.software.frameworks.slice(0, 3).map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400">
                          {tech}
                        </Badge>
                      ))}
                      {idea.software.frameworks.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          +{idea.software.frameworks.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 border border-cyan-400/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIdea(idea.id);
                    }}
                  >
                    View Full Specification
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedIdeaData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedIdea(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 border border-cyan-400/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedIdeaData.color}20`, color: selectedIdeaData.color }}
                  >
                    {selectedIdeaData.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedIdeaData.title}</h2>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getPriorityColor(selectedIdeaData.priority)}>
                        {selectedIdeaData.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <Badge className={getFeasibilityColor(selectedIdeaData.feasibility)}>
                        {selectedIdeaData.feasibility.toUpperCase()} FEASIBILITY
                      </Badge>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIdea(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Problem & Solution */}
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h3 className="text-red-400 font-bold mb-2">PROBLEM STATEMENT</h3>
                      <p className="text-gray-300 text-sm">{selectedIdeaData.problem}</p>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h3 className="text-green-400 font-bold mb-2">PROPOSED SOLUTION</h3>
                      <p className="text-gray-300 text-sm">{selectedIdeaData.solution}</p>
                    </div>
                  </div>

                  {/* Hardware Stack */}
                  <div>
                    <h3 className="text-cyan-400 font-bold mb-3">HARDWARE STACK</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">Primary Controller</h4>
                        <p className="text-gray-300 text-sm font-mono">{selectedIdeaData.hardware.primary}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">Sensors</h4>
                        <ul className="space-y-1">
                          {selectedIdeaData.hardware.sensors.map((sensor, i) => (
                            <li key={i} className="text-gray-300 text-sm font-mono">• {sensor}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">Actuators</h4>
                        <ul className="space-y-1">
                          {selectedIdeaData.hardware.actuators.map((actuator, i) => (
                            <li key={i} className="text-gray-300 text-sm font-mono">• {actuator}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Software Stack */}
                  <div>
                    <h3 className="text-cyan-400 font-bold mb-3">SOFTWARE STACK</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2">Frameworks</h4>
                        <div className="space-y-1">
                          {selectedIdeaData.software.frameworks.map((fw, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400 mr-1 mb-1">
                              {fw}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2">Languages</h4>
                        <div className="space-y-1">
                          {selectedIdeaData.software.languages.map((lang, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-orange-400/30 text-orange-400 mr-1 mb-1">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-black border-green-400/30 p-4">
                      <h4 className="text-green-400 font-bold text-sm mb-2">BUDGET ESTIMATE</h4>
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {selectedIdeaData.budget.currency}{(selectedIdeaData.budget.min / 1000).toFixed(0)}K - {(selectedIdeaData.budget.max / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-gray-400">Total project cost</div>
                    </Card>
                    
                    <Card className="bg-black border-blue-400/30 p-4">
                      <h4 className="text-blue-400 font-bold text-sm mb-2">TIMELINE</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Prototype:</span>
                          <span className="text-blue-400">{selectedIdeaData.timeline.prototype}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Testing:</span>
                          <span className="text-blue-400">{selectedIdeaData.timeline.testing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Deploy:</span>
                          <span className="text-blue-400">{selectedIdeaData.timeline.deployment}</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Benefits & Risks */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-green-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        BENEFITS
                      </h4>
                      <ul className="space-y-1">
                        {selectedIdeaData.benefits.map((benefit, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        RISKS
                      </h4>
                      <ul className="space-y-1">
                        {selectedIdeaData.risks.map((risk, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeasHubProfessional;