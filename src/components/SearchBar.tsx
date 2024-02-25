import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import courseData from '../utils/extracted_modules.json';
import './SearchBar.css';

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
        setFilteredOptions([]); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);

    // Filter course options based on the user input
    const filtered = courseOptions.filter(course => course.toLowerCase().startsWith(query.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const handleInputFocus = () => {
    setSelectedOptionIndex(0);
    // setIsFocused(true);
  };

  const handleInputBlur = () => {
    // setIsFocused(false);
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

  const handleSelect = () => {
    setSelectedOptionIndex(0);
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
    <div className='SearchBar'>
      <input
        type='text'
        placeholder='Search for courses...'
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
        className='SearchBar-input'
      />
      {searchQuery && (
        <div ref={dropdownRef} className='SearchBar-dropdown'>
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleOptionClick(index)}
              className={index === selectedOptionIndex ? 'SearchBar-dropdown-selected' : ''}
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
