
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, BookOpen, Calendar, PiggyBank, ShieldCheck } from 'lucide-react';

const StartProject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      title: "Creative Freedom",
      description: "Maintain complete creative control of your project from start to finish.",
      icon: <BookOpen className="h-6 w-6 text-primary" />
    },
    {
      title: "Deadline Structure",
      description: "Set a timeline that motivates you to complete your project.",
      icon: <Calendar className="h-6 w-6 text-primary" />
    },
    {
      title: "Direct Funding",
      description: "Get the financial resources you need without traditional gatekeepers.",
      icon: <PiggyBank className="h-6 w-6 text-primary" />
    },
    {
      title: "Platform Security",
      description: "Our all-or-nothing funding model protects both creators and backers.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />
    }
  ];

  const eligibilityItems = [
    "Your project must create something to share with others",
    "Be honest and clear about what you're creating and your qualifications",
    "Have a clear plan for completing your project and fulfilling rewards",
    "Comply with our platform's terms of service and guidelines"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-medium mb-6">Start Your Project</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Bring your creative project to life with the support of our global community.
              </p>
              <Link to="/create-project">
                <Button size="lg">
                  Create Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-medium mb-12 text-center">Why Choose Fundaroo?</h2>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-16">
                {benefits.map((benefit, index) => (
                  <div key={index} className="p-6 border border-border rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-8">
                <h3 className="text-2xl font-medium mb-6">Eligibility Requirements</h3>
                <div className="space-y-4">
                  {eligibilityItems.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-br from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-medium mb-6">Ready to get started?</h2>
                  <p className="text-muted-foreground mb-8">
                    In just a few steps, you'll be on your way to launching your project and connecting with potential backers from around the world.
                  </p>
                  <Link to="/create-project">
                    <Button size="lg">
                      Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-subtle">
                  <h3 className="text-xl font-medium mb-4">The Funding Process</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mr-3">1</span>
                      <div>
                        <p className="font-medium">Create your project page</p>
                        <p className="text-muted-foreground text-sm">Describe your idea, set a funding goal and timeline</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mr-3">2</span>
                      <div>
                        <p className="font-medium">Share with your network</p>
                        <p className="text-muted-foreground text-sm">Promote your project to friends, family, and our community</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mr-3">3</span>
                      <div>
                        <p className="font-medium">Get funded</p>
                        <p className="text-muted-foreground text-sm">If you reach your goal, you'll receive the funds to bring your idea to life</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mr-3">4</span>
                      <div>
                        <p className="font-medium">Fulfill your project</p>
                        <p className="text-muted-foreground text-sm">Create your project and deliver rewards to your backers</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StartProject;
