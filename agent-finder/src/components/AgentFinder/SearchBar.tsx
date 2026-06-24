import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialValue);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  // Handle clear search
  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+/ or Cmd+/ to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
      
      // ESC to clear search when focused
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        e.preventDefault();
        handleClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="search-bar">
      <div className="search-bar__container" role="search">
        <div className="search-bar__icon">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M14.5 14.5L10.5 10.5M12 6.5C12 9.26142 9.76142 11.5 7 11.5C4.23858 11.5 2 9.26142 2 6.5C2 3.73858 4.23858 1.5 7 1.5C9.76142 1.5 12 3.73858 12 6.5Z" 
              stroke="#6B7280" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <input
          ref={searchInputRef}
          type="text"
          className="search-bar__input"
          placeholder="Search agents"
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search agents"
        />
        
        {searchQuery && (
          <button 
            className="search-bar__clear" 
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M12 4L4 12M4 4L12 12" 
                stroke="#6B7280" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        
        <div className="search-bar__shortcut" aria-hidden="true">
          <kbd className="search-bar__kbd">Ctrl</kbd>
          <span className="search-bar__kbd-plus">+</span>
          <kbd className="search-bar__kbd">/</kbd>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;