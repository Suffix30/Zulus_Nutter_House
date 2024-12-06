import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { GameChoice } from '../../types';
import './ResultContainer.css';

interface PassToPlayerButtonsProps {
  currentPlayerId: string;
  currentChoice: GameChoice;
  handleChoice: (choice: GameChoice, isPass: boolean, targetPlayerId: string) => void;
}

const PassToPlayerButtons: React.FC<PassToPlayerButtonsProps> = ({ 
  currentPlayerId, 
  currentChoice,
  handleChoice 
}) => {
  const { players } = useGameStore();
  const otherPlayers = players.filter(p => p.id !== currentPlayerId);

  return (
    <div className="pass-to-player-buttons">
      {otherPlayers.map((player) => (
        <motion.button
          key={player.id}
          className="pass-to-player-button"
          onClick={() => handleChoice(currentChoice, true, player.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Give to {player.name}
        </motion.button>
      ))}
    </div>
  );
};

export default PassToPlayerButtons;