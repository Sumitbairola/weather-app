import React, { useState } from 'react';

const SearchBox = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const apiKey = '3e98c8154b85c153a49e18252d5305c4'; 

  const handleInputChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {  // Start searching when the user has typed 3 or more characters
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${term}&limit=5&appid=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowDropdown(true); // Show dropdown when suggestions are available
    } else {
      setSuggestions([]);
      setShowDropdown(false); // Hide dropdown when search term is too short
    }
  };

  const handleCityClick = (city) => {
    setSearchTerm(city.name);
    setShowDropdown(false);
    onCitySelect(city); // Pass the selected city object (with lat/lon) to parent
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleCityClick(suggestions[0]); // Select the first suggestion on Enter
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="city-input" 
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="dropdown">
          {suggestions.map((city) => (
            <li
              key={`${city.lat}-${city.lon}`}
              onMouseDown={() => handleCityClick(city)}  // Use onMouseDown to ensure city selection
              style={{ cursor: 'pointer' }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
