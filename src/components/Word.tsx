import { fontSizeClasses } from "../constants/fontSizes";
import { useTopicsStore } from "../store/topicsStore";
import type { Topic } from "../types";
import { getColorBySentiment } from "../utils/getColorBySentiment";
import { scaleFontSize } from "../utils/scaleFontSize";

const Word = ({ topic }: { topic: Topic }) => {
  const setSelectedTopic = useTopicsStore((state) => state.setSelectedTopic);
  const minVolume = useTopicsStore((state) => state.minVolume);
  const maxVolume = useTopicsStore((state) => state.maxVolume);

  const handleClick = () => {
    setSelectedTopic(topic);
  };

  const fontSizeClass = scaleFontSize(topic.volume, minVolume, maxVolume);
  const colorClass = getColorBySentiment(topic.sentimentScore);

  return (
    <li
      onClick={handleClick}
      className={`inline-block px-1 cursor-pointer font-semibold scale-100 hover:scale-105 transition-all duration-300 ${fontSizeClasses[fontSizeClass]} ${colorClass}`}
      role="button"
      tabIndex={0}
    >
      {topic.label}
    </li>
  );
};

export default Word;
