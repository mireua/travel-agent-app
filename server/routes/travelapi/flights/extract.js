const fetchData = require('./flights'); // Assuming fetchData module is properly defined

// Function to extract relevant information from fetched data
const extractFlightInfo = (data) => {
  console.log('Data:', data);
  const flightOffers = data.flightOffers;
  console.log('Flight Offers:', flightOffers); // Log flightOffers array
  if (!flightOffers || flightOffers.length === 0) {
    console.error('No flight offers found in the data');
    return [];
  }

  const extractedInfo = flightOffers.map((flightOffer) => {
    console.log('Flight Offer:', flightOffer); // Log each flightOffer
    const { segments, priceBreakdown } = flightOffer;
    if (!segments || !priceBreakdown) {
      console.error('Missing segments or priceBreakdown in a flight offer:', flightOffer);
      return null;
    }

    const segment = segments && segments.length > 0 ? segments[0] : null; // Considering only the first segment for simplicity
    const { departureAirport, arrivalAirport, departureTime, arrivalTime } = segment;
    if (!departureAirport || !arrivalAirport || !departureTime || !arrivalTime) {
      console.error('Incomplete segment data in a flight offer:', flightOffer);
      return null;
    }

    const price = priceBreakdown.total.units + '.' + priceBreakdown.total.nanos; // Combine price units and nanos
    const airline = segment.carriersData[0]?.name; // Considering only the first carrier for simplicity

    if (!airline) {
      console.error('Missing carrier data in a flight offer:', flightOffer);
      return null;
    }

    return {
      from: departureAirport.cityName,
      to: arrivalAirport.cityName,
      dateDeparture: departureTime,
      dateArrival: arrivalTime,
      price: parseFloat(price), // Convert price to float
      airline: airline
    };
  });

  // Filter out any null values (due to incomplete data)
  return extractedInfo.filter(info => info !== null);
};

module.exports = extractFlightInfo;