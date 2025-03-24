
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Introducing LinkDance
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Your links, your way, in <span className="text-primary">one place</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create a beautiful, customizable link page to share all your important links with your audience. Quick, easy, and no sign-up required.
        </p>
        
        <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
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
      
      <div className="mt-20 flex flex-wrap justify-center gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="glass-card p-6 rounded-2xl w-full max-w-sm">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">1</div>
          <h3 className="text-xl font-semibold mb-2">Create Your Page</h3>
          <p className="text-muted-foreground">Add your profile details, links, and social media with our intuitive editor.</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl w-full max-w-sm animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">2</div>
          <h3 className="text-xl font-semibold mb-2">Customize</h3>
          <p className="text-muted-foreground">Arrange your links, add icons, and personalize your page to match your style.</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl w-full max-w-sm animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">3</div>
          <h3 className="text-xl font-semibold mb-2">Share</h3>
          <p className="text-muted-foreground">Publish and share your unique link with your audience across all platforms.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
