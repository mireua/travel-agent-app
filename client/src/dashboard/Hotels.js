import React, { useState } from 'react';
import axios from 'axios';
import cities from './data/cities.json';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function HotelSearchForm() {
  const [hotelDetails, setHotelDetails] = useState({
    city: '',
    arrival: '',
    departure: '',
    guests: 1,
  });

  const [hotels, setHotels] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails({ ...hotelDetails, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Searching for hotels with details:', hotelDetails);

    try {
      const response = await axios.post('http://localhost:5000/api/searchHotels', hotelDetails);
      setHotels(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleBookHotel = (hotel) => {
    console.log('Booking hotel:', hotel);
  };

  return (
    <Container component="main">
      <Paper elevation={3} sx={{ my: 4, p: 3, borderRadius: 2, bgcolor: 'background.paper', boxShadow: '1px 1px 12px rgba(0,0,0,0.2)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Search Hotels
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                      name="city"
                      value={hotelDetails.city}
                      label="City"
                      onChange={handleInputChange}
                      required
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.city} value={city.city}>
                          {city.city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    name="arrival"
                    label="Check-in Date"
                    value={hotelDetails.arrival}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    name="departure"
                    label="Check-out Date"
                    value={hotelDetails.departure}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    name="guests"
                    label="Guests"
                    value={hotelDetails.guests}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Search Hotels
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Available Hotels
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>Check-in</TableCell>
                    <TableCell>Check-out</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotels.map((hotel) => (
                    <TableRow key={hotel.city}>
                      <TableCell>{hotel.city}</TableCell>
                      <TableCell>{hotel.arrival}</TableCell>
                      <TableCell>{hotel.depart}</TableCell>
                      <TableCell>{hotel.price}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<BookOnlineIcon />}
                          onClick={() => handleBookHotel(hotel)}
                        >
                          Book
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default HotelSearchForm;