import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RegistrationForm from './RegForm'; // Import the RegistrationForm component

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh', // Center vertically on the viewport
};

const formStyle = {
  width: '100%',
  maxWidth: '400px', // Limit the form width
  textAlign: 'center',
};

const buttonStyle = {
  marginTop: '20px', // Add some space below the text fields
};

const registerButtonStyle = {
  marginTop: '10px', // Add space between the Login button and Register button
};

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // To control the visibility of the registration form

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Login response:', response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', userData);
      console.log('Registration response:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
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
        <Typography variant="h5">TravelEasy</Typography>
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
              color="secondary"
              style={registerButtonStyle}
              onClick={handleRegisterButtonClick}
            >
              Don't have an account? Register now
            </Button>
          </div>
        ) : (
          <RegistrationForm onRegister={handleRegister} onCancel={handleCancelRegistration} />
        )}
      </div>
    </Container>
  );
}

export default App;