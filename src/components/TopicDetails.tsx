import { useTopicsStore } from "../store/topicsStore";

const TopicDetails = () => {
  const selectedTopic = useTopicsStore((state) => state.selectedTopic);

  if (!selectedTopic) {
    return <p>Please select a topic to see details.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base mb-2">
        Information on topic: "
        <span className="font-semibold">{selectedTopic.label}</span>"
      </h2>
      <p data-testid="total-mentions">Total Mentions: {selectedTopic.volume}</p>
      <ul>
        <li data-testid="positive-mentions">
          Positive Mentions:{" "}
          <span className="text-sentimentGreen">
            {selectedTopic.sentiment?.positive || 0}
          </span>
        </li>
        <li data-testid="neutral-mentions">
          Neutral Mentions: {selectedTopic.sentiment?.neutral || 0}
        </li>
        <li data-testid="negative-mentions">
          Negative Mentions:{" "}
          <span className="text-sentimentRed">
            {selectedTopic.sentiment?.negative || 0}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TopicDetails;
