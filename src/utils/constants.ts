import { GameResult } from '../types';

export const SPIN_DURATION = 4000;
export const MIN_PLAYERS = 2;

export const INITIAL_GAME_RESULT: GameResult = {
  player: '',
  type: '',
  question: '',
  mode: 'PG',
  isPass: false,
  isDouble: false,
  options: undefined
};

export const WHEEL_CONFIG = {
  minSpinSpeed: 0.1,
  initialSpinSpeed: () => 50 + Math.random() * 30,
  deceleration: 0.98,
  dimensions: {
    width: 500,
    height: 500
  }
};