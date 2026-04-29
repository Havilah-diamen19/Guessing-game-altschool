import { create } from "zustand";

type Player = {
  id: string;
  username: string;
  score: number;
  attempts: number;
  isGameMaster: boolean;
};

type GameState = {
  sessionId: string | null;
  players: Player[];
  question: string;
  status: "waiting" | "in-progress" | "ended";

  setSession: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setQuestion: (q: string) => void;
  setStatus: (s: GameState["status"]) => void;
};

export const useGameStore = create<GameState>((set) => ({
  sessionId: null,
  players: [],
  question: "",
  status: "waiting",

  setSession: (id) => set({ sessionId: id }),
  setPlayers: (players) => set({ players }),
  setQuestion: (q) => set({ question: q }),
  setStatus: (s) => set({ status: s }),
}));