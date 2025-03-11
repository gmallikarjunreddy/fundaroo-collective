
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        {/* Hero section */}
        <section className="bg-secondary/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-medium mb-6">About Fundaroo Collective</h1>
              <p className="text-xl text-muted-foreground">We're bringing creative projects to life through community support and collaboration.</p>
            </div>
          </div>
        </section>
        
        {/* Mission section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-medium mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Fundaroo Collective was founded with a simple but powerful mission: to help creative 
                individuals bring their ideas to life. We believe that great ideas can come from 
                anyone, anywhere, and that the traditional gatekeepers of funding shouldn't 
                determine which creative projects get a chance to exist.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We're building a community where creators can share their vision directly with people 
                who are excited to support them, and where backers can help make the projects they 
                love a reality while getting behind-the-scenes access and exclusive rewards.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-medium mb-12 text-center">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-medium text-primary">CR</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Chandra Reddy</h3>
                  <p className="text-muted-foreground">Co-Founder & CEO</p>
                  <p className="mt-4 text-sm">Passionate about helping creators connect with their audiences and bring innovative ideas to market.</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-medium text-primary">SK</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Sarah Kumar</h3>
                  <p className="text-muted-foreground">Co-Founder & CTO</p>
                  <p className="mt-4 text-sm">Expert in building technology that connects communities and enables creative collaboration.</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-medium text-primary">AP</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Amit Patel</h3>
                  <p className="text-muted-foreground">Head of Community</p>
                  <p className="mt-4 text-sm">Dedicated to nurturing a vibrant community of creators and supporters.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-medium mb-8">Our Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Creativity Without Limits</h3>
                  <p className="text-muted-foreground">We believe in empowering creators to pursue their unique vision without compromise.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Community Support</h3>
                  <p className="text-muted-foreground">We foster a community where people support each other's projects and creative journeys.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Transparency</h3>
                  <p className="text-muted-foreground">We encourage open communication between creators and backers throughout the project lifecycle.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">We strive to make funding accessible to creators from all backgrounds and experience levels.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-medium mb-6">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a creator with a bold idea or someone looking to support innovative projects,
                Fundaroo Collective is the place for you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/projects">
                  <Button size="lg" variant="default">Explore Projects</Button>
                </Link>
                <Link to="/start-project">
                  <Button size="lg" variant="outline">Start a Project</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
