import { GameMode, GameChoice } from '../types';
import {
  truthQuestions,
  dareQuestions,
  doubleDareQuestions,
  drinkQuestions,
  wouldYouRatherQuestions,
  mysteryQuestions
} from './questions';

interface GameModeConfig {
  name: string;
  description: string;
}

export const gameModes: Record<GameMode, GameModeConfig> = {
  PG: {
    name: 'PG Mode',
    description: 'Keep it clean and family-friendly'
  },
  R: {
    name: 'R Mode',
    description: 'Adult content and mature themes'
  }
};

interface QuestionResult {
  question: string;
  options?: string[];
}

type QuestionMap = Record<GameChoice, Record<GameMode, unknown>>;

const questionMap: QuestionMap = {
  TRUTH: truthQuestions,
  DARE: dareQuestions,
  DOUBLE_DARE: doubleDareQuestions,
  DRINK: drinkQuestions,
  WOULD_YOU_RATHER: wouldYouRatherQuestions,
  MYSTERY: mysteryQuestions
};

export const getRandomQuestion = (type: GameChoice, mode: GameMode): QuestionResult => {
  const questions = questionMap[type][mode];
  const randomIndex = Math.floor(Math.random() * (questions as Array<unknown>).length);

  if (type === 'WOULD_YOU_RATHER') {
    const question = (questions as Array<{ options: string[] }>)[randomIndex];
    return {
      question: 'Would you rather...',
      options: question.options
    };
  }

  return {
    question: (questions as string[])[randomIndex]
  };
};