import React from 'react';
import './css/dashboard.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const Main = ({ setCurrentView }) => (
  <div className="travel-search-container">
    <div className="background"></div> {/* This will be styled in CSS */}
    <Typography variant="h3" className="typing-text" style={{ textAlign: 'center', marginBottom: '20px' }}>
      TravelEasy, travel easy.
    </Typography>
    <div className="button-container" style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        size="large"
        color="primary"
        startIcon={<FlightIcon />}
        onClick={() => setCurrentView('flights')}
      >
        Book a Flight
      </Button>
      <Button
        variant="contained"
        size="large"
        color="primary"
        startIcon={<HotelIcon />}
        onClick={() => setCurrentView('hotels')}
        style={{ marginLeft: '10px', marginRight: '10px' }}
      >
        View Hotels
      </Button>
      <Button
        variant="contained"
        size="large"
        color="primary"
        startIcon={<LocationCityIcon />}
        onClick={() => setCurrentView('attractions')}
      >
        View Attractions
      </Button>
    </div>
  </div>
);

export default Main;
