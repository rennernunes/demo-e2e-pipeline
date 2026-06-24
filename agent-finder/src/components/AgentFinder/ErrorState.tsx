import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  lastUpdated: Date | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, lastUpdated }) => {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__container">
        <div className="error-state__icon">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="8" y="8" width="48" height="48" rx="24" fill="#FEE2E2" />
            <path 
              d="M32 26V32M32 38H32.01M44 32C44 38.6274 38.6274 44 32 44C25.3726 44 20 38.6274 20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32Z" 
              stroke="#EF4444" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h2 className="error-state__title">Unable to load agents</h2>
        
        <div className="error-state__message">
          <p>
            {message || "We encountered an error while loading agent data. Please try again."}
          </p>
          
          <button 
            className="error-state__retry-button"
            onClick={onRetry}
          >
            Retry
          </button>
        </div>
        
        {lastUpdated && (
          <div className="error-state__last-updated">
            <p>
              Last successful data load: {lastUpdated.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorState;