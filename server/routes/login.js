const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../db/conn.js'); 

// Define the login route handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('DEBUG: Received login data:');
  console.log('DEBUG: Email:', email);
  console.log('DEBUG: Password:', password);

  try {
    await connectToMongoDB(); // Ensure you use 'await' here
    const database = client.db('traveleasy');
    const collection = database.collection('users'); 

    const user = await collection.findOne({ email, password });

    if (user) {
      console.log('User found. Logging in...');
      res.json({ message: 'Login successful.' });
    } else {
      console.log('User not found. Invalid credentials.');
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    await client.close();
  }
});

module.exports = router;