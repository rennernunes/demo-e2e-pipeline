import React from 'react';
import { AgentStatus } from '../../types/agent';

interface StatusIndicatorProps {
  status: AgentStatus;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  // Status configuration
  const statusConfig: Record<AgentStatus, { color: string; label: string }> = {
    available: {
      color: '#10B981', // Green 500
      label: 'Available'
    },
    busy: {
      color: '#F59E0B', // Amber 500
      label: 'Busy'
    },
    offline: {
      color: '#6B7280', // Gray 500
      label: 'Offline'
    }
  };

  const { color, label } = statusConfig[status];

  return (
    <div className="status-indicator" role="status">
      <span 
        className="status-indicator__dot" 
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span 
        className="status-indicator__label"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
};

export default StatusIndicator;