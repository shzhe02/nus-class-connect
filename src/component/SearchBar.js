import React, { useState, useEffect } from 'react';
import courseData from '../extracted_modules.json'; // Import JSON data containing course information
import './SearchBar.css'; // Import CSS file for styling

function SearchBar({ onSearch, onAddCourse }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0); // Track selected option index

  useEffect(() => {
    // Extract course options from the imported JSON file
    setCourseOptions(courseData.map(course => course.courseName));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);

    // Filter course options based on the user input
    const filtered = courseOptions.filter(course =>
      course.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };


  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // If there are filtered options, add the current selected option to the course list
      if (filteredOptions.length > 0) {
        onAddCourse(filteredOptions[selectedOptionIndex]);
        setSearchQuery("");
      }
    } else if (e.key === "ArrowUp") {
      // Move selection up
      e.preventDefault(); // Prevent scrolling
      setSelectedOptionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "ArrowDown") {
      // Move selection down
      e.preventDefault(); // Prevent scrolling
      setSelectedOptionIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
      );
    }
  };
  

  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index);
    setSearchQuery(filteredOptions[index]);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search for courses..."
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="SearchBar-input" // Apply styling class
      />
      {isFocused && searchQuery && (
        <div className="SearchBar-dropdown">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className={index === selectedOptionIndex ? "selected" : ""}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
