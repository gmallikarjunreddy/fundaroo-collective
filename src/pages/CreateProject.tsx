
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { isAuthenticated } from '@/utils/auth';
import { createProject } from '@/services/projectService';
import ProjectBasicsForm from '@/components/project/ProjectBasicsForm';
import ProjectStoryForm from '@/components/project/ProjectStoryForm';
import ProjectRewardsForm from '@/components/project/ProjectRewardsForm';

const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    goal: '',
    duration: '30',
    description: '',
    story: '',
    rewards: [],
    coverImage: ''
  });

  useEffect(() => {
    // Check if there's a pending project saved in localStorage
    const pendingProject = localStorage.getItem('pendingProject');
    if (pendingProject) {
      try {
        const savedProject = JSON.parse(pendingProject);
        setFormData(savedProject);
      } catch (error) {
        console.error('Error parsing pending project data', error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Save form data to localStorage as user types
    localStorage.setItem('pendingProject', JSON.stringify({
      ...formData,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Save form data to localStorage when select changes
    localStorage.setItem('pendingProject', JSON.stringify({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error('Authentication Required', {
        description: 'Please log in or create an account to submit a project.'
      });
      // Save form data in localStorage to preserve it after login
      localStorage.setItem('pendingProject', JSON.stringify(formData));
      navigate('/login');
      return;
    }

    // Validate form data
    if (!formData.title || !formData.category || !formData.goal || !formData.description) {
      toast.error('Missing Information', {
        description: 'Please fill out all required fields.'
      });
      return;
    }

    setIsLoading(true);

    try {
      await createProject({
        title: formData.title,
        category: formData.category,
        goal: Number(formData.goal),
        duration: Number(formData.duration),
        description: formData.description,
        story: formData.story,
      });

      // Clear pending project from localStorage
      localStorage.removeItem('pendingProject');

      // Show success toast and redirect
      toast.success('Project created successfully!', {
        description: 'Your project has been submitted.'
      });
      
      // Redirect to projects page
      navigate('/projects');
    } catch (error) {
      toast.error('Failed to Create Project', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToStep = (step: number) => {
    if (step < 1) return;
    if (step > 3) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
      return;
    }
    setCurrentStep(step);
  };

  return (
    <div className="container max-w-4xl py-10">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Create a New Project</h1>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`flex-1 h-2 mx-1 rounded-full ${currentStep >= step ? 'bg-primary' : 'bg-secondary'}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Basics</span>
          <span>Story</span>
          <span>Rewards</span>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        {currentStep === 1 && (
          <ProjectBasicsForm 
            formData={formData} 
            handleChange={handleChange} 
            handleSelectChange={handleSelectChange} 
          />
        )}
        
        {currentStep === 2 && (
          <ProjectStoryForm 
            formData={formData} 
            handleChange={handleChange} 
          />
        )}
        
        {currentStep === 3 && (
          <ProjectRewardsForm />
        )}
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => goToStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <Button 
            onClick={() => goToStep(currentStep + 1)}
            disabled={isLoading}
          >
            {currentStep === 3 ? (
              isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Project'
              )
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
