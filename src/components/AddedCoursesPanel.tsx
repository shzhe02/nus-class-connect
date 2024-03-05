import React, { useState } from 'react';
import { Grid, List, ListItem, ListItemText, IconButton, Box, Popover } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ChromePicker } from 'react-color'; // Import ChromePicker from react-color
import type { Course } from '../types/Course';

interface Props {
  courses: Course[];
  onUpdateCourse: (courses: Course[]) => void;
}

const AddedCoursesPanel: React.FC<Props> = ({ courses, onUpdateCourse }) => {
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff'); // Initial color: white
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    onUpdateCourse(newCourses);
  };

  const handleBoxClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedCourseIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedCourseIndex(null);
  };

  const handleColorChange = (color: { hex: string }) => {
    setSelectedColor(color.hex);
    if (selectedCourseIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[selectedCourseIndex].color = color.hex;
      onUpdateCourse(updatedCourses);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={4} key={index}>
            <List>
              <ListItem>
                <Box
                  style={{
                    backgroundColor: course.color,
                    width: '20px',
                    height: '20px',
                    marginRight: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={event => handleBoxClick(event, index)}
                />
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
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
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
          <ChromePicker color={selectedColor} onChange={handleColorChange} />
        </Box>
      </Popover>
    </div>
  );
};

export default AddedCoursesPanel;
