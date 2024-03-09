import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Timetable from '@/components/Timetable/Timetable';
import SearchBar from '@components/SearchBar';
import AddedCoursesPanel from '@components/AddedCoursesPanel';
import Footer from '@components/Footer';
import Header from '@components/Header';
import type { Course } from '../../types/Course';
import type { ClassData } from '../../types/ClassData';

const CURRENT_SEMESTER = 2;

const Homepage: React.FC = () => {
  // State to store added courses and their timetable data
  const [courses, setCourses] = useState<Course[]>([]);

  function abbreviateDay(fullDay: string): string {
    switch (fullDay) {
      case 'Monday':
        return 'MON';
      case 'Tuesday':
        return 'TUE';
      case 'Wednesday':
        return 'WED';
      case 'Thursday':
        return 'THU';
      case 'Friday':
        return 'FRI';
      case 'Saturday':
        return 'SAT';
      case 'Sunday':
        return 'SUN';
      default:
        return '';
    }
  }

  function shortenClassType(fullTypename: string): string {
    const words = fullTypename.split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 3).toUpperCase();
    }
    return (words[0][0] + words[1].substring(0, 3)).toUpperCase();
  }

  // Function to handle adding a new course
  const handleAddCourse = (course: string) => {
    // Fetch timetable data for the added course and update the courses state
    fetchTimetableData(course)
      .then(data => {
        // Map the fetched data to match the structure of the timetableData
        const mappedData: ClassData[] = (data as Record<string, unknown>[]).map(item => ({
          courseName: course as string,
          classNo: item.classNo as string,
          startTime: item.startTime as string,
          endTime: item.endTime as string,
          weeks: item.weeks as number[],
          venue: item.venue as string,
          day: abbreviateDay(item.day as string),
          lessonType: shortenClassType(item.lessonType as string),
        }));

        // Define the default color for the course
        const defaultColor = '#0000FF'; // Blue color

        // Object to store initial indexes for each lessonType
        const initialIndexes: { [key: string]: string } = {};

        // Iterate through the mappedData to calculate initial indexes
        mappedData.forEach(item => {
          // If lessonType exists in initialIndexes, increment its index, otherwise set it to 0
          initialIndexes[item.lessonType] = initialIndexes[item.lessonType] ? initialIndexes[item.lessonType] : item.classNo;
        });

        // Add the new course with the default color and initial indexes
        setCourses([...courses, { courseName: course, timetableData: mappedData, color: defaultColor, lessonType: initialIndexes }]);
      })
      .catch(error => {
        console.error('Error fetching timetable data:', error);
      });
  };

  // Function to update the courses array with the updated color
  const updateCourse = (courses: Course[]) => {
    setCourses(courses);
  };

  // Function to handle searching for courses
  const handleSearch = (searchQuery: string) => {
    // Implement search functionality here
    console.log('Search query:', searchQuery);
  };

  // Function to fetch timetable data for a course
  const fetchTimetableData = (course: string) => {
    const courseCode = course.split(' ')[0]; // Assuming course code is the first part
    return fetch(`https://api.nusmods.com/v2/2023-2024/modules/${courseCode}.json`)
      .then(response => response.json())
      .then(data => {
        const semesterData = data?.semesterData;

        // No semester data found
        if (!semesterData || semesterData.length === 0) {
          throw new Error('Semester data not found');
        }

        // Check if the current semester data exists
        const currentSemesterData = semesterData.find((semester: { semester: number }) => semester.semester === CURRENT_SEMESTER);
        if (!currentSemesterData) {
          throw new Error('Semester data not found for the current semester');
        }

        // Return the current semester data
        return currentSemesterData.timetable;
      });
  };

  return (
    <Container maxWidth={false}>
      <Header />
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <Timetable courses={courses} />
        </Grid>
        <Grid item xs={12}>
          <SearchBar onSearch={handleSearch} onAddCourse={handleAddCourse} />
        </Grid>
        <Grid item xs={12}>
          {/* Pass the updateCourseColor function to the AddedCoursesPanel component */}
          <AddedCoursesPanel courses={courses} onUpdateCourse={updateCourse} />
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Homepage;
