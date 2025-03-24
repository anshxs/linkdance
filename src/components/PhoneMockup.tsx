
import React from 'react';
import { ProfileData } from '@/utils/storage';

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
      className="social-icon bg-white/70 hover:bg-white/90 text-black"
    >
      <i className={iconClass}></i>
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
      className="mb-3 bg-white/30 hover:bg-white/50 link-card"
    >
      {icon && <i className={`${iconClass} mr-2`}></i>}
      <span>{label}</span>
    </a>
  );
};

interface PhoneMockupProps {
  profile: ProfileData;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ profile }) => {
  return (
    <div className="phone-mockup">
      <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-primary/20 to-primary/5 p-4">
        <div className="flex flex-col items-center mt-8 px-4">
          {profile.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mb-4">
              <img 
                src={profile.photoUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <h1 className="text-xl font-bold text-center mt-2">{profile.name}</h1>
          
          {profile.description && (
            <p className="text-sm text-center mt-2 text-foreground/80 mb-6">
              {profile.description}
            </p>
          )}
          
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
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
            {profile.links.map(link => (
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
    </div>
  );
};

export default PhoneMockup;
