const axios = require('axios');
const fetchDestination = require('./destination');

const fetchHotel = async (destination, guests, arrival, departure) => {
  const apiUrl = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels';

  const headers = {
    'X-RapidAPI-Key': '07afab7a58msh6eb7afde1dd850bp158afajsnca967d8cf4d8',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
  };

  try {
    const dest_id = await fetchDestination(destination); // Await the result of fetchDestination
    const response = await axios.get(apiUrl, {
      params: {
        dest_id: dest_id,
        search_type: 'CITY',
        arrival_date: arrival,
        departure_date: departure,
        adults: guests,
        page_number: '1',
        languagecode: 'en-us',
        currency_code: 'EUR'
      },
      headers: headers
    });

    // Return the fetched flights data
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = fetchHotel;