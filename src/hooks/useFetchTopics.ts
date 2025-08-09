import { useEffect } from "react";
import { useTopicsStore } from "../store/topicsStore";
import type { Topic } from "../types";
import { handleError } from "../utils/handleError";

export const useFetchTopics = () => {
  const setTopics = useTopicsStore((state) => state.setTopics);
  const setLoading = useTopicsStore((state) => state.setLoading);
  const setError = useTopicsStore((state) => state.setError);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTopics = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/topics.json", { signal });
        if (!res.ok) {
          throw new Error(`Failed to fetch topics (status: ${res.status})`);
        }
        const data: { topics: Topic[] } = await res.json();
        // update store
        setTopics(data.topics);
      } catch (error) {
        handleError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();

    // cleanup
    return () => {
      controller.abort();
    };
  }, [setTopics, setLoading, setError]);
};
