import { useEffect, useRef } from "react";
import { useTopicsStore } from "../store/topicsStore";
import type { Topic } from "../types";
import { handleError } from "../utils/handleError";

export const useFetchTopics = () => {
  const setTopics = useTopicsStore((state) => state.setTopics);
  const setLoading = useTopicsStore((state) => state.setLoading);
  const setError = useTopicsStore((state) => state.setError);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Abort previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    const fetchTopics = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/topics.json", {
          signal: abortControllerRef.current!.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch topics (status: ${res.status})`);
        }
        const data: { topics: Topic[] } = await res.json();

        setTopics(data.topics);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        handleError(error, setError);
        setLoading(false);
      }
    };

    fetchTopics();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [setError, setLoading, setTopics]);
};
