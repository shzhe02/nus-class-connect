import React from 'react';
import { Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { Course } from '../types/Course';

interface Props {
  courses: Course[];
  onDeleteCourse: (index: number) => void;
}

const AddedCoursesPanel: React.FC<Props> = ({ courses, onDeleteCourse }) => {
  const handleDelete = (index: number) => {
    onDeleteCourse(index);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={4} key={index}>
            {/* Three columns, xs=4 for small screens */}
            <List>
              <ListItem>
                <ListItemText primary={course.courseName} />
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AddedCoursesPanel;
