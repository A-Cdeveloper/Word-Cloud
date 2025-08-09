import { create } from "zustand";
import type { Topic } from "../types";

type TopicsState = {
  topics: Topic[];
  selectedTopic: Topic | null;
  loading: boolean;
  error: string | null;
  setTopics: (topics: Topic[]) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useTopicsStore = create<TopicsState>((set) => ({
  topics: [],
  selectedTopic: null,
  loading: false,
  error: null,
  setTopics: (topics) => set({ topics }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
