import React from 'react';
import { Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface Props {
  courses: string[];
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
            {' '}
            {/* Three columns, xs=4 for small screens */}
            <List>
              <ListItem>
                <ListItemText primary={course} />
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
