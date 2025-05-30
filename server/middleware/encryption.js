import CryptoJS from 'crypto-js';
import { config } from '../config/config.js';

export const decryptRequest = (req, res, next) => {
  try {
    if (req.body.data) {
      const bytes = CryptoJS.AES.decrypt(req.body.data, config.encryptionKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      req.body = decryptedData;
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid encrypted data' });
  }
};

export const encryptResponse = (req, res, next) => {
  const originalSend = res.json;
  
  res.json = function (data) {
    if (data && !data.error) {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        config.encryptionKey
      ).toString();
      
      return originalSend.call(this, { data: encrypted });
    }
    return originalSend.call(this, data);
  };
  
  next();
};