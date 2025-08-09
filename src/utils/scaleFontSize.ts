import { fontSizeClasses, type FontSizeKey } from "../constants/fontSizes";

export function scaleFontSize(
  volume: number,
  minVolume: number,
  maxVolume: number
): FontSizeKey {
  if (maxVolume === minVolume) {
    return "wc3";
  }

  const keys = Object.keys(fontSizeClasses) as FontSizeKey[];
  const scale = keys.length;
  const normalized = (volume - minVolume) / (maxVolume - minVolume);
  const sizeIndex = Math.min(
    scale,
    Math.max(1, Math.round(normalized * (scale - 1)) + 1)
  );

  return keys[sizeIndex - 1];
}
