const axios = require('axios');

const fetchData = async (fromId, toId, departDate, returnDate) => {
  const apiUrl = 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights';

  const headers = {
    'X-RapidAPI-Key': '07afab7a58msh6eb7afde1dd850bp158afajsnca967d8cf4d8',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
  };

  try {
    const response = await axios.get(apiUrl, {
      params: {
        fromId,
        toId,
        departDate,
        returnDate,
        pageNo: '1',
        adults: '1',
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

module.exports = fetchData;