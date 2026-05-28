import React from 'react';

interface HoldPromptProps {
  visible: boolean;
  loadingProgress: number;
  isReady: boolean;
}

/**
 * Minimal "HOLD TO BEGIN JOURNEY" overlay with futuristic styling.
 * Fades in when ready, fades out when user starts holding.
 */
const HoldPrompt: React.FC<HoldPromptProps> = ({ visible, loadingProgress, isReady }) => {
  return (
    <div
      className="hold-prompt-overlay"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {!isReady ? (
        <div className="loading-container">
          <div className="loading-ring">
            <svg viewBox="0 0 100 100" className="loading-svg">
              <circle
                className="loading-track"
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
              />
              <circle
                className="loading-progress"
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeDasharray={`${loadingProgress * 264} 264`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <p className="loading-text">
            PREPARING JOURNEY
            <span className="loading-percent">{Math.round(loadingProgress * 100)}%</span>
          </p>
        </div>
      ) : (
        <div className="prompt-container">
          <div className="prompt-icon">
            <div className="prompt-circle">
              <div className="prompt-circle-inner" />
            </div>
          </div>
          <h1 className="prompt-title">HOLD TO BEGIN JOURNEY</h1>
          <p className="prompt-subtitle">Press and hold anywhere to start</p>
        </div>
      )}
    </div>
  );
};

export default HoldPrompt;
