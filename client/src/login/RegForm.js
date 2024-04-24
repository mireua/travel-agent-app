import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function RegForm({ onRegister, onCancel }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    onRegister({ firstName, lastName, email, password});
  };

  return (
    <div className="register-form" style={{ color: 'white' }}> {/* This sets the overall text color to white */}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        InputLabelProps={{
          style: { color: 'white' }, // Makes label text white
        }}
        inputProps={{
          style: { color: 'white' }, // Makes input text white
        }}
      />
      {/* Repeat the same for other TextField components */}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
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
        label="Email"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: { color: 'white' },
        }}
        inputProps={{
          style: { color: 'white' },
        }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister} style={{ marginTop: '8px' }}>
        Register
      </Button>
      <Button variant="text" color="secondary" fullWidth onClick={onCancel} style={{ color: 'white' }}>
        Already have an account? Login now
      </Button>
    </div>
  );
}

export default RegForm;