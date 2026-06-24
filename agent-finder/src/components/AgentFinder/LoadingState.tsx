import React from 'react';

const LoadingState: React.FC = () => {
  // Create an array of skeleton cards based on viewport size
  const getSkeletonCount = (): number => {
    if (window.innerWidth >= 1024) {
      return 6; // Desktop: 2 rows of 3
    } else if (window.innerWidth >= 768) {
      return 4; // Tablet: 2 rows of 2
    } else {
      return 2; // Mobile: 2 rows of 1
    }
  };

  const skeletonCards = Array.from({ length: getSkeletonCount() }, (_, i) => i);

  return (
    <div className="loading-state" aria-live="polite" aria-busy="true">
      <div className="loading-state__message" aria-hidden="true">
        Loading agents...
      </div>
      
      <div className="agent-grid">
        {skeletonCards.map((index) => (
          <div key={index} className="agent-grid__item">
            <div className="agent-card agent-card--skeleton">
              <div className="agent-card__header">
                <div className="agent-card__avatar agent-card__avatar--skeleton" />
                
                <div className="agent-card__info">
                  <div className="agent-card__name--skeleton" />
                  <div className="agent-card__platform--skeleton" />
                </div>
                
                <div className="agent-card__status--skeleton" />
              </div>
              
              <div className="agent-card__details">
                <div className="agent-card__workload">
                  <div className="agent-card__workload-header">
                    <div className="agent-card__workload-label--skeleton" />
                    <div className="agent-card__workload-value--skeleton" />
                  </div>
                  <div className="agent-card__workload-bar--skeleton" />
                </div>
                
                <div className="agent-card__metrics">
                  <div className="agent-card__metric--skeleton" />
                  <div className="agent-card__metric--skeleton" />
                  <div className="agent-card__metric--skeleton" />
                </div>
                
                <div className="agent-card__skills">
                  <div className="agent-card__skills-title--skeleton" />
                  <div className="agent-card__skills-list">
                    <div className="agent-card__skill--skeleton" />
                    <div className="agent-card__skill--skeleton" />
                    <div className="agent-card__skill--skeleton" />
                  </div>
                </div>
              </div>
              
              <div className="agent-card__footer">
                <div className="agent-card__button--skeleton" />
                <div className="agent-card__button--skeleton" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Screen reader text */}
      <div className="sr-only">
        Loading agent data. Please wait.
      </div>
    </div>
  );
};

export default LoadingState;