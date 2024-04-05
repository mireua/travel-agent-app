import React, { useState } from 'react';
import './css/main.css';
import countryCityData from './data/cities.json';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Assuming onDestinationFound is passed as a prop from Dashboard
const TravelSearch = ({ onDestinationFound }) => {
  const [searchInput, setSearchInput] = useState('');
  const [destinationFound, setDestinationFound] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundDestination = countryCityData.find(
      (item) =>
        item.country.toLowerCase() === searchInput.toLowerCase() ||
        (item.city && item.city.toLowerCase() === searchInput.toLowerCase())
    );
    if (foundDestination) {
      console.log('Destination found:', foundDestination);
      setDestinationFound(true);
      sessionStorage.setItem('destination', JSON.stringify(foundDestination));
      onDestinationFound(); // Navigate to the flights component
    } else {
      console.log('Destination not found:', searchInput);
      setDestinationFound(false);
      setOpenSnackbar(true);
    }
    setFormSubmitted(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="travel-search-container">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleSnackbarClose}>
          Destination not found. Please enter a valid destination.
        </MuiAlert>
      </Snackbar>
      <div className="background"></div> {/* This will be styled in CSS */}
      <form className="search-form" onSubmit={handleSubmit}>
        <h1>Where do you want to go?</h1>
        <input
          type="text"
          placeholder="Enter your destination"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default TravelSearch;