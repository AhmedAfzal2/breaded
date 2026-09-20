import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Team {
  name: string;
  score: number;
}

interface TeamState {
  teams: Team[];
  addScore: (teamIdx: number, toAdd: number) => void;
  updateTeam: (teamIdx: number, updates: Partial<Team>) => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teams: Array.from({ length: 3 }).map((_, idx) => ({
        name: `Team ${idx + 1}`,
        score: 0,
      })),
      updateTeam: (teamIdx, updates) =>
        set((state) => {
          const newTeams = [...state.teams];
          newTeams[teamIdx] = { ...newTeams[teamIdx], ...updates };
          return { teams: newTeams };
        }),
      addScore: (teamIdx, toAdd) =>
        set((state) => {
          const newTeams = [...state.teams];
          newTeams[teamIdx] = {
            ...newTeams[teamIdx],
            score: newTeams[teamIdx].score + toAdd,
          };
          return { teams: newTeams };
        }),
    }),

    { name: "team-state", storage: createJSONStorage(() => sessionStorage) },
  ),
);
