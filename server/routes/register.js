const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../db/conn.js'); 

// Define the register route handler
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, country } = req.body;
  try {
    await connectToMongoDB();

    // Specify the database and collection
    const database = client.db('traveleasy'); 
    const collection = database.collection('users'); 

    // Insert the user into the MongoDB collection
    await collection.insertOne({ firstName, lastName, email, password, country });

    // Send the final response after MongoDB operation is completed
    console.log(`Registration for ${email} complete!`);
    res.json({ message: 'Registration successful.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    // Close the MongoDB Atlas connection
    await client.close();
  }
});

module.exports = router;