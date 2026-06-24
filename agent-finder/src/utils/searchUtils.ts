/**
 * Search utility functions for the Agent Finder component
 */

import { Agent } from '../types/agent';

/**
 * Debounce function to limit how often a function can be called
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Search agents by query string
 * @param agents - List of agents to search
 * @param query - Search query
 * @returns Filtered list of agents matching the query
 */
export function searchAgents(agents: Agent[], query: string): Agent[] {
  if (!query.trim()) {
    return agents;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return agents.filter(agent => {
    // Search in name
    if (agent.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search in skills
    if (agent.skills.some(skill => skill.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    
    // Search in teams
    if (agent.teams.some(team => team.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    
    // Search in platform
    if (agent.platform.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    return false;
  });
}

/**
 * Highlight matching text in a string
 * @param text - Original text
 * @param query - Search query to highlight
 * @returns Object with parts array containing highlighted segments
 */
export function highlightMatch(text: string, query: string): { parts: { text: string; highlight: boolean }[] } {
  if (!query.trim()) {
    return { parts: [{ text, highlight: false }] };
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();
  const parts: { text: string; highlight: boolean }[] = [];
  
  let lastIndex = 0;
  let index = normalizedText.indexOf(normalizedQuery);
  
  while (index !== -1) {
    // Add non-matching part
    if (index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, index),
        highlight: false
      });
    }
    
    // Add matching part
    parts.push({
      text: text.substring(index, index + normalizedQuery.length),
      highlight: true
    });
    
    lastIndex = index + normalizedQuery.length;
    index = normalizedText.indexOf(normalizedQuery, lastIndex);
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      highlight: false
    });
  }
  
  return { parts };
}

/**
 * Get search suggestions based on available data
 * @param agents - List of all agents
 * @param query - Current search query
 * @param maxSuggestions - Maximum number of suggestions to return
 * @returns Array of search suggestions
 */
export function getSearchSuggestions(
  agents: Agent[],
  query: string,
  maxSuggestions: number = 5
): string[] {
  if (!query.trim()) {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  const suggestions = new Set<string>();
  
  // Add name suggestions
  agents.forEach(agent => {
    if (agent.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(agent.name);
    }
  });
  
  // Add skill suggestions
  const allSkills = new Set<string>();
  agents.forEach(agent => {
    agent.skills.forEach(skill => {
      if (skill.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(skill);
      }
      allSkills.add(skill);
    });
  });
  
  // Add team suggestions
  agents.forEach(agent => {
    agent.teams.forEach(team => {
      if (team.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(team);
      }
    });
  });
  
  // Convert to array and limit
  return Array.from(suggestions).slice(0, maxSuggestions);
}

/**
 * Check if the search query is valid
 * @param query - Search query to validate
 * @returns Boolean indicating if the query is valid
 */
export function isValidSearchQuery(query: string): boolean {
  // Minimum 2 characters for search
  return query.trim().length >= 2;
}

/**
 * Format search results count text
 * @param count - Number of results
 * @returns Formatted text
 */
export function formatSearchResultsCount(count: number): string {
  if (count === 0) {
    return 'No agents found';
  } else if (count === 1) {
    return '1 agent found';
  } else {
    return `${count} agents found`;
  }
}