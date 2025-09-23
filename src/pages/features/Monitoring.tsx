import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Monitor, Activity, Wifi, AlertTriangle, Battery, Signal } from 'lucide-react';

const Monitoring = () => {
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
            Mission <span className="text-accent">Monitoring</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real-time telemetry and health monitoring ensures optimal performance 
            and safety throughout all swarm operations.
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
              <h2 className="text-3xl font-bold text-white mb-4">Monitoring Challenges</h2>
              <p className="text-white/70 mb-4">
                Space operations require continuous monitoring of robot health, mission progress, 
                and environmental conditions to ensure safe and effective operations.
              </p>
              <ul className="space-y-2 text-white/60">
                <li>• Real-time health status tracking</li>
                <li>• Communication reliability in space</li>
                <li>• Predictive maintenance capabilities</li>
                <li>• Mission progress visualization</li>
              </ul>
            </div>
            <div className="relative h-64 rounded-lg bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
              <Monitor className="h-24 w-24 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Monitoring Systems */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Monitoring Systems</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="h-12 w-12" />,
                title: "Health Monitoring",
                description: "Continuous tracking of robot systems, battery levels, and component status"
              },
              {
                icon: <Wifi className="h-12 w-12" />,
                title: "Communication Status",
                description: "Real-time network connectivity and data transmission monitoring"
              },
              {
                icon: <AlertTriangle className="h-12 w-12" />,
                title: "Alert Systems",
                description: "Automated alerts for anomalies, failures, and critical situations"
              }
            ].map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                className="text-center border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-accent mb-4 flex justify-center">
                  {system.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{system.title}</h3>
                <p className="text-white/60">{system.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Live Telemetry Dashboard</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Power Status</h3>
              <p className="text-2xl font-bold text-green-400">87%</p>
              <p className="text-sm text-white/60">Average battery level</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Signal className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Signal Strength</h3>
              <p className="text-2xl font-bold text-accent">-65 dBm</p>
              <p className="text-sm text-white/60">Communication quality</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Active Robots</h3>
              <p className="text-2xl font-bold text-blue-400">47/50</p>
              <p className="text-sm text-white/60">Operational units</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mission Progress</h3>
              <p className="text-2xl font-bold text-orange-400">73%</p>
              <p className="text-sm text-white/60">Current objectives</p>
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02]"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Data Collection</h3>
              <ul className="space-y-2 text-white/60">
                <li>• 1000+ telemetry points per robot</li>
                <li>• 100Hz data sampling rate</li>
                <li>• Real-time health diagnostics</li>
                <li>• Predictive failure analysis</li>
                <li>• Environmental sensor integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Alert Capabilities</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Automated anomaly detection</li>
                <li>• Critical system failure alerts</li>
                <li>• Mission deviation warnings</li>
                <li>• Predictive maintenance scheduling</li>
                <li>• Emergency protocol activation</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Monitoring;