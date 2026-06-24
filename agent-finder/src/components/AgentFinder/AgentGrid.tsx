import React from 'react';
import AgentCard from './AgentCard';
import { Agent } from '../../types/agent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface AgentGridProps {
  agents: Agent[];
  isLoading: boolean;
}

const AgentGrid: React.FC<AgentGridProps> = ({ agents, isLoading }) => {
  // Get user's motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="agent-grid">
      {agents.map(agent => (
        <div key={agent.id} className="agent-grid__item">
          <AgentCard agent={agent} />
        </div>
      ))}

      {/* Show loading placeholders when refreshing data */}
      {isLoading && agents.length > 0 && (
        <div className="agent-grid__loading-overlay" aria-live="polite" aria-atomic="true">
          <span className="agent-grid__loading-text">Refreshing agent data...</span>
        </div>
      )}
    </div>
  );
};

export default AgentGrid;