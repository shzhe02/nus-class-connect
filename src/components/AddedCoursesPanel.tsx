import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './AddedCoursesPanel.css';

interface Props {
  courses: string[];
  onDeleteCourse: (index: number) => void;
}

const AddedCoursesPanel: React.FC<Props> = ({ courses, onDeleteCourse }) => {
  const handleDelete = (index: number) => {
    onDeleteCourse(index);
  };

  return (
    <div className='Added-courses-panel'>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <span className='course-name'>{course}</span>
            <FaTrash onClick={() => handleDelete(index)} className='delete-icon' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddedCoursesPanel;
