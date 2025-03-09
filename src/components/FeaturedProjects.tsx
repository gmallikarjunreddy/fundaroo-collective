
import { useState, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Move mockData outside to prevent recreation
const mockProjects = [
  {
    id: '1',
    title: 'The Minimal Desk Clock: Elegant Simplicity for Your Workspace',
    creator: 'Thomas Designs',
    description: 'A beautifully crafted timepiece that combines minimalist aesthetics with precise functionality.',
    imageSrc: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    category: 'Design',
    raised: 42000,
    goal: 50000,
    daysLeft: 15,
    featured: true
  },
  {
    id: '2',
    title: 'Eco-friendly Backpack: Adventure Sustainably',
    creator: 'Green Ventures',
    description: 'A durable backpack made from recycled materials with innovative storage solutions.',
    imageSrc: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop',
    category: 'Fashion',
    raised: 18500,
    goal: 30000,
    daysLeft: 24,
    featured: false
  },
  {
    id: '3',
    title: 'Sound Waves: Immersive Audio Headphones',
    creator: 'Audio Innovations',
    description: 'Next-generation headphones with spatial audio technology for an unparalleled listening experience.',
    imageSrc: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    category: 'Technology',
    raised: 85000,
    goal: 100000,
    daysLeft: 10,
    featured: false
  }
];

// Memoize the ProjectCard component to prevent unnecessary re-renders
const MemoizedProjectCard = memo(ProjectCard);

const FeaturedProjects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Directly use the mock data instead of waiting
    setProjects(mockProjects);
    
    // Log performance data
    if (window.performance) {
      const perfData = window.performance.getEntriesByType('navigation')[0];
      console.log('Navigation performance:', perfData);
    }
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-xl">Discover innovative ideas and creative projects that are making waves in our community.</p>
          </div>
          <Link to="/projects" className="mt-6 md:mt-0">
            <Button variant="outline" className="group">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <MemoizedProjectCard
              key={project.id}
              {...project}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
