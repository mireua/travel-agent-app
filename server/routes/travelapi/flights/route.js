const express = require('express');
const router = express.Router();
const fetchData = require('./flights'); // Assuming this file itself

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
    
    const flightsData = [];

    // Limit the number of flights to 4 or less
    const numFlights = Math.min(data.data.flightOffers.length, 4);

    for (let i = 0; i < numFlights; i++) {
      const flight = data.data.flightOffers[i];
      const flightData = {
        from: flight.segments[0].departureAirport.name,
        to: flight.segments[0].arrivalAirport.name,
        depart: new Date(flight.segments[0].departureTime).toLocaleString(),
        arrival: new Date(flight.segments[0].arrivalTime).toLocaleString(),
        airline: flight.segments[0].legs[0].carriersData[0].name,
        price: '€' + flight.priceBreakdown.total.units
      };
      flightsData.push(flightData);
    }
    
    console.log('Flight Information');
    console.log(flightsData); // Log all flight data

    // Send the extracted flight information to the front end
    res.json(flightsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching flight data.");
  }
});

module.exports = router;