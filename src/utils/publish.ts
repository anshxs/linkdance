
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
    // Call the CleanURI API to get a shortened URL
    const response = await fetch('https://cleanuri.com/api/v1/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(longUrl)}`,
    });
    
    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }
    
    const data = await response.json();
    return data.result_url;
  } catch (error) {
    console.error('Error generating short URL:', error);
    throw error; // Let the caller handle the error
  }
};
