/**
 * Filter utility functions for the Agent Finder component
 */

import { Agent, AgentStatus, Platform } from '../types/agent';
import { FilterState } from '../types/filters';

/**
 * Filter agents based on the current filter state
 * @param agents - List of agents to filter
 * @param filters - Current filter state
 * @returns Filtered list of agents
 */
export function filterAgents(agents: Agent[], filters: FilterState): Agent[] {
  return agents.filter(agent => {
    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(agent.status)) {
      return false;
    }
    
    // Skills filter (agent must have at least one of the selected skills)
    if (filters.skills.length > 0 && !filters.skills.some(skill => agent.skills.includes(skill))) {
      return false;
    }
    
    // Teams filter (agent must be in at least one of the selected teams)
    if (filters.teams.length > 0 && !filters.teams.some(team => agent.teams.includes(team))) {
      return false;
    }
    
    // Platform filter
    if (filters.platforms.length > 0 && !filters.platforms.includes(agent.platform)) {
      return false;
    }
    
    return true;
  });
}

/**
 * Sort agents based on specified criteria
 * @param agents - List of agents to sort
 * @param sortBy - Sort field
 * @param sortDirection - Sort direction (asc or desc)
 * @returns Sorted list of agents
 */
export function sortAgents(
  agents: Agent[], 
  sortBy: 'status' | 'workload' | 'name' | 'lastActive' = 'status',
  sortDirection: 'asc' | 'desc' = 'asc'
): Agent[] {
  const sortedAgents = [...agents];
  const direction = sortDirection === 'desc' ? -1 : 1;
  
  sortedAgents.sort((a, b) => {
    switch (sortBy) {
      case 'status':
        // Sort by status priority: available, busy, offline
        const statusPriority: Record<AgentStatus, number> = { 
          'available': 0, 
          'busy': 1, 
          'offline': 2 
        };
        return direction * (statusPriority[a.status] - statusPriority[b.status]);
        
      case 'workload':
        return direction * (a.workload - b.workload);
        
      case 'name':
        return direction * a.name.localeCompare(b.name);
        
      case 'lastActive':
        const aTime = a.lastActive ? new Date(a.lastActive).getTime() : 0;
        const bTime = b.lastActive ? new Date(b.lastActive).getTime() : 0;
        return direction * (bTime - aTime); // Most recent first for ascending
        
      default:
        return 0;
    }
  });
  
  return sortedAgents;
}

/**
 * Get unique skills from all agents
 * @param agents - List of agents
 * @returns Array of unique skills
 */
export function extractUniqueSkills(agents: Agent[]): string[] {
  const skillsSet = new Set<string>();
  
  agents.forEach(agent => {
    agent.skills.forEach(skill => {
      skillsSet.add(skill);
    });
  });
  
  return Array.from(skillsSet).sort();
}

/**
 * Get unique teams from all agents
 * @param agents - List of agents
 * @returns Array of unique teams
 */
export function extractUniqueTeams(agents: Agent[]): string[] {
  const teamsSet = new Set<string>();
  
  agents.forEach(agent => {
    agent.teams.forEach(team => {
      teamsSet.add(team);
    });
  });
  
  return Array.from(teamsSet).sort();
}

/**
 * Check if any filters are active
 * @param filters - Current filter state
 * @returns Boolean indicating if any filters are active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.status.length > 0 ||
    filters.skills.length > 0 ||
    filters.teams.length > 0 ||
    filters.platforms.length > 0
  );
}

/**
 * Create an empty filter state
 * @returns Empty filter state
 */
export function createEmptyFilterState(): FilterState {
  return {
    status: [],
    skills: [],
    teams: [],
    platforms: []
  };
}

/**
 * Toggle a filter value in an array
 * @param array - Current array of values
 * @param value - Value to toggle
 * @returns New array with value toggled
 */
export function toggleFilterValue<T>(array: T[], value: T): T[] {
  if (array.includes(value)) {
    return array.filter(item => item !== value);
  } else {
    return [...array, value];
  }
}