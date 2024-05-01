import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
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
  Box // Import Box component from MUI
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import backgroundImage from './img/hotels.jpg'; // Import your background image

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

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '16px' // Add padding to the Box component
      }}
    >
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
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                            },
                          },
                        }}
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
                      inputProps={{ min: today }} // Disable past dates
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
                      inputProps={{ min: today }} // Disable past dates
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
                      <TableCell><LocationOnIcon /> City</TableCell>
                      <TableCell><EventIcon /> Check-in</TableCell>
                      <TableCell><EventIcon /> Check-out</TableCell>
                      <TableCell><AttachMoneyIcon /> Price</TableCell>
                      <TableCell></TableCell>
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
                          <Link to={`/hotelbook?city=${hotel.city}&arrival=${hotel.arrival}&departure=${hotel.depart}&guests=${hotelDetails.guests}&price=${hotel.price}`}>
                            <Button variant="contained">
                              Book
                            </Button>
                          </Link>
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
    </Box>
  );
}

export default HotelSearchForm;
