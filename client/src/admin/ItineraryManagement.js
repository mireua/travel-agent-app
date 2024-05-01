import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, TextField, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import CancelIcon from '@mui/icons-material/Cancel';

const ItineraryManagement = () => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedItineraryID, setSelectedItineraryID] = useState(null);

  const handleEmailSubmit = async () => {
    console.log('Email Submitted:', email);
    try {
        const response = await axios.post('http://localhost:5000/api/adminItinerary', {
            email: email 
        });
        const data = response.data;
        console.log(data);
        setItineraries(data);
    } catch (error) {
        console.error('Request Failed:', error.response); 
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = async (event) => {
    setEmail(event.target.value);
  };

  const handleCancelOpen = (itineraryID) => {
    setSelectedItineraryID(itineraryID); 
    setCancelOpen(true);
  };

  const handleCancelClose = () => {
    setCancelOpen(false);
  };

  const handleCancelSubmit = async () => {
    console.log('Cancellation Reason:', cancelReason);
    console.log(selectedItineraryID);
    try {
        await axios.post('http://localhost:5000/api/delete-itinerary', {
            params: {
                itineraryID: selectedItineraryID,
                email: email,
                firstName: localStorage.getItem('firstName'),
                reason: cancelReason,
                adminEmail: localStorage.getItem('email')
            }
        });
        setItineraries(itineraries.filter(item => item._id !== selectedItineraryID));
        setCancelOpen(false);
        setCancelReason('');
    } catch (error) {
        console.error('Failed to cancel itinerary:', error.response);
    }
  };

  const handleReasonChange = (event) => {
    setCancelReason(event.target.value);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff', padding: 3 }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        Itinerary Management Panel
      </Typography>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter User's Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To manage the itinerary, please enter the user's email address below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEmailSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelOpen} onClose={handleCancelClose}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a reason for the cancellation.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Cancellation Reason"
            type="text"
            fullWidth
            value={cancelReason}
            onChange={handleReasonChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>Cancel</Button>
          <Button onClick={handleCancelSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Flights Table */}
      <Typography variant="h5" gutterBottom>
        Flights
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itineraries.filter(item => item.type === 'flight').map((item, index) => (
              <TableRow key={index}>
                <TableCell><FlightIcon /></TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
                <TableCell>{item.depart}</TableCell>
                <TableCell>{item.arrival}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleCancelOpen(item._id)}>
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Hotels Table */}
      <Typography variant="h5" gutterBottom>
        Hotel Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Hotel</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Reservation Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itineraries.filter(item => item.type === 'hotel').map((item, index) => (
              <TableRow key={index}>
                <TableCell><HotelIcon /></TableCell>
                <TableCell>{item.hotel}</TableCell>
                <TableCell>{item.arrival}</TableCell>
                <TableCell>{item.guests}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.reservationName}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleCancelOpen(item._id)}>
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItineraryManagement;