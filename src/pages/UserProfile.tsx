import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Settings, ExternalLink } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import EditProjectDialog from '@/components/project/EditProjectDialog';
import DeleteProjectDialog from '@/components/project/DeleteProjectDialog';
import { useProjects } from '@/hooks/useProjects';

// Mock user data
const mockUser = {
  id: 'user-1',
  name: 'Alex Johnson',
  username: 'alexjohnson',
  bio: 'Creative designer and entrepreneur with a passion for sustainable products. Building innovative solutions for everyday problems.',
  location: 'San Francisco, CA',
  memberSince: 'January 2022',
  avatarUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=250&h=250',
  website: 'https://example.com',
  socialLinks: {
    twitter: 'alexjohnson',
    instagram: 'alexjohnson.design'
  }
};

// Mock projects data
const mockProjects = [
  {
    id: '101',
    title: 'Eco-friendly Water Bottle',
    creator: 'Alex Johnson',
    description: 'A sustainable water bottle that tracks your hydration and reduces plastic waste.',
    imageSrc: 'https://images.unsplash.com/photo-1546518071-fddcdda7580a?q=80&w=800&auto=format&fit=crop',
    category: 'Design',
    raised: 12000,
    goal: 15000,
    daysLeft: 8,
    featured: false
  },
  {
    id: '102',
    title: 'Urban Garden Planter',
    creator: 'Alex Johnson',
    description: 'Self-watering planter system for urban dwellers with limited space.',
    imageSrc: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop',
    category: 'Design',
    raised: 8000,
    goal: 10000,
    daysLeft: 12,
    featured: false
  }
];

// Mock backed projects
const mockBackedProjects = [
  {
    id: '201',
    title: 'Portable Solar Charger',
    creator: 'Green Energy Co.',
    description: 'Compact solar charger for all your devices, perfect for outdoor adventures.',
    imageSrc: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
    category: 'Technology',
    raised: 45000,
    goal: 50000,
    daysLeft: 5,
    featured: false
  }
];

const UserProfile = () => {
  const { username } = useParams();
  const { projects, isLoading, refreshProjects } = useProjects(true);
  const user = mockUser; // In a real app, fetch user by username
  const isCurrentUser = true; // In a real app, check if this is the logged-in user

  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
          <Avatar className="w-24 h-24 border-4 border-background">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-2 max-w-2xl">{user.bio}</p>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <span className="text-muted-foreground">{user.location}</span>
              <span className="text-muted-foreground">Member since {user.memberSince}</span>
            </div>
          </div>
          
          {isCurrentUser ? (
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          ) : (
            <Button>Follow</Button>
          )}
        </div>
        
        {/* Tabs Content */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="backed">Backed Projects</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            {isCurrentUser && (
              <div className="mb-6">
                <Link to="/create-project">
                  <Button>Start a New Project</Button>
                </Link>
              </div>
            )}
            
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div key={project._id}>
                    <ProjectCard {...project} />
                    {isCurrentUser && (
                      <div className="mt-2 flex gap-2">
                        <EditProjectDialog 
                          project={project} 
                          onUpdate={refreshProjects} 
                        />
                        <DeleteProjectDialog 
                          projectId={project._id}
                          projectTitle={project.title}
                          onDelete={refreshProjects}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No projects yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="backed" className="space-y-6">
            {mockBackedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBackedProjects.map(project => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No backed projects yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">About {user.name}</h3>
                  <p>{user.bio}</p>
                  
                  {user.website && (
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  {/* Social Links */}
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Social Links</h4>
                    <div className="flex gap-4">
                      {user.socialLinks.twitter && (
                        <a 
                          href={`https://twitter.com/${user.socialLinks.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Twitter
                        </a>
                      )}
                      {user.socialLinks.instagram && (
                        <a 
                          href={`https://instagram.com/${user.socialLinks.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
