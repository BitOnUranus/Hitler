import axios from 'axios';
import CryptoJS from 'crypto-js';

// Use the same key as the backend
const ENCRYPTION_KEY = 'your-secure-encryption-key-32chars!!';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to encrypt data
api.interceptors.request.use((config) => {
  if (config.data) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(config.data),
      ENCRYPTION_KEY
    ).toString();
    
    config.data = { data: encrypted };
  }
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Response interceptor to decrypt data
api.interceptors.response.use((response) => {
  if (response.data.data) {
    const bytes = CryptoJS.AES.decrypt(response.data.data, ENCRYPTION_KEY);
    response.data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return response;
}, (error) => {
  // Handle errors and decrypt error messages if encrypted
  if (error.response?.data?.data) {
    try {
      const bytes = CryptoJS.AES.decrypt(error.response.data.data, ENCRYPTION_KEY);
      error.response.data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      // If decryption fails, use the original error
    }
  }
  return Promise.reject(error);
});

export default api;