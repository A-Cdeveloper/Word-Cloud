import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import type { Topic } from "../types";

type TopicsState = {
  topics: Topic[];
  selectedTopic: Topic | null;
  loading: boolean;
  error: string | null;
  minVolume: number;
  maxVolume: number;
  setTopics: (topics: Topic[]) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMinVolume: (minVolume: number) => void;
  setMaxVolume: (maxVolume: number) => void;
};

export const useTopicsStore = create<TopicsState>()(
  persist(
    (set) => ({
      topics: [],
      selectedTopic: null,
      loading: false,
      error: null,
      minVolume: 0,
      maxVolume: 0,
      setTopics: (topics) => set({ topics }),
      setSelectedTopic: (topic) => set({ selectedTopic: topic }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setMinVolume: (minVolume) => set({ minVolume }),
      setMaxVolume: (maxVolume) => set({ maxVolume }),
    }),
    {
      name: "topics",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ selectedTopic: state.selectedTopic }),
    }
  )
);
