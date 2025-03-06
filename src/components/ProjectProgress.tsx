
import { useEffect, useRef } from 'react';

interface ProjectProgressProps {
  raised: number;
  goal: number;
  backers?: number;
  daysLeft?: number;
  className?: string;
}

const ProjectProgress = ({ 
  raised, 
  goal, 
  backers = 0, 
  daysLeft = 0, 
  className = ""
}: ProjectProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);
  
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress-value', `${percentage}%`);
    }
  }, [percentage]);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-3xl font-medium">${raised.toLocaleString()}</p>
          <p className="text-muted-foreground mt-1">
            of ${goal.toLocaleString()} goal
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-medium">{percentage}%</p>
          <p className="text-muted-foreground mt-1">funded</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div 
        ref={progressRef}
        className="h-2 bg-secondary rounded-full progress-bar overflow-hidden"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        role="progressbar"
      ></div>
      
      {(backers !== undefined || daysLeft !== undefined) && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {backers !== undefined && (
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-2xl font-medium">{backers.toLocaleString()}</p>
              <p className="text-muted-foreground text-sm mt-1">backers</p>
            </div>
          )}
          {daysLeft !== undefined && (
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-2xl font-medium">{daysLeft}</p>
              <p className="text-muted-foreground text-sm mt-1">days to go</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectProgress;
