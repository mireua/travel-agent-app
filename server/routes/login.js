const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../db/conn.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const database = client.db('traveleasy');
    const collection = database.collection('users');

    const user = await collection.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

module.exports = router;