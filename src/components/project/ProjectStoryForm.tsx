
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProjectStoryFormProps {
  formData: {
    description: string;
    story: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ProjectStoryForm = ({ formData, handleChange }: ProjectStoryFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Project Story</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Short Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Brief summary of your project (max 200 characters)" 
            className="mt-1 h-20"
          />
        </div>
        
        <div>
          <Label htmlFor="story">Project Story</Label>
          <Textarea 
            id="story" 
            name="story" 
            value={formData.story} 
            onChange={handleChange} 
            placeholder="Tell your story, explain your project in detail..." 
            className="mt-1 h-48"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectStoryForm;
