/**
 * Agent data interfaces for the Agent Finder component
 */

// Agent status types
export type AgentStatus = 'available' | 'busy' | 'offline';

// Platform types
export type Platform = 'salesforce' | 'zendesk' | 'internal';

// Agent metrics interface
export interface AgentMetrics {
  avgResponseTime: number; // in minutes
  satisfaction: number; // percentage (0-100)
  resolvedTickets?: number;
  firstContactResolution?: number; // percentage (0-100)
  handlingTime?: number; // in minutes
}

// Agent interface
export interface Agent {
  id: string;
  name: string;
  avatarUrl: string | null;
  status: AgentStatus;
  platform: Platform;
  workload: number; // percentage (0-100)
  skills: string[];
  teams: string[];
  metrics: AgentMetrics;
  lastActive: string | null; // ISO date string
  languages?: string[];
  timezone?: string;
  location?: string;
  email?: string;
  phone?: string;
}

// Agent response from API
export interface AgentResponse {
  agents: Agent[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Agent filter parameters for API
export interface AgentFilterParams {
  status?: AgentStatus[];
  skills?: string[];
  teams?: string[];
  platforms?: Platform[];
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'status' | 'workload' | 'name' | 'lastActive';
  sortDirection?: 'asc' | 'desc';
}