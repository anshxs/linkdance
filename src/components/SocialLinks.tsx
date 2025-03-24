
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SocialLink } from '@/utils/storage';
import { 
  Check, Copy, Trash2, Facebook, Twitter, Instagram, 
  Linkedin, Github, MessageCircle, Phone, Youtube, Mail, 
  Plus, X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SocialLinksProps {
  socialLinks: SocialLink[];
  updateSocialLinks: (links: SocialLink[]) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks, updateSocialLinks }) => {
  const [newPlatform, setNewPlatform] = useState<string>('');
  const [newUrl, setNewUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Supported social platforms
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: <Facebook size={20} /> },
    { id: 'twitter', name: 'Twitter', icon: <Twitter size={20} /> },
    { id: 'instagram', name: 'Instagram', icon: <Instagram size={20} /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={20} /> },
    { id: 'github', name: 'GitHub', icon: <Github size={20} /> },
    { id: 'telegram', name: 'Telegram', icon: <MessageCircle size={20} /> },
    { id: 'whatsapp', name: 'WhatsApp', icon: <Phone size={20} /> },
    { id: 'youtube', name: 'YouTube', icon: <Youtube size={20} /> },
    { id: 'email', name: 'Email', icon: <Mail size={20} /> }
  ];
  
  // Get available platforms (not already used)
  const availablePlatforms = platforms.filter(
    platform => !socialLinks.some(link => link.platform === platform.id)
  );
  
  const handleAddSocialLink = () => {
    if (!newPlatform || !newUrl) return;
    
    const updatedLinks = [...socialLinks, { platform: newPlatform, url: newUrl }];
    updateSocialLinks(updatedLinks);
    
    // Reset fields
    setNewPlatform('');
    setNewUrl('');
  };
  
  const handleDeleteSocialLink = (platform: string) => {
    const updatedLinks = socialLinks.filter(link => link.platform !== platform);
    updateSocialLinks(updatedLinks);
  };
  
  const handleUpdateUrl = (platform: string, newUrl: string) => {
    const updatedLinks = socialLinks.map(link => 
      link.platform === platform ? { ...link, url: newUrl } : link
    );
    updateSocialLinks(updatedLinks);
  };
  
  const getPlatformName = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.name : platformId;
  };
  
  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.icon : <Plus size={20} />;
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Social Links</h3>
      
      {socialLinks.length > 0 ? (
        <div className="space-y-3">
          {socialLinks.map((link) => (
            <div 
              key={link.platform} 
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-background">
                {getPlatformIcon(link.platform)}
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-medium">{getPlatformName(link.platform)}</div>
                <Input
                  value={link.url}
                  onChange={(e) => handleUpdateUrl(link.platform, e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(link.url)}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteSocialLink(link.platform)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-sm p-4 bg-secondary/50 rounded-lg text-center">
          No social links added yet. Add your social media profiles below.
        </div>
      )}
      
      {availablePlatforms.length > 0 && (
        <div className="pt-4 border-t">
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              value={newPlatform}
              onValueChange={setNewPlatform}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                {availablePlatforms.map(platform => (
                  <SelectItem key={platform.id} value={platform.id}>
                    <div className="flex items-center gap-2">
                      {platform.icon}
                      <span>{platform.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input
              placeholder="Enter URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1"
            />
            
            <Button 
              onClick={handleAddSocialLink} 
              disabled={!newPlatform || !newUrl}
              className="shrink-0"
            >
              <Plus size={18} className="mr-2" /> Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
