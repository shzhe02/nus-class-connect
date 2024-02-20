import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Homepage.css';
import Timetable from './Timetable';
import SearchBar from './SearchBar';
import AddedCoursesPanel from './AddedCoursesPanel';

function Homepage() {
  // State to store added courses
  const [courses, setCourses] = useState([]);

  // Function to handle adding a new course
  const handleAddCourse = (course) => {
    setCourses([...courses, course]);
  };

  // Function to handle searching for courses
  const handleSearch = (searchQuery) => {
    // Implement search functionality here
    console.log("Search query:", searchQuery);
  };

  // Function to get the current week of the year
  const getCurrentWeekOfYear = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekOfYear = Math.floor(diff / oneWeek);
    return weekOfYear;
  };

  return (
    <div className="Homepage-container">
      <header className="Homepage-header">
        <p>Week {getCurrentWeekOfYear()} of the year</p>
        <Link to="/signup" className="Profile-link">Sign Up</Link> {/* Link to sign-up page */}
      </header>
      <div className="Timetable-frame">
        <Timetable />
        <SearchBar onSearch={handleSearch} onAddCourse={handleAddCourse} />
        <AddedCoursesPanel courses={courses} />
      </div>
    </div>
  );
}

export default Homepage;
