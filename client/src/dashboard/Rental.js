import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Updated mock data with car brands and placeholder logo paths
const carRentals = [
  { id: 1, brand: 'Toyota', model: 'Corolla', price: '$20/day', location: 'Airport', logo: '/path/to/toyota/logo.png' },
  { id: 2, brand: 'BMW', model: '5 Series', price: '$50/day', location: 'City Center', logo: '/path/to/bmw/logo.png' },
  { id: 3, brand: 'Ford', model: 'Escape', price: '$35/day', location: 'Airport', logo: '/path/to/ford/logo.png' },
  { id: 4, brand: 'Chevrolet', model: 'Camaro', price: '$45/day', location: 'City Center', logo: '/path/to/chevrolet/logo.png' },
];

const CarRentalsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredRentals = carRentals.filter(rental =>
    rental.brand.toLowerCase().includes(searchTerm) ||
    rental.model.toLowerCase().includes(searchTerm)
  );

  return (
    <Box sx={{ width: 'auto', margin: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
      <Box sx={{ padding: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by brand or model..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="car rentals table">
          <TableHead>
            <TableRow>
              <TableCell>Car</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRentals.map((rental) => (
              <TableRow key={rental.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={rental.logo} alt={`${rental.brand} Logo`} style={{ width: 24, height: 24 }} />
                    {`${rental.brand} ${rental.model}`}
                  </Box>
                </TableCell>
                <TableCell align="right">{rental.price}</TableCell>
                <TableCell align="right">{rental.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CarRentalsTable;