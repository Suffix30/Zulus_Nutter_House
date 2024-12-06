import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayerInputProps } from '../../types';
import './PlayerInput.css';

const PlayerInput: React.FC<PlayerInputProps> = ({ addPlayer }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      addPlayer(playerName);
      setPlayerName('');
    }
  };

  return (
    <div className="player-input-container">
      <form className="player-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="player-input"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <motion.button
          type="submit"
          className="add-player-button"
          whileTap={{ scale: 0.95 }}
          disabled={!playerName.trim()}
        >
          Add Name
        </motion.button>
      </form>
    </div>
  );
};

export default PlayerInput;