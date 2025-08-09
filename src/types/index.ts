export type Sentiment = {
  positive?: number;
  neutral?: number;
  negative?: number;
};

export type Topic = {
  id: string;
  label: string;
  volume: number;
  sentimentScore: number;
  sentiment?: Sentiment;
};
