import React, { useState } from 'react';
import {
    Typography, TextField, Table, TableBody, TableCell, TableContainer, TableRow,
  Paper, TableHead, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const UserManagement = () => {
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([
    { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', isAdmin: true },
    { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', isAdmin: false },
    { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', isAdmin: false },
    { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', isAdmin: false },
    { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', isAdmin: false },
    { firstName: 'Matt', lastName: 'Doe', email: 'test@example.com', isAdmin: false }
    
  ]);

  const handleDelete = (userEmail) => {
    setUsers(users.filter(user => user.email !== userEmail));
  };

  const toggleAdmin = (userEmail) => {
    setUsers(users.map(user => {
      if (user.email === userEmail) {
        return { ...user, isAdmin: !user.isAdmin };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user => {
    return user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
           user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
           user.email.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <Paper sx={{ padding: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        User Management Panel
        </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => console.log('Edit:', user.email)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.email)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => toggleAdmin(user.email)}>
                    {user.isAdmin ? <ArrowDownwardIcon /> : <AdminPanelSettingsIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserManagement;
