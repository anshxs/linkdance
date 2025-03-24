
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, Globe } from 'lucide-react';
import { ProfileData, getProfileById } from '@/utils/storage';

interface AppHeaderProps {
  profile?: ProfileData;
}

const AppHeader: React.FC<AppHeaderProps> = ({ profile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  
  const handleViewClick = () => {
    if (profile?.publishedUrl) {
      window.open(profile.publishedUrl, '_blank');
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 
            className="text-xl font-bold cursor-pointer" 
            onClick={handleDashboardClick}
          >
            LinkDance
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {location.pathname.includes('/edit') && profile?.publishedUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleViewClick}
            >
              <Eye size={16} /> View
            </Button>
          )}
          
          {location.pathname.includes('/edit') && !profile?.publishedUrl && (
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              disabled
            >
              <Globe size={16} /> Not Published
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
