import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/fetch-notifications', {
                    email: localStorage.getItem('email')
                });
                console.log(response.data);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper style={{ width: '70%', maxWidth: 600, backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }} elevation={3}>
                <div style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        Notifications
                    </Typography>
                    <List>
                        {notifications.map((notification, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={notification.message} secondary={new Date(notification.time).toLocaleString()} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Paper>
        </div>
    );
};

export default Notifications;
