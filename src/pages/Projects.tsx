
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2 } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const Projects = () => {
  const {
    projects,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useProjects();
  
  // Calculate days left for a project
  const calculateDaysLeft = (createdAt: string, duration: number) => {
    const endDate = new Date(createdAt);
    endDate.setDate(endDate.getDate() + duration);
    
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Format project data for the ProjectCard component
  const formatProjectData = (project: any) => {
    return {
      id: project._id,
      title: project.title,
      creator: project.creator?.fullName || 'Anonymous',
      description: project.description,
      imageSrc: project.coverImage || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      category: project.category,
      raised: project.raised || 0,
      goal: project.goal,
      daysLeft: calculateDaysLeft(project.createdAt, project.duration)
    };
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-medium mb-4">Discover Projects</h1>
            <p className="text-muted-foreground text-xl">
              Explore creative projects from artists, designers, and innovators around the world.
            </p>
          </div>
          
          <CategoryFilter onCategoryChange={handleCategoryChange} className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search projects" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select 
              defaultValue="newest" 
              onValueChange={setSortBy}
              value={sortBy}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="endingSoon">Ending Soon</SelectItem>
                <SelectItem value="mostFunded">Most Funded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator className="mb-8" />
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
              <p className="text-lg font-medium">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-2xl font-medium mb-2">Error loading projects</p>
              <p className="text-muted-foreground">{String(error)}</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} {...formatProjectData(project)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl font-medium mb-2">No projects found</p>
              <p className="text-muted-foreground">
                Try changing your search criteria or check back later for new projects.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
