import React from "react";
import StatusIndicator from "./StatusIndicator";
import WorkloadBar from "./WorkloadBar";
import SkillTag from "./SkillTag";
import { Agent, Platform } from "../../types/agent";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  // Format last active time
  const formatLastActive = (timestamp: string | null): string => {
    if (!timestamp) return "Never active";

    const lastActive = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - lastActive.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Get platform icon
  const getPlatformIcon = (platform: Platform): JSX.Element => {
    switch (platform) {
      case "salesforce":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8.52 2.59c.8-.85 1.94-1.38 3.2-1.38 2.4 0 4.36 1.92 4.36 4.3 0 .95-.32 1.83-.85 2.53.16.5.25 1.03.25 1.58 0 2.86-2.36 5.17-5.28 5.17-.7 0-1.36-.13-1.97-.38-.6.25-1.27.38-1.97.38-2.92 0-5.28-2.31-5.28-5.17 0-1.7.83-3.22 2.12-4.17-.08-.34-.12-.7-.12-1.06 0-2.38 1.95-4.3 4.36-4.3.85 0 1.65.24 2.32.66-.38.57-.65 1.23-.77 1.94-.48-.3-1.05-.47-1.66-.47-1.74 0-3.15 1.4-3.15 3.11 0 .52.13 1 .36 1.43l.4.6-.7.25c-1.12.8-1.85 2.13-1.85 3.63 0 2.45 2.02 4.44 4.5 4.44.6 0 1.18-.12 1.7-.33l.66-.27.66.27c.53.21 1.1.33 1.7.33 2.5 0 4.5-1.99 4.5-4.44 0-.55-.1-1.08-.3-1.58l-.25-.65.48-.5c.47-.5.75-1.15.75-1.87 0-1.53-1.26-2.77-2.8-2.77-.75 0-1.44.3-1.95.78l-.57.55-.15-.78c-.2-1.04-.9-1.92-1.84-2.38z"
              fill="#00A1E0"
            />
          </svg>
        );
      case "zendesk":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M13.8 7.8H9.1c0 2.3 1.9 4.2 4.2 4.2V7.8h.5zm-7.6 0H1.5v4.2c2.3 0 4.2-1.9 4.2-4.2h.5zM13.8 3.6c-2.3 0-4.2 1.9-4.2 4.2h4.7V3.6h-.5zm-7.6 0v4.2h4.7c0-2.3-1.9-4.2-4.2-4.2h-.5z"
              fill="#03363D"
            />
          </svg>
        );
      case "internal":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 11c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
              fill="#6B7280"
            />
            <path
              d="M8 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              fill="#6B7280"
            />
          </svg>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="agent-card">
      <div className="agent-card__header">
        <div className="agent-card__avatar">
          {agent.avatarUrl ? (
            <img
              src={agent.avatarUrl}
              alt={`${agent.name}'s avatar`}
              className="agent-card__avatar-img"
            />
          ) : (
            <div className="agent-card__avatar-placeholder">
              {agent.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="agent-card__info">
          <h3 className="agent-card__name">{agent.name}</h3>
          <div className="agent-card__platform">
            <span className="agent-card__platform-icon">
              {getPlatformIcon(agent.platform)}
            </span>
            <span className="agent-card__platform-name">
              {agent.platform.charAt(0).toUpperCase() + agent.platform.slice(1)}
            </span>
          </div>
        </div>

        <div className="agent-card__status">
          <StatusIndicator status={agent.status} />
        </div>
      </div>

      <div className="agent-card__details">
        <div className="agent-card__workload">
          <div className="agent-card__workload-header">
            <span className="agent-card__workload-label">Current workload</span>
            <span className="agent-card__workload-value">
              {agent.workload}%
            </span>
          </div>
          <WorkloadBar workload={agent.workload} />
        </div>

        <div className="agent-card__metrics">
          <div className="agent-card__metric">
            <span className="agent-card__metric-label">Avg. response</span>
            <span className="agent-card__metric-value">
              {agent.metrics.avgResponseTime}m
            </span>
          </div>
          <div className="agent-card__metric">
            <span className="agent-card__metric-label">Satisfaction</span>
            <span className="agent-card__metric-value">
              {agent.metrics.satisfaction}%
            </span>
          </div>
          <div className="agent-card__metric">
            <span className="agent-card__metric-label">Last active</span>
            <span className="agent-card__metric-value">
              {formatLastActive(agent.lastActive)}
            </span>
          </div>
        </div>

        {agent.skills.length > 0 && (
          <div className="agent-card__skills">
            <h4 className="agent-card__skills-title">Skills</h4>
            <div className="agent-card__skills-list">
              {agent.skills.slice(0, 3).map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
              {agent.skills.length > 3 && (
                <span className="agent-card__skills-more">
                  +{agent.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {agent.teams.length > 0 && (
          <div className="agent-card__teams">
            <h4 className="agent-card__teams-title">Teams</h4>
            <div className="agent-card__teams-list">
              {agent.teams.join(", ")}
            </div>
          </div>
        )}
      </div>

      <div className="agent-card__footer">
        <button className="agent-card__action-button agent-card__action-button--primary">
          Assign
        </button>
        <button className="agent-card__action-button agent-card__action-button--secondary">
          View profile
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
