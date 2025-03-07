
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectBasicsFormProps {
  formData: {
    title: string;
    category: string;
    goal: string;
    duration: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const ProjectBasicsForm = ({ formData, handleChange, handleSelectChange }: ProjectBasicsFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Project Basics</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Enter a clear, brief title" 
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('category', value)}
            value={formData.category}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="film">Film & Video</SelectItem>
              <SelectItem value="games">Games</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="publishing">Publishing</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="goal">Funding Goal ($)</Label>
          <Input 
            id="goal" 
            name="goal" 
            value={formData.goal} 
            onChange={handleChange} 
            type="number" 
            placeholder="Enter amount in USD" 
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="duration">Campaign Duration (days)</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('duration', value)}
            value={formData.duration}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="45">45 days</SelectItem>
              <SelectItem value="60">60 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProjectBasicsForm;
