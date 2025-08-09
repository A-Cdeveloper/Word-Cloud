import { useTopicsStore } from "../store/topicsStore";

const TopicDetails = () => {
  const selectedTopic = useTopicsStore((state) => state.selectedTopic);

  if (!selectedTopic) {
    return <p>Please select a topic to see details.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base mb-2">
        Information on topic: "<strong>{selectedTopic.label}</strong>"
      </h2>
      <p>Total Mentions: {selectedTopic.volume}</p>
      <ul>
        <li>Positive Mentions: {selectedTopic.sentiment?.positive || 0}</li>
        <li>Neutral Mentions: {selectedTopic.sentiment?.neutral || 0}</li>
        <li>Negative Mentions: {selectedTopic.sentiment?.negative || 0}</li>
      </ul>
    </div>
  );
};

export default TopicDetails;
