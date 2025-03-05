
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import FeaturedProjects from '@/components/FeaturedProjects';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Lightbulb, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const statsData = [
  { number: "20M+", label: "Backers", icon: <Users className="h-6 w-6" /> },
  { number: "227K+", label: "Projects Funded", icon: <Lightbulb className="h-6 w-6" /> },
  { number: "$6.7B", label: "Total Pledged", icon: <DollarSign className="h-6 w-6" /> },
  { number: "16", label: "Years of Creativity", icon: <Award className="h-6 w-6" /> },
];

const categories = [
  { name: "Art & Design", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop", path: "/projects?category=art" },
  { name: "Technology", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop", path: "/projects?category=tech" },
  { name: "Film & Video", image: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=600&auto=format&fit=crop", path: "/projects?category=film" },
  { name: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop", path: "/projects?category=music" },
  { name: "Games", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop", path: "/projects?category=games" },
  { name: "Publishing", image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=600&auto=format&fit=crop", path: "/projects?category=publishing" },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Platform Stats */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {statsData.map((stat, index) => (
                <div key={index} className="p-6 flex flex-col items-center animate-slide-up [animation-delay:0.1s]">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                    {stat.icon}
                  </div>
                  <p className="text-3xl md:text-4xl font-medium mb-1">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedProjects />
        
        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">Explore Categories</h2>
              <p className="text-muted-foreground">Discover projects from various creative fields and find the ones that resonate with your interests.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  to={category.path}
                  className="hover-lift group relative rounded-xl overflow-hidden h-64 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <h3 className="text-xl font-medium mb-2">{category.name}</h3>
                    <span className="inline-flex items-center text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block py-1 px-3 rounded-full bg-secondary text-sm font-medium mb-6">
                Ready to bring your idea to life?
              </span>
              <h2 className="text-3xl md:text-5xl font-medium mb-6">
                Start your project today
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators who have successfully funded their projects through our platform.
              </p>
              <Link to="/start-project">
                <Button className="rounded-full px-8 py-6 text-base">
                  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-secondary/50 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
