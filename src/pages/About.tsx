import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Award, 
  Target, 
  Lightbulb,
  Rocket,
  Heart,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      expertise: "Machine Learning, Swarm Intelligence",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400"
    },
    {
      name: "Michael Rodriguez",
      role: "Robotics Engineer", 
      expertise: "Space Robotics, Control Systems",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      name: "Dr. Priya Patel",
      role: "Space Systems Architect",
      expertise: "Orbital Mechanics, Mission Planning",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
    },
    {
      name: "James Wilson",
      role: "Software Lead",
      expertise: "Distributed Systems, Real-time Computing",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
    }
  ];

  const achievements = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "NASA Innovation Award",
      description: "Recognized for breakthrough in autonomous space robotics",
      year: "2024"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Best Paper Award",
      description: "International Conference on Space Robotics",
      year: "2023"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "UN Sustainability Recognition",
      description: "Contributing to sustainable space exploration",
      year: "2024"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Space Technology Innovation",
      description: "Patent for swarm coordination algorithms",
      year: "2023"
    }
  ];

  const impactStats = [
    { value: "500,000+", label: "Debris Pieces Targeted", description: "Total space debris in our cleanup scope" },
    { value: "40+", label: "Countries Benefited", description: "Nations with satellites protected by our technology" },
    { value: "$2.3B", label: "Economic Impact", description: "Estimated value of protected space assets" },
    { value: "15 Years", label: "Mission Duration", description: "Projected operational lifespan of our swarm system" }
  ];

  return (
    <div className="min-h-screen pt-20 space-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're dedicated to making space safer for future generations through innovative AI-driven robotics solutions
          </p>
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center animate-pulse-glow"
            >
              <Heart className="h-8 w-8 text-primary-foreground" />
            </motion.div>
          </div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Our Vision for Space
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Space debris poses one of the greatest threats to our continued exploration and utilization of space. 
                  With over 500,000 pieces of debris larger than a marble orbiting Earth, the risk of catastrophic 
                  collisions grows daily.
                </p>
                <p>
                  Our AI Swarm Robotics project represents a paradigm shift in how we approach this challenge. 
                  By leveraging cutting-edge artificial intelligence, advanced robotics, and innovative space 
                  technologies, we're developing autonomous systems that can work together to safely remove debris 
                  from Earth's orbit.
                </p>
                <p>
                  This isn't just about cleaning up space—it's about ensuring that future generations can continue 
                  to benefit from satellite communications, GPS navigation, weather monitoring, and space exploration.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="glass-card p-8 rounded-2xl shadow-glow"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Mission</h3>
                    <p className="text-sm text-muted-foreground">Safe & efficient space debris cleanup</p>
                  </div>
                  <div className="text-center">
                    <Lightbulb className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Innovation</h3>
                    <p className="text-sm text-muted-foreground">AI-powered swarm robotics technology</p>
                  </div>
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Impact</h3>
                    <p className="text-sm text-muted-foreground">Global space sustainability</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Collaboration</h3>
                    <p className="text-sm text-muted-foreground">International space community</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl shadow-card hover:shadow-glow transition-smooth text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center group-hover:animate-pulse-glow transition-smooth">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-accent font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Recognition & Achievements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl shadow-card hover:shadow-glow transition-smooth"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-accent">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{achievement.title}</h3>
                      <span className="text-accent font-bold">{achievement.year}</span>
                    </div>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Impact Statistics */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="gradient-space p-12 rounded-2xl shadow-space mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-foreground">
            Global Impact & Reach
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-foreground mb-2 animate-pulse-glow">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-primary-foreground/90 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* National Pride & Contribution */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Contributing to National Innovation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our project represents cutting-edge technological advancement, positioning our nation as a leader in 
            space technology and sustainable innovation. We're proud to contribute to the global effort of making 
            space safer while showcasing national excellence in AI and robotics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-pulse-glow">
              Join Our Mission
            </Button>
            <Button variant="space" size="lg">
              Contact Us
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;