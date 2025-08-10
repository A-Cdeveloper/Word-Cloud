import { describe, it, expect } from "vitest";
import { getColorBySentiment } from "./getColorBySentiment";

describe("getColorBySentiment", () => {
  it("returns green color for sentiment score > 60", () => {
    expect(getColorBySentiment(65)).toBe("text-sentimentGreen");
    expect(getColorBySentiment(80)).toBe("text-sentimentGreen");
    expect(getColorBySentiment(100)).toBe("text-sentimentGreen");
  });

  it("returns red color for sentiment score < 40", () => {
    expect(getColorBySentiment(35)).toBe("text-sentimentRed");
    expect(getColorBySentiment(20)).toBe("text-sentimentRed");
    expect(getColorBySentiment(0)).toBe("text-sentimentRed");
  });

  it("returns gray color for sentiment score between 40-60", () => {
    expect(getColorBySentiment(40)).toBe("text-gray-500");
    expect(getColorBySentiment(50)).toBe("text-gray-500");
    expect(getColorBySentiment(60)).toBe("text-gray-500");
  });

  it("returns gray color for undefined sentiment score", () => {
    expect(getColorBySentiment(undefined)).toBe("text-gray-500");
  });

  it("returns gray color for null sentiment score", () => {
    expect(getColorBySentiment(null as unknown as number | undefined)).toBe(
      "text-gray-500"
    );
  });
});
