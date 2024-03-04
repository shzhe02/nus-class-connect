import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { TextField, List, ListItem, ListItemText, Paper } from '@mui/material';
import courseData from '../utils/extracted_modules.json';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAddCourse: (course: string) => void;
}

function SearchBar({ onSearch, onAddCourse }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extract course options from the imported JSON file
    setCourseOptions(courseData.map(course => course.courseName));
  }, []);

  useEffect(() => {
    // Function to close dropdown when clicking outside the SearchBar
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Hide the dropdown by setting its height to 0
        dropdownRef.current.style.maxHeight = '0px';
        setFilteredOptions([]); // Clear filtered options
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Reset selectedOptionIndex to 0 whenever the searchQuery changes
    setSelectedOptionIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    // Scroll to the selected option if it's out of view
    if (dropdownRef.current && selectedOptionIndex !== null) {
      const listItemHeight = 48; // Height of each ListItem (adjust as needed)
      const dropdownHeight = dropdownRef.current.clientHeight;
      const scrollTop = listItemHeight * selectedOptionIndex;
      const scrollBottom = scrollTop + listItemHeight;

      // If the selected option is below the visible area, scroll down to make it visible
      if (scrollBottom > dropdownRef.current.scrollTop + dropdownHeight) {
        dropdownRef.current.scrollTop = scrollBottom - dropdownHeight;
      }

      // If the selected option is above the visible area, scroll up to make it visible
      if (scrollTop < dropdownRef.current.scrollTop) {
        dropdownRef.current.scrollTop = scrollTop;
      }
    }
  }, [selectedOptionIndex]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (dropdownRef.current) {
      // Reset the dropdown height to 200
      dropdownRef.current.style.maxHeight = '200px';
    }

    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);

    // Filter course options based on the user input
    const filtered = courseOptions.filter(course => course.toLowerCase().startsWith(query.toLowerCase()));
    setFilteredOptions(filtered);
    if (dropdownRef.current && filtered.length === 0) {
      dropdownRef.current.style.maxHeight = '0px';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // If there are filtered options, add the current selected option to the course list
      if (filteredOptions.length > 0) {
        onAddCourse(filteredOptions[selectedOptionIndex]);
        setSearchQuery('');
      }
    } else if (e.key === 'ArrowUp') {
      // Move selection up
      e.preventDefault(); // Prevent scrolling
      setSelectedOptionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1));
    } else if (e.key === 'ArrowDown') {
      // Move selection down
      e.preventDefault(); // Prevent scrolling
      setSelectedOptionIndex(prevIndex => (prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0));
    }
  };

  const handleOptionClick = (index: number) => {
    setSelectedOptionIndex(index);
    setSearchQuery('');
    onAddCourse(filteredOptions[index]);
  };

  const handleMouseEnter = (index: number) => {
    setSelectedOptionIndex(index);
  };

  return (
    <div>
      <TextField
        fullWidth
        label='Search for courses...'
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (dropdownRef.current) {
            // Reset the dropdown height to 200
            dropdownRef.current.style.maxHeight = '200px';
          }

          setSearchQuery(searchQuery);
          onSearch(searchQuery);

          // Filter course options based on the user input
          const filtered = courseOptions.filter(course => course.toLowerCase().startsWith(searchQuery.toLowerCase()));
          setFilteredOptions(filtered);
          if (dropdownRef.current && filtered.length === 0) {
            dropdownRef.current.style.maxHeight = '0px';
          }
        }}
      />
      {searchQuery && (
        <Paper ref={dropdownRef} style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <List>
            {filteredOptions.map((option, index) => (
              <ListItem
                key={index}
                button
                selected={index === selectedOptionIndex}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => handleOptionClick(index)}
              >
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

export default SearchBar;
