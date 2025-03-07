
import React from 'react';
import { Button } from '@/components/ui/button';

const ProjectRewardsForm = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Rewards</h2>
      
      <div className="p-4 border rounded-md bg-muted/50 space-y-4">
        <h3 className="font-medium">Add Reward Tiers</h3>
        <p className="text-sm text-muted-foreground">Create different reward tiers for your backers. Add incentives that will motivate people to support your project.</p>
        
        <Button variant="outline" className="w-full">+ Add Reward Tier</Button>
      </div>
      
      <div className="p-6 border rounded-md bg-muted/20">
        <p className="text-center text-muted-foreground">No reward tiers added yet</p>
      </div>
    </div>
  );
};

export default ProjectRewardsForm;
