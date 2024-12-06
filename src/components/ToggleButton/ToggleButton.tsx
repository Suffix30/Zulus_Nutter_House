import React from 'react';
import { motion } from 'framer-motion';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { ToggleButtonProps } from '../../types';
import './ToggleButton.css';

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle, label, isActive }) => {
  return (
    <motion.button
      className={`toggle-button ${isActive ? 'active' : ''}`}
      onClick={() => onToggle(!isActive)}
      whileTap={{ scale: 0.95 }}
    >
      {isActive ? (
        <SpeakerWaveIcon className="h-6 w-6 mr-2" />
      ) : (
        <SpeakerXMarkIcon className="h-6 w-6 mr-2" />
      )}
      {label}
    </motion.button>
  );
};

export default ToggleButton;