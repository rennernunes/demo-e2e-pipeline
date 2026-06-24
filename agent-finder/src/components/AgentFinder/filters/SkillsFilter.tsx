import React, { useState, useEffect, useRef } from 'react';

interface SkillsFilterProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

const SkillsFilter: React.FC<SkillsFilterProps> = ({ selectedSkills, onChange }) => {
  // Sample skills list - in a real app, this would come from an API
  const allSkills = [
    'Customer Support',
    'Technical Support',
    'Billing',
    'Account Management',
    'Sales',
    'Product Knowledge',
    'Troubleshooting',
    'Onboarding',
    'Returns',
    'Complaints',
    'Escalations',
    'VIP Support',
    'International',
    'Refunds',
    'API Support',
    'Mobile Support',
    'Desktop Support',
    'Enterprise',
    'SMB'
  ];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleSkills, setVisibleSkills] = useState<string[]>(allSkills);
  const [showAll, setShowAll] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter skills based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setVisibleSkills(allSkills);
    } else {
      const filtered = allSkills.filter(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setVisibleSkills(filtered);
      // When searching, always show all results
      setShowAll(true);
    }
  }, [searchQuery]);

  // Handle skill toggle
  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter(s => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
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

  // Determine which skills to display based on showAll state
  const displayedSkills = showAll ? visibleSkills : visibleSkills.slice(0, 5);
  const hasMoreToShow = !showAll && visibleSkills.length > 5;
  const hasResults = visibleSkills.length > 0;

  return (
    <div className="skills-filter">
      <div className="skills-filter__search">
        <div className="skills-filter__search-container">
          <div className="skills-filter__search-icon" aria-hidden="true">
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
            className="skills-filter__search-input"
            placeholder="Search skills"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search skills"
          />
          
          {searchQuery && (
            <button 
              className="skills-filter__search-clear" 
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
      
      <div className="skills-filter__options">
        {hasResults ? (
          <div className="skills-filter__options-list">
            {displayedSkills.map(skill => (
              <label key={skill} className="skills-filter__option">
                <input
                  type="checkbox"
                  className="skills-filter__checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <span className="skills-filter__checkbox-custom">
                  {selectedSkills.includes(skill) && (
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
                <span className="skills-filter__label">{skill}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="skills-filter__no-results">
            No skills match your search
          </div>
        )}
        
        {hasMoreToShow && (
          <button 
            className="skills-filter__show-more"
            onClick={handleToggleShowAll}
          >
            Show more ({visibleSkills.length - 5} more)
          </button>
        )}
        
        {showAll && visibleSkills.length > 5 && (
          <button 
            className="skills-filter__show-less"
            onClick={handleToggleShowAll}
          >
            Show less
          </button>
        )}
      </div>
      
      {selectedSkills.length > 0 && (
        <div className="skills-filter__selected">
          <div className="skills-filter__selected-count">
            {selectedSkills.length} selected
          </div>
          <button 
            className="skills-filter__clear-all"
            onClick={() => onChange([])}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsFilter;