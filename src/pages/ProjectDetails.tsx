
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectProgress from '@/components/ProjectProgress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  MapPin, 
  Share2, 
  Heart, 
  AlertCircle, 
  MessageCircle,
  ArrowRight, 
  ChevronLeft,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock project data
const projects = [
  {
    id: '1',
    title: 'The Minimal Desk Clock: Elegant Simplicity for Your Workspace',
    creator: 'Thomas Designs',
    creatorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    creatorLocation: 'San Francisco, CA',
    creatorProjects: 3,
    description: 'A beautifully crafted timepiece that combines minimalist aesthetics with precise functionality. Our desk clock embraces the philosophy of "less is more" while delivering exceptional craftsmanship and reliable timekeeping.',
    story: `
      <p>As designers obsessed with the intersection of form and function, we've always been drawn to objects that seamlessly blend into our lives while elevating our spaces. The Minimal Desk Clock was born from our desire to create a timepiece that doesn't demand attention but rather earns it through subtle design excellence.</p>
      <p>Made from sustainably sourced maple and hand-finished with natural oils, each clock features a precision Japanese quartz movement that ensures silent, accurate timekeeping. The face has been stripped of unnecessary markings, leaving only what's essential to tell time at a glance.</p>
      <p>The design process took us through dozens of prototypes, refining angles and proportions until we achieved the perfect balance. We're excited to bring this object into production and share it with others who appreciate thoughtful, minimal design.</p>
    `,
    risks: `
      <p>While we have completed the design and prototyping phases, manufacturing always carries inherent risks. Our production timeline may be affected by material sourcing delays or quality control issues.</p>
      <p>We're working with experienced manufacturers and have built in buffer time to our delivery estimates, but unexpected challenges may arise. We commit to transparent communication throughout the production process.</p>
    `,
    imageSrc: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563861826100-9cb7d00e708a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576698483491-8c43f0862543?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625038694913-cb4e0c587506?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Design',
    raised: 42000,
    goal: 50000,
    backers: 364,
    daysLeft: 15,
    launchDate: 'October 15, 2023',
    endDate: 'November 15, 2023',
    updates: 4,
    comments: 28,
    faq: [
      {
        question: "When will the clocks ship?",
        answer: "We plan to begin shipping in February 2024, with all orders fulfilled by March 2024."
      },
      {
        question: "Is international shipping available?",
        answer: "Yes, we ship worldwide. International shipping costs will be calculated at checkout."
      },
      {
        question: "What type of battery does the clock use?",
        answer: "The clock uses a standard AA battery which should last approximately 12 months."
      }
    ],
    pledgeLevels: [
      {
        id: "pledge1",
        title: "Early Bird Special",
        amount: 85,
        description: "Get the Minimal Desk Clock at a special early bird price. Limited to the first 100 backers.",
        includes: ["1 Minimal Desk Clock", "Free shipping within the US"],
        remaining: 15,
        estimatedDelivery: "February 2024",
        popular: true
      },
      {
        id: "pledge2",
        title: "Standard Edition",
        amount: 99,
        description: "The Minimal Desk Clock in your choice of natural maple or walnut finish.",
        includes: ["1 Minimal Desk Clock", "Free shipping within the US"],
        remaining: null,
        estimatedDelivery: "February 2024",
        popular: false
      },
      {
        id: "pledge3",
        title: "Collector's Set",
        amount: 189,
        description: "A complete set with both maple and walnut clock editions, packaged in a special collector's box.",
        includes: ["2 Minimal Desk Clocks (Maple & Walnut)", "Collector's Edition Box", "Free shipping worldwide"],
        remaining: 50,
        estimatedDelivery: "March 2024",
        popular: false
      }
    ]
  },
  // More projects would be here in a real app
];

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('story');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API fetch
    setTimeout(() => {
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        setSelectedImage(foundProject.images[0]);
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-secondary rounded-md mb-4"></div>
            <div className="h-6 w-32 bg-secondary rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-medium mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/projects">
              <Button>Browse Other Projects</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="mb-6">
                <Badge variant="outline" className="mb-4">{project.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-medium mb-4">{project.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
              </div>
              
              {/* Image Gallery */}
              <div className="mb-10">
                <div className="rounded-xl overflow-hidden bg-secondary/30 mb-4">
                  <img 
                    src={selectedImage} 
                    alt={project.title} 
                    className="w-full h-full object-contain max-h-[500px]"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {project.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === image ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`Project image ${index + 1}`} 
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Project Content Tabs */}
              <Tabs defaultValue="story" value={activeTab} onValueChange={setActiveTab} className="mb-10">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="story">Story</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="risks">Risks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="story" className="space-y-6">
                  <div dangerouslySetInnerHTML={{ __html: project.story }} className="prose max-w-none text-foreground leading-relaxed" />
                </TabsContent>
                
                <TabsContent value="faq" className="space-y-6">
                  {project.faq.map((item: any, index: number) => (
                    <div key={index} className="border-b border-border pb-6 last:border-0">
                      <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="risks" className="space-y-6">
                  <div dangerouslySetInnerHTML={{ __html: project.risks }} className="prose max-w-none text-foreground leading-relaxed" />
                </TabsContent>
              </Tabs>
              
              {/* Project Updates and Comments */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 border border-border rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg">Project Updates</h3>
                    <Badge variant="outline">{project.updates}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Stay updated on the latest project developments and announcements.
                  </p>
                  <Button variant="outline" className="w-full">
                    View Updates
                  </Button>
                </div>
                
                <div className="p-6 border border-border rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg">Comments</h3>
                    <Badge variant="outline">{project.comments}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Join the conversation and connect with other backers and the creator.
                  </p>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    View Comments
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Project Progress */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <ProjectProgress 
                    projectId={project.id}
                    projectTitle={project.title}
                    raised={project.raised} 
                    goal={project.goal} 
                    backers={project.backers} 
                    daysLeft={project.daysLeft}
                  />
                  
                  <div className="flex space-x-2 mt-6">
                    <Button variant="outline" size="icon" aria-label="Save project">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share project">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button className="flex-grow">Back this project</Button>
                  </div>
                </div>
                
                {/* Project Dates */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-medium mb-4">Project Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Project Launched</p>
                        <p className="text-muted-foreground text-sm">{project.launchDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Funding Ends</p>
                        <p className="text-muted-foreground text-sm">{project.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Creator Info */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-medium mb-4">About the Creator</h3>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={project.creatorImage} alt={project.creator} />
                      <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.creator}</p>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {project.creatorLocation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-4">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{project.creatorProjects} projects created</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Creator
                  </Button>
                </div>
                
                {/* Pledge Levels */}
                <div>
                  <h3 className="font-medium mb-4">Support this project</h3>
                  {project.pledgeLevels.map((pledge: any, index: number) => (
                    <div 
                      key={pledge.id}
                      className={`mb-4 border rounded-xl overflow-hidden transition-shadow hover:shadow-subtle
                        ${pledge.popular ? 'border-primary' : 'border-border'}`}
                    >
                      {pledge.popular && (
                        <div className="bg-primary text-primary-foreground py-1.5 px-4 text-xs font-medium text-center">
                          POPULAR
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">{pledge.title}</h4>
                          <p className="text-xl font-medium">${pledge.amount}</p>
                        </div>
                        <p className="text-muted-foreground mb-4">{pledge.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium">Includes:</p>
                          <ul className="text-sm space-y-1">
                            {pledge.includes.map((item: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div>Estimated delivery: {pledge.estimatedDelivery}</div>
                          {pledge.remaining && (
                            <div className="text-primary font-medium">
                              {pledge.remaining} left
                            </div>
                          )}
                        </div>
                        
                        <Button className="w-full">
                          Select this pledge
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional Info */}
                <div className="bg-secondary/50 rounded-xl p-6">
                  <div className="flex items-start mb-4">
                    <AlertCircle className="h-5 w-5 mr-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Backing is not the same as buying. Your pledge supports the creation of this project and helps make it a reality.
                    </p>
                  </div>
                  <Link to="/how-it-works" className="text-sm text-primary inline-flex items-center">
                    Learn more about backing projects
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;
