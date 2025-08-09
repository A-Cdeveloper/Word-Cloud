import { useEffect } from "react";
import { useTopicsStore } from "../store/topicsStore";

const TopicDetails = () => {
  const setSelectedTopic = useTopicsStore((state) => state.setSelectedTopic);
  const selectedTopic = useTopicsStore((state) => state.selectedTopic);

  useEffect(() => {
    setSelectedTopic({
      id: "1751295897__Berlin",
      label: "Berlin",
      volume: 165,
      sentimentScore: 65,
      sentiment: { negative: 3, neutral: 133, positive: 29 },
    });
  }, [setSelectedTopic]);

  if (!selectedTopic) {
    return <p>Please select a topic to see details.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base mb-2">
        Information on topic: "<strong>{selectedTopic.label}</strong>"
      </h2>
      <p>
        <strong>Total Mentions:</strong> {selectedTopic.volume}
      </p>
      <ul>
        <li>Positive Mentions: {selectedTopic.sentiment?.positive}</li>
        <li>Neutral Mentions: {selectedTopic.sentiment?.neutral}</li>
        <li>Negative Mentions: {selectedTopic.sentiment?.negative}</li>
      </ul>
    </div>
  );
};

export default TopicDetails;
