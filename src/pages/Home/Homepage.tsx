import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
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
    <div className='Homepage-container'>
      <header className='Homepage-header'>
        <p>Week {getCurrentWeekOfYear()} of the year</p>
        <Link to='/signup' className='Profile-link'>
          Sign Up
        </Link>{' '}
        {/* Link to sign-up page */}
      </header>
      <div className='Timetable-frame'>
        <Timetable />
        <SearchBar onSearch={handleSearch} onAddCourse={handleAddCourse} />
        <AddedCoursesPanel courses={courses} onDeleteCourse={handleDeleteCourse} />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
