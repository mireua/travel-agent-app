import React, { useState, useEffect } from 'react';
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableRow,
    Paper, TableHead, IconButton, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField as MuiTextField
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');
    const [userToDelete, setUserToDelete] = useState(null);

    const currentUserEmail = localStorage.getItem('email');

    const promptDelete = (userEmail) => {
        setUserToDelete(userEmail);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!userToDelete) return;
        try {
            await axios.post('http://localhost:5000/api/admin-delete-user', {
                email: userToDelete,
                firstName: localStorage.getItem('firstName'),
                reason: deleteReason,
                adminEmail: localStorage.getItem('email')
            });
            setUsers(users.filter(user => user.email !== userToDelete));
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        } catch (error) {
            console.error('Failed to delete user:', error.response);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditDialogOpen(true);
    };

    const updateUser = async () => {
        if (!editingUser) return;
        try {
            await axios.post('http://localhost:5000/api/admin-edit-user', {
                email: editingUser.email,
                updatedDetails: {
                    firstName: editingUser.firstName,
                    lastName: editingUser.lastName
                },
                adminEmail: localStorage.getItem('email'),
                firstName: localStorage.getItem('firstName')
            });
            const updatedUsers = users.map(user => {
                if (user.email === editingUser.email) {
                    return { ...user, ...editingUser };
                }
                return user;
            });
            setUsers(updatedUsers);
            handleDialogClose();
        } catch (error) {
            console.error('Failed to update user:', error.response);
        }
    };

    const toggleUserRole = async (user) => {
        const endpoint = user.role === 'admin' ? 'admin-demote-user' : 'admin-promote-user';
        try {
            const response = await axios.post(`http://localhost:5000/api/${endpoint}`, {
                email: user.email,
                adminEmail: localStorage.getItem('email')
            });
            alert(response.data.message)
            loadUsers();  // Reload users to reflect the role change
        } catch (error) {
            console.error(`Failed to update user role: ${error}`);

        }
    };
  

    const handleDialogClose = () => {
        setEditDialogOpen(false);
        setEditingUser(null);
        setDeleteDialogOpen(false);
        setDeleteReason('');
    };

    const loadUsers = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin-load-users');
            const data = response.data;
            setUsers(data);
        } catch (error) {
            console.error('Request Failed:', error.response);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <Paper sx={{ padding: 3, backgroundColor: '#fff' }}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center', paddingBottom: '7px' }}>
                User Management Panel
            </Typography>
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
                      {users.map((user, index) => (
                          <TableRow key={index}>
                              <TableCell>{user.firstName}</TableCell>
                              <TableCell>{user.lastName}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                  <IconButton disabled={user.email === currentUserEmail} onClick={() => handleEditClick(user)}>
                                      <EditIcon />
                                  </IconButton>
                                  <IconButton disabled={user.email === currentUserEmail} onClick={() => promptDelete(user.email)}>
                                      <DeleteIcon />
                                  </IconButton>
                                  <IconButton disabled={user.email === currentUserEmail} onClick={() => toggleUserRole(user)}>
                                      {user.role === 'admin' ? <ArrowDownwardIcon /> : <AdminPanelSettingsIcon />}
                                  </IconButton>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            {editingUser && (
                <Dialog open={editDialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                        <MuiTextField
                            margin="dense"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editingUser.firstName}
                            onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                        />
                        <MuiTextField
                            margin="dense"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editingUser.lastName}
                            onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                        />
                        <MuiTextField
                            margin="dense"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={editingUser.email}
                            readOnly
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={updateUser}>Save Changes</Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <Typography>
                        Enter the reason for deleting this account (this will delete their itineraries!):
                    </Typography>
                    <MuiTextField
                        autoFocus
                        margin="dense"
                        label="Reason for Deletion"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={deleteReason}
                        onChange={e => setDeleteReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="primary" disabled={!deleteReason.trim()}>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default UserManagement;
