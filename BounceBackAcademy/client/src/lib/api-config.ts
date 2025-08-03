// API configuration for different environments

// Determine the base URL for API requests based on the environment
export const getApiBaseUrl = (): string => {
  // Check if we're in a Netlify environment
  const isNetlify = window.location.hostname.includes('netlify.app') || 
                    process.env.NODE_ENV === 'production';
  
  if (isNetlify) {
    // In Netlify, API requests should go to /.netlify/functions/api
    return '/.netlify/functions/api';
  }
  
  // In development, use the relative path
  return '';
};

// Function to construct a full API URL
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  
  // If the endpoint already starts with /api, we need to handle it differently
  // based on whether we're in Netlify or not
  if (endpoint.startsWith('/api')) {
    if (baseUrl) {
      // For Netlify, replace /api with the base URL
      return endpoint.replace('/api', baseUrl);
    }
    // For development, use the endpoint as is
    return endpoint;
  }
  
  // If the endpoint doesn't start with /api, just concatenate
  return `${baseUrl}${endpoint}`;
};

// Function to get the uploads URL
export const getUploadsUrl = (path: string): string => {
  // In Netlify, uploads are served through the API function
  const isNetlify = window.location.hostname.includes('netlify.app') || 
                    process.env.NODE_ENV === 'production';
  
  if (isNetlify) {
    // Make sure the path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `/.netlify/functions/api/uploads${normalizedPath}`;
  }
  
  // In development, use the path as is
  return path;
};