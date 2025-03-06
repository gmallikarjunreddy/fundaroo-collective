
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Lightbulb, ArrowRight, PiggyBank, Users, BadgeCheck } from 'lucide-react';

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Create Your Project",
      description: "Start by crafting a compelling project page that clearly communicates your idea, goals, and funding needs.",
      icon: <Lightbulb className="h-8 w-8" />,
      items: [
        "Set a clear funding goal and timeline",
        "Create an engaging project video and description",
        "Define reward tiers for your backers"
      ]
    },
    {
      id: 2,
      title: "Share with the World",
      description: "Launch your project and spread the word through your network and our community of supporters.",
      icon: <Users className="h-8 w-8" />,
      items: [
        "Leverage social media and personal networks",
        "Engage with the Fundaroo community",
        "Update backers regularly on progress"
      ]
    },
    {
      id: 3,
      title: "Get Funded",
      description: "As backers support your project, watch your funding grow until you reach (or exceed) your goal.",
      icon: <PiggyBank className="h-8 w-8" />,
      items: [
        "Receive funds once your goal is reached",
        "All-or-nothing funding protects backers",
        "Track your funding progress in real-time"
      ]
    },
    {
      id: 4,
      title: "Deliver Your Project",
      description: "Once funded, bring your project to life and fulfill the promises made to your backers.",
      icon: <BadgeCheck className="h-8 w-8" />,
      items: [
        "Keep backers updated on production",
        "Fulfill rewards as promised",
        "Build your reputation for future projects"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-medium mb-6">How Fundaroo Works</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our platform connects creative projects with the funding and support they need to bring ideas to life.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/start-project">
                  <Button size="lg">
                    Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" size="lg">
                    Explore Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-16">
                {steps.map((step, index) => (
                  <div key={step.id} className="grid md:grid-cols-5 gap-6 items-start">
                    <div className="md:col-span-1 bg-primary/10 rounded-xl p-6 flex justify-center">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <div className="flex items-center mb-4">
                        <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-3 text-sm font-medium">
                          {step.id}
                        </span>
                        <h3 className="text-2xl font-medium">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      <ul className="space-y-2">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-medium mb-6">Ready to bring your idea to life?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of creators who have successfully funded their projects through our platform.
              </p>
              <Link to="/start-project">
                <Button size="lg">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
