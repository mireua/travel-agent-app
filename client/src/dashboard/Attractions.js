import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import cities from './data/cities.json';

const AttractionsTable = () => {
  const [attractions, setAttractions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedCity) {
        const response = await axios.post('http://localhost:5000/api/searchAttractions', {
          city: selectedCity,
        });
        setAttractions(response.data);
      }
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  return (
    <Box sx={{ width: 'auto', margin: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
      <Box sx={{ padding: 2 }}>
        <form onSubmit={handleFormSubmit}>
          <FormControl fullWidth>
            <InputLabel>Select City</InputLabel>
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              label="Select City"
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
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="attractions table">
          <TableHead>
            <TableRow>
              <TableCell>Attraction</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {attractions.map((attraction, index) => (
            <TableRow key={index}>
              <TableCell>{attraction.city}</TableCell>
              <TableCell>{attraction.type.charAt(0).toUpperCase() + attraction.type.slice(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttractionsTable;
