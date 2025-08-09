import { useTopicsStore } from "../store/topicsStore";

export const WordList = () => {
  const topics = useTopicsStore((state) => state.topics);

  if (topics.length === 0) return <p>Loading topics...</p>;

  return (
    <ul className="space-y-2">
      {topics.map((topic) => (
        <li key={topic.label} className="cursor-pointer hover:text-blue-600">
          {topic.label}
        </li>
      ))}
    </ul>
  );
};
