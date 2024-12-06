import React, { useEffect } from 'react';
import GameContainer from './components/GameContainer/GameContainer';
import { useGameStore } from './store/gameStore';
import { audioService } from './services/audioService';
import './App.css';

const App: React.FC = () => {
  const {
    players,
    spinning,
    result,
    soundEnabled,
    gameMode,
    addPlayer,
    removePlayer,
    spin,
    toggleSound,
    setGameMode
  } = useGameStore();

  useEffect(() => {
    audioService.initialize();

    const enableAudio = () => {
      audioService.initialize();
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  return (
    <div className="app">
      <GameContainer
        players={players}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        spinning={spinning}
        result={result}
        onSpin={spin}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        gameMode={gameMode}
        onModeChange={setGameMode}
      />
    </div>
  );
};

export default App;