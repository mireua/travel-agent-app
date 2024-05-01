import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button} from '@mui/material';

const MyItinerary = () => {
  const [itineraryData, setItineraryData] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem('email');

    const fetchItineraryData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/itinerary?email=${userEmail}`, { method: 'POST' });
        if (!response.ok) {
          throw new Error('Failed to fetch itinerary data');
        }
        const data = await response.json();
        setItineraryData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userEmail) {
      fetchItineraryData();
    }
  }, []);

  const handleCancelFlight = () => {
    // Handle cancel flight logic
  };

  const handleCancelHotel = () => {
    // Handle cancel hotel logic
  };

  return (
    <Box maxWidth="800px" mx="auto" p={4} textAlign="center">
      <Typography variant="h4" gutterBottom>
        My Itinerary
      </Typography>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Flights
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Departure</TableCell>
                <TableCell>Arrival</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Airline</TableCell>
                <TableCell>Action</TableCell> {/* Cancel button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {itineraryData.filter(item => item.type === 'flight').map(item => (
                <TableRow key={item._id}>
                  <TableCell>{item.from}</TableCell>
                  <TableCell>{item.to}</TableCell>
                  <TableCell>{item.depart}</TableCell>
                  <TableCell>{item.arrival}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell><img src={item.image} alt="" style={{ width: 50, height: 50, marginRight: 10 }} /></TableCell>
                  <TableCell>
                    <Button variant="outlined" color="secondary" onClick={handleCancelFlight}>
                      Cancel Flight
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Typography variant="h5" gutterBottom>
        Hotel Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hotel</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Reservation Name</TableCell>
              <TableCell>Action</TableCell> {/* Cancel button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {itineraryData.filter(item => item.type === 'hotel').map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.hotel}</TableCell>
                <TableCell>{item.arrival}</TableCell>
                <TableCell>{item.guests}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.cardholderName}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={handleCancelHotel}>
                    Cancel Hotel Booking
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyItinerary;
