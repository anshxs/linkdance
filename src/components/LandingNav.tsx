
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';

const LandingNav: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 
            className="text-2xl font-bold cursor-pointer" 
            onClick={() => navigate('/')}
          >
            LinkDance
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleGetStarted}
          >
            Dashboard
          </Button>
          
          <a 
            href="https://www.buymeacoffee.com/ansh_sx" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-2"
            >
              <Coffee size={16} />
              Support Us
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default LandingNav;
