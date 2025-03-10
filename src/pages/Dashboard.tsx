import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProjectProgress from '@/components/ProjectProgress';
import { ArrowRight, ArrowUp, Users, DollarSign, BarChart, Bell } from 'lucide-react';
import EditProjectDialog from '@/components/project/EditProjectDialog';
import DeleteProjectDialog from '@/components/project/DeleteProjectDialog';
import { useProjects } from '@/hooks/useProjects';

const Dashboard = () => {
  // Get user projects using the useProjects hook with userOnly flag
  const { projects, isLoading, refreshProjects } = useProjects(true);

  // Mock data for dashboard
  const userStats = {
    totalRaised: '₹24,500',
    totalBacked: 14,
    followers: 86,
    projectViews: 1243
  };

  const activeProjects = [
    {
      id: '101',
      title: 'Eco-friendly Water Bottle',
      raised: 12000,
      goal: 15000,
      daysLeft: 8,
      backers: 248,
      status: 'active'
    },
    {
      id: '102',
      title: 'Urban Garden Planter',
      raised: 8000,
      goal: 10000,
      daysLeft: 12,
      backers: 156,
      status: 'active'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'new_backer', project: 'Eco-friendly Water Bottle', user: 'Maria S.', amount: '$45', time: '2 hours ago' },
    { id: 2, type: 'comment', project: 'Eco-friendly Water Bottle', user: 'John D.', comment: 'Love this project!', time: '5 hours ago' },
    { id: 3, type: 'milestone', project: 'Urban Garden Planter', milestone: '75% funded', time: '1 day ago' },
    { id: 4, type: 'new_backer', project: 'Urban Garden Planter', user: 'David K.', amount: '$120', time: '1 day ago' },
    { id: 5, type: 'new_follower', user: 'Sarah M.', time: '2 days ago' }
  ];

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and account</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/create-project">
            <Button>
              Start a New Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Raised</p>
                <h3 className="text-2xl font-bold">{userStats.totalRaised}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-xs text-emerald-500">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Projects Backed</p>
                <h3 className="text-2xl font-bold">{userStats.totalBacked}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-xs text-emerald-500">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>3 new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Followers</p>
                <h3 className="text-2xl font-bold">{userStats.followers}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-xs text-emerald-500">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>8 new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Project Views</p>
                <h3 className="text-2xl font-bold">{userStats.projectViews}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-xs text-emerald-500">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>24% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Projects</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {projects.length > 0 ? (
                projects.map(project => (
                  <Card key={project._id} className="mb-4">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <Link to={`/project/${project._id}`} className="text-lg font-medium hover:underline">
                            {project.title}
                          </Link>
                          
                          <div className="mt-4 mb-2">
                            <ProjectProgress 
                              projectId={project.id}
                              projectTitle={project.title}
                              raised={project.raised} 
                              goal={project.goal} 
                            />
                          </div>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Raised: </span>
                              <span className="font-medium">₹{project.raised.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Goal: </span>
                              <span className="font-medium">₹{project.goal.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Backers: </span>
                              <span className="font-medium">{project.backers}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Days left: </span>
                              <span className="font-medium">{project.daysLeft}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4 md:mt-0 self-end">
                          <EditProjectDialog 
                            project={project} 
                            onUpdate={refreshProjects} 
                          />
                          <DeleteProjectDialog 
                            projectId={project._id}
                            projectTitle={project.title}
                            onDelete={refreshProjects}
                          />
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/project/${project._id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">You haven't created any projects yet</p>
                    <Button className="mt-4" asChild>
                      <Link to="/create-project">Start a new project</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="drafts">
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">You don't have any draft projects</p>
                  <Button className="mt-4" asChild>
                    <Link to="/create-project">Start a new project</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="completed">
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">You don't have any completed projects yet</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates from your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="border-b pb-3 last:border-0">
                    {activity.type === 'new_backer' && (
                      <div>
                        <p className="font-medium text-sm">{activity.user} backed your project</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.amount} contribution to {activity.project}
                        </p>
                      </div>
                    )}
                    
                    {activity.type === 'comment' && (
                      <div>
                        <p className="font-medium text-sm">{activity.user} commented</p>
                        <p className="text-xs mt-1">"{activity.comment}"</p>
                      </div>
                    )}
                    
                    {activity.type === 'milestone' && (
                      <div>
                        <p className="font-medium text-sm">Milestone reached!</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.project}: {activity.milestone}
                        </p>
                      </div>
                    )}
                    
                    {activity.type === 'new_follower' && (
                      <div>
                        <p className="font-medium text-sm">{activity.user} is now following you</p>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
