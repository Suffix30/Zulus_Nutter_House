import React from 'react';
import { motion } from 'framer-motion';
import './Rules.css';

interface RulesProps {
  onClose: () => void;
}

const Rules: React.FC<RulesProps> = ({ onClose }) => {
  return (
    <motion.div
      className="rules-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Game Rules</h2>
      <div className="rules-content">
        <section>
          <h3>Basic Rules</h3>
          <ul>
            <li>Minimum 2 players required to play</li>
            <li>Players take turns spinning the wheel</li>
            <li>When landed on, players must choose: Truth, Dare, Drink, or Would You Rather</li>
          </ul>
        </section>

        <section>
          <h3>Challenge Types</h3>
          <ul>
            <li><strong>Truth:</strong> Answer a personal question honestly</li>
            <li><strong>Dare:</strong> Perform a challenging action</li>
            <li><strong>Drink:</strong> Complete a drinking challenge</li>
            <li><strong>Would You Rather:</strong> Choose between two options</li>
          </ul>
        </section>

        <section>
          <h3>Special Features</h3>
          <ul>
            <li><strong>Mystery Slot:</strong> Land on ? for a surprise challenge</li>
            <li><strong>Pass Option:</strong> Pass your challenge to another player</li>
            <li><strong>Game Modes:</strong> Choose between PG and R-rated content</li>
          </ul>
        </section>

        <section>
          <h3>Passing Rules</h3>
          <ul>
            <li>Players can pass their challenge to another player</li>
            <li>Passed challenges must be completed by the receiving player</li>
            <li>Chain reactions occur when multiple passes happen</li>
          </ul>
        </section>
      </div>
      <button className="close-button" onClick={onClose}>Back to Game</button>
    </motion.div>
  );
};

export default Rules;