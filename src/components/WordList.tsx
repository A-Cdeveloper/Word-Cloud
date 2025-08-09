import { useTopicsStore } from "../store/topicsStore";
import Word from "./Word";

export const WordList = () => {
  const topics = useTopicsStore((state) => state.topics);

  if (topics.length === 0) return <p>Loading topics...</p>;

  return (
    <ul className="space-y-2">
      {topics.map((topic) => (
        <Word key={topic.id} topic={topic} />
      ))}
    </ul>
  );
};
