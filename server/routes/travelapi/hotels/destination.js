const axios = require('axios');

const fetchDestination = async (destination) => {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
    params: {
      query: destination
    },
    headers: {
      'X-RapidAPI-Key': '07afab7a58msh6eb7afde1dd850bp158afajsnca967d8cf4d8',
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const dest = response.data[0].city_ufi;
    console.log('City UFI: ' + dest);
    return dest;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = fetchDestination;