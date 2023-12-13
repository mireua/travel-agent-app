const axios = require('axios');

const fetchData = async () => {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
    params: {
      fromId: 'DUB.AIRPORT',
      toId: 'LHR.AIRPORT',
      departDate: '2023-12-15',
      returnDate: '2024-01-01',
      pageNo: '1',
      adults: '1',
      currency_code: 'EUR'
    },
    headers: {
      'X-RapidAPI-Key': '07afab7a58msh6eb7afde1dd850bp158afajsnca967d8cf4d8',
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
  };
  

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = fetchData;