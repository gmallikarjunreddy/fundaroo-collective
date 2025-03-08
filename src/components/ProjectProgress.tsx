
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { initiatePayment } from '@/services/paymentService';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface ProjectProgressProps {
  projectId: string;
  projectTitle: string;
  raised: number;
  goal: number;
  backers?: number;
  daysLeft?: number;
  className?: string;
}

const ProjectProgress = ({ 
  projectId,
  projectTitle,
  raised, 
  goal, 
  backers = 0, 
  daysLeft = 0, 
  className = ""
}: ProjectProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress-value', `${percentage}%`);
    }
  }, [percentage]);

  const handleQuickDonate = async (amount: number) => {
    setIsProcessing(true);
    try {
      const success = await initiatePayment(projectId, amount, projectTitle);
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      }
    } catch (error) {
      console.error('Error with quick donation:', error);
      toast.error('Failed to process donation');
    } finally {
      setIsProcessing(false);
    }
  };

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
        className="h-2 bg-secondary rounded-full progress-bar overflow-hidden relative before:absolute before:bg-primary before:h-full before:left-0 before:top-0 before:w-[var(--progress-value,0%)]"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        role="progressbar"
      ></div>
      
      {/* Quick Donate Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickDonate(10)}
          disabled={isProcessing}
        >
          ₹10
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickDonate(50)}
          disabled={isProcessing}
        >
          ₹50
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleQuickDonate(100)}
          disabled={isProcessing}
        >
          ₹100
        </Button>
      </div>
      
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
