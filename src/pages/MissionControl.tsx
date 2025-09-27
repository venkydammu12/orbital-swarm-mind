import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Map, 
  BarChart3, 
  Settings,
  Satellite,
  Target,
  Eye,
  Route
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MissionControlDashboard from '@/components/MissionControlDashboard';
import SolutionLoopInteractive from '@/components/SolutionLoopInteractive';
import IdeasHubProfessional from '@/components/IdeasHubProfessional';
import ReportsAnalytics from '@/components/ReportsAnalytics';

const MissionControl = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'loop' | 'ideas' | 'reports'>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Mission Control', icon: Activity },
    { id: 'loop', label: 'Solution Loop', icon: Route },
    { id: 'ideas', label: 'Ideas Hub', icon: Target },
    { id: 'reports', label: 'Analytics', icon: BarChart3 }
  ];

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }: {
    id: string;
    label: string;
    icon: any;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <Button
      variant={isActive ? 'default' : 'outline'}
      onClick={onClick}
      className={`px-6 py-3 flex items-center gap-2 ${
        isActive 
          ? 'bg-cyan-400 text-black border-cyan-400' 
          : 'border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden md:inline">{label}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Tab Navigation - Only show if not on dashboard */}
      {activeTab !== 'dashboard' && (
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {activeTab === 'dashboard' && (
          <div className="relative">
            <MissionControlDashboard />
            
            {/* Quick Navigation Overlay */}
            <div className="absolute top-4 right-4 z-20">
              <div className="flex flex-col gap-2">
                {tabs.slice(1).map((tab) => (
                  <Button
                    key={tab.id}
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab(tab.id as any)}
                    className="border-gray-600 text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400"
                  >
                    <tab.icon className="h-3 w-3 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'loop' && (
          <div className="pt-8">
            <SolutionLoopInteractive />
          </div>
        )}
        
        {activeTab === 'ideas' && (
          <div className="pt-8">
            <IdeasHubProfessional />
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="p-8">
            <ReportsAnalytics />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MissionControl;