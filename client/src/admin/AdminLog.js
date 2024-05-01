import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AdminLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin-log');
        const data = response.data;
        setLogs(data);
      } catch (error) {
        console.error('Request Failed:', error.response);
      }
    };
  
    fetchLogs();
  }, []);

  // Filter logs based on the selected type
  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);

  return (
    <Box maxWidth="800px" mx="auto" p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Log
      </Typography>

      <Box mb={2}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="promotion">Promotion</MenuItem>
          <MenuItem value="demotion">Demotion</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Log Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.type}</TableCell>
                <TableCell>{log.time}</TableCell>
                <TableCell>{log.by}</TableCell>
                <TableCell>{log.log_message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminLogPage;
