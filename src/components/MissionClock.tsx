import React, { useState, useEffect } from 'react';
import { Clock, Satellite } from 'lucide-react';

const MissionClock = () => {
  const [time, setTime] = useState(new Date());
  const [missionTime, setMissionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setMissionTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatMissionTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-accent" />
        <div>
          <div className="text-white font-mono">{time.toLocaleTimeString()}</div>
          <div className="text-muted-foreground text-xs">UTC {time.toISOString().split('T')[0]}</div>
        </div>
      </div>
      
      <div className="h-6 w-px bg-border"></div>
      
      <div className="flex items-center gap-2">
        <Satellite className="h-4 w-4 text-accent animate-pulse-glow" />
        <div>
          <div className="text-accent font-mono font-semibold">{formatMissionTime(missionTime)}</div>
          <div className="text-muted-foreground text-xs">Mission Time</div>
        </div>
      </div>
    </div>
  );
};

export default MissionClock;