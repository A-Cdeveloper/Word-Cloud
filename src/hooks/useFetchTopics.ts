import { useEffect } from "react";
import { useTopicsStore } from "../store/topicsStore";

export const useFetchTopics = () => {
  const setTopics = useTopicsStore((state) => state.setTopics);
  const setLoading = useTopicsStore((state) => state.setLoading);
  const setError = useTopicsStore((state) => state.setError);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/topics.json");
        if (!res.ok) throw new Error("Failed to fetch topics");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [setTopics, setLoading, setError]);
};
