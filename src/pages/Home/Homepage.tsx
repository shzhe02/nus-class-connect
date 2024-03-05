import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import Timetable from '@/components/Timetable';
import SearchBar from '@components/SearchBar';
import AddedCoursesPanel from '@components/AddedCoursesPanel';
import Footer from '@components/Footer';
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

  // Function to handle adding a new course
  const handleAddCourse = (course: string) => {
    // Fetch timetable data for the added course and update the courses state
    fetchTimetableData(course)
      .then(data => {
        // Map the fetched data to match the structure of the timetableData
        const mappedData: ClassData[] = (data as Record<string, unknown>[]).map(item => ({
          classNo: item.classNo as string,
          startTime: item.startTime as string,
          endTime: item.endTime as string,
          weeks: item.weeks as number[],
          venue: item.venue as string,
          day: abbreviateDay(item.day as string),
          lessonType: item.lessonType as string,
        }));

        // Define the default color for the course
        const defaultColor = '#0000FF'; // Blue color

        // Add the new course with the default color
        setCourses([...courses, { courseName: course, timetableData: mappedData, color: defaultColor }]);
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
    <Container maxWidth='lg'>
      <Box marginTop={4} marginBottom={2} textAlign='center'>
        <Button component={Link} to='/signup' variant='contained' color='primary' style={{ textDecoration: 'none', marginLeft: '10px' }}>
          Sign Up
        </Button>
      </Box>
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
