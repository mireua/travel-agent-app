const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn');

router.post('/bookHotel', async (req, res) => {
  const { hotel, arrival, departure, guests, price, cardholderName, cardNumber, expiryDate, cvv, fullName, address, city, zip, country, userEmail } = req.body;
  console.log('call');
  try {
    await connectToMongoDB();
    const database = client.db('traveleasy')
    const collection = database.collection('itinerary');
    await collection.insertOne({ hotel, arrival, departure, guests, price, cardholderName, cardNumber, expiryDate, cvv, billingAddress: { fullName, address, city, zip, country }, type: 'hotel', userEmail });
    res.json({ message: 'Payment successful & hotel booked successfully, redirecting you to the homepage...' });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    await client.close();
  }
});

module.exports = router;
