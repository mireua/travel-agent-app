import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Flight, Hotel, Person, EventNote, Home } from '@mui/icons-material'; // Import Home icon

const AdminPanel = () => {

  const redirectToDashboard = () => {
    window.location.href = "/dashboard";
  };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Admin Panel
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Flight fontSize="large" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h2" gutterBottom>
                  Flights Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage flights, including adding, editing, and deleting flights.
                </Typography>
              </CardContent>
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 'auto' }}>
                Go to Flights
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Hotel fontSize="large" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h2" gutterBottom>
                  Hotel Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage hotels, including adding, editing, and deleting hotels.
                </Typography>
              </CardContent>
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 'auto' }}>
                Go to Hotels
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Person fontSize="large" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h2" gutterBottom>
                  User Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage users, including adding, editing, and deleting users.
                </Typography>
              </CardContent>
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 'auto' }}>
                Go to Users
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <EventNote fontSize="large" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h2" gutterBottom>
                  View Logs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View system logs and activity.
                </Typography>
              </CardContent>
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 'auto' }}>
                View Logs
              </Button>
            </Card>
          </Grid>
        </Grid>
        {/* New button for redirecting to Home */}
        <Button startIcon={<Home />} variant="contained" color="primary" onClick={redirectToDashboard} sx={{ mt: 4 }}>Go to Home</Button>
      </Container>
    </div>
  );
};

export default AdminPanel;
