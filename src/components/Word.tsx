import type { Topic } from "../types";
import { useTopicsStore } from "../store/topicsStore";

const Word = ({ topic }: { topic: Topic }) => {
  const setSelectedTopic = useTopicsStore((state) => state.setSelectedTopic);

  const handleClick = () => {
    setSelectedTopic(topic);
  };

  return (
    <li
      onClick={handleClick}
      className="cursor-pointer hover:text-blue-600"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {topic.label}
    </li>
  );
};

export default Word;
