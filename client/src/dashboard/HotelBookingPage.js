import axios from 'axios';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Snackbar,
} from '@mui/material';
import { CreditCard, AccountCircle } from '@mui/icons-material';

import StripeLogo from './img/stripe.png';

function BookingPage() {
  const [searchParams] = useSearchParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const userEmail = localStorage.getItem('email');

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!validatePayment() || !validateBillingAddress()) {
      setSnackbarMessage('Payment or billing details are invalid. Please check and try again.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bookHotel', {
        hotel: searchParams.get('city'),
        arrival: searchParams.get('arrival'),
        depart: searchParams.get('departure'),
        guests: searchParams.get('guests'),
        price: searchParams.get('price'),
        cardholderName: document.getElementById('cardholder-name').value,
        cardNumber,
        expiryDate,
        cvv,
        fullName: billingAddress.fullName,
        address: billingAddress.address,
        city: billingAddress.city,
        zip: billingAddress.zip,
        country: billingAddress.country,
        userEmail,
      });

      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } catch (error) {
      setSnackbarMessage('Error booking flight.');
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const validateCardNumber = (cardNumber) => {
    const formattedCardNumber = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(formattedCardNumber);
  };

  const validateExpiryDate = (expiryDate) => {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const inputMonth = parseInt(month, 10);
    const inputYear = parseInt(year, 10);
    return inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth);
  };

  const validateCvv = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  const validatePayment = () => {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!validateCardNumber(cardNumber)) return false;
    if (!validateExpiryDate(expiryDate)) return false;
    if (!validateCvv(cvv)) return false;

    return true;
  };

  const validateBillingAddress = () => {
    const { fullName, address, city, zip, country } = billingAddress;

    if (!fullName || !address || !city || !zip || !country) return false;

    return true;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, paddingTop: '20px' }}>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
              <img src={StripeLogo} alt="Stripe Logo" style={{ width: '200px', marginBottom: '16px' }} />
              <Typography variant="subtitle1" gutterBottom>
                Hotel Booking Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">Hotel: {searchParams.get('city')}</Typography>
              <Typography variant="body1">Check-in: {searchParams.get('arrival')}</Typography>
              <Typography variant="body1">Check-out: {searchParams.get('departure')}</Typography>
              <Typography variant="body1">Guests: {searchParams.get('guests')}</Typography>
              <Typography variant="body1">Price: {searchParams.get('price')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Payment Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <form onSubmit={handlePaymentSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="cardholder-name"
                      fullWidth
                      label="Cardholder Name"
                      InputProps={{ startAdornment: <AccountCircle /> }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="card-number"
                      fullWidth
                      label="Card Number"
                      InputProps={{ startAdornment: <CreditCard /> }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="expiry-date"
                      fullWidth
                      label="Expiry Date"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="cvv"
                      fullWidth
                      label="CVV"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Billing Address
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      onChange={handleAddressChange}
                      value={billingAddress.fullName}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      onChange={handleAddressChange}
                      value={billingAddress.address}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      onChange={handleAddressChange}
                      value={billingAddress.city}
                      sx={{ mb: 1 }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Zip"
                          name="zip"
                          onChange={handleAddressChange}
                          value={billingAddress.zip}
                          sx={{ mb: 1 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Country"
                          name="country"
                          onChange={handleAddressChange}
                          value={billingAddress.country}
                          sx={{ mb: 1 }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Pay Now
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          sx: {
            backgroundColor: '#4caf50', // Green color for success
            color: '#fff', // Text color
          }
        }}
      />
    </Container>
  );
}

export default BookingPage;
