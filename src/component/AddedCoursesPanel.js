import React from 'react';
import './AddedCoursesPanel.css'; // Import CSS file for styling

function AddedCoursesPanel({ courses }) {
  return (
    <div className="Added-courses-panel">
      <h2>Added Courses</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddedCoursesPanel;
