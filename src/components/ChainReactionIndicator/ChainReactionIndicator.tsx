import React from 'react';
import { motion } from 'framer-motion';
import { ChainReaction } from '../../types';
import './ChainReactionIndicator.css';

interface ChainReactionIndicatorProps {
  chainReaction: ChainReaction;
  playerName: string;
}

const ChainReactionIndicator: React.FC<ChainReactionIndicatorProps> = ({ chainReaction, playerName }) => {
  return (
    <motion.div
      className="chain-reaction-indicator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="chain-reaction-content">
        <span className="chain-reaction-icon">⚡</span>
        <span className="chain-reaction-text">
          Chain Reaction from {playerName}: Must do a {chainReaction.type.replace('_', ' ')}
        </span>
      </div>
      <div className="chain-reaction-expires">
        Expires in {chainReaction.expiresAfterRounds - (chainReaction.currentRound)} rounds
      </div>
    </motion.div>
  );
};

export default ChainReactionIndicator;