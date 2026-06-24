import React, { useState, useEffect, useRef } from 'react';

interface TeamsFilterProps {
  selectedTeams: string[];
  onChange: (teams: string[]) => void;
}

const TeamsFilter: React.FC<TeamsFilterProps> = ({ selectedTeams, onChange }) => {
  // Sample teams list - in a real app, this would come from an API
  const allTeams = [
    'Customer Success',
    'Technical Support',
    'Sales',
    'Enterprise Support',
    'Onboarding',
    'Account Management',
    'Billing Support',
    'Product Specialists',
    'International Support',
    'VIP Support',
    'Escalations'
  ];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleTeams, setVisibleTeams] = useState<string[]>(allTeams);
  const [showAll, setShowAll] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter teams based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setVisibleTeams(allTeams);
    } else {
      const filtered = allTeams.filter(team => 
        team.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setVisibleTeams(filtered);
      // When searching, always show all results
      setShowAll(true);
    }
  }, [searchQuery]);

  // Handle team toggle
  const handleTeamToggle = (team: string) => {
    if (selectedTeams.includes(team)) {
      onChange(selectedTeams.filter(t => t !== team));
    } else {
      onChange([...selectedTeams, team]);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Toggle show all/less
  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Determine which teams to display based on showAll state
  const displayedTeams = showAll ? visibleTeams : visibleTeams.slice(0, 5);
  const hasMoreToShow = !showAll && visibleTeams.length > 5;
  const hasResults = visibleTeams.length > 0;

  return (
    <div className="teams-filter">
      <div className="teams-filter__search">
        <div className="teams-filter__search-container">
          <div className="teams-filter__search-icon" aria-hidden="true">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M13 13L9 9M10.5 5.5C10.5 8.26142 8.26142 10.5 5.5 10.5C2.73858 10.5 0.5 8.26142 0.5 5.5C0.5 2.73858 2.73858 0.5 5.5 0.5C8.26142 0.5 10.5 2.73858 10.5 5.5Z" 
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
            className="teams-filter__search-input"
            placeholder="Search teams"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search teams"
          />
          
          {searchQuery && (
            <button 
              className="teams-filter__search-clear" 
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 14 14" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" 
                  stroke="#6B7280" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="teams-filter__options">
        {hasResults ? (
          <div className="teams-filter__options-list">
            {displayedTeams.map(team => (
              <label key={team} className="teams-filter__option">
                <input
                  type="checkbox"
                  className="teams-filter__checkbox"
                  checked={selectedTeams.includes(team)}
                  onChange={() => handleTeamToggle(team)}
                />
                <span className="teams-filter__checkbox-custom">
                  {selectedTeams.includes(team) && (
                    <svg 
                      width="10" 
                      height="8" 
                      viewBox="0 0 10 8" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path 
                        d="M9 1L3.5 6.5L1 4" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="teams-filter__label">{team}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="teams-filter__no-results">
            No teams match your search
          </div>
        )}
        
        {hasMoreToShow && (
          <button 
            className="teams-filter__show-more"
            onClick={handleToggleShowAll}
          >
            Show more ({visibleTeams.length - 5} more)
          </button>
        )}
        
        {showAll && visibleTeams.length > 5 && (
          <button 
            className="teams-filter__show-less"
            onClick={handleToggleShowAll}
          >
            Show less
          </button>
        )}
      </div>
      
      {selectedTeams.length > 0 && (
        <div className="teams-filter__selected">
          <div className="teams-filter__selected-count">
            {selectedTeams.length} selected
          </div>
          <button 
            className="teams-filter__clear-all"
            onClick={() => onChange([])}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamsFilter;