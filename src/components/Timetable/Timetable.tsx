import React from 'react';
import { Course } from '@/types/Course';
import TimeColumn from './TimeColumn';
import Schedule from './Schedule';
import ClassCards from './ClassCards';

interface TimetableProps {
  courses: Course[];
}

const Timetable: React.FC<TimetableProps> = ({ courses }) => {
  // Filter the classes based on lessonType and classNo for each course
  const chosenClasses: Course[] = courses
    .map(course => {
      const lessonTypeKeys = Object.keys(course.lessonType);
      const filteredTimetableData = lessonTypeKeys.flatMap(lessonTypeKey => {
        const classNo = course.lessonType[lessonTypeKey];
        return course.timetableData.filter(data => data.classNo === classNo && lessonTypeKey === data.lessonType);
      });

      return {
        ...course,
        timetableData: filteredTimetableData,
      };
    })
    .filter(course => course.timetableData.length > 0);

  // Concat the chosen class together
  const classes = chosenClasses.map(course => course.timetableData).reduce((acc, val) => acc.concat(val), []);

  // Concat the chosen class's color together
  const classesColor = chosenClasses.flatMap(course => {
    // Create an array with the length of timetableData for each course, filled with the course's color
    return Array(course.timetableData.length).fill(course.color);
  });

  // start and end times of the schedule. Default is 10AM-4PM
  const startTime = Math.ceil(Math.min(...classes.map(c => +c.startTime), 1000)) / 100;
  const endTime = Math.floor(Math.max(...classes.map(c => +c.endTime), 1600)) / 100;

  const rows = endTime - startTime;

  return (
    <div style={{ display: 'flex', margin: '10px', height: `${rows * 3 * 2}em`, width: '99%' }}>
      <TimeColumn startTime={startTime} rows={rows} />
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <ClassCards classes={classes} startTime={startTime} rows={rows} color={classesColor} />
        <Schedule rows={rows} />
      </div>
    </div>
  );
};

export default Timetable;
