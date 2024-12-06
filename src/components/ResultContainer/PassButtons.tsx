import React from 'react';
import { motion } from 'framer-motion';
import { GameChoice } from '../../types';

interface PassButtonsProps {
  currentChoice: GameChoice;
  handleChoice: (choice: GameChoice, isPass: boolean) => void;
}

const PassButtons: React.FC<PassButtonsProps> = ({ currentChoice, handleChoice }) => {
  const passOptions: Record<GameChoice, GameChoice[]> = {
    TRUTH: ['DARE', 'DRINK'],
    DARE: ['TRUTH', 'DRINK', 'DOUBLE_DARE'],
    DRINK: ['TRUTH', 'DARE'],
    DOUBLE_DARE: ['TRUTH', 'DRINK'],
    WOULD_YOU_RATHER: ['TRUTH', 'DARE', 'DRINK'],
    MYSTERY: ['TRUTH', 'DARE', 'DRINK']
  };

  const options = passOptions[currentChoice] || [];

  return (
    <div className="pass-section">
      {options.map((option) => (
        <div key={option} className="pass-button-container">
          <span className="pass-label">Pass:</span>
          <motion.button
            className={`pass-button pass-${option.toLowerCase()}`}
            onClick={() => handleChoice(option, true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.replace('_', ' ')}
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default PassButtons;