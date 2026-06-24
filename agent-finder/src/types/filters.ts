/**
 * Filter state interfaces for the Agent Finder component
 */

import { AgentStatus, Platform } from './agent';

// Main filter state interface
export interface FilterState {
  status: AgentStatus[];
  skills: string[];
  teams: string[];
  platforms: Platform[];
}

// Filter change event interface
export interface FilterChangeEvent {
  filterType: keyof FilterState;
  value: AgentStatus[] | string[] | Platform[];
}

// Available filter options interface
export interface FilterOptions {
  skills: string[];
  teams: string[];
}

// Filter panel props interface
export interface FilterPanelProps {
  filters: FilterState;
  availableOptions?: FilterOptions;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  isLoading?: boolean;
}

// Filter section state interface
export interface FilterSectionState {
  availability: boolean;
  skills: boolean;
  teams: boolean;
  platforms: boolean;
}

// Search state interface
export interface SearchState {
  query: string;
  isSearching: boolean;
  results: number;
}