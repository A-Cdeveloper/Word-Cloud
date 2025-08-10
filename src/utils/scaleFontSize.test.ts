import { describe, it, expect } from "vitest";
import { scaleFontSize } from "./scaleFontSize";

describe("scaleFontSize", () => {
  it("returns wc3 when minVolume equals maxVolume", () => {
    expect(scaleFontSize(50, 100, 100)).toBe("wc3");
    expect(scaleFontSize(0, 0, 0)).toBe("wc3");
    expect(scaleFontSize(200, 200, 200)).toBe("wc3");
  });

  it("returns wc1 for minimum volume", () => {
    expect(scaleFontSize(10, 10, 100)).toBe("wc1");
    expect(scaleFontSize(0, 0, 50)).toBe("wc1");
  });

  it("returns wc6 for maximum volume", () => {
    expect(scaleFontSize(100, 10, 100)).toBe("wc6");
    expect(scaleFontSize(50, 0, 50)).toBe("wc6");
  });

  it("returns appropriate size for middle volumes", () => {
    // Test middle range values
    expect(scaleFontSize(55, 10, 100)).toBe("wc4");
    expect(scaleFontSize(30, 0, 60)).toBe("wc4");
  });

  it("handles edge cases correctly", () => {
    // Volume slightly above min
    expect(scaleFontSize(11, 10, 100)).toBe("wc1");

    // Volume slightly below max
    expect(scaleFontSize(99, 10, 100)).toBe("wc6");

    // Volume at 25% of range
    expect(scaleFontSize(25, 0, 100)).toBe("wc2");

    // Volume at 75% of range
    expect(scaleFontSize(75, 0, 100)).toBe("wc5");
  });

  it("handles negative volumes", () => {
    expect(scaleFontSize(-10, -20, 20)).toBe("wc2");
    expect(scaleFontSize(-20, -20, 20)).toBe("wc1");
    expect(scaleFontSize(20, -20, 20)).toBe("wc6");
  });
});
