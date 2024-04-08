const axios = require('axios');

const fetchAttractions = async (city) => {
  const apiUrl = 'https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation';

  try {
    const response = await axios.get(apiUrl, {
        params: {
            query: city,
            languagecode: 'en-us'
          },
          headers: {
            'X-RapidAPI-Key': '07afab7a58msh6eb7afde1dd850bp158afajsnca967d8cf4d8',
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
          }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = fetchAttractions;