import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const SearchBar = ({ onSearch, resources }) => {
  const [searchText, setSearchText] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const searchRef = useRef(null);

  // Handle clicks outside of search component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowRecommendations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text);

    // Generate recommendations based on input
    if (text.trim()) {
      const filtered = resources
        .filter(resource => 
          resource.title.toLowerCase().includes(text.toLowerCase()) ||
          resource.author.toLowerCase().includes(text.toLowerCase()) ||
          resource.type.toLowerCase().includes(text.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 recommendations
      setRecommendations(filtered);
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      setShowRecommendations(false);
    }
  };

  const handleRecommendationClick = (resource) => {
    setSearchText(resource.title);
    onSearch(resource.title);
    setShowRecommendations(false);
  };

  return (
    <div className="relative w-96" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for resources like 'theme'"
          className="w-full px-4 py-2 bg-gray-100 rounded-lg pr-10"
          onFocus={() => {
            if (recommendations.length > 0) {
              setShowRecommendations(true);
            }
          }}
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Recommendations dropdown */}
      {showRecommendations && recommendations.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {recommendations.map((resource, index) => (
            <button
              key={index}
              onClick={() => handleRecommendationClick(resource)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
            >
              <div>
                <div className="font-medium">{resource.title}</div>
                <div className="text-sm text-gray-500">
                  {resource.author} • {resource.type}
                </div>
              </div>
              <ArrowRight 
                size={16} 
                className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showRecommendations && searchText && recommendations.length === 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500">
          No matching resources found
        </div>
      )}
    </div>
  );
};

export default SearchBar;