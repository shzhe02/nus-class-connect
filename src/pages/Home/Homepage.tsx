import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Grid, Box, Button } from '@mui/material';
import Timetable from '@components/Timetable';
import SearchBar from '@components/SearchBar';
import AddedCoursesPanel from '@components/AddedCoursesPanel';
import Footer from '@components/Footer';

const Homepage: React.FC = () => {
  // State to store added courses
  const [courses, setCourses] = useState<string[]>([]);

  // Function to handle adding a new course
  const handleAddCourse = (course: string) => {
    setCourses([...courses, course]);
  };

  // Function to handle deleting a course
  const handleDeleteCourse = (index: number) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  // Function to handle searching for courses
  const handleSearch = (searchQuery: string) => {
    // Implement search functionality here
    console.log('Search query:', searchQuery);
  };

  // Function to get the current week of the year
  const getCurrentWeekOfYear = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekOfYear = Math.floor(diff / oneWeek);
    return weekOfYear;
  };

  return (
    <Container maxWidth='lg'>
      <Box marginTop={4} marginBottom={2} textAlign='center'>
        <Typography variant='body1'>Week {getCurrentWeekOfYear()} of the year</Typography>
        <Button component={Link} to='/signup' variant='contained' color='primary' style={{ textDecoration: 'none', marginLeft: '10px' }}>
          Sign Up
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <Timetable />
        </Grid>
        <Grid item xs={12} md={8}>
          <SearchBar onSearch={handleSearch} onAddCourse={handleAddCourse} />
        </Grid>
        <Grid item xs={12} md={8}>
          <AddedCoursesPanel courses={courses} onDeleteCourse={handleDeleteCourse} />
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Homepage;
