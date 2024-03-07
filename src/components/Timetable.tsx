import React from 'react';
import { Course } from '@/types/Course';
import { ClassData } from '@/types/ClassData';
import { Table, TableRow, TableCell } from '@mui/material';

const numberToPercent = (num: number): string => {
  return num.toString() + '%';
};

interface TimeColumnProps {
  startTime: number;
  rows: number;
}

const TimeColumn: React.FC<TimeColumnProps> = ({ startTime, rows }) => {
  const hours: number[] = [...Array(rows)].map((_, i) => i + startTime);
  return (
    <div>
      <Table style={{ height: '100%', display: 'flex', width: '50px', flexDirection: 'column' }}>
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
      </Table>
    </div>
  );
};

interface ScheduleProps {
  rows: number;
}

const Schedule: React.FC<ScheduleProps> = ({ rows }) => {
  return (
    <div style={{ height: '100%' }}>
      <Table style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      </Table>
    </div>
  );
};

interface ClassCardsProps {
  courses: Course[];
  startTime: number;
  rows: number;
}

const ClassCards: React.FC<ClassCardsProps> = ({ courses, startTime, rows }) => {
  return (
    <div style={{ position: 'absolute', top: 42, left: 0, width: '100%', height: '100%' }}>
      <Table>
        <TableRow>
          {[...Array(5)].map((_, i) => {
            return <TableCell key={i} style={{ height: '100%' }}></TableCell>;
          })}
        </TableRow>
      </Table>
    </div>
  );
};

interface TimetableProps {
  courses: Course[];
}

const Timetable: React.FC<TimetableProps> = ({ courses }) => {
  // Default start and end of days: 10AM - 6PM
  const startTime = 10;
  const endTime = 18;
  const rows = endTime - startTime;

  const getClassesFromCourses = (courses: Course[]): ClassData[] => {
    return courses.map(course => course.timetableData).reduce((acc, val) => acc.concat(val), []);
  };

  return (
    <div style={{ display: 'flex', margin: '10px', height: 800, width: '99%' }}>
      <TimeColumn startTime={startTime} rows={rows} />
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Schedule rows={rows} />
        {/* <ClassCards courses={courses} startTime={startTime} rows={rows} /> */}
      </div>
    </div>
  );
};

export default Timetable;
