import { describe, it, expect } from "vitest";
import { calculateVolumeRange } from "./calculateVolumeRange";
import type { Topic } from "../types";

const mockTopics: Topic[] = [
  {
    id: "test-1",
    label: "Test Topic 1",
    volume: 50,
    sentimentScore: 65,
    sentiment: { positive: 10, neutral: 30, negative: 10 },
  },
  {
    id: "test-2",
    label: "Test Topic 2",
    volume: 30,
    sentimentScore: 45,
    sentiment: { positive: 5, neutral: 20, negative: 5 },
  },
  {
    id: "test-3",
    label: "Test Topic 3",
    volume: 80,
    sentimentScore: 75,
    sentiment: { positive: 20, neutral: 50, negative: 10 },
  },
];

describe("calculateVolumeRange", () => {
  it("returns min and max volume from topics array", () => {
    const result = calculateVolumeRange(mockTopics);

    expect(result.minVolume).toBe(30);
    expect(result.maxVolume).toBe(80);
  });

  it("returns 0 for both min and max when topics array is empty", () => {
    const result = calculateVolumeRange([]);

    expect(result.minVolume).toBe(0);
    expect(result.maxVolume).toBe(0);
  });

  it("returns same value for min and max when all topics have same volume", () => {
    const sameVolumeTopics: Topic[] = [
      {
        id: "test-1",
        label: "Test Topic 1",
        volume: 50,
        sentimentScore: 65,
        sentiment: { positive: 10, neutral: 30, negative: 10 },
      },
      {
        id: "test-2",
        label: "Test Topic 2",
        volume: 50,
        sentimentScore: 45,
        sentiment: { positive: 5, neutral: 20, negative: 5 },
      },
    ];

    const result = calculateVolumeRange(sameVolumeTopics);

    expect(result.minVolume).toBe(50);
    expect(result.maxVolume).toBe(50);
  });

  it("handles zero volume values correctly", () => {
    const zeroVolumeTopics: Topic[] = [
      {
        id: "test-1",
        label: "Test Topic 1",
        volume: 0,
        sentimentScore: 65,
        sentiment: { positive: 10, neutral: 30, negative: 10 },
      },
      {
        id: "test-2",
        label: "Test Topic 2",
        volume: 0,
        sentimentScore: 45,
        sentiment: { positive: 5, neutral: 20, negative: 5 },
      },
    ];

    const result = calculateVolumeRange(zeroVolumeTopics);

    expect(result.minVolume).toBe(0);
    expect(result.maxVolume).toBe(0);
  });
});
