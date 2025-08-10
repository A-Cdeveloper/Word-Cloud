import { useEffect } from "react";
import { useTopicsStore } from "../store/topicsStore";
import { calculateVolumeRange } from "../utils/calculateVolumeRange";
import Word from "./Word";

const WordList = () => {
  const topics = useTopicsStore((state) => state.topics);
  const loading = useTopicsStore((state) => state.loading);
  const error = useTopicsStore((state) => state.error);

  const setMinVolume = useTopicsStore((state) => state.setMinVolume);
  const setMaxVolume = useTopicsStore((state) => state.setMaxVolume);

  useEffect(() => {
    if (topics.length > 0) {
      const { minVolume, maxVolume } = calculateVolumeRange(topics);
      setMinVolume(minVolume);
      setMaxVolume(maxVolume);
    }
  }, [topics, setMinVolume, setMaxVolume]);

  if (loading) return <p data-testid="loading">Loading topics...</p>;
  if (error)
    return (
      <p data-testid="error" className="text-red-600">
        {error}
      </p>
    );

  if (topics.length === 0 && !loading && error === null)
    return <p data-testid="no-topics">No topics found</p>;

  return (
    <ul
      data-testid="word-list"
      className="flex flex-wrap items-center justify-center  px-6  md:px-10 xl:px-32"
    >
      {topics.map((topic) => (
        <Word key={topic.id} topic={topic} />
      ))}
    </ul>
  );
};

export default WordList;
