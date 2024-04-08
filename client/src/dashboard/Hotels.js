import React, { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function HotelSearchForm() {
  const [hotelDetails, setHotelDetails] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  // Sample hotel data
  const hotels = [
    { id: 1, name: "Hotel Sunshine", destination: "Paris", price: "$150/night", rating: 4 },
    { id: 2, name: "Mountain Retreat", destination: "Swiss Alps", price: "$200/night", rating: 5 },
    // Add more hotels as needed
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails({ ...hotelDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Searching for hotels with details:', hotelDetails);
    
    try {
      const response = await axios.post('http://localhost:5000/api/searchHotels', flightDetails);
      //setFlights(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleBookHotel = (hotel) => {
    console.log('Booking hotel:', hotel);
    // Implement your booking logic here
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
                    <InputLabel>Destination</InputLabel>
                    <Select
                      name="destination"
                      value={hotelDetails.destination}
                      label="Destination"
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value="Paris">Paris</MenuItem>
                      <MenuItem value="Swiss Alps">Swiss Alps</MenuItem>
                      <MenuItem value="New York">New York</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    name="checkIn"
                    label="Check-in Date"
                    value={hotelDetails.checkIn}
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
                    name="checkOut"
                    label="Check-out Date"
                    value={hotelDetails.checkOut}
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
                    <TableCell>Name</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotels.map((hotel) => (
                    <TableRow key={hotel.id}>
                      <TableCell>{hotel.name}</TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <LocationOnIcon color="action" />
                        </IconButton>
                        {hotel.destination}
                      </TableCell>
                      <TableCell>{hotel.price}</TableCell>
                      <TableCell>
                        {Array.from({ length: hotel.rating }, (_, index) => (
                          <StarRateIcon key={index} color="secondary" style={{ verticalAlign: 'middle' }} />
                        ))}
                      </TableCell>
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