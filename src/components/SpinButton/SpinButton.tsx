import React from 'react';
import { motion } from 'framer-motion';
import { SpinButtonProps } from '../../types';
import './SpinButton.css';

const SpinButton: React.FC<SpinButtonProps> = ({ spinWheel, disabled }) => {
  return (
    <motion.button
      className="spin-button"
      onClick={spinWheel}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      Spin the Wheel
    </motion.button>
  );
};

export default SpinButton;