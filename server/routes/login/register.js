const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { client, connectToMongoDB } = require('../../db/conn.js');

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password} = req.body;
  try {
    await connectToMongoDB();
    const database = client.db('traveleasy');
    const collection = database.collection('users');
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.log("account already exists u spa");
      res.status(500).json({ message: 'Email already registered.' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await collection.insertOne({ firstName, lastName, email, password: hashedPassword, role: 'user' });
    res.json({ message: 'Registration successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    await client.close();
  }
});

module.exports = router;
