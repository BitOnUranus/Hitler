import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import db from '../config/database.js';

export const signup = (req, res) => {
  const { email, password, firstName, lastName, organization } = req.body;

  // Hash password with salt
  bcrypt.hash(password, config.saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const sql = `
      INSERT INTO users (email, password, firstName, lastName, organization)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [email, hash, firstName, lastName, organization], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Error creating user' });
      }

      const token = jwt.sign(
        { 
          id: this.lastID,
          email,
          firstName,
          lastName,
          role: 'customer'
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

      res.status(201).json({
        token,
        user: {
          id: this.lastID,
          email,
          firstName,
          lastName,
          role: 'customer',
          organization
        }
      });
    });
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error finding user' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error verifying password' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          organization: user.organization
        }
      });
    });
  });
};