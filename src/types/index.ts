export type Sentiment = {
  positive?: number;
  neutral?: number;
  negative?: number;
};

export type Topic = {
  label: string;
  volume: number;
  sentimentScore: number;
  sentiment?: Sentiment;
};
