import { create } from 'zustand';
import { Player, GameResult, GameChoice, GameMode, ChainReaction, Challenge } from '../types';
import { INITIAL_GAME_RESULT } from '../utils/constants';
import { audioService } from '../services/audioService';
import { getRandomQuestion } from '../data/gameQuestions';

interface GameState {
  players: Player[];
  spinning: boolean;
  result: GameResult;
  soundEnabled: boolean;
  gameMode: GameMode;
  chainReactions: ChainReaction[];
  currentRound: number;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  spin: () => void;
  toggleSound: () => void;
  setGameMode: (mode: GameMode) => void;
  handleChoice: (choice: GameChoice, isPass?: boolean, targetPlayerId?: string) => void;
  processChainReactions: (playerId: string) => GameChoice | null;
  advanceRound: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  spinning: false,
  result: INITIAL_GAME_RESULT,
  soundEnabled: true,
  gameMode: 'PG',
  chainReactions: [],
  currentRound: 1,

  addPlayer: (name: string) => {
    if (name.trim()) {
      set((state) => ({
        players: [...state.players, { id: crypto.randomUUID(), name: name.trim() }]
      }));
    }
  },

  removePlayer: (id: string) => {
    set((state) => ({
      players: state.players.filter(player => player.id !== id),
      chainReactions: state.chainReactions.filter(
        reaction => reaction.sourcePlayerId !== id && reaction.targetPlayerId !== id
      )
    }));
  },

  spin: () => {
    const { players } = get();
    if (players.length < 2) return;

    audioService.initialize();
    audioService.stopAll();
    audioService.playSpinSound();
    
    set({ spinning: true, result: INITIAL_GAME_RESULT });

    setTimeout(() => {
      const allSlots = [...players.map(p => p.name), 'MYSTERY'];
      const selectedIndex = Math.floor(Math.random() * allSlots.length);
      const selectedSlot = allSlots[selectedIndex];
      
      audioService.stopAll();
      audioService.playWinSound();

      if (selectedSlot === 'MYSTERY') {
        const availablePlayers = players.filter(p => p.id !== get().result.playerId);
        const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
        const mysteryQuestion = getRandomQuestion('MYSTERY', get().gameMode);
        
        set({
          spinning: false,
          result: {
            player: randomPlayer.name,
            playerId: randomPlayer.id,
            type: 'MYSTERY',
            question: mysteryQuestion.question,
            mode: get().gameMode,
            isMystery: true
          }
        });
      } else {
        const selectedPlayer = players.find(p => p.name === selectedSlot)!;
        const chainedChoice = get().processChainReactions(selectedPlayer.id);
        
        set({
          spinning: false,
          result: {
            player: selectedPlayer.name,
            playerId: selectedPlayer.id,
            type: '',
            question: '',
            mode: get().gameMode
          }
        });

        if (chainedChoice) {
          setTimeout(() => {
            get().handleChoice(chainedChoice);
          }, 100);
        }
      }
    }, 4000);
  },

  handleChoice: (choice: GameChoice, isPass = false, targetPlayerId?: string) => {
    const { result, gameMode, players } = get();
    if (!result.player || !result.playerId) return;

    const questionResult = getRandomQuestion(choice, gameMode);
    
    if (isPass && targetPlayerId) {
      const targetPlayer = players.find(p => p.id === targetPlayerId);
      if (!targetPlayer) return;

      const passedChallenge: Challenge = {
        type: choice,
        question: questionResult.question,
        options: questionResult.options
      };

      set((state) => ({
        chainReactions: [
          ...state.chainReactions,
          {
            sourcePlayerId: result.playerId!,
            targetPlayerId,
            type: choice,
            expiresAfterRounds: 3,
            currentRound: state.currentRound,
            challenge: passedChallenge
          }
        ],
        result: {
          player: targetPlayer.name,
          playerId: targetPlayer.id,
          type: choice,
          question: questionResult.question,
          options: questionResult.options,
          isPass: true,
          mode: gameMode,
          passedFrom: result.player
        }
      }));
    } else {
      set((state) => ({
        result: {
          ...state.result,
          type: choice,
          question: questionResult.question,
          options: questionResult.options,
          isPass,
          mode: gameMode,
          isMystery: state.result.isMystery
        }
      }));
    }

    get().advanceRound();
  },

  processChainReactions: (playerId: string) => {
    const { chainReactions, currentRound, players } = get();
    const activeReaction = chainReactions.find(r => 
      r.targetPlayerId === playerId && 
      currentRound - r.currentRound < r.expiresAfterRounds
    );

    if (activeReaction?.challenge) {
      const sourcePlayer = players.find(p => p.id === activeReaction.sourcePlayerId);
      
      set((state) => ({
        result: {
          ...state.result,
          type: activeReaction.type,
          question: activeReaction.challenge!.question,
          options: activeReaction.challenge!.options,
          passedFrom: sourcePlayer?.name
        },
        chainReactions: state.chainReactions.filter(r => r !== activeReaction)
      }));

      return activeReaction.type;
    }

    return null;
  },

  advanceRound: () => {
    set((state) => ({
      currentRound: state.currentRound + 1,
      chainReactions: state.chainReactions.filter(reaction => 
        state.currentRound - reaction.currentRound < reaction.expiresAfterRounds
      )
    }));
  },

  setGameMode: (mode: GameMode) => {
    set({ gameMode: mode });
  },

  toggleSound: () => {
    set((state) => {
      const newSoundEnabled = !state.soundEnabled;
      audioService.setSoundEnabled(newSoundEnabled);
      return { soundEnabled: newSoundEnabled };
    });
  }
}));