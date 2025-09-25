import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Lightbulb, 
  Rocket, 
  Satellite, 
  Factory, 
  Brain, 
  Zap, 
  Shield, 
  Cog,
  ArrowRight,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'detection' | 'collection' | 'processing' | 'ai' | 'infrastructure';
  status: 'concept' | 'prototype' | 'development' | 'deployed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost: string;
  timeToDemo: string;
  benefits: string[];
  techStack: {
    hardware: string[];
    software: string[];
  };
  kpis: string[];
  icon: React.ReactNode;
}

const mockIdeas: Idea[] = [
  {
    id: 'debris-mapping',
    title: 'Real-time Debris Mapping',
    description: 'AI-powered orbital debris tracking and prediction system using machine learning to identify and classify space junk in real-time.',
    category: 'detection',
    status: 'development',
    priority: 'critical',
    estimatedCost: '₹2.5L - ₹4L',
    timeToDemo: '6-8 weeks',
    benefits: [
      'Reduce collision risk by 85%',
      'Improve mission safety',
      'Optimize cleanup routes',
      'Real-time threat assessment'
    ],
    techStack: {
      hardware: ['High-res cameras', 'LiDAR sensors', 'Star trackers', 'GPU compute modules'],
      software: ['TensorFlow', 'OpenCV', 'ROS2', 'Python', 'CUDA', 'Docker']
    },
    kpis: [
      'Detection accuracy > 95%',
      'Processing latency < 200ms',
      'False positive rate < 2%',
      '24/7 operational uptime'
    ],
    icon: <Satellite className="h-6 w-6" />
  },
  {
    id: 'swarm-optimization',
    title: 'Swarm Path Optimization',
    description: 'Machine learning algorithms for efficient multi-robot coordination and path planning in complex orbital environments.',
    category: 'ai',
    status: 'prototype',
    priority: 'high',
    estimatedCost: '₹1.8L - ₹3L',
    timeToDemo: '4-6 weeks',
    benefits: [
      'Reduce fuel consumption by 40%',
      'Increase mission efficiency',
      'Prevent robot collisions',
      'Dynamic task reallocation'
    ],
    techStack: {
      hardware: ['Edge AI processors', 'Communication modules', 'IMU sensors'],
      software: ['PyTorch', 'ROS2', 'MQTT', 'A* Algorithm', 'Reinforcement Learning']
    },
    kpis: [
      'Path efficiency > 90%',
      'Inter-robot collision rate < 0.1%',
      'Task completion time reduction 35%',
      'Fuel savings > 40%'
    ],
    icon: <Brain className="h-6 w-6" />
  },
  {
    id: 'material-recycling',
    title: 'Advanced Material Recycling',
    description: 'On-orbit processing of space debris into construction materials for future space infrastructure projects.',
    category: 'processing',
    status: 'concept',
    priority: 'medium',
    estimatedCost: '₹5L - ₹8L',
    timeToDemo: '12-16 weeks',
    benefits: [
      'Convert waste to resources',
      'Reduce launch costs',
      'Enable sustainable space economy',
      'Create orbital manufacturing'
    ],
    techStack: {
      hardware: ['3D printers', 'Material processors', 'Furnaces', 'Robotic arms'],
      software: ['CAD software', 'Material analysis AI', 'Process control systems']
    },
    kpis: [
      'Material conversion rate > 80%',
      'Quality grade A materials',
      'Processing time < 48 hours',
      'Cost reduction vs Earth launch 60%'
    ],
    icon: <Factory className="h-6 w-6" />
  },
  {
    id: 'autonomous-docking',
    title: 'Autonomous Docking System',
    description: 'Precision docking mechanisms for debris capture and transfer between robots and mothership.',
    category: 'infrastructure',
    status: 'prototype',
    priority: 'high',
    estimatedCost: '₹3L - ₹5L',
    timeToDemo: '8-10 weeks',
    benefits: [
      'Precision capture mechanisms',
      'Automated material transfer',
      'Reduced human intervention',
      'Scalable operations'
    ],
    techStack: {
      hardware: ['Robotic arms', 'Proximity sensors', 'Magnetic couplers', 'Vision systems'],
      software: ['Computer vision', 'Control algorithms', 'ROS2', 'Real-time systems']
    },
    kpis: [
      'Docking success rate > 98%',
      'Capture precision ±2cm',
      'Docking time < 5 minutes',
      'Payload transfer efficiency 95%'
    ],
    icon: <Cog className="h-6 w-6" />
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance AI',
    description: 'AI system for predicting robot failures and scheduling maintenance before critical issues occur.',
    category: 'ai',
    status: 'development',
    priority: 'high',
    estimatedCost: '₹2L - ₹3.5L',
    timeToDemo: '6-8 weeks',
    benefits: [
      'Prevent mission failures',
      'Extend robot lifespan',
      'Reduce maintenance costs',
      'Optimize fleet availability'
    ],
    techStack: {
      hardware: ['Sensor arrays', 'Edge computing', 'Data loggers'],
      software: ['Machine Learning', 'Time series analysis', 'Anomaly detection', 'Dashboard systems']
    },
    kpis: [
      'Failure prediction accuracy > 90%',
      'False alarm rate < 5%',
      'Maintenance cost reduction 50%',
      'Fleet uptime > 95%'
    ],
    icon: <Shield className="h-6 w-6" />
  },
  {
    id: 'solar-charging',
    title: 'Adaptive Solar Charging',
    description: 'Intelligent solar charging system that adapts to orbital conditions and optimizes power generation.',
    category: 'infrastructure',
    status: 'prototype',
    priority: 'medium',
    estimatedCost: '₹1.5L - ₹2.5L',
    timeToDemo: '4-6 weeks',
    benefits: [
      'Extended mission duration',
      'Reduced battery degradation',
      'Autonomous power management',
      'Orbital position optimization'
    ],
    techStack: {
      hardware: ['Flexible solar panels', 'MPPT controllers', 'Battery management', 'Sun sensors'],
      software: ['Power optimization algorithms', 'Orbital mechanics', 'Energy forecasting']
    },
    kpis: [
      'Power generation efficiency > 85%',
      'Battery life extension 200%',
      'Charging time optimization 40%',
      'Energy autonomy > 72 hours'
    ],
    icon: <Zap className="h-6 w-6" />
  }
];

const IdeasHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'detection', label: 'Detection' },
    { id: 'collection', label: 'Collection' },
    { id: 'processing', label: 'Processing' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'infrastructure', label: 'Infrastructure' }
  ];

  const priorities = [
    { id: 'all', label: 'All Priorities' },
    { id: 'critical', label: 'Critical' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' }
  ];

  const filteredIdeas = mockIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || idea.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'prototype': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'concept': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ideas <span className="text-accent">Hub</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Explore our collection of innovative concepts and research initiatives 
            that push the boundaries of space debris cleanup technology.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 text-white"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-card/50 border border-border/50 rounded-md px-4 py-2 text-white"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-card text-white">
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-card/50 border border-border/50 rounded-md px-4 py-2 text-white"
            >
              {priorities.map(priority => (
                <option key={priority.id} value={priority.id} className="bg-card text-white">
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Ideas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-card/80 border-border/50 hover:border-accent/50 transition-all duration-300 group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <div className="text-accent">{idea.icon}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getPriorityColor(idea.priority)}>
                        {idea.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(idea.status)}>
                        {idea.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl text-white group-hover:text-accent transition-colors">
                    {idea.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-green-400" />
                      <span className="text-white/60">{idea.estimatedCost}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span className="text-white/60">{idea.timeToDemo}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-white/80">Key Benefits:</p>
                    <div className="flex flex-wrap gap-1">
                      {idea.benefits.slice(0, 2).map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-accent/30 text-accent/80">
                          {benefit}
                        </Badge>
                      ))}
                      {idea.benefits.length > 2 && (
                        <Badge variant="outline" className="text-xs border-white/30 text-white/60">
                          +{idea.benefits.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <Button 
                      className="w-full bg-accent/10 text-accent hover:bg-accent/20 border border-accent/30"
                      size="sm"
                    >
                      <Lightbulb className="w-3 h-3 mr-2" />
                      Explore Concept
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredIdeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">No Ideas Found</h3>
            <p className="text-white/60">Try adjusting your search criteria or filters</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 p-8 border border-border/30 rounded-lg bg-card/30"
        >
          <Rocket className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Have an Innovative Idea?
          </h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Join our mission to revolutionize space cleanup technology. 
            Submit your concepts and help shape the future of orbital sustainability.
          </p>
          <Button className="bg-accent text-black hover:bg-accent/90">
            Submit Your Idea
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default IdeasHub;