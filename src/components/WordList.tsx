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

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (topics.length === 0) return <p>No topics found</p>;

  return (
    <ul className="space-y-2">
      {topics.map((topic) => (
        <Word key={topic.id} topic={topic} />
      ))}
    </ul>
  );
};

export default WordList;
