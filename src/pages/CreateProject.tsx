
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
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
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo.token;

      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          goal: Number(formData.goal),
          duration: Number(formData.duration),
          description: formData.description,
          story: formData.story,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project');
      }

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
        )}
        
        {currentStep === 2 && (
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
        )}
        
        {currentStep === 3 && (
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
