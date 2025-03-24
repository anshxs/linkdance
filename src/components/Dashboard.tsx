
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getProfiles, deleteProfile, ProfileData } from '@/utils/storage';
import { Plus, Trash2, Edit, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load profiles from local storage
    const loadedProfiles = getProfiles();
    setProfiles(loadedProfiles);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(id);
      setProfiles(prev => prev.filter(profile => profile.id !== id));
      toast.success('Profile deleted successfully');
    }
  };

  const createNewProfile = () => {
    const newId = `profile-${Date.now()}`;
    navigate(`/edit/${newId}`);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold">Your Link Pages</h1>
          <p className="text-muted-foreground mt-2">Create and manage your link pages</p>
        </div>
        <Button onClick={createNewProfile} className="flex items-center gap-2">
          <Plus size={18} /> Create New
        </Button>
      </div>

      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/30 rounded-lg animate-fade-in">
          <div className="text-center max-w-md p-8">
            <h2 className="text-2xl font-semibold mb-2">No profiles yet</h2>
            <p className="text-muted-foreground mb-8">
              Create your first profile to start sharing your links with the world.
            </p>
            <Button onClick={createNewProfile} className="flex items-center gap-2">
              <Plus size={18} /> Create Your First Page
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <Card key={profile.id} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{profile.name}</CardTitle>
                    <CardDescription>Last updated: {formatDate(profile.updatedAt)}</CardDescription>
                  </div>
                  {profile.photoUrl && (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={profile.photoUrl} 
                        alt={profile.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm line-clamp-2 text-muted-foreground">
                  {profile.description || 'No description'}
                </p>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{profile.links.length}</span> links
                    {profile.socialLinks.length > 0 && (
                      <span> · <span className="font-medium">{profile.socialLinks.length}</span> social platforms</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 border-t">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                  >
                    <Link to={`/edit/${profile.id}`}>
                      <Edit size={16} className="mr-1" /> Edit
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(profile.id)}
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </div>
                
                {profile.publishedUrl && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => window.open(profile.publishedUrl, '_blank')}
                  >
                    <ExternalLink size={16} className="mr-1" /> View
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
