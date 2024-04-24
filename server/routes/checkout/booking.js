const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { client, connectToMongoDB } = require('../../db/conn');

router.post('/bookFlight', async (req, res) => {
  const { from, to, depart, arrival, price, airline, image, cardholderName, cardNumber, expiryDate, cvv, fullName, address, city, zip, country, userEmail } = req.body; // Added userEmail
  console.log('call');
  try {
    await connectToMongoDB();
    const database = client.db('traveleasy')
    const collection = database.collection('itinerary');
    await collection.insertOne({ from, to, depart, arrival, price, airline, image, cardholderName, cardNumber, expiryDate, cvv, billingAddress: { fullName, address, city, zip, country }, type: 'flight', userEmail }); // Included userEmail in the inserted document
    res.json({ message: 'Payment successful & flight booked successfully, redirecting you to the homepage...' });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    await client.close();
  }
});

module.exports = router;
