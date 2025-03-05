
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

// Mock project data
const allProjects = [
  {
    id: '1',
    title: 'The Minimal Desk Clock: Elegant Simplicity for Your Workspace',
    creator: 'Thomas Designs',
    description: 'A beautifully crafted timepiece that combines minimalist aesthetics with precise functionality.',
    imageSrc: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    category: 'design',
    raised: 42000,
    goal: 50000,
    daysLeft: 15
  },
  {
    id: '2',
    title: 'Eco-friendly Backpack: Adventure Sustainably',
    creator: 'Green Ventures',
    description: 'A durable backpack made from recycled materials with innovative storage solutions.',
    imageSrc: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop',
    category: 'design',
    raised: 18500,
    goal: 30000,
    daysLeft: 24
  },
  {
    id: '3',
    title: 'Sound Waves: Immersive Audio Headphones',
    creator: 'Audio Innovations',
    description: 'Next-generation headphones with spatial audio technology for an unparalleled listening experience.',
    imageSrc: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    category: 'tech',
    raised: 85000,
    goal: 100000,
    daysLeft: 10
  },
  {
    id: '4',
    title: 'Illustrated Urban Fantasy Novel Series',
    creator: 'Fantasia Publishing',
    description: 'A richly illustrated series of novels exploring magical realism in contemporary urban settings.',
    imageSrc: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop',
    category: 'publishing',
    raised: 12000,
    goal: 20000,
    daysLeft: 45
  },
  {
    id: '5',
    title: 'Ceramic Handcrafted Tableware Collection',
    creator: 'Clay Studios',
    description: 'Artisan-made ceramic plates, bowls, and mugs with unique glazes and minimalist design.',
    imageSrc: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=800&auto=format&fit=crop',
    category: 'art',
    raised: 28000,
    goal: 35000,
    daysLeft: 18
  },
  {
    id: '6',
    title: 'Indie Rock Album: Urban Echoes',
    creator: 'The City Sounds',
    description: 'A debut album exploring themes of city life through indie rock compositions with electronic influences.',
    imageSrc: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
    category: 'music',
    raised: 6800,
    goal: 12000,
    daysLeft: 30
  },
  {
    id: '7',
    title: 'Retro Pixel Art Adventure Game',
    creator: 'Nostalgia Games',
    description: 'A pixel art adventure game with modern gameplay mechanics and a nostalgic aesthetic.',
    imageSrc: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=800&auto=format&fit=crop',
    category: 'games',
    raised: 35000,
    goal: 60000,
    daysLeft: 15
  },
  {
    id: '8',
    title: 'Documentary: The Hidden Rivers',
    creator: 'Nature Lens Productions',
    description: 'A documentary exploring the ecological importance of underground river systems worldwide.',
    imageSrc: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    category: 'film',
    raised: 52000,
    goal: 75000,
    daysLeft: 12
  },
  {
    id: '9',
    title: 'Sustainable Food Container System',
    creator: 'EcoLiving',
    description: 'Modular food containers made from plant-based materials with innovative sealing technology.',
    imageSrc: 'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=800&auto=format&fit=crop',
    category: 'tech',
    raised: 18500,
    goal: 25000,
    daysLeft: 22
  },
  {
    id: '10',
    title: 'Minimalist Fountain Pen Collection',
    creator: 'Script & Stone',
    description: 'Hand-crafted fountain pens made from sustainable materials with precision-engineered nibs.',
    imageSrc: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?q=80&w=800&auto=format&fit=crop',
    category: 'design',
    raised: 15000,
    goal: 20000,
    daysLeft: 28
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(allProjects);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    let filteredProjects = [...allProjects];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filteredProjects = filteredProjects.filter(
        (project) => project.category === activeCategory
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.creator.toLowerCase().includes(query)
      );
    }
    
    // Sort projects
    switch (sortBy) {
      case 'newest':
        // In a real app, this would sort by creation date
        break;
      case 'endingSoon':
        filteredProjects.sort((a, b) => a.daysLeft - b.daysLeft);
        break;
      case 'mostFunded':
        filteredProjects.sort((a, b) => {
          const percentA = (a.raised / a.goal) * 100;
          const percentB = (b.raised / b.goal) * 100;
          return percentB - percentA;
        });
        break;
      case 'mostBacked':
        // In a real app, this would sort by backer count
        break;
    }
    
    setProjects(filteredProjects);
  }, [activeCategory, searchQuery, sortBy]);
  
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
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="endingSoon">Ending Soon</SelectItem>
                <SelectItem value="mostFunded">Most Funded</SelectItem>
                <SelectItem value="mostBacked">Most Backed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator className="mb-8" />
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
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
