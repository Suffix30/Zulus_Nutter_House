import { useState, useCallback } from 'react';
import { Player, GameResult } from '../types';

export const useWheel = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<GameResult>({ player: '', type: '', question: '' });

  const addPlayer = useCallback((name: string) => {
    if (name.trim()) {
      setPlayers(prev => [...prev, { id: crypto.randomUUID(), name: name.trim() }]);
    }
  }, []);

  const removePlayer = useCallback((id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
  }, []);

  const spin = useCallback(() => {
    if (players.length < 2) return;
    
    setSpinning(true);
    setResult({ player: '', type: '', question: '' });

    setTimeout(() => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      setResult({
        player: randomPlayer.name,
        type: 'SPIN',
        question: `${randomPlayer.name} has been selected!`
      });
      setSpinning(false);
    }, 4000);
  }, [players]);

  return {
    players,
    spinning,
    result,
    addPlayer,
    removePlayer,
    spin
  };
};