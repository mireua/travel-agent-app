import React, { useEffect, useState } from 'react';
import { CssBaseline, Box, AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import UserManagement from './UserManagement'; 
import ItineraryManagement from './ItineraryManagement'; 
import AdminLog from './AdminLog'; 
import VisibilityIcon from '@mui/icons-material/Visibility';

function App() {
  const [activePanel, setActivePanel] = useState('user');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      window.location.href = '/dashboard';
    }
  }, []);

  const hoverStyle = {
    color: 'white',
    '&:hover': {
      '&::after': {
        content: '""',
        display: 'block',
        height: '2px',
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        transition: 'transform 0.5s ease-in-out',
        transformOrigin: 'left',
        transform: 'scaleX(1)'
      }
    },
    '&::after': {
      content: '""',
      display: 'block',
      height: '2px',
      backgroundColor: '#fff',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      transition: 'transform 0.5s ease-in-out',
      transformOrigin: 'left',
      transform: 'scaleX(0)'
    },
    position: 'relative',
    overflow: 'hidden'
  };

  const appBarStyle = {
    backgroundColor: '#1976d2',
    color: '#fff'
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" sx={appBarStyle}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <DashboardIcon sx={{ mr: 1 }} /> Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => setActivePanel('user')} sx={hoverStyle} startIcon={<PeopleIcon />}>
            User Management
          </Button>
          <Button color="inherit" onClick={() => setActivePanel('itinerary')} sx={hoverStyle} startIcon={<MapIcon />}>
            Itinerary Management
          </Button>
          <Button color="inherit" onClick={() => setActivePanel('adminLog')} sx={hoverStyle} startIcon={<VisibilityIcon />}>
            Admin Log
          </Button>
          <Button color="inherit" onClick={() => window.location.href = '/dashboard'} sx={hoverStyle} startIcon={<HomeIcon />}>
            Back to Homepage
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item xs={12}>
          {activePanel === 'user' ? (
            <UserManagement />
          ) : activePanel === 'itinerary' ? (
            <ItineraryManagement />
          ) : (
            <AdminLog />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
