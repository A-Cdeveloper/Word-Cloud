import type { Topic } from "../types";

export function calculateVolumeRange(topics: Topic[]): {
  minVolume: number;
  maxVolume: number;
} {
  if (topics.length === 0) {
    return { minVolume: 0, maxVolume: 0 };
  }

  let minVolume = topics[0].volume;
  let maxVolume = topics[0].volume;

  for (const topic of topics) {
    if (topic.volume < minVolume) minVolume = topic.volume;
    if (topic.volume > maxVolume) maxVolume = topic.volume;
  }

  return { minVolume, maxVolume };
}
