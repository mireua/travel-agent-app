import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container component="main" sx={{ marginTop: '50px' }}>
      <Grid container spacing={2}>
        {/* Search Form Panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Search Flights
              </Typography>
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
                      inputProps={{ min: today }} // Disable past dates
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
                      inputProps={{ min: today }} // Disable past dates
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" color="primary" disabled={searching}>
                      {searching ? 'Searching...' : 'Search'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {/* Flight Results Panel */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
                Flight Results
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Departure</TableCell>
                      <TableCell>Return</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Airline</TableCell>
                      <TableCell></TableCell> {/* New column for book button */}
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
                        <TableCell>
                          <img src={flight.image} alt={flight.airline} style={{ width: 50, height: 50, marginRight: 10 }} />
                          {flight.airline}
                        </TableCell>
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
  );
}

export default FlightSearchForm;
