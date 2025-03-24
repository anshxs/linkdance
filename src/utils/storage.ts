
// Types
export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProfileData {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  links: LinkItem[];
  socialLinks: SocialLink[];
  createdAt: number;
  updatedAt: number;
  publishedUrl?: string;
}

const STORAGE_KEY = 'linkdance-profiles';

// Get all profiles from local storage
export const getProfiles = (): ProfileData[] => {
  try {
    const profilesJson = localStorage.getItem(STORAGE_KEY);
    return profilesJson ? JSON.parse(profilesJson) : [];
  } catch (error) {
    console.error('Error getting profiles from storage:', error);
    return [];
  }
};

// Get a specific profile by ID
export const getProfileById = (id: string): ProfileData | undefined => {
  const profiles = getProfiles();
  return profiles.find(profile => profile.id === id);
};

// Save a profile to local storage
export const saveProfile = (profile: ProfileData): void => {
  try {
    const profiles = getProfiles();
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    
    if (existingIndex >= 0) {
      profiles[existingIndex] = { ...profile, updatedAt: Date.now() };
    } else {
      profiles.push({ ...profile, createdAt: Date.now(), updatedAt: Date.now() });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch (error) {
    console.error('Error saving profile to storage:', error);
  }
};

// Delete a profile from local storage
export const deleteProfile = (id: string): void => {
  try {
    const profiles = getProfiles();
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfiles));
  } catch (error) {
    console.error('Error deleting profile from storage:', error);
  }
};

// Create a demo profile
export const createDemoProfile = (): ProfileData => {
  const demoProfile: ProfileData = {
    id: `demo-${Date.now()}`,
    name: 'Jane Doe',
    description: 'UI/UX Designer & Front-end Developer passionate about creating beautiful, functional interfaces.',
    photoUrl: 'https://i.pravatar.cc/300',
    links: [
      {
        id: '1',
        label: 'My Portfolio',
        url: 'https://example.com/portfolio',
        icon: 'briefcase'
      },
      {
        id: '2',
        label: 'Latest Project',
        url: 'https://example.com/project',
        icon: 'rocket'
      },
      {
        id: '3',
        label: 'Design Blog',
        url: 'https://example.com/blog',
        icon: 'feather'
      }
    ],
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/janedoe' },
      { platform: 'instagram', url: 'https://instagram.com/janedoe' },
      { platform: 'github', url: 'https://github.com/janedoe' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/janedoe' }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  return demoProfile;
};
