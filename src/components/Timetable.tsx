import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

function Timetable() {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>MON</TableCell>
            <TableCell>TUE</TableCell>
            <TableCell>WED</TableCell>
            <TableCell>THU</TableCell>
            <TableCell>FRI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(13)].map((_, index) => {
            const hour = index + 8;
            const time = hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`;
            return (
              <TableRow key={hour}>
                <TableCell>{time}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Timetable;
