const express = require('express');
const router = express.Router();

// Define the login route handler
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password, country } = req.body;
  console.log('Received registration data:');
  console.log('First Name:', firstName);
  console.log('Last Name:', lastName)
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Country:', country);

  res.json({ message: 'Registration data recieved.' });
});

module.exports = router;