import React from 'react';
import { Table, TableRow, TableCell } from '@mui/material';

interface TimeColumnProps {
  startTime: number;
  rows: number;
}

const TimeColumn: React.FC<TimeColumnProps> = ({ startTime, rows }) => {
  const hours: number[] = [...Array(rows)].map((_, i) => i + startTime);
  return (
    <div>
      <Table style={{ height: '100%', display: 'flex', width: '50px' }}>
        <tbody style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {hours.map(h => {
            return (
              <TableRow key={h} style={{ flexGrow: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '0%' }}>
                <TableCell style={{ borderBottom: '0px', padding: '0px' }}>
                  <strong style={{ color: 'rgb(105, 112, 122)' }}>{h * 100}</strong>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow style={{ flexGrow: 1 }}>
            <TableCell style={{ padding: '0px', border: '0px' }}>
              <strong style={{ color: 'rgb(105, 112, 122)' }}></strong>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );
};

export default TimeColumn;
