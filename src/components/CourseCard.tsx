import React from 'react';
import type { ClassData } from '../types/ClassData';

interface CourseCardProps {
  courses: ClassData[];
}

const CourseCard: React.FC<CourseCardProps> = ({ courses }) => {
  return <div style={{ position: 'absolute', width: 100, height: 100, backgroundColor: 'blue' }}></div>;
};

export default CourseCard;
