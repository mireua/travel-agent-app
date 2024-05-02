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
      console.log("Account already exists.");
      return res.status(400).json({ message: 'Email already registered.' }); // Changed status code to 400 for duplicate entry
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await collection.insertOne({ firstName, lastName, email, password: hashedPassword, role: 'user' });
    res.status(201).json({ message: 'Registration successful.' }); // Changed status code to 201 for resource creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    await client.close();
  }
});

module.exports = router;
