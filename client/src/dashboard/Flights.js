import React, { useState } from 'react';
import axios from 'axios';
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@mui/material';
import cities from './data/cities.json';

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
    setFlightDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with flight details:', flightDetails);
    setSearching(true);

    try {
      const response = await axios.post('http://localhost:5000/api/searchFlights', flightDetails);
      setFlights(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <Container component="main">
      <Paper elevation={3} sx={{ my: 4, p: 3, borderRadius: 2, bgcolor: 'background.paper', boxShadow: '1px 1px 12px rgba(0,0,0,0.2)' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Search Flights
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="from-label">From</InputLabel>
                    <Select
                      labelId="from-label"
                      name="from"
                      value={flightDetails.from}
                      label="From"
                      onChange={handleInputChange}
                      required
                    >
                      {cities.map((city) => (
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
                      label="To"
                      onChange={handleInputChange}
                      required
                    >
                      {cities.map((city) => (
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
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="submit" variant="contained" color="primary" disabled={searching}>
                    {searching ? 'Searching...' : 'Search'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Date Departure</TableCell>
                    <TableCell>Date Return</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Airline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight, index) => (
                    <TableRow key={index}>
                      <TableCell>{flight.from}</TableCell> {/* From */}
                      <TableCell>{flight.to}</TableCell> {/* To */}
                      <TableCell>{flight.depart}</TableCell> {/* Departure time */}
                      <TableCell>{flight.arrival}</TableCell> {/* Arrival time */}
                      <TableCell>{flight.price}</TableCell> {/* Price */}
                      <TableCell>{flight.airline}</TableCell> {/* Airline */}
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

export default FlightSearchForm;