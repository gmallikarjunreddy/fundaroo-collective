
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-sm font-medium mb-6 animate-fade-in">
            Discover & Fund Creative Projects
          </span>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight md:leading-tight mb-6 animate-fade-in [animation-delay:0.1s]">
            Bring Creative Projects to Life
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:0.2s]">
            Fundaroo is where creators share new project ideas and find the support to make them happen, all in one community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:0.3s]">
            <Link to="/projects">
              <Button className="rounded-full px-8 py-6 text-base">
                Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/start-project">
              <Button variant="outline" className="rounded-full px-8 py-6 text-base">
                Start a Project
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Featured Project Image */}
        <div className="mt-16 max-w-4xl mx-auto relative animate-fade-in [animation-delay:0.4s]">
          <img 
            src="/lovable-uploads/ff4258c3-ed05-4194-9ccc-aaa2204443aa.png" 
            alt="Featured Project" 
            className="w-full h-auto rounded-xl shadow-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
