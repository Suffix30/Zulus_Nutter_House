import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player, GameResult, GameMode } from '../../types';
import PlayerInput from '../PlayerInput/PlayerInput';
import PlayerList from '../PlayerList/PlayerList';
import ResultContainer from '../ResultContainer/ResultContainer';
import SpinButton from '../SpinButton/SpinButton';
import ToggleButton from '../ToggleButton/ToggleButton';
import GameModeToggle from '../GameModeToggle/GameModeToggle';
import Rules from '../Rules/Rules';
import Wheel from '../Wheel/Wheel';
import './GameContainer.css';

interface GameContainerProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  spinning: boolean;
  result: GameResult;
  onSpin: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  spinning,
  result,
  onSpin,
  soundEnabled,
  onToggleSound,
  gameMode,
  onModeChange
}) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="game-container"
    >
      <div className="game-header">
        <h1>ZULU&apos;s Nutter House</h1>
        <div className="mode-controls">
          <GameModeToggle mode={gameMode} onModeChange={onModeChange} />
          <motion.button
            className="mode-button"
            onClick={() => setShowRules(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rules
          </motion.button>
        </div>
      </div>
      
      <div className="game-content">
        <motion.div 
          className="result-section"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
        >
          <ResultContainer result={result} />
        </motion.div>

        <motion.div 
          className="wheel-section"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {!showRules ? (
            <>
              <Wheel
                isSpinning={spinning}
                names={players.map(p => p.name)}
                onSpinComplete={() => {}}
              />
              <div className="controls">
                <ToggleButton 
                  onToggle={onToggleSound} 
                  label="Sound Effects" 
                  isActive={soundEnabled}
                />
                <SpinButton 
                  spinWheel={onSpin} 
                  disabled={players.length < 2 || spinning}
                />
              </div>
            </>
          ) : (
            <Rules onClose={() => setShowRules(false)} />
          )}
        </motion.div>

        <motion.div 
          className="players-section"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
        >
          <h2>Players</h2>
          <div className="players-content">
            <PlayerList players={players} onRemovePlayer={onRemovePlayer} />
            <PlayerInput addPlayer={onAddPlayer} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameContainer;