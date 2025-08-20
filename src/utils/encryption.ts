// Simple encryption utilities for API keys
// In production, use a more robust encryption library

const ENCRYPTION_KEY = 'prompt-enhancer-key-2025'; // In production, use environment variable

export const encryptApiKey = (apiKey: string): string => {
  if (!apiKey) return '';
  
  // Simple XOR encryption for demo purposes
  // In production, use proper encryption like AES
  let encrypted = '';
  for (let i = 0; i < apiKey.length; i++) {
    const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    const apiChar = apiKey.charCodeAt(i);
    encrypted += String.fromCharCode(apiChar ^ keyChar);
  }
  
  return btoa(encrypted); // Base64 encode
};

export const decryptApiKey = (encryptedKey: string): string => {
  if (!encryptedKey) return '';
  
  try {
    const encrypted = atob(encryptedKey); // Base64 decode
    let decrypted = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      const encChar = encrypted.charCodeAt(i);
      decrypted += String.fromCharCode(encChar ^ keyChar);
    }
    
    return decrypted;
  } catch (error) {
    console.error('Failed to decrypt API key:', error);
    return '';
  }
};

export const maskApiKey = (apiKey: string): string => {
  if (!apiKey || apiKey.length < 8) return '••••••••';
  
  const start = apiKey.substring(0, 4);
  const end = apiKey.substring(apiKey.length - 4);
  const middle = '•'.repeat(Math.max(8, apiKey.length - 8));
  
  return `${start}${middle}${end}`;
};

export const validateApiKey = (apiKey: string): string | null => {
  if (!apiKey) return 'API key is required';
  if (apiKey.length < 10) return 'API key must be at least 10 characters long';
  if (!/^[a-zA-Z0-9\-_]+$/.test(apiKey)) return 'API key contains invalid characters';
  return null;
};

export const validateUrl = (url: string): string | null => {
  if (!url) return 'Base URL is required';
  
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return 'URL must use HTTP or HTTPS protocol';
    }
    return null;
  } catch (error) {
    return 'Please enter a valid URL';
  }
};