
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  amount: string;
}

interface ProjectRewardsFormProps {
  formData: {
    rewards: Reward[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ProjectRewardsForm = ({ formData, setFormData }: ProjectRewardsFormProps) => {
  const [newReward, setNewReward] = useState<Reward>({
    id: '',
    title: '',
    description: '',
    amount: '',
  });

  const addReward = () => {
    if (!newReward.title || !newReward.amount) return;
    
    const rewardToAdd = {
      ...newReward,
      id: Date.now().toString(),
    };
    
    setFormData((prev: any) => ({
      ...prev,
      rewards: [...prev.rewards, rewardToAdd],
    }));
    
    // Reset form
    setNewReward({
      id: '',
      title: '',
      description: '',
      amount: '',
    });
  };

  const removeReward = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      rewards: prev.rewards.filter((reward: Reward) => reward.id !== id),
    }));
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReward(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Rewards</h2>
      
      <div className="p-4 border rounded-md bg-muted/50 space-y-4">
        <h3 className="font-medium">Add Reward Tier</h3>
        <p className="text-sm text-muted-foreground mb-4">Create different reward tiers for your backers. Add incentives that will motivate people to support your project.</p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Reward Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={newReward.title} 
              onChange={handleRewardChange} 
              placeholder="Early Bird Special" 
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="amount">Pledge Amount ($)</Label>
            <Input 
              id="amount" 
              name="amount" 
              type="number" 
              value={newReward.amount} 
              onChange={handleRewardChange} 
              placeholder="25" 
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={newReward.description} 
              onChange={handleRewardChange} 
              placeholder="What will backers receive for this pledge amount?" 
              className="mt-1"
            />
          </div>
          
          <Button onClick={addReward} className="w-full">Add Reward</Button>
        </div>
      </div>
      
      <div className="p-6 border rounded-md">
        <h3 className="font-medium mb-4">Reward Tiers</h3>
        
        {formData.rewards.length === 0 ? (
          <p className="text-center text-muted-foreground">No reward tiers added yet</p>
        ) : (
          <div className="space-y-4">
            {formData.rewards.map((reward: Reward) => (
              <div key={reward.id} className="p-4 border rounded-md relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-6 w-6" 
                  onClick={() => removeReward(reward.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{reward.title}</h4>
                    <span className="text-sm font-medium">${reward.amount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRewardsForm;
