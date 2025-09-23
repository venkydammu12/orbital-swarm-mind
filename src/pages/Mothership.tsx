import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Factory, Recycle, Battery, Shield } from 'lucide-react';

const Mothership = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              The Mothership.
              <br />
              <span className="text-accent">An Orbital Refinery.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light">
              Central command and processing station. Coordinates swarm operations, 
              processes collected debris, and manufactures new materials in orbit.
            </p>
          </motion.div>

          {/* 3D Model Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-96 mb-20 border border-white/10 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent flex items-center justify-center group cursor-pointer"
          >
            <div className="text-center">
              <div className="w-32 h-32 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                <Factory className="h-16 w-16 text-accent" />
              </div>
              <p className="text-white/60">Interactive 3D Mothership Model</p>
              <p className="text-sm text-white/40 mt-2">Rotating orbital refinery</p>
            </div>
          </motion.div>

          {/* Process Flow */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Processing Pipeline</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              {[
                { icon: <Battery className="h-8 w-8" />, title: "Collection", desc: "Swarm robots deliver debris" },
                { icon: <Factory className="h-8 w-8" />, title: "Processing", desc: "Break down and sort materials" },
                { icon: <Recycle className="h-8 w-8" />, title: "Manufacturing", desc: "Create new components" },
                { icon: <Shield className="h-8 w-8" />, title: "Deployment", desc: "Supply future missions" }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group hover:bg-accent/30 transition-colors">
                    <div className="text-accent">{step.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm max-w-32">{step.desc}</p>
                  
                  {index < 3 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-12 h-6 w-6 text-accent/50" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-center"
          >
            <Link to="/features">
              <Button 
                size="lg" 
                className="bg-accent text-black hover:bg-accent/90 font-medium px-8 py-4 text-lg group"
              >
                Explore Features
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Mothership;