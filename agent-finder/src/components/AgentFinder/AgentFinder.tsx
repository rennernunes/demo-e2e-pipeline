import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import AgentGrid from './AgentGrid';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';
import { Agent, AgentStatus, Platform } from '../../types/agent';
import { FilterState } from '../../types/filters';
import { fetchAgents } from '../../utils/api';
import { debounce } from '../../utils/searchUtils';
import { filterAgents } from '../../utils/filterUtils';

import '../../styles/AgentFinder.css';

const AgentFinder: React.FC = () => {
  // State management
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    skills: [],
    teams: [],
    platforms: []
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(window.innerWidth >= 1024);

  // Load agents data
  const loadAgents = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchAgents();
      setAgents(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load agents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    loadAgents();
    
    // Auto-refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      loadAgents();
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, [loadAgents]);

  // Apply filters and search
  useEffect(() => {
    const applyFiltersAndSearch = () => {
      let result = [...agents];
      
      // Apply filters
      if (filters.status.length || filters.skills.length || filters.teams.length || filters.platforms.length) {
        result = filterAgents(result, filters);
      }
      
      // Apply search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(agent => 
          agent.name.toLowerCase().includes(query) || 
          agent.skills.some(skill => skill.toLowerCase().includes(query))
        );
      }
      
      // Sort: Available first, then by lowest workload
      result.sort((a, b) => {
        if (a.status === 'available' && b.status !== 'available') return -1;
        if (a.status !== 'available' && b.status === 'available') return 1;
        return a.workload - b.workload;
      });
      
      setFilteredAgents(result);
    };
    
    applyFiltersAndSearch();
  }, [agents, filters, searchQuery]);

  // Handle search input with debounce
  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      status: [],
      skills: [],
      teams: [],
      platforms: []
    });
    setSearchQuery('');
  };

  // Toggle filter panel visibility
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // Handle manual refresh
  const handleRefresh = () => {
    loadAgents();
  };

  // Responsive behavior for filter panel
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, respect user's last choice
      } else {
        // On mobile, always collapse
        setIsFilterPanelOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render appropriate content based on state
  const renderContent = () => {
    if (isLoading && agents.length === 0) {
      return <LoadingState />;
    }
    
    if (error) {
      return (
        <ErrorState 
          message={error} 
          onRetry={loadAgents} 
          lastUpdated={lastUpdated}
        />
      );
    }
    
    if (filteredAgents.length === 0) {
      return (
        <EmptyState 
          hasFilters={
            filters.status.length > 0 || 
            filters.skills.length > 0 || 
            filters.teams.length > 0 || 
            filters.platforms.length > 0 || 
            searchQuery.trim() !== ''
          }
          onClearFilters={handleResetFilters}
        />
      );
    }
    
    return (
      <AgentGrid 
        agents={filteredAgents} 
        isLoading={isLoading}
      />
    );
  };

  return (
    <div className="agent-finder">
      <div className="agent-finder__header">
        <h1 className="agent-finder__title">Agent Finder</h1>
        <div className="agent-finder__search-container">
          <SearchBar 
            onSearch={handleSearch} 
            initialValue={searchQuery}
          />
          <button 
            className="agent-finder__filter-toggle"
            onClick={toggleFilterPanel}
            aria-expanded={isFilterPanelOpen}
            aria-label={isFilterPanelOpen ? "Hide filters" : "Show filters"}
          >
            <span className="agent-finder__filter-toggle-icon">
              {isFilterPanelOpen ? "Hide Filters" : "Show Filters"}
            </span>
          </button>
        </div>
      </div>
      
      <div className="agent-finder__content">
        {isFilterPanelOpen && (
          <div className="agent-finder__filter-panel">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}
        
        <div className="agent-finder__results">
          <div className="agent-finder__results-header">
            <div className="agent-finder__results-count">
              {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'} found
            </div>
            <div className="agent-finder__refresh">
              <button 
                className="agent-finder__refresh-button"
                onClick={handleRefresh}
                aria-label="Refresh agent data"
              >
                Refresh
              </button>
              {lastUpdated && (
                <span className="agent-finder__last-updated">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AgentFinder;