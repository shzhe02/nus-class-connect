import React, { useState, useEffect, useRef } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import type { Course } from '../types/Course';
import type { ClassData } from '../types/ClassData';

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
                  const matchingCourse = courses.find(course => findClassForHour(course, day, hour));
                  if (matchingCourse) {
                    const matchingClass = findClassForHour(matchingCourse, day, hour);
                    const isSelected = selectedCells.some(cell => cell === matchingClass);
                    return (
                      <TableCell
                        key={`${day}-${hour}`}
                        id={`${day}-${matchingClass?.startTime}-${matchingClass?.endTime}`}
                        onClick={() => handleCellClick(matchingCourse, day, hour)}
                        style={{
                          backgroundColor: isSelected ? lighterColor(matchingCourse.color) : matchingCourse.color,
                          width: '100px',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                      >{`${matchingCourse.courseName} ${matchingClass?.lessonType} ${matchingClass?.classNo}`}</TableCell>
                    );
                  } else {
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
