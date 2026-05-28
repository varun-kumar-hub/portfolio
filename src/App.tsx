import React, { useState, useCallback } from 'react';
import { useFramePreloader } from './hooks/useFramePreloader';
import { useHoldInteraction } from './hooks/useHoldInteraction';
import { usePlaybackEngine } from './hooks/usePlaybackEngine';
import { useAudioEngine } from './hooks/useAudioEngine';
import CinematicPlayer from './components/CinematicPlayer';
import HoldPrompt from './components/HoldPrompt';
import Portfolio from './components/Portfolio';

type AppPhase = 'loading' | 'cinematic' | 'transitioning' | 'portfolio';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('loading');
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(true);

  // Frame preloading
  const { frames, progress: loadProgress, ready } = useFramePreloader();

  // Hold interaction
  const { isHolding, hasStarted } = useHoldInteraction();

  // Playback engine
  const playback = usePlaybackEngine(
    isHolding && ready && phase !== 'portfolio',
    ready,
  );

  // Audio engine
  useAudioEngine(isHolding && ready, playback.progress);

  // Update phase based on state
  if (phase === 'loading' && ready) {
    setPhase('cinematic');
  }

  // Handle transition from cinematic to portfolio
  const handleTransitionStart = useCallback(() => {
    if (phase === 'transitioning' || phase === 'portfolio') return;
    setPhase('transitioning');
    setShowPortfolio(true);

    // Fade out canvas after a delay
    setTimeout(() => {
      setCanvasVisible(false);
      setTimeout(() => {
        setPhase('portfolio');
      }, 1500);
    }, 500);
  }, [phase]);

  // Determine HoldPrompt visibility
  const showPrompt = phase === 'loading' || (phase === 'cinematic' && !hasStarted);

  return (
    <div className="app-root">
      {/* Canvas player — always mounted during cinematic phase */}
      {canvasVisible && (
        <CinematicPlayer
          frames={frames}
          currentFrame={playback.currentFrame}
          speed={playback.speed}
          isComplete={playback.isComplete}
          onTransitionStart={handleTransitionStart}
        />
      )}

      {/* Canvas fade-out overlay */}
      {phase === 'transitioning' && (
        <div
          className="canvas-fade"
          style={{
            opacity: canvasVisible ? 0 : 1,
            transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      )}

      {/* Hold prompt overlay */}
      <HoldPrompt
        visible={showPrompt}
        loadingProgress={loadProgress}
        isReady={ready}
      />

      {/* Progress indicator during playback */}
      {phase === 'cinematic' && hasStarted && !playback.isComplete && (
        <div className="playback-progress">
          <div
            className="playback-progress-bar"
            style={{ width: `${playback.progress * 100}%` }}
          />
        </div>
      )}

      {/* Portfolio page */}
      <Portfolio visible={showPortfolio} />
    </div>
  );
};

export default App;
