
import { ProfileData } from './storage';

// Encode profile data to Base64
export const encodeProfileData = (profile: ProfileData): string => {
  const profileCopy = { ...profile };
  // Don't encode the actual image, just leave the URL
  const jsonString = JSON.stringify(profileCopy);
  return btoa(jsonString);
};

// Decode profile data from Base64
export const decodeProfileData = (encodedData: string): ProfileData | null => {
  try {
    const jsonString = atob(encodedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding profile data:', error);
    return null;
  }
};

// Generate a publish URL for the profile
export const generatePublishUrl = async (profile: ProfileData): Promise<string> => {
  const encoded = encodeProfileData(profile);
  const baseUrl = window.location.origin;
  const longUrl = `${baseUrl}/view?data=${encoded}`;
  
  try {
    // Using no-cors mode to bypass CORS restriction
    const response = await fetch('https://cleanuri.com/api/v1/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(longUrl)}`,
      mode: 'no-cors'
    });
    
    // Since no-cors mode returns an opaque response that can't be read,
    // we'll just return the long URL for now
    // In a production app, this would need to be handled by a backend proxy
    return longUrl;
  } catch (error) {
    console.error('Error generating short URL:', error);
    // Return the long URL as fallback
    return longUrl;
  }
};
