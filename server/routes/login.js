const express = require('express');
const router = express.Router();

// Define the login route handler
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:');
  console.log('Email:', email);
  console.log('Password:', password);

  res.json({ message: 'Login data received.' });
});

module.exports = router;