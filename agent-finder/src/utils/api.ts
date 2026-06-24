/**
 * API integration functions for the Agent Finder component
 */

import { Agent, AgentResponse, AgentFilterParams } from '../types/agent';

// Base API URL - in a real app, this would come from environment variables
const API_BASE_URL = '/api';

// Fetch agents with optional filter parameters
export async function fetchAgents(params?: AgentFilterParams): Promise<Agent[]> {
  try {
    // In a real implementation, we would use these params to build the query
    const queryParams = new URLSearchParams();
    
    if (params?.status?.length) {
      params.status.forEach(status => queryParams.append('status', status));
    }
    
    if (params?.skills?.length) {
      params.skills.forEach(skill => queryParams.append('skill', skill));
    }
    
    if (params?.teams?.length) {
      params.teams.forEach(team => queryParams.append('team', team));
    }
    
    if (params?.platforms?.length) {
      params.platforms.forEach(platform => queryParams.append('platform', platform));
    }
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    
    if (params?.pageSize) {
      queryParams.append('pageSize', params.pageSize.toString());
    }
    
    if (params?.sortBy) {
      queryParams.append('sortBy', params.sortBy);
      queryParams.append('sortDirection', params.sortDirection || 'asc');
    }
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    // For demo purposes, we'll use mock data instead of making a real API call
    // In a real app, this would be:
    // const response = await fetch(`${API_BASE_URL}/agents${queryString}`);
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // const data: AgentResponse = await response.json();
    // return data.agents;
    
    return getMockAgents(params);
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw new Error('Failed to fetch agents. Please try again later.');
  }
}

// Fetch available filter options (skills, teams)
export async function fetchFilterOptions(): Promise<{ skills: string[], teams: string[] }> {
  try {
    // In a real app, this would be:
    // const response = await fetch(`${API_BASE_URL}/filter-options`);
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // return await response.json();
    
    // Mock data for demo
    return {
      skills: [
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
      ],
      teams: [
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
      ]
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw new Error('Failed to fetch filter options. Please try again later.');
  }
}

// Mock data generator for demo purposes
function getMockAgents(params?: AgentFilterParams): Agent[] {
  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatarUrl: null,
      status: 'available',
      platform: 'salesforce',
      workload: 35,
      skills: ['Customer Support', 'Billing', 'Refunds'],
      teams: ['Customer Success'],
      metrics: {
        avgResponseTime: 3,
        satisfaction: 95
      },
      lastActive: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Jamie Smith',
      avatarUrl: null,
      status: 'busy',
      platform: 'zendesk',
      workload: 75,
      skills: ['Technical Support', 'API Support', 'Troubleshooting'],
      teams: ['Technical Support'],
      metrics: {
        avgResponseTime: 5,
        satisfaction: 88
      },
      lastActive: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Taylor Wilson',
      avatarUrl: null,
      status: 'offline',
      platform: 'internal',
      workload: 0,
      skills: ['Sales', 'Enterprise', 'Account Management'],
      teams: ['Sales', 'Enterprise Support'],
      metrics: {
        avgResponseTime: 8,
        satisfaction: 92
      },
      lastActive: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    {
      id: '4',
      name: 'Morgan Lee',
      avatarUrl: null,
      status: 'available',
      platform: 'salesforce',
      workload: 50,
      skills: ['Customer Support', 'Onboarding', 'Product Knowledge'],
      teams: ['Onboarding', 'Customer Success'],
      metrics: {
        avgResponseTime: 2,
        satisfaction: 97
      },
      lastActive: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Casey Brown',
      avatarUrl: null,
      status: 'busy',
      platform: 'zendesk',
      workload: 90,
      skills: ['Technical Support', 'Mobile Support', 'Desktop Support'],
      teams: ['Technical Support'],
      metrics: {
        avgResponseTime: 7,
        satisfaction: 85
      },
      lastActive: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Jordan Miller',
      avatarUrl: null,
      status: 'available',
      platform: 'internal',
      workload: 20,
      skills: ['Billing', 'Refunds', 'Complaints'],
      teams: ['Billing Support'],
      metrics: {
        avgResponseTime: 4,
        satisfaction: 90
      },
      lastActive: new Date().toISOString()
    },
    {
      id: '7',
      name: 'Riley Davis',
      avatarUrl: null,
      status: 'offline',
      platform: 'salesforce',
      workload: 0,
      skills: ['VIP Support', 'Escalations', 'Enterprise'],
      teams: ['VIP Support', 'Escalations'],
      metrics: {
        avgResponseTime: 1,
        satisfaction: 99
      },
      lastActive: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: '8',
      name: 'Quinn Martinez',
      avatarUrl: null,
      status: 'busy',
      platform: 'zendesk',
      workload: 65,
      skills: ['International', 'Customer Support', 'Returns'],
      teams: ['International Support'],
      metrics: {
        avgResponseTime: 6,
        satisfaction: 91
      },
      lastActive: new Date().toISOString()
    },
    {
      id: '9',
      name: 'Avery Rodriguez',
      avatarUrl: null,
      status: 'available',
      platform: 'internal',
      workload: 45,
      skills: ['SMB', 'Sales', 'Account Management'],
      teams: ['Sales', 'SMB Support'],
      metrics: {
        avgResponseTime: 3,
        satisfaction: 93
      },
      lastActive: new Date().toISOString()
    }
  ];

  // Apply filters if provided
  let filteredAgents = [...mockAgents];
  
  if (params) {
    // Filter by status
    if (params.status && params.status.length > 0) {
      filteredAgents = filteredAgents.filter(agent => 
        params.status!.includes(agent.status)
      );
    }
    
    // Filter by skills
    if (params.skills && params.skills.length > 0) {
      filteredAgents = filteredAgents.filter(agent => 
        params.skills!.some(skill => agent.skills.includes(skill))
      );
    }
    
    // Filter by teams
    if (params.teams && params.teams.length > 0) {
      filteredAgents = filteredAgents.filter(agent => 
        params.teams!.some(team => agent.teams.includes(team))
      );
    }
    
    // Filter by platforms
    if (params.platforms && params.platforms.length > 0) {
      filteredAgents = filteredAgents.filter(agent => 
        params.platforms!.includes(agent.platform)
      );
    }
    
    // Filter by search query
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredAgents = filteredAgents.filter(agent => 
        agent.name.toLowerCase().includes(searchLower) || 
        agent.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    if (params.sortBy) {
      filteredAgents.sort((a, b) => {
        const direction = params.sortDirection === 'desc' ? -1 : 1;
        
        switch (params.sortBy) {
          case 'status':
            // Sort by status priority: available, busy, offline
            const statusPriority = { 'available': 0, 'busy': 1, 'offline': 2 };
            return direction * (statusPriority[a.status] - statusPriority[b.status]);
            
          case 'workload':
            return direction * (a.workload - b.workload);
            
          case 'name':
            return direction * a.name.localeCompare(b.name);
            
          case 'lastActive':
            const aTime = a.lastActive ? new Date(a.lastActive).getTime() : 0;
            const bTime = b.lastActive ? new Date(b.lastActive).getTime() : 0;
            return direction * (bTime - aTime); // Most recent first by default
            
          default:
            return 0;
        }
      });
    }
    
    // Apply pagination
    if (params.page !== undefined && params.pageSize) {
      const start = (params.page - 1) * params.pageSize;
      const end = start + params.pageSize;
      filteredAgents = filteredAgents.slice(start, end);
    }
  }
  
  return filteredAgents;
}