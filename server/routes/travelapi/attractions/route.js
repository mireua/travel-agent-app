const express = require('express');
const router = express.Router();
const fetchAttraction = require('./attractions');

router.post('/searchAttractions', async (req, res) => {
  const {city} = req.body;

  // log the received hotel details for debugging
  console.log('Received attraction city: ' + city);

  try {
    const data = await fetchAttraction(city); 
    
    const attractionDatas = [];

    // limit the number of hotels to 4 or less
    const numAttractions = Math.min(data.data.products.length, 4);

    for (let i = 0; i < numAttractions; i++) {
      const attraction = data.data.products[i];
      const attractionData = {
        city: attraction.title,
        type: attraction.taxonomySlug,
      };
      attractionDatas.push(attractionData);
    }
    
    console.log('Hotel Information');
    console.log(attractionDatas);

    // send the extracted hotel information to the front end
    res.json(attractionDatas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching hotel data.");
  }
});

module.exports = router;