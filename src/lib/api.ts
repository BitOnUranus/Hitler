import axios from 'axios';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'your-encryption-key'; // In production, this should be loaded from environment variables

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
});

export default api;