import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import backgroundImage from './img/clouds.jpg';
import './css/font.css';

const useStyles = makeStyles((theme) => ({
  landingPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heroSection: {
    width: '100%',
    flex: '3',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
  },
  heroHeading: {
    fontSize: '4.5rem',
    marginBottom: theme.spacing(4),
  },
  heroSubheading: {
    fontSize: '2rem',
    marginBottom: theme.spacing(4),
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  panelContainer: {
    width: '100%', 
    flex: '1',
    backgroundColor: '#ffffff',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flex: '1',
    padding: theme.spacing(2),
    borderRight: '1px solid #ccc', // Add a border between sections
    textAlign: 'center',
    minWidth: '150px',
    maxWidth: '33.333%', // Each section takes up 1/3 of the container
    '&:last-child': {
      borderRight: 'none', // Remove border from the last section
    },
  },
  sectionText: {
    marginBottom: theme.spacing(4),
  },
}));

const LandingPage = ({ setCurrentView }) => {
  const classes = useStyles();

  return (
    <div className={classes.landingPageContainer}>
      <div className={classes.heroSection}>
        <Typography variant="h1" style={{ fontFamily: 'Dancing Script, cursive', marginBottom: '5px' }} className={classes.heroHeading}>
          TravelEasy, travel easy.
        </Typography>
        <Typography variant="h3" style={{ fontFamily: 'Dancing Script, cursive', marginBottom: '15px'}} className={classes.heroSubheading}>
          It's been a while, {localStorage.getItem('firstName')}...
        </Typography>
        <div className={classes.heroButtons}>
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
      <div className={classes.panelContainer}>
        <div className={classes.sectionContainer}>
          <div className={classes.section}>
            <Typography variant="h4" style={{ fontFamily: 'Dancing Script, cursive'}} className={classes.sectionText}>Why us?</Typography>
            <Typography className={classes.sectionText}>
              Simplicity and efficiency is our goal. We strive to make it feel like you can do everything in one application; no matter the situation.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h4" style={{ fontFamily: 'Dancing Script, cursive'}} className={classes.sectionText}>Honesty Over Everything</Typography>
            <Typography className={classes.sectionText}>
              We show you the final price, whenever you search for a flight or a hotel. We add up everything and make things easy for you.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h4" style={{ fontFamily: 'Dancing Script, cursive'}} className={classes.sectionText}>Seamless.</Typography>
            <Typography className={classes.sectionText}>
              We've built an application that works just as fast as you can click. The milliseconds matter.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
