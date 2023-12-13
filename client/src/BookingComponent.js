import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingComponent = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/travelapi');

        if (
          response.data &&
          response.data.data &&
          response.data.data.flightOffers &&
          response.data.data.flightOffers.length > 0
        ) {
          const firstFlightOffer = response.data.data.flightOffers[0];

          if (
            firstFlightOffer.segments &&
            firstFlightOffer.segments.length > 0
          ) {
            const firstSegment = firstFlightOffer.segments[0];
            const carrierData =
              firstSegment.legs[0].carriersData[0].name;
            const total =
              firstFlightOffer.priceBreakdown.total.units;

            var dateObj = new Date(total * 1000);
            var hours = dateObj.getUTCHours();
            var minutes = dateObj.getUTCMinutes();
            var seconds = dateObj.getSeconds();

            var timeString = hours.toString().padStart(2, '0')
                + ':' + minutes.toString().padStart(2, '0')
                + ':' + seconds.toString().padStart(2, '0');

            onDataFetched({
              departureCity: firstSegment.departureAirport.cityName,
              arrivalCity: firstSegment.arrivalAirport.cityName,
              carrierName: carrierData,
              totalTime: timeString,
              priceUnits: total,
            });
          } else {
            console.error("Segments data is missing or empty");
          }
        } else {
          console.error("Flight offers data is missing or empty");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // No dependency array, so this useEffect runs only once when the component mounts

  return <div></div>;
};

export default BookingComponent;