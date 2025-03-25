
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Link, Layers, Share2 } from 'lucide-react';
import LandingNav from './LandingNav';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <LandingNav />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Introducing LinkDance
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Your links, your way, in <span className="text-primary">one place</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a beautiful, customizable link page to share all your important links with your audience. Quick, easy, and no sign-up required.
          </p>
          
          <div className="pt-8">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-lg group"
              onClick={handleGetStarted}
            >
              Get Started 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        <div className="mt-20 flex flex-wrap justify-center gap-8 w-full max-w-5xl">
          <div className="glass-card p-8 rounded-2xl w-full max-w-sm shadow-xl">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <Link size={24} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Create Your Page</h3>
            <p className="text-muted-foreground text-lg">Add your profile details, links, and social media with our intuitive editor.</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl w-full max-w-sm shadow-xl">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <Layers size={24} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Customize</h3>
            <p className="text-muted-foreground text-lg">Arrange your links, add icons, and personalize your page to match your style.</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl w-full max-w-sm shadow-xl">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <Share2 size={24} />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Share</h3>
            <p className="text-muted-foreground text-lg">Publish and share your unique link with your audience across all platforms.</p>
          </div>
        </div>
      </div>
      
      <footer className="py-6 border-t bg-background/60 backdrop-blur">
        <div className="container flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground mb-2">
            Made with ♥ by the LinkDance team
          </p>
          <div className="flex items-center gap-2">
            <a 
              href="https://www.buymeacoffee.com/ansh_sx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Support Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
