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
    
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
          console.error("Error comparing passwords:", err);
          return;
      }
      
      console.log("Passwords match:", result);
  
      handleComparisonResult(result);
  });

    function handleComparisonResult(result) {
    if (result === true) {
      loginSuccessful();
    } else {
      loginFailed();
    }
  }

    function loginSuccessful(){
      const token = jwt.sign({ email: user.email}, secretKey, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token, role: user.role, firstName: user.firstName });
    }

    function loginFailed(){
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

