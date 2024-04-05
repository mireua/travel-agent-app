const express = require('express');
const router = express.Router();
const fetchData = require('./flights'); // Assuming this file itself
const extractFlightInfo = require('./extract'); // Assuming extractFlightInfo module is properly defined

router.post('/searchFlights', async (req, res) => {
  const { from, to, departDate, returnDate } = req.body;

  // Log the received flight details for debugging
  console.log('Received flight details:');
  console.log('From:', from);
  console.log('To:', to);
  console.log('Departure Date:', departDate);
  console.log('Return Date:', returnDate);

  try {
    const data = await fetchData(from, to, departDate, returnDate); // Fetch data from the API
    console.log('Data received from API:', data); // Log the data received from the API
    const flightInfo = extractFlightInfo(data); // Extract flight information

    // Log the extracted flight information to the backend console
    console.log('Flight Information:', flightInfo);
    
    // Send the extracted flight information to the front end
    res.json(flightInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching flight data.");
  }
});

module.exports = router;