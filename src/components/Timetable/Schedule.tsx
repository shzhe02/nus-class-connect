import React from 'react';
import { Table, TableRow, TableCell } from '@mui/material';

interface ScheduleProps {
  rows: number;
}

const Schedule: React.FC<ScheduleProps> = ({ rows }) => {
  return (
    <div style={{ height: '100%' }}>
      <Table style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <tbody style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <TableRow style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', flexBasis: '0%' }}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map(day => {
              const border = '1px solid rgba(224, 224, 224)';
              const borderLeft = day === 'MON' ? '1px solid rgba(224, 224, 224)' : '0px';
              const topLeftRadius = day === 'MON' ? '10px' : '0px';
              const topRightRadius = day === 'FRI' ? '10px' : '0px';
              return (
                <TableCell
                  key={day}
                  style={{
                    borderTopLeftRadius: topLeftRadius,
                    borderTopRightRadius: topRightRadius,
                    flexGrow: 1,
                    display: 'flex',
                    flexBasis: '0%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0px',
                    borderRight: border,
                    borderLeft: borderLeft,
                    borderBottom: '0px',
                    borderTop: border,
                  }}
                >
                  <strong style={{ color: 'rgb(105, 112, 122)' }}>{day}</strong>
                </TableCell>
              );
            })}
          </TableRow>
          {[...Array(rows)].map((_, i) => {
            const border = '1px solid rgba(224, 224, 224)';
            const borderBottom = i === rows - 1 ? border : '0px';
            const backgroundColor = i % 2 === 0 ? '#efefef' : 'white';
            return (
              <TableRow style={{ flexGrow: 2, display: 'flex', flexDirection: 'row', flexBasis: '0%' }} key={i}>
                {[...Array(5)].map((_, n) => {
                  const borderLeft = n === 0 ? '1px solid rgba(224, 224, 224)' : '0px';
                  const bottomLeftRadius = i === rows - 1 && n === 0 ? '10px' : '0px';
                  const bottomRightRadius = i === rows - 1 && n === 4 ? '10px' : '0px';
                  return (
                    <TableCell
                      key={n}
                      style={{
                        borderBottomLeftRadius: bottomLeftRadius,
                        borderBottomRightRadius: bottomRightRadius,
                        display: 'flex',
                        flexBasis: '0%',
                        backgroundColor: backgroundColor,
                        borderBottom: borderBottom,
                        borderRight: border,
                        borderLeft: borderLeft,
                        padding: '0px',
                        flexGrow: 1,
                      }}
                    ></TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Schedule;
