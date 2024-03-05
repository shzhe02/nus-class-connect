import React, { useState } from 'react';
import { Grid, List, ListItem, ListItemText, IconButton, Box, Popover, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { Course } from '../types/Course';

interface Props {
  courses: Course[];
  onUpdateCourse: (courses: Course[]) => void; // Updated onDeleteCourse function type
}

const AddedCoursesPanel: React.FC<Props> = ({ courses, onUpdateCourse }) => {
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLDivElement | null>(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    // Pass the original courses array as it's not being updated here
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    onUpdateCourse(newCourses);
  };

  const handleColorPickerClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setColorPickerAnchor(event.currentTarget);
    setSelectedCourseIndex(index);
  };

  const handleCloseColorPicker = () => {
    setColorPickerAnchor(null);
    setSelectedCourseIndex(null);
  };

  const handleChangeColor = (color: string) => {
    if (selectedCourseIndex !== null) {
      // Update the color of the selected course
      const updatedCourses = [...courses];
      updatedCourses[selectedCourseIndex].color = color;
      // Update the state by calling onDeleteCourse function with updatedCourses
      onUpdateCourse(updatedCourses);
    }
    handleCloseColorPicker();
  };

  return (
    <div>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={4} key={index}>
            {/* Three columns, xs=4 for small screens */}
            <List>
              <ListItem>
                {/* Added a Box to display the color */}
                <Box
                  style={{ backgroundColor: course.color, width: '20px', height: '20px', marginRight: '8px', cursor: 'pointer' }}
                  onClick={event => handleColorPickerClick(event, index)}
                ></Box>
                <ListItemText primary={course.courseName} />
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
      <Popover
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={handleCloseColorPicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          <Button onClick={() => handleChangeColor('red')} style={{ backgroundColor: 'red', marginRight: '8px' }}></Button>
          <Button onClick={() => handleChangeColor('green')} style={{ backgroundColor: 'green', marginRight: '8px' }}></Button>
          <Button onClick={() => handleChangeColor('blue')} style={{ backgroundColor: 'blue', marginRight: '8px' }}></Button>
          {/* Add more buttons for other colors */}
        </Box>
      </Popover>
    </div>
  );
};

export default AddedCoursesPanel;
