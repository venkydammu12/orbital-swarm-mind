import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Eye, 
  Radio, 
  Zap, 
  Shield, 
  Satellite,
  ArrowRight,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Technology = () => {
  const techCategories = [
    {
      title: "AI & Machine Learning",
      icon: <Cpu className="h-12 w-12" />,
      technologies: [
        {
          name: "Deep Neural Networks",
          description: "Advanced neural architectures for real-time decision making",
          implementation: "TensorFlow, PyTorch, CUDA optimization"
        },
        {
          name: "Reinforcement Learning",
          description: "Self-improving algorithms for optimal path planning",
          implementation: "OpenAI Gym, Stable Baselines3, Custom environments"
        },
        {
          name: "Computer Vision",
          description: "Object detection and tracking in space environments",
          implementation: "OpenCV, YOLO, Custom CNN models"
        }
      ]
    },
    {
      title: "Sensors & Detection",
      icon: <Eye className="h-12 w-12" />,
      technologies: [
        {
          name: "LIDAR Systems",
          description: "High-precision 3D mapping and distance measurement",
          implementation: "Velodyne sensors, Point cloud processing"
        },
        {
          name: "Multi-spectral Cameras",
          description: "Visual spectrum analysis for debris identification",
          implementation: "High-resolution CCD sensors, Image processing"
        },
        {
          name: "Radar Technology",
          description: "Long-range detection and tracking capabilities",
          implementation: "Phased array radar, Signal processing algorithms"
        }
      ]
    },
    {
      title: "Communication",
      icon: <Radio className="h-12 w-12" />,
      technologies: [
        {
          name: "Mesh Networks",
          description: "Resilient inter-robot communication systems",
          implementation: "ZigBee, WiFi 6, Custom protocols"
        },
        {
          name: "Satellite Links",
          description: "Ground control and data transmission",
          implementation: "Ka-band, X-band communication systems"
        },
        {
          name: "Error Correction",
          description: "Reliable data transmission in space conditions",
          implementation: "Reed-Solomon codes, LDPC, FEC"
        }
      ]
    },
    {
      title: "Robotics & Control",
      icon: <Shield className="h-12 w-12" />,
      technologies: [
        {
          name: "Robotic Arms",
          description: "6-DOF manipulators for debris capture",
          implementation: "Servo motors, Precision encoders, Force sensors"
        },
        {
          name: "Propulsion Systems",
          description: "Ion thrusters for precise maneuvering",
          implementation: "Hall effect thrusters, Attitude control systems"
        },
        {
          name: "Control Algorithms",
          description: "PID and adaptive control for stability",
          implementation: "Real-time control systems, Kalman filters"
        }
      ]
    }
  ];

  const demos = [
    {
      title: "Swarm Coordination Simulation",
      description: "Watch 20 robots coordinate to clean a debris field",
      type: "video",
      duration: "2:34"
    },
    {
      title: "AI Decision Making Demo",
      description: "Real-time debris classification and priority assignment",
      type: "interactive",
      duration: "Live"
    },
    {
      title: "Zero-G Capture Test",
      description: "Robotic arm precision in simulated space conditions",
      type: "video", 
      duration: "1:45"
    },
    {
      title: "Communication Network Test",
      description: "Mesh network resilience under signal interference",
      type: "simulation",
      duration: "Interactive"
    }
  ];

  return (
    <div className="min-h-screen pt-20 space-bg">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Technology & Innovation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge technologies powering the future of space debris cleanup through AI swarm robotics
          </p>
        </motion.div>

        {/* Technology Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-smooth"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-accent">{category.icon}</div>
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              
              <div className="space-y-6">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="border-l-2 border-accent/30 pl-4">
                    <h3 className="text-lg font-semibold text-accent mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground mb-2">{tech.description}</p>
                    <p className="text-sm text-foreground/80 font-mono bg-accent/5 p-2 rounded border border-accent/20">
                      {tech.implementation}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem → Solution → Technology → Demo Flow */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Innovation Process
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "Problem",
                title: "Space Debris Crisis",
                description: "500,000+ pieces of debris threaten satellites and astronauts",
                icon: <Satellite className="h-8 w-8 text-destructive" />
              },
              {
                step: "Solution",
                title: "AI Swarm Approach",
                description: "Coordinated robots work together to safely clean debris",
                icon: <Shield className="h-8 w-8 text-accent" />
              },
              {
                step: "Technology",
                title: "Advanced Systems",
                description: "AI, robotics, and space-grade hardware integration",
                icon: <Cpu className="h-8 w-8 text-primary" />
              },
              {
                step: "Demo", 
                title: "Proven Results",
                description: "Successful simulations and prototypes demonstrate effectiveness",
                icon: <Zap className="h-8 w-8 text-accent" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="glass-card p-6 rounded-xl shadow-card hover:shadow-glow transition-smooth">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <div className="text-sm text-accent font-semibold mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                
                {index < 3 && (
                  <ArrowRight className="absolute top-1/2 -right-3 transform -translate-y-1/2 text-accent h-6 w-6 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Interactive Demonstrations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {demos.map((demo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl shadow-card hover:shadow-glow transition-smooth group"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-smooth">
                  <Button variant="accent" size="lg" className="animate-pulse-glow">
                    <Play className="h-6 w-6 mr-2" />
                    {demo.type === 'video' ? 'Play Demo' : 'Start Interactive'}
                  </Button>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{demo.title}</h3>
                  <span className="text-sm text-accent font-medium">{demo.duration}</span>
                </div>
                
                <p className="text-muted-foreground">{demo.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Performance Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 gradient-space p-12 rounded-2xl shadow-space"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-foreground">
            Performance Achievements
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { metric: "99.2%", label: "Detection Accuracy", description: "Debris identification success rate" },
              { metric: "50+", label: "Robot Coordination", description: "Maximum swarm size supported" },
              { metric: "<1ms", label: "Response Time", description: "Real-time decision making" },
              { metric: "0", label: "Collision Incidents", description: "In 10,000+ simulated operations" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-foreground mb-2 animate-pulse-glow">
                  {stat.metric}
                </div>
                <div className="text-lg font-semibold text-primary-foreground/90 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Technology;