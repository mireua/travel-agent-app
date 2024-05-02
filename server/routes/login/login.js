const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const secretKey = "tudublin";

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectToMongoDB();

    const database = client.db('traveleasy');
    const collection = database.collection('users');

    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result === true) {
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token, role: user.role, firstName: user.firstName });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

module.exports = router;
