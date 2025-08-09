import type { Topic } from "../types";

const Word = ({ topic }: { topic: Topic }) => {
  return <li className="cursor-pointer hover:text-blue-600">{topic.label}</li>;
};

export default Word;
