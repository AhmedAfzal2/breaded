import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BoardState {
  currentBoard: number;
  boostedQuestions: number[][];
  isBoosted: (category: number, question: number) => boolean;
  completedQuestions: boolean[][][];
  toggleQuestion: (category: number, question: number) => void;
  isQuestionCompleted: (category: number, question: number) => boolean;
  nextBoard: () => void;
  prevBoard: () => void;
}

export const NUM_BOARDS = 2;
export const NUM_CATEGORIES = 5;
export const NUM_QUESTIONS = 5;

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createEmptyCompletedQuestions = (): boolean[][][] =>
  Array.from({ length: NUM_BOARDS }, () =>
    Array.from({ length: NUM_CATEGORIES }, () =>
      Array(NUM_QUESTIONS).fill(false),
    ),
  );

function createBoosted() {
  const boosted: number[][] = Array.from({ length: NUM_BOARDS });
  for (let i = 0; i < NUM_BOARDS; i++)
    boosted[i] = [
      randomInt(0, NUM_CATEGORIES - 1),
      randomInt(1, NUM_QUESTIONS - 1),
    ];

  return boosted;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      currentBoard: 0,

      boostedQuestions: createBoosted(),
      isBoosted: (category, question) => {
        const state = get();
        return (
          state.boostedQuestions[state.currentBoard][0] === category &&
          state.boostedQuestions[state.currentBoard][1] === question
        );
      },

      completedQuestions: createEmptyCompletedQuestions(),
      toggleQuestion: (category, question) => {
        set(
          produce((state: BoardState) => {
            state.completedQuestions[state.currentBoard][category][question] =
              !state.completedQuestions[state.currentBoard][category][question];
          }),
        );
      },
      isQuestionCompleted: (category, question) => {
        const state = get();
        return state.completedQuestions[state.currentBoard][category][question];
      },

      nextBoard: () =>
        set((state) => ({
          currentBoard: mod(state.currentBoard + 1, NUM_BOARDS),
        })),
      prevBoard: () =>
        set((state) => ({
          currentBoard: mod(state.currentBoard - 1, NUM_BOARDS),
        })),
    }),
    { name: "board-state", storage: createJSONStorage(() => sessionStorage) },
  ),
);
