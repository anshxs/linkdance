
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
  const viewUrl = `${baseUrl}/view?data=${encoded}`;
  
  try {
    // For simplicity, we're not actually calling an API here
    // In a real implementation, you would send to a URL shortening service
    return viewUrl;
  } catch (error) {
    console.error('Error generating short URL:', error);
    return viewUrl;
  }
};
