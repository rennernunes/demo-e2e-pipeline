import React from 'react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  return (
    <div className="empty-state">
      <div className="empty-state__container">
        <div className="empty-state__icon">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="8" y="8" width="48" height="48" rx="24" fill="#F3F4F6" />
            <path 
              d="M32 26V32M32 38H32.01M44 32C44 38.6274 38.6274 44 32 44C25.3726 44 20 38.6274 20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32Z" 
              stroke="#6B7280" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h2 className="empty-state__title">No agents found</h2>
        
        {hasFilters ? (
          <div className="empty-state__message">
            <p>
              No agents match your current search criteria. Try adjusting your filters or search query.
            </p>
            <button 
              className="empty-state__action-button"
              onClick={onClearFilters}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="empty-state__message">
            <p>
              There are no agents available in the system at this time.
            </p>
            <p className="empty-state__sub-message">
              Please check back later or contact your administrator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;