import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
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

  return (
    <Container maxWidth='lg'>
      <Box marginTop={4} marginBottom={2} textAlign='center'>
        <Button component={Link} to='/signup' variant='contained' color='primary' style={{ textDecoration: 'none', marginLeft: '10px' }}>
          Sign Up
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <Timetable />
        </Grid>
        <Grid item xs={12}>
          <SearchBar onSearch={handleSearch} onAddCourse={handleAddCourse} />
        </Grid>
        <Grid item xs={12}>
          <AddedCoursesPanel courses={courses} onDeleteCourse={handleDeleteCourse} />
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Homepage;
