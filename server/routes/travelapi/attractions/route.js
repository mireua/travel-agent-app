const express = require('express');
const router = express.Router();
const fetchHotel = require('./hotels');

router.post('/searchAttraction', async (req, res) => {
  const { city, arrival, departure, guests } = req.body;

  // log the received hotel details for debugging
  console.log('Received hotel details:');
  console.log('City:', city);
  console.log('Arrival:', arrival);
  console.log('Departure:', departure);
  console.log('Guests:', guests);

  try {
    const data = await fetchHotel(city, guests, arrival, departure); 
    
    const hotelsData = [];

    // limit the number of hotels to 4 or less
    const numHotels = Math.min(data.data.hotels.length, 4);

    for (let i = 0; i < numHotels; i++) {
      const hotel = data.data.hotels[i];
      // Convert the price to an integer
      const price = parseInt(hotel.property.priceBreakdown.grossPrice.value);
      const hotelData = {
        city: hotel.property.name,
        arrival: hotel.property.checkinDate,
        depart: hotel.property.checkoutDate,
        price: '€'+ price
      };
      hotelsData.push(hotelData);
    }
    
    console.log('Hotel Information');
    console.log(hotelsData);

    // send the extracted hotel information to the front end
    res.json(hotelsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching hotel data.");
  }
});

module.exports = router;