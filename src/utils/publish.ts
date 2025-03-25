
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
    // Using TinyURL API which is more lenient with CORS
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // TinyURL returns the shortened URL directly as text
    const shortUrl = await response.text();
    return shortUrl || longUrl;
  } catch (error) {
    console.error('Error generating short URL:', error);
    // Return the long URL as fallback
    return longUrl;
  }
};
