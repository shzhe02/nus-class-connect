import React, { useState } from 'react';
import './SearchBar.css'; // Import CSS file for styling

function SearchBar({ onSearch, onAddCourse }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleAddClick = () => {
    onAddCourse(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search for courses..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="SearchBar-input" // Apply styling class
      />
      <button onClick={handleAddClick} className="SearchBar-button">Add Course</button> {/* Apply styling class */}
    </div>
  );
}

export default SearchBar;
