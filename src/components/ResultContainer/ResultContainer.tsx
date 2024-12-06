import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultContainerProps, GameChoice } from '../../types';
import { useGameStore } from '../../store/gameStore';
import ChoiceButtons from './ChoiceButtons';
import PassButtons from './PassButtons';
import PassToPlayerButtons from './PassToPlayerButtons';
import WouldYouRather from './WouldYouRather';
import './ResultContainer.css';

const ResultContainer: React.FC<ResultContainerProps> = ({ result }) => {
  const { handleChoice } = useGameStore();

  return (
    <div className="result-container">
      <AnimatePresence mode="wait">
        {result.player && !result.question && !result.isMystery ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="question-container"
          >
            <h2 className="winner-name">{result.player}</h2>
            {result.passedFrom && (
              <p className="passed-from">Challenge from {result.passedFrom}</p>
            )}
            <ChoiceButtons handleChoice={handleChoice} />
          </motion.div>
        ) : result.isMystery && !result.type ? (
          <motion.div
            key="mystery"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="question-container"
          >
            <h2 className="winner-name">{result.player}</h2>
            <h3 className="result-type">MYSTERY</h3>
            <p className="result-question">{result.question}</p>
            <ChoiceButtons handleChoice={handleChoice} />
          </motion.div>
        ) : result.question ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="question-container"
          >
            <h2 className="winner-name">{result.player}</h2>
            <h3 className="result-type">
              {result.type.replace('_', ' ')}
            </h3>
            {result.passedFrom && (
              <p className="passed-from">Challenge from {result.passedFrom}</p>
            )}
            <p className="result-question">{result.question}</p>
            {result.options && <WouldYouRather options={result.options} />}
            {!result.isPass && (
              <>
                <PassButtons
                  currentChoice={result.type as GameChoice}
                  handleChoice={handleChoice}
                />
                {result.playerId && (
                  <PassToPlayerButtons
                    currentPlayerId={result.playerId}
                    currentChoice={result.type as GameChoice}
                    handleChoice={handleChoice}
                  />
                )}
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="waiting-message"
          >
            Waiting for spin...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultContainer;