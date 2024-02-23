import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './AddedCoursesPanel.css';

function AddedCoursesPanel({ courses, onDeleteCourse }) {
  const handleDelete = (index) => {
    onDeleteCourse(index);
  };

  return (
    <div className="Added-courses-panel">
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <span className="course-name">{course}</span>
            <FaTrash onClick={() => handleDelete(index)} className="delete-icon" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddedCoursesPanel;
