import React, { useState } from 'react';
import AvailabilityFilter from './filters/AvailabilityFilter';
import SkillsFilter from './filters/SkillsFilter';
import TeamsFilter from './filters/TeamsFilter';
import { FilterState } from '../../types/filters';
import { AgentStatus, Platform } from '../../types/agent';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  // Track which sections are expanded (for mobile accordion)
  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    skills: true,
    teams: true,
    platforms: true
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Handle status filter changes
  const handleStatusChange = (status: AgentStatus[]) => {
    onFilterChange({
      ...filters,
      status
    });
  };

  // Handle skills filter changes
  const handleSkillsChange = (skills: string[]) => {
    onFilterChange({
      ...filters,
      skills
    });
  };

  // Handle teams filter changes
  const handleTeamsChange = (teams: string[]) => {
    onFilterChange({
      ...filters,
      teams
    });
  };

  // Handle platform filter changes
  const handlePlatformChange = (platforms: Platform[]) => {
    onFilterChange({
      ...filters,
      platforms
    });
  };

  // Check if any filters are active
  const hasActiveFilters = 
    filters.status.length > 0 || 
    filters.skills.length > 0 || 
    filters.teams.length > 0 || 
    filters.platforms.length > 0;

  return (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <h2 className="filter-panel__title">Filters</h2>
        {hasActiveFilters && (
          <button 
            className="filter-panel__reset-button"
            onClick={onResetFilters}
            aria-label="Reset all filters"
          >
            Reset filters
          </button>
        )}
      </div>

      <div className="filter-panel__sections">
        {/* Availability Filter Section */}
        <div className="filter-panel__section">
          <button 
            className="filter-panel__section-header"
            onClick={() => toggleSection('availability')}
            aria-expanded={expandedSections.availability}
          >
            <h3 className="filter-panel__section-title">Availability</h3>
            <span className={`filter-panel__section-icon ${expandedSections.availability ? 'expanded' : ''}`}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d={expandedSections.availability ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"} 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          
          {expandedSections.availability && (
            <div className="filter-panel__section-content">
              <AvailabilityFilter 
                selectedStatuses={filters.status}
                onChange={handleStatusChange}
              />
            </div>
          )}
        </div>

        {/* Skills Filter Section */}
        <div className="filter-panel__section">
          <button 
            className="filter-panel__section-header"
            onClick={() => toggleSection('skills')}
            aria-expanded={expandedSections.skills}
          >
            <h3 className="filter-panel__section-title">Skills</h3>
            <span className={`filter-panel__section-icon ${expandedSections.skills ? 'expanded' : ''}`}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d={expandedSections.skills ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"} 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          
          {expandedSections.skills && (
            <div className="filter-panel__section-content">
              <SkillsFilter 
                selectedSkills={filters.skills}
                onChange={handleSkillsChange}
              />
            </div>
          )}
        </div>

        {/* Teams Filter Section */}
        <div className="filter-panel__section">
          <button 
            className="filter-panel__section-header"
            onClick={() => toggleSection('teams')}
            aria-expanded={expandedSections.teams}
          >
            <h3 className="filter-panel__section-title">Teams</h3>
            <span className={`filter-panel__section-icon ${expandedSections.teams ? 'expanded' : ''}`}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d={expandedSections.teams ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"} 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          
          {expandedSections.teams && (
            <div className="filter-panel__section-content">
              <TeamsFilter 
                selectedTeams={filters.teams}
                onChange={handleTeamsChange}
              />
            </div>
          )}
        </div>

        {/* Platforms Filter Section */}
        <div className="filter-panel__section">
          <button 
            className="filter-panel__section-header"
            onClick={() => toggleSection('platforms')}
            aria-expanded={expandedSections.platforms}
          >
            <h3 className="filter-panel__section-title">Platforms</h3>
            <span className={`filter-panel__section-icon ${expandedSections.platforms ? 'expanded' : ''}`}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d={expandedSections.platforms ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"} 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          
          {expandedSections.platforms && (
            <div className="filter-panel__section-content">
              <div className="filter-panel__platform-options">
                {['salesforce', 'zendesk', 'internal'].map((platform) => (
                  <label key={platform} className="filter-panel__checkbox-label">
                    <input
                      type="checkbox"
                      className="filter-panel__checkbox"
                      checked={filters.platforms.includes(platform as Platform)}
                      onChange={(e) => {
                        const newPlatforms = e.target.checked
                          ? [...filters.platforms, platform as Platform]
                          : filters.platforms.filter(p => p !== platform);
                        handlePlatformChange(newPlatforms);
                      }}
                    />
                    <span className="filter-panel__checkbox-text">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filter-panel__footer">
        <p className="filter-panel__tip">
          <span className="filter-panel__tip-icon">💡</span>
          <span className="filter-panel__tip-text">
            Tip: Use Alt+A to quickly toggle Available filter
          </span>
        </p>
      </div>
    </div>
  );
};

export default FilterPanel;