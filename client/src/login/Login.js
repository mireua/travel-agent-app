import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import AirplaneIcon from '@mui/icons-material/FlightTakeoff';
import '@fontsource/poppins';
import './login.css';
import RegistrationForm from './RegForm'; // Assuming this is your registration form component

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100vw',
  color: 'white',
};

const formStyle = {
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  animation: 'fadeIn 1s ease-out',
  fontFamily: '"Poppins", sans-serif',
};

const buttonStyle = {
  marginTop: '20px',
  fontFamily: '"Poppins", sans-serif',
};

const registerButtonStyle = {
  marginTop: '10px',
  fontFamily: '"Poppins", sans-serif',
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Manage the message displayed in the Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // Manage the severity of the Snackbar ('error', 'success', etc.)
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, navigate to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.message === 'Login successful') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        navigate('/dashboard');
      } else {
        setSnackbarMessage(response.data.message || 'Login failed. Please check your credentials.');
        setSnackbarSeverity('error');
        handleSnackbarOpen();
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbarMessage(error.response?.data?.message || 'Login failed due to server error.');
      setSnackbarSeverity('error');
      handleSnackbarOpen();
    }
  };
  

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', userData);
      if (response.status === 200) {
        setSnackbarMessage(response.data.message || 'Registration successful!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setIsRegistering(false);
      } else {
        throw new Error(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSnackbarMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleRegisterButtonClick = () => {
    setIsRegistering(true);
  };

  const handleCancelRegistration = () => {
    setIsRegistering(false);
  };

  return (
    <Container component="main" maxWidth="xs" style={containerStyle}>
      <CssBaseline />
      <div style={formStyle}>
        <AirplaneIcon style={{ fontSize: 40, marginTop: '20px', color: 'white' }} />
        <Typography variant="h5" style={{ color: 'white', fontFamily: '"Poppins", sans-serif' }}>TravelEasy</Typography>
        {!isRegistering ? (
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              inputProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              inputProps={{
                style: { color: 'white' },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="text"
              style={{ ...registerButtonStyle, color: 'white' }}
              onClick={handleRegisterButtonClick}
            >
              Don't have an account? Register now
            </Button>
          </div>
        ) : (
          <RegistrationForm onRegister={handleRegister} onCancel={handleCancelRegistration} />
        )}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      </div>
    </Container>
  );
}

export default Login;
