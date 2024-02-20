import React, { useState } from 'react';
import './Homepage.css';
import Timetable from './Timetable';

function Homepage() {
  // State to store added courses
  const [courses, setCourses] = useState([]);

  // Function to handle adding a new course
  const handleAddCourse = (course) => {
    setCourses([...courses, course]);
  };

  return (
    <div className="Homepage-container">

      {/* Timetable frame */}
      <div className="Timetable-frame">

        {/* Timetable component */}
        <Timetable />

        {/* Search bar to add more courses */}
        <input
          type="text"
          placeholder="Search for courses..."
          // You can handle searching functionality here
        />
        {/* Button to add course */}
        <button onClick={() => handleAddCourse("New Course")}>Add Course</button>
        
        {/* Panel to show added courses */}
        <div className="Added-courses-panel">
          <h2>Added Courses</h2>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
