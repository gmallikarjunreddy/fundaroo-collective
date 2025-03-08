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
import { getProjectById } from '@/services/projectService';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('story');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      try {
        if (id) {
          const projectData = await getProjectById(id);
          setProject(projectData);
          setSelectedImage(projectData.coverImage);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
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
                <Badge variant="outline" className="mb-4">{project?.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-medium mb-4">{project?.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{project?.description}</p>
              </div>
              
              {/* Image Gallery */}
              <div className="mb-10">
                <div className="rounded-xl overflow-hidden bg-secondary/30 mb-4">
                  <img 
                    src={selectedImage || project?.coverImage} 
                    alt={project?.title} 
                    className="w-full h-full object-contain max-h-[500px]"
                  />
                </div>
                {project?.images && project.images.length > 0 ? (
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
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    <button
                      className="rounded-lg overflow-hidden border-2 border-primary"
                    >
                      <img 
                        src={project?.coverImage} 
                        alt="Project cover" 
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Project Content Tabs */}
              <Tabs defaultValue="story" value={activeTab} onValueChange={setActiveTab} className="mb-10">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="story">Story</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="risks">Risks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="story" className="space-y-6">
                  <div dangerouslySetInnerHTML={{ __html: project?.story || '' }} className="prose max-w-none text-foreground leading-relaxed" />
                </TabsContent>
                
                <TabsContent value="faq" className="space-y-6">
                  {project?.faq ? (
                    project.faq.map((item: any, index: number) => (
                      <div key={index} className="border-b border-border pb-6 last:border-0">
                        <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No FAQ available for this project.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="risks" className="space-y-6">
                  <div dangerouslySetInnerHTML={{ __html: project?.risks || 'No risk information available.' }} className="prose max-w-none text-foreground leading-relaxed" />
                </TabsContent>
              </Tabs>
              
              {/* Project Updates and Comments */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 border border-border rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-lg">Project Updates</h3>
                    <Badge variant="outline">{project?.updates || 0}</Badge>
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
                    <Badge variant="outline">{project?.comments || 0}</Badge>
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
                  {project && (
                    <ProjectProgress 
                      projectId={id || ''}
                      projectTitle={project.title || ''}
                      raised={project.raised || 0} 
                      goal={project.goal || 0} 
                      backers={project.backers || 0} 
                      daysLeft={project.daysLeft || 0}
                    />
                  )}
                  
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
                        <p className="text-muted-foreground text-sm">{project?.launchDate || new Date(project?.createdAt || '').toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Funding Ends</p>
                        <p className="text-muted-foreground text-sm">{project?.endDate || 'In 30 days'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Creator Info */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-medium mb-4">About the Creator</h3>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={project?.creatorImage} alt={project?.creator?.fullName} />
                      <AvatarFallback>{project?.creator?.name?.charAt(0) || 'C'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project?.creator?.fullName || 'Creator'}</p>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {project?.creatorLocation || 'Location not specified'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-4">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{project?.creatorProjects || 1} projects created</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Creator
                  </Button>
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
