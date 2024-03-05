import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import type { Course } from '../types/Course';
import type { ClassData } from '../types/ClassData';

interface TimetableProps {
  courses: Course[];
}

const Timetable: React.FC<TimetableProps> = ({ courses }) => {
  // Define an array of days to iterate through
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  // Define a function to group class data by lessonType
  const groupClassDataByLessonType = (timetableData: ClassData[]) => {
    const groupedData: { [lessonType: string]: [ClassData[], string] } = {};

    // Iterate over each timetableData and group by lessonType
    timetableData.forEach(data => {
      const { lessonType } = data;
      if (!groupedData[lessonType]) {
        groupedData[lessonType] = [[data], data.classNo];
      } else {
        groupedData[lessonType][0].push(data);
      }
    });

    return groupedData;
  };

  // Call groupClassDataByLessonType for each course and store the results
  const groupedDataByCourse: { [courseName: string]: { [lessonType: string]: [ClassData[], string] } } = {};
  courses.forEach(course => {
    groupedDataByCourse[course.courseName] = groupClassDataByLessonType(course.timetableData);
  });

  // Define a function to find a class for a given day and hour
  const findClassForHour = (course: Course, day: string, hour: number) => {
    const lessons = groupedDataByCourse[course.courseName];
    for (const lessonType in lessons) {
      const [classData, classNo] = lessons[lessonType];
      const chosenClass = classData.find(data => data.classNo === classNo);
      const isMatch =
        chosenClass?.day === day &&
        parseInt(chosenClass?.startTime as string) / 100 <= hour &&
        parseInt(chosenClass?.endTime as string) / 100 > hour;
      if (isMatch) {
        return chosenClass;
      }
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ tableLayout: 'fixed', minWidth: '600px' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '60px', fontSize: '12px' }}>Time</TableCell>
            {days.map(day => (
              <TableCell key={day} style={{ width: '100px', fontSize: '12px' }}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(13)].map((_, index) => {
            const hour = index + 8;
            const time = hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`;

            return (
              <TableRow key={hour} style={{ height: '50px' }}>
                <TableCell style={{ fontSize: '12px' }}>{time}</TableCell>
                {days.map(day => {
                  // Check each course for a matching class at the current day and hour
                  const matchingCourse = courses.find(course => findClassForHour(course, day, hour));
                  if (matchingCourse) {
                    // If a matching course is found, render the class number
                    const matchingClass = findClassForHour(matchingCourse, day, hour);
                    return (
                      <TableCell
                        key={`${day}-${hour}`}
                        style={{
                          backgroundColor: matchingCourse.color, // Set background color to course color
                          width: '100px',
                          fontSize: '10px', // Adjust font size
                        }}
                      >{`${matchingCourse.courseName} ${matchingClass?.lessonType} ${matchingClass?.classNo}`}</TableCell>
                    );
                  } else {
                    // If no matching course is found, render an empty cell
                    return <TableCell key={`${day}-${hour}`} style={{ width: '100px', fontSize: '10px' }}></TableCell>;
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Timetable;
