import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import BookingComponent from '../BookingComponent';

export default function Orders() {
  const [rows, setRows] = useState([]);

  // Function to update rows
  const updateRows = (rowData) => {
    // Update state with the new row data
    setRows((prevRows) => [...prevRows, rowData]);
  };

  return (
    <React.Fragment>
      <Title>Flights from Dublin to London</Title>
      <BookingComponent onDataFetched={updateRows} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Airlines</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.departureCity}</TableCell>
              <TableCell>{row.arrivalCity}</TableCell>
              <TableCell>{row.carrierName}</TableCell>
              <TableCell>{row.totalTime} hrs</TableCell>
              <TableCell align="right">€{row.priceUnits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}