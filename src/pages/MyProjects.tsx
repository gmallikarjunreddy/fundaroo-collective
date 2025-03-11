
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProjectCard from '@/components/ProjectCard';
import EditProjectDialog from '@/components/project/EditProjectDialog';
import DeleteProjectDialog from '@/components/project/DeleteProjectDialog';
import { useProjects } from '@/hooks/useProjects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MyProjects = () => {
  const { projects, isLoading, refreshProjects } = useProjects(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-20 px-4 mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage and track all your crowdfunding projects</p>
        </div>
        
        <div className="mb-6">
          <Link to="/create-project">
            <Button>
              Start a New Project
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Loading your projects...</p>
            </CardContent>
          </Card>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project._id} className="flex flex-col h-full">
                <ProjectCard
                  id={project._id}
                  title={project.title}
                  creator={project.creator?.name || "You"}
                  description={project.description}
                  imageSrc={project.coverImage}
                  category={project.category}
                  raised={project.raised || 0}
                  goal={project.goal}
                  daysLeft={project.daysLeft || 0}
                />
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
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">You haven't created any projects yet</p>
              <Button className="mt-4" asChild>
                <Link to="/create-project">Start your first project</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyProjects;
