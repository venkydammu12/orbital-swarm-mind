import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Globe, Recycle, Users, Lightbulb, Handshake } from 'lucide-react';

const SdgMdg = () => {
  const sdgGoals = [
    {
      number: "9",
      title: "Industry, Innovation & Infrastructure",
      icon: <Lightbulb className="h-8 w-8" />,
      rationale: "Advanced AI swarm robotics technology drives space industry innovation",
      metrics: ["50+ autonomous robots", "98% task completion rate", "Real-time coordination protocols"]
    },
    {
      number: "12",
      title: "Responsible Consumption & Production",
      icon: <Recycle className="h-8 w-8" />,
      rationale: "Converting space debris into useful materials for future missions",
      metrics: ["100% debris recycling", "Reduced material waste", "Circular economy in space"]
    },
    {
      number: "13",
      title: "Climate Action",
      icon: <Globe className="h-8 w-8" />,
      rationale: "Protecting Earth's orbital environment and satellite infrastructure",
      metrics: ["34,000+ debris objects tracked", "Collision prevention", "Sustainable space operations"]
    },
    {
      number: "17",
      title: "Partnerships for Goals",
      icon: <Handshake className="h-8 w-8" />,
      rationale: "International collaboration for space debris cleanup initiatives",
      metrics: ["Multi-agency coordination", "Shared technology benefits", "Global space safety"]
    }
  ];

  const mdgGoals = [
    {
      number: "7",
      title: "Environmental Sustainability",
      icon: <Target className="h-8 w-8" />,
      rationale: "Ensuring sustainable use of outer space environment",
      metrics: ["Reduced space pollution", "Protected satellite networks", "Long-term orbital sustainability"]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Global <span className="text-accent">Impact</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our AI swarm robotics project directly contributes to multiple 
            UN Sustainable Development Goals and Millennium Development Goals.
          </p>
        </motion.div>

        {/* SDG Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            UN Sustainable Development Goals
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border border-white/10 rounded-lg p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-accent">{goal.icon}</div>
                  </div>
                  <div>
                    <div className="text-accent font-bold text-sm mb-1">SDG {goal.number}</div>
                    <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">{goal.rationale}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                    Key Impact Metrics
                  </h4>
                  <ul className="space-y-1">
                    {goal.metrics.map((metric, i) => (
                      <li key={i} className="text-white/60 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MDG Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Millennium Development Goals
          </h2>
          
          <div className="max-w-2xl mx-auto">
            {mdgGoals.map((goal, index) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border border-white/10 rounded-lg p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-accent">{goal.icon}</div>
                  </div>
                  <div>
                    <div className="text-accent font-bold text-sm mb-1">MDG {goal.number}</div>
                    <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">{goal.rationale}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                    Key Impact Metrics
                  </h4>
                  <ul className="space-y-1">
                    {goal.metrics.map((metric, i) => (
                      <li key={i} className="text-white/60 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center border border-white/10 rounded-lg p-12 bg-white/[0.02] mb-16"
        >
          <Users className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Measurable Global Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1M+</div>
              <div className="text-white/60">Potential satellite protection years</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">75%</div>
              <div className="text-white/60">Reduction in collision risk</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">$2B+</div>
              <div className="text-white/60">Estimated economic benefit</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link to="/about">
            <Button 
              size="lg" 
              className="bg-accent text-black hover:bg-accent/90 font-medium px-8 py-4 text-lg group"
            >
              Learn About Our Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SdgMdg;