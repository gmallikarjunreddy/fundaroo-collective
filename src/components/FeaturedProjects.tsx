
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for featured projects
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
  },
  {
    id: '4',
    title: 'Illustrated Urban Fantasy Novel Series',
    creator: 'Fantasia Publishing',
    description: 'A richly illustrated series of novels exploring magical realism in contemporary urban settings.',
    imageSrc: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop',
    category: 'Publishing',
    raised: 12000,
    goal: 20000,
    daysLeft: 45,
    featured: false
  },
  {
    id: '5',
    title: 'Ceramic Handcrafted Tableware Collection',
    creator: 'Clay Studios',
    description: 'Artisan-made ceramic plates, bowls, and mugs with unique glazes and minimalist design.',
    imageSrc: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=800&auto=format&fit=crop',
    category: 'Art',
    raised: 28000,
    goal: 35000,
    daysLeft: 18,
    featured: false
  }
];

const FeaturedProjects = () => {
  const [projects, setProjects] = useState(mockProjects);
  
  // Simulate loading data
  useEffect(() => {
    // In a real app, this would be an API call
    const timer = setTimeout(() => {
      setProjects(mockProjects);
    }, 500);
    
    return () => clearTimeout(timer);
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
          {projects.map((project, index) => (
            <ProjectCard
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
