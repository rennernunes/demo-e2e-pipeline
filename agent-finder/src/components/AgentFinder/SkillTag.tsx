import React from 'react';

interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <span 
      className="skill-tag" 
      title={skill} // Show full skill name on hover
    >
      <span className="skill-tag__text">
        {skill}
      </span>
    </span>
  );
};

export default SkillTag;