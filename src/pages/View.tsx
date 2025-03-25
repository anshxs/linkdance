
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileData } from '@/utils/storage';
import { decodeProfileData } from '@/utils/publish';

interface SocialIconProps {
  platform: string;
  url: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform, url }) => {
  const iconMap: Record<string, string> = {
    facebook: 'ri-facebook-fill',
    twitter: 'ri-twitter-fill',
    instagram: 'ri-instagram-line',
    linkedin: 'ri-linkedin-fill',
    github: 'ri-github-fill',
    telegram: 'ri-telegram-fill',
    whatsapp: 'ri-whatsapp-line',
    youtube: 'ri-youtube-fill',
    email: 'ri-mail-fill'
  };

  const iconClass = iconMap[platform] || 'ri-link';

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-all duration-300 hover:scale-110 shadow-sm"
    >
      <i className={`${iconClass} text-xl`}></i>
    </a>
  );
};

interface LinkItemProps {
  label: string;
  url: string;
  icon?: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ label, url, icon }) => {
  const iconClass = icon ? `ri-${icon}` : 'ri-link';
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-foreground transition-all duration-300 hover:-translate-y-1 mb-3 w-full max-w-md mx-auto shadow-sm"
    >
      {icon && <i className={`${iconClass} mr-3 text-lg`}></i>}
      <span className="font-medium">{label}</span>
    </a>
  );
};

const View: React.FC = () => {
  const location = useLocation();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const encodedData = queryParams.get('data');
        
        if (!encodedData) {
          setError('No profile data found');
          setLoading(false);
          return;
        }
        
        const profileData = decodeProfileData(encodedData);
        if (!profileData) {
          setError('Invalid profile data');
          setLoading(false);
          return;
        }
        
        setProfile(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [location.search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error || 'Failed to load profile'}</p>
          <a 
            href="/" 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center">
          {profile.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 mb-4 shadow-md">
              <img 
                src={profile.photoUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-center mt-2">
            {profile.name}
          </h1>
          
          {profile.description && (
            <p className="text-gray-600 text-center mt-3 mb-8 max-w-md">
              {profile.description}
            </p>
          )}
          
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {profile.socialLinks.map((social, index) => (
                <SocialIcon 
                  key={index} 
                  platform={social.platform} 
                  url={social.url} 
                />
              ))}
            </div>
          )}
          
          <div className="w-full space-y-3">
            {profile.links.map((link, index) => (
              <LinkItem 
                key={link.id}
                label={link.label} 
                url={link.url} 
                icon={link.icon}
              />
            ))}
          </div>
        </div>
      </div>
      
      <footer className="mt-auto pt-8 text-center text-xs text-gray-500">
        <p>Created with LinkDance</p>
      </footer>
    </div>
  );
};

export default View;
