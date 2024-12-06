import React from 'react';
import { motion } from 'framer-motion';
import { GameChoice } from '../../types';
import { audioService } from '../../services/audioService';

interface ChoiceButtonsProps {
  handleChoice: (choice: GameChoice) => void;
}

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ handleChoice }) => {
  const handleButtonClick = (choice: GameChoice) => {
    switch (choice) {
      case 'TRUTH':
        audioService.playTruthSound();
        break;
      case 'DARE':
        audioService.playDareSound();
        break;
      case 'DRINK':
        audioService.playDrinkSound();
        break;
      case 'WOULD_YOU_RATHER':
        audioService.playWouldYouRatherSound();
        break;
    }
    handleChoice(choice);
  };

  return (
    <div className="choice-buttons">
      <motion.button
        className="choice-button truth-button"
        onClick={() => handleButtonClick('TRUTH')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        TRUTH
      </motion.button>
      <motion.button
        className="choice-button dare-button"
        onClick={() => handleButtonClick('DARE')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        DARE
      </motion.button>
      <motion.button
        className="choice-button drink-button"
        onClick={() => handleButtonClick('DRINK')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        DRINK
      </motion.button>
      <motion.button
        className="choice-button rather-button"
        onClick={() => handleButtonClick('WOULD_YOU_RATHER')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        WOULD YOU RATHER
      </motion.button>
    </div>
  );
};

export default ChoiceButtons;