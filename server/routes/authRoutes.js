import express from 'express';
import { signup, signin } from '../controllers/authController.js';
import { decryptRequest, encryptResponse } from '../middleware/encryption.js';
import rateLimit from 'express-rate-limit';
import { config } from '../config/config.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: { message: 'Too many requests, please try again later.' }
});

router.post('/signup', authLimiter, decryptRequest, encryptResponse, signup);
router.post('/signin', authLimiter, decryptRequest, encryptResponse, signin);

export default router;