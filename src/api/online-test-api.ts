import axios from 'axios';
import { env } from '@/env';

/**
 * Axios instance for Online Test API
 * Server-side only since we're using ISR
 */
export const onlineTestApi = axios.create({
  baseURL: env.ONLINE_TEST_APPLICATION_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth or other headers if needed
onlineTestApi.interceptors.request.use(
  (config) => {
    // Add any common headers or auth tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
onlineTestApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios here
    console.error('Online Test API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
