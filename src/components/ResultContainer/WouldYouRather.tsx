import React from 'react';
import { motion } from 'framer-motion';

interface WouldYouRatherProps {
  options: string[];
}

const WouldYouRather: React.FC<WouldYouRatherProps> = ({ options }) => {
  return (
    <div className="rather-options">
      {options.map((option, index) => (
        <motion.div
          key={index}
          className="rather-option"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <span className="option-number">{index + 1}</span>
          {option}
        </motion.div>
      ))}
    </div>
  );
};

export default WouldYouRather;