import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import axios from 'axios';

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

  const handleCancelBooking = async (id) => {
    try {
      console.log('Sending ID: ' + id);
      await axios.post('http://localhost:5000/api/delete-itinerary', {
          itineraryID: id
      });
      alert('You have successfully cancelled your booking!');
      window.location.href = '/dashboard';
  } catch (error) {
      console.error('Failed to cancel itinerary:', error.response);
  }
  };


  return (
    <div style={{ background: 'linear-gradient(to bottom, #b3d9ff, #66ccff)', minHeight: '100vh', padding: '20px 0', fontFamily: 'Dancing Script, cursive' }}>
      <Box maxWidth="1400px" mx="auto" p={4} textAlign="center">
        <Typography variant="h4" gutterBottom style={{ color: '#fff', fontFamily: 'Dancing Script, cursive', fontWeight: 'bold' }}>
          {localStorage.getItem('firstName')}'s Itinerary
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ width: '48%' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#fff', fontFamily: 'Dancing Script, cursive', textDecoration: 'underline' }}>
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
                    <TableCell>Action</TableCell>
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
                        <Button variant="outlined" color="secondary" onClick={() => handleCancelBooking(item._id)}>
                          Cancel Flight
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div style={{ width: '48%' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#fff', fontFamily: 'Dancing Script, cursive', textDecoration: 'underline' }}>
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
                    <TableCell>Action</TableCell>
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
                        <Button variant="outlined" color="secondary" onClick={() => handleCancelBooking(item._id)}>
                          Cancel Hotel Booking
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default MyItinerary;
