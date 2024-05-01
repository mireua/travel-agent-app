import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import cities from './data/cities.json';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import backgroundImage from './img/attractions.jpg'; // Import your background image here

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

  const handleSave = (attraction) => {
    // Add your save logic here
    console.log('Saving attraction:', attraction);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
      }}
    >
      <Paper sx={{ boxShadow: 3, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.8)', padding: 2, width: '100%', maxWidth: 600 }}>
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
      </Paper>
      <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%', maxWidth: 600 }}>
        <Table aria-label="attractions table">
          <TableHead>
            <TableRow>
              <TableCell><LocationOnIcon /> Attraction</TableCell>
              <TableCell><CategoryIcon /> Type</TableCell>
              <TableCell>Actions</TableCell> {/* New column for Save button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {attractions.map((attraction, index) => (
              <TableRow key={index}>
                <TableCell>{attraction.city}</TableCell>
                <TableCell>{attraction.type.charAt(0).toUpperCase() + attraction.type.slice(1)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(attraction)}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttractionsTable;
