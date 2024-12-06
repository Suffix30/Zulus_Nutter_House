import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayerListProps } from '../../types';
import './PlayerList.css';

const PlayerList: React.FC<PlayerListProps> = ({ players, onRemovePlayer }) => {
  return (
    <div className="players-list">
      <AnimatePresence>
        {players.map((player) => (
          <motion.div
            key={player.id}
            className="player-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <span className="player-name">{player.name}</span>
            <button
              className="remove-button"
              onClick={() => onRemovePlayer(player.id)}
            >
              Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PlayerList;