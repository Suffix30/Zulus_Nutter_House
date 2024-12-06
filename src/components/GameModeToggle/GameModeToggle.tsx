import React from 'react';
import { motion } from 'framer-motion';
import { GameModeToggleProps, GameMode } from '../../types';
import { gameModes } from '../../data/gameQuestions';
import { audioService } from '../../services/audioService';
import './GameModeToggle.css';

const GameModeToggle: React.FC<GameModeToggleProps> = ({ mode, onModeChange }) => {
  const handleModeChange = (newMode: GameMode) => {
    if (newMode === 'PG') {
      audioService.playPGModeSound();
    } else {
      audioService.playRModeSound();
    }
    onModeChange(newMode);
  };

  return (
    <>
      {(Object.keys(gameModes) as GameMode[]).map((gameMode) => (
        <motion.button
          key={gameMode}
          className={`mode-button ${mode === gameMode ? 'active' : ''}`}
          onClick={() => handleModeChange(gameMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {gameModes[gameMode].name}
        </motion.button>
      ))}
    </>
  );
};

export default GameModeToggle;