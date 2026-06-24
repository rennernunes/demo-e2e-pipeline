import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgentCard from '../../../components/AgentFinder/AgentCard';
import { Agent } from '../../../types/agent';

const mockAgent: Agent = {
  id: '1',
  name: 'John Doe',
  avatarUrl: null,
  status: 'available',
  platform: 'salesforce',
  workload: 50,
  skills: ['JavaScript', 'React', 'Node.js'],
  teams: ['Development', 'Support'],
  metrics: {
    avgResponseTime: 5,
    satisfaction: 90,
  },
  lastActive: new Date().toISOString(),
};

describe('AgentCard Component', () => {
  it('renders agent name', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders platform name', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('Salesforce')).toBeInTheDocument();
  });

  it('renders status indicator', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders workload percentage', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders average response time', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('5m')).toBeInTheDocument();
  });

  it('renders satisfaction percentage', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('90%')).toBeInTheDocument();
  });

  it('renders last active time', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('Just now')).toBeInTheDocument();
  });

  it('renders skills', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders teams', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText('Development, Support')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByRole('button', { name: /assign/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view profile/i })).toBeInTheDocument();
  });
});