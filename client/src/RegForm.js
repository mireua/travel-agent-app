import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function RegForm({ onRegister, onCancel }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  const handleRegister = () => {
    // Call the onRegister function passed from the parent component (App.js)
    onRegister({ firstName, lastName, email, password, country });
  };

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
      >
        Register
      </Button>
      <Button variant="text" color="secondary" fullWidth onClick={onCancel}>
        Already have an account? Login now
      </Button>
    </div>
  );
}

export default RegForm;