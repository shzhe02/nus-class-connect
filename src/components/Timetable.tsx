import React, { useState, useEffect, useRef } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import type { Course } from '../types/Course';
import type { ClassData } from '../types/ClassData';
import CourseCard from './CourseCard';

interface TimetableProps {
  courses: Course[];
}

const Timetable: React.FC<TimetableProps> = ({ courses }) => {
  const [selectedCells, setSelectedCells] = useState<ClassData[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  const groupClassDataByLessonType = (timetableData: ClassData[]) => {
    const groupedData: { [lessonType: string]: [ClassData[], string] } = {};

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

  const groupedDataByCourse: { [courseName: string]: { [lessonType: string]: [ClassData[], string] } } = {};
  courses.forEach(course => {
    groupedDataByCourse[course.courseName] = groupClassDataByLessonType(course.timetableData);
  });

  const findClassesForHour = (courses: Course[], day: string, hour: number) => {
    const classes: ClassData[] = [];
    courses.forEach(course => {
      const courseClasses = groupedDataByCourse[course.courseName];
      for (const classType in courseClasses) {
        const [classData, classNo] = courseClasses[classType];
        classData
          .filter(e => e.classNo === classNo)
          .forEach(data => {
            if (data.day === day && parseInt(data.startTime) / 100 <= hour && parseInt(data.endTime) / 100 > hour) {
              classes.push(data);
            }
          });
      }
    });
    return classes;
    // const lessons = groupedDataByCourse[courses.courseName];
    // for (const lessonType in lessons) {
    //   const [classData, classNo] = lessons[lessonType];
    //   const chosenClass = classData.find(data => data.classNo === classNo);
    //   const isMatch =
    //     chosenClass?.day === day &&
    //     parseInt(chosenClass?.startTime as string) / 100 <= hour &&
    //     parseInt(chosenClass?.endTime as string) / 100 > hour;
    //   if (isMatch) {
    //     return chosenClass;
    //   }
    // }
  };

  const handleCellClick = (course: Course, day: string, hour: number) => {
    const newSelectedCells: ClassData[] = [];
    const lessons = groupedDataByCourse[course.courseName];
    for (const lessonType in lessons) {
      const [classData] = lessons[lessonType];
      const matchingClass = classData.find(
        data => data.day === day && parseInt(data.startTime) / 100 <= hour && parseInt(data.endTime) / 100 > hour,
      );
      if (matchingClass) {
        newSelectedCells.push(matchingClass);
      }
    }

    // Toggle selection: if the cell is already selected, deselect it, otherwise select it
    if (selectedCells.some(cell => newSelectedCells.some(newCell => cell === newCell))) {
      setSelectedCells([]);
    } else {
      setSelectedCells(newSelectedCells);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let isOutside = true;
      selectedCells.forEach(selectedCell => {
        const cellId = `${selectedCell.day}-${selectedCell.startTime}-${selectedCell.endTime}`;
        if ((event.target as HTMLElement).id === cellId) {
          isOutside = false;
        }
      });

      if (isOutside) {
        setSelectedCells([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedCells]);

  const lighterColor = (color: string) => {
    // Convert hex color to RGB
    const hex = color.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate lighter color (reduce darkness)
    const amount = 0.3; // Adjust the value to control the lightness
    r = Math.round(Math.min(255, r + 255 * amount));
    g = Math.round(Math.min(255, g + 255 * amount));
    b = Math.round(Math.min(255, b + 255 * amount));

    // Convert back to hex
    const lighterHex = (r * 65536 + g * 256 + b).toString(16);
    return `#${lighterHex.padStart(6, '0')}`;
  };

  return (
    <div ref={tableRef} style={{ overflowX: 'auto' }}>
      <Table style={{ tableLayout: 'fixed', minWidth: '600px' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '60px', fontSize: '12px', borderBottom: '0px' }}></TableCell>
            {days.map(day => (
              <TableCell key={day} style={{ width: '100px', fontSize: '12px', textAlign: 'center' }}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(13)].map((_, index) => {
            const hour = index + 8;
            const time = hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`;
            const color = hour % 2 ? '#eeeeee' : 'white';
            const bottomBorder = index === 12 ? '1px solid rgpa(224, 224, 224)' : '0px';

            return (
              <TableRow key={hour} style={{ height: '50px' }}>
                <TableCell
                  style={{
                    fontSize: '12px',
                    borderBottom: '0px',
                    borderRight: '1px solid rgba(224, 224, 224)',
                    textAlign: 'right',
                    paddingRight: '10px',
                  }}
                >
                  {time}
                </TableCell>
                {days.map(day => {
                  const matchingClasses = findClassesForHour(courses, day, hour);
                  if (matchingClasses.length > 0) {
                    return (
                      <TableCell
                        key={`${day}-${hour}`}
                        style={{
                          backgroundColor: color,
                          position: 'relative',
                          width: '100px',
                          fontSize: '10px',
                          borderBottom: bottomBorder,
                          borderRight: '1px solid rgba(224, 224, 224)',
                          cursor: 'pointer',
                          padding: '0px',
                        }}
                      >
                        {/* {`${matchingCourses[0].courseName} ${matchingClass?.lessonType} ${matchingClass?.classNo}`} */}
                        <CourseCard courses={matchingClasses} />
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={`${day}-${hour}`}
                        style={{
                          width: '100px',
                          fontSize: '10px',
                          borderBottom: bottomBorder,
                          borderRight: '1px solid rgba(224, 224, 224)',
                          backgroundColor: color,
                        }}
                      ></TableCell>
                    );
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
