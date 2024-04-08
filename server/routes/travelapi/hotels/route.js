const express = require('express');
const router = express.Router();
const fetchHotel = require('./hotels');

router.post('/searchHotels', async (req, res) => {
  const { city, arrival, departure, guests } = req.body;

  // log the received flight details for debugging
  console.log('Received hotel details:');
  console.log('City:', city);
  console.log('Arrival:', arrival);
  console.log('Departure:', departure);
  console.log('Guests:', guests);

  try {
    const data = await fetchHotel(city, guests, arrival, departure); 
    
    const flightsData = [];

    // limit the number of flights to 4 or less
    const numHotels = Math.min(data.data.hotels.length, 4);

    for (let i = 0; i < numHotels; i++) {
      const hotel = data.data.hotels[i];
      const hotelData = {
        city: hotel.property.name,
        arrival: hotel.property.checkinDate,
        depart: hotel.property.checkoutDate,
        price: '€' + hotel.property.priceBreakdown.value
      };
      flightsData.push(hotelData);
    }
    
    console.log('Flight Information');
    console.log(hotelsData);

    // send the extracted flight information to the front end
    res.json(hotelsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching flight data.");
  }
});

module.exports = router;