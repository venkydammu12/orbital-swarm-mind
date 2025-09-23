import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Recycle, Factory, Zap, Settings, BarChart, Atom } from 'lucide-react';

const Recycling = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link to="/features">
            <Button variant="ghost" size="sm" className="mb-6 text-white/60 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Features
            </Button>
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Orbital <span className="text-accent">Recycling</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Transform space debris into valuable materials through advanced 
            on-orbit processing and manufacturing systems.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Recycling Opportunity</h2>
              <p className="text-white/70 mb-4">
                Space debris contains valuable materials like aluminum, titanium, and rare metals. 
                On-orbit recycling eliminates waste while providing resources for future missions.
              </p>
              <ul className="space-y-2 text-white/60">
                <li>• Material recovery and purification</li>
                <li>• Zero-gravity manufacturing processes</li>
                <li>• Circular economy in space operations</li>
                <li>• Reduced launch costs for materials</li>
              </ul>
            </div>
            <div className="relative h-64 rounded-lg bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
              <Factory className="h-24 w-24 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Processing Systems */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Processing Systems</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Atom className="h-12 w-12" />,
                title: "Material Analysis",
                description: "Advanced spectroscopy and material identification systems",
                capabilities: ["XRF analysis", "Material sorting", "Purity assessment"]
              },
              {
                icon: <Zap className="h-12 w-12" />,
                title: "Thermal Processing",
                description: "High-temperature furnaces for material breakdown and purification",
                capabilities: ["3000°C operation", "Vacuum processing", "Alloy separation"]
              },
              {
                icon: <Settings className="h-12 w-12" />,
                title: "Manufacturing",
                description: "3D printing and fabrication systems for new component creation",
                capabilities: ["Metal 3D printing", "Component assembly", "Quality control"]
              }
            ].map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                className="border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-accent mb-4 flex justify-center">
                  {system.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{system.title}</h3>
                <p className="text-white/60 mb-4">{system.description}</p>
                <ul className="space-y-1">
                  {system.capabilities.map((capability, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recycling Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Recycling Pipeline</h2>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Collection", desc: "Debris delivered from capture robots", time: "T+0h" },
              { step: "2", title: "Sorting", desc: "Material identification and classification", time: "T+2h" },
              { step: "3", title: "Processing", desc: "Thermal breakdown and purification", time: "T+8h" },
              { step: "4", title: "Manufacturing", desc: "Creation of new components and materials", time: "T+24h" },
              { step: "5", title: "Quality Control", desc: "Testing and certification of products", time: "T+30h" },
              { step: "6", title: "Deployment", desc: "Distribution to missions and storage", time: "T+36h" }
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-6 p-4 rounded-lg border border-white/10 bg-white/[0.01]">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center font-bold text-accent">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </div>
                <div className="text-accent font-mono text-sm">
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Output Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Output Products</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Atom className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Raw Materials</h3>
              <p className="text-white/60 text-sm">Purified metals and alloys</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Components</h3>
              <p className="text-white/60 text-sm">3D printed spacecraft parts</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Structures</h3>
              <p className="text-white/60 text-sm">Habitat and platform elements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Energy Storage</h3>
              <p className="text-white/60 text-sm">Battery and fuel components</p>
            </div>
          </div>
        </motion.div>

        {/* Economic Impact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02]"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Economic Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cost Reduction</h3>
              <p className="text-2xl font-bold text-green-400">60%</p>
              <p className="text-sm text-white/60">Launch cost savings</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Material Recovery</h3>
              <p className="text-2xl font-bold text-accent">85%</p>
              <p className="text-sm text-white/60">Debris conversion rate</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Value Creation</h3>
              <p className="text-2xl font-bold text-purple-400">$5M+</p>
              <p className="text-sm text-white/60">Per mission output value</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Recycling;