
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  LinkItem as LinkItemType, 
  ProfileData, 
  getProfileById, 
  saveProfile, 
  createDemoProfile 
} from '@/utils/storage';
import { generatePublishUrl } from '@/utils/publish';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, Save, Link as LinkIcon, Globe, Plus, Wand2, Copy, ExternalLink, Eye
} from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import LinkItem from './LinkItem';
import SocialLinks from './SocialLinks';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import AppHeader from './AppHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [profile, setProfile] = useState<ProfileData>({
    id: id || '',
    name: '',
    description: '',
    photoUrl: '',
    links: [],
    socialLinks: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [showUrlPopover, setShowUrlPopover] = useState(false);

  useEffect(() => {
    if (id) {
      const existingProfile = getProfileById(id);
      if (existingProfile) {
        setProfile(existingProfile);
      }
    }
  }, [id]);

  const debouncedSave = useCallback(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    const timer = setTimeout(() => {
      saveProfile(profile);
      toast.success('Changes auto-saved');
    }, 800);
    
    setAutoSaveTimer(timer);
  }, [profile, autoSaveTimer]);

  useEffect(() => {
    if (profile.name || profile.links.length > 0) {
      debouncedSave();
    }
    
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [profile, debouncedSave, autoSaveTimer]);

  const handleProfileChange = (key: keyof ProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleAddLink = () => {
    const newLink: LinkItemType = {
      id: uuidv4(),
      label: '',
      url: '',
      icon: ''
    };
    
    setProfile(prev => ({
      ...prev,
      links: [...prev.links, newLink]
    }));
  };

  const handleUpdateLink = (id: string, updates: Partial<LinkItemType>) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(link => 
        link.id === id ? { ...link, ...updates } : link
      )
    }));
  };

  const handleDeleteLink = (id: string) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== id)
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(profile.links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setProfile(prev => ({ ...prev, links: items }));
  };

  const handleUpdateSocialLinks = (links: any[]) => {
    setProfile(prev => ({ ...prev, socialLinks: links }));
  };

  const handleLoadDemo = () => {
    const demoProfile = createDemoProfile();
    demoProfile.id = profile.id;
    setProfile(demoProfile);
    toast.success('Demo data loaded');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard');
    setShowUrlPopover(false);
  };

  const handlePublish = async () => {
    if (!profile.name) {
      toast.error('Please add a name before publishing');
      return;
    }
    
    try {
      setIsPublishing(true);
      const publishedUrl = await generatePublishUrl(profile);
      
      setProfile(prev => ({ 
        ...prev, 
        publishedUrl 
      }));
      
      saveProfile({
        ...profile,
        publishedUrl
      });
      
      setShowUrlPopover(true);
      toast.success('Your page has been published!');
    } catch (error) {
      console.error('Error publishing:', error);
      toast.error('Failed to publish. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveAndExit = () => {
    saveProfile(profile);
    navigate('/dashboard');
  };

  const PreviewContent = () => (
    <div className="p-4 h-full overflow-auto flex flex-col items-center justify-start">
      <h3 className="text-xl font-semibold mb-4">Preview</h3>
      <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md flex flex-col items-center">
        {profile.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 mb-4">
            <img 
              src={profile.photoUrl} 
              alt={profile.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h2 className="text-xl font-bold mb-2">{profile.name || 'Your Name'}</h2>
        
        {profile.description && (
          <p className="text-gray-600 text-center mb-4 text-sm">
            {profile.description}
          </p>
        )}
        
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {profile.socialLinks.map((social, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <i className={`ri-${social.platform}-fill text-sm`}></i>
              </div>
            ))}
          </div>
        )}
        
        <div className="w-full space-y-2">
          {profile.links.map((link, index) => (
            <div 
              key={link.id}
              className="p-2 bg-gray-50 rounded-md text-sm flex items-center"
            >
              {link.icon && <i className={`ri-${link.icon} mr-2`}></i>}
              <span>{link.label || 'Link Label'}</span>
            </div>
          ))}
          
          {profile.links.length === 0 && (
            <div className="text-center text-gray-400 py-2">
              Add links to see them here
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <header className="border-b sticky top-14 bg-background/80 backdrop-blur-sm z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSaveAndExit}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          
          <div className="flex items-center gap-2">            
            <Button 
              variant="outline" 
              onClick={handleLoadDemo}
              className="gap-1"
            >
              <Wand2 size={16} /> Demo Data
            </Button>
            
            {profile.publishedUrl ? (
              <Popover open={showUrlPopover} onOpenChange={setShowUrlPopover}>
                <PopoverTrigger asChild>
                  <Button className="gap-1">
                    <Copy size={16} /> Copy Link
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h3 className="font-medium">Your published URL</h3>
                    <div className="flex items-center gap-2">
                      <Input value={profile.publishedUrl} readOnly />
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => copyToClipboard(profile.publishedUrl || '')}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                    <div className="flex justify-between pt-2">
                      <a
                        href={profile.publishedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary flex items-center gap-1"
                      >
                        <ExternalLink size={12} /> Open in new tab
                      </a>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0"
                        onClick={() => setShowUrlPopover(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="gap-1"
              >
                <Globe size={16} /> 
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {isMobile ? (
        <main className="container px-4 py-8 relative">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    placeholder="Your name or title"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">About</label>
                  <Textarea 
                    value={profile.description}
                    onChange={(e) => handleProfileChange('description', e.target.value)}
                    placeholder="Write a short bio or description"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Photo URL</label>
                  <Input 
                    value={profile.photoUrl}
                    onChange={(e) => handleProfileChange('photoUrl', e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Links</h2>
              <p className="text-sm text-muted-foreground">Add and arrange your links. Drag to reorder.</p>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="links">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {profile.links.map((link, index) => (
                        <Draggable key={link.id} draggableId={link.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <LinkItem
                                link={link}
                                onUpdate={handleUpdateLink}
                                onDelete={handleDeleteLink}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={handleAddLink}
              >
                <Plus size={18} className="mr-2" /> Add Link
              </Button>
            </div>
            
            <SocialLinks 
              socialLinks={profile.socialLinks}
              updateSocialLinks={handleUpdateSocialLinks}
            />
          </div>
          
          {/* Floating preview button for mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
                size="icon"
              >
                <Eye size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
              <PreviewContent />
            </SheetContent>
          </Sheet>
        </main>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[calc(100vh-8rem)]"
        >
          <ResizablePanel defaultSize={66} minSize={40}>
            <main className="container px-4 py-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input 
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder="Your name or title"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">About</label>
                      <Textarea 
                        value={profile.description}
                        onChange={(e) => handleProfileChange('description', e.target.value)}
                        placeholder="Write a short bio or description"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Photo URL</label>
                      <Input 
                        value={profile.photoUrl}
                        onChange={(e) => handleProfileChange('photoUrl', e.target.value)}
                        placeholder="https://example.com/your-photo.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Your Links</h2>
                  <p className="text-sm text-muted-foreground">Add and arrange your links. Drag to reorder.</p>
                  
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="links">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-3"
                        >
                          {profile.links.map((link, index) => (
                            <Draggable key={link.id} draggableId={link.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <LinkItem
                                    link={link}
                                    onUpdate={handleUpdateLink}
                                    onDelete={handleDeleteLink}
                                    isDragging={snapshot.isDragging}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={handleAddLink}
                  >
                    <Plus size={18} className="mr-2" /> Add Link
                  </Button>
                </div>
                
                <SocialLinks 
                  socialLinks={profile.socialLinks}
                  updateSocialLinks={handleUpdateSocialLinks}
                />
              </div>
            </main>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={34} minSize={25}>
            <PreviewContent />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

export default Editor;
