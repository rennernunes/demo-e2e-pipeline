import React from 'react';

interface WorkloadBarProps {
  workload: number;
}

const WorkloadBar: React.FC<WorkloadBarProps> = ({ workload }) => {
  // Ensure workload is within valid range
  const normalizedWorkload = Math.max(0, Math.min(100, workload));
  
  // Determine color based on workload percentage
  const getWorkloadColor = (value: number): string => {
    if (value <= 60) return '#10B981'; // Green 500 for 0-60%
    if (value <= 80) return '#F59E0B'; // Amber 500 for 61-80%
    return '#EF4444'; // Red 500 for 81-100%
  };

  const barColor = getWorkloadColor(normalizedWorkload);
  
  // Determine label for screen readers
  const getWorkloadLabel = (value: number): string => {
    if (value <= 60) return 'Low workload';
    if (value <= 80) return 'Moderate workload';
    return 'High workload';
  };

  const ariaLabel = `${getWorkloadLabel(normalizedWorkload)}, ${normalizedWorkload}%`;

  return (
    <div 
      className="workload-bar"
      role="progressbar"
      aria-valuenow={normalizedWorkload}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div 
        className="workload-bar__track"
        aria-hidden="true"
      >
        <div 
          className="workload-bar__fill"
          style={{ 
            width: `${normalizedWorkload}%`,
            backgroundColor: barColor
          }}
        />
      </div>
    </div>
  );
};

export default WorkloadBar;