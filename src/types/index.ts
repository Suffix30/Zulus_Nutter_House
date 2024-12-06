export interface Player {
  id: string;
  name: string;
}

export interface Challenge {
  type: GameChoice;
  question: string;
  options?: string[];
}

export interface GameResult {
  player: string;
  playerId?: string;
  type: string;
  question: string;
  mode?: GameMode;
  isPass?: boolean;
  isDouble?: boolean;
  options?: string[];
  isMystery?: boolean;
  targetPlayer?: string;
  passedChallenge?: Challenge;
  passedFrom?: string;
}

export type GameChoice = 'TRUTH' | 'DARE' | 'DOUBLE_DARE' | 'DRINK' | 'WOULD_YOU_RATHER' | 'MYSTERY';
export type GameMode = 'PG' | 'R';

export interface ChainReaction {
  sourcePlayerId: string;
  targetPlayerId: string;
  type: GameChoice;
  expiresAfterRounds: number;
  currentRound: number;
  challenge?: Challenge;
}

export interface PlayerInputProps {
  addPlayer: (name: string) => void;
}

export interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (id: string) => void;
}

export interface ResultContainerProps {
  result: GameResult;
}

export interface SpinButtonProps {
  spinWheel: () => void;
  disabled?: boolean;
}

export interface ToggleButtonProps {
  onToggle: (isActive: boolean) => void;
  label: string;
  isActive?: boolean;
}

export interface WheelProps {
  isSpinning: boolean;
  names: string[];
  onSpinComplete: (selectedPlayers: string[]) => void;
}

export interface GameModeToggleProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}