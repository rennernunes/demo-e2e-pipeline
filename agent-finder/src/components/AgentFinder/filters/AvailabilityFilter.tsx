import React, { useEffect } from 'react';
import { AgentStatus } from '../../../types/agent';

interface AvailabilityFilterProps {
  selectedStatuses: AgentStatus[];
  onChange: (statuses: AgentStatus[]) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ 
  selectedStatuses, 
  onChange 
}) => {
  // Status options with their display properties
  const statusOptions: {
    value: AgentStatus;
    label: string;
    color: string;
  }[] = [
    { value: 'available', label: 'Available', color: '#10B981' },
    { value: 'busy', label: 'Busy', color: '#F59E0B' },
    { value: 'offline', label: 'Offline', color: '#6B7280' }
  ];

  // Handle status toggle
  const handleStatusToggle = (status: AgentStatus) => {
    if (selectedStatuses.includes(status)) {
      onChange(selectedStatuses.filter(s => s !== status));
    } else {
      onChange([...selectedStatuses, status]);
    }
  };

  // Keyboard shortcut for Available filter (Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        handleStatusToggle('available');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStatuses]);

  return (
    <div className="availability-filter">
      <div className="availability-filter__options">
        {statusOptions.map(({ value, label, color }) => (
          <button
            key={value}
            className={`availability-filter__option ${
              selectedStatuses.includes(value) ? 'availability-filter__option--selected' : ''
            }`}
            onClick={() => handleStatusToggle(value)}
            aria-pressed={selectedStatuses.includes(value)}
          >
            <span 
              className="availability-filter__status-dot" 
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="availability-filter__label">{label}</span>
            {selectedStatuses.includes(value) && (
              <span className="availability-filter__checkmark" aria-hidden="true">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M13.3334 4L6.00008 11.3333L2.66675 8" 
                    stroke="#3B82F6" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="availability-filter__shortcut" aria-hidden="true">
        <span className="availability-filter__shortcut-text">
          Press <kbd>Alt</kbd>+<kbd>A</kbd> to toggle Available
        </span>
      </div>
    </div>
  );
};

export default AvailabilityFilter;