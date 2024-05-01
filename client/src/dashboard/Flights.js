import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
  CssBaseline,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import cities from './data/cities.json';  // Ensure you have this file with city data
import backgroundImage from './img/flights.jpg'; // Import your background image

function FlightSearchForm() {
  const [flightDetails, setFlightDetails] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
  });

  const [flights, setFlights] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearching(true);

    try {
      const response = await axios.post('http://localhost:5000/api/searchFlights', flightDetails);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setSearching(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: '2.5rem',
            color: '#ffffff',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`, // Set background image here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFF',
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Typography component="h1" variant="h2" align="center" style={{ fontFamily: 'Dancing Script, cursive' }} sx={{ paddingBottom: 5 }}>
            Hey {localStorage.getItem('firstName')}, where do you wanna go?
          </Typography>
          <Grid container spacing={4} justifyContent="space-evenly">
            <Grid item xs={12} lg={5}>
              <Card raised sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}>
                <CardContent>
                  <Typography component="h2" variant="h6">
                    Search Flights
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="from-label">From</InputLabel>
                          <Select
                            labelId="from-label"
                            name="from"
                            value={flightDetails.from}
                            onChange={handleInputChange}
                            required
                          >
                            {cities.map(city => (
                              <MenuItem key={city.airport} value={city.airport}>
                                {city.city}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="to-label">To</InputLabel>
                          <Select
                            labelId="to-label"
                            name="to"
                            value={flightDetails.to}
                            onChange={handleInputChange}
                            required
                          >
                            {cities.map(city => (
                              <MenuItem key={city.airport} value={city.airport}>
                                {city.city}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          name="departDate"
                          label="Departure Date"
                          value={flightDetails.departDate}
                          onChange={handleInputChange}
                          required
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ min: today }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          name="returnDate"
                          label="Return Date"
                          value={flightDetails.returnDate}
                          onChange={handleInputChange}
                          required
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ min: today }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" color="primary" disabled={searching}>
                          {searching ? <CircularProgress size={24} /> : 'Search'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Card raised sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="flight results table">
                      <TableHead>
                        <TableRow>
                          <TableCell>From</TableCell>
                          <TableCell>To</TableCell>
                          <TableCell>Departure</TableCell>
                          <TableCell>Return</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Airline</TableCell>
                          <TableCell>Book</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {flights.map((flight, index) => (
                          <TableRow key={index}>
                            <TableCell>{flight.from}</TableCell>
                            <TableCell>{flight.to}</TableCell>
                            <TableCell>{flight.depart}</TableCell>
                            <TableCell>{flight.arrival}</TableCell>
                            <TableCell>{flight.price}</TableCell>
                            <TableCell><img src={flight.image} alt={flight.airline} style={{ width: 50, height: 50 }} /></TableCell>
                            <TableCell>
                              <Link to={`/booking?from=${flight.from}&to=${flight.to}&depart=${flight.depart}&arrival=${flight.arrival}&price=${flight.price}&airline=${flight.airline}&image=${flight.image}`}>
                                <Button variant="outlined">
                                  Book
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>  
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default FlightSearchForm;