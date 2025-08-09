export const fontSizeClasses = {
  wc1: "text-wc1",
  wc2: "text-wc2",
  wc3: "text-wc3",
  wc4: "text-wc4",
  wc5: "text-wc5",
  wc6: "text-wc6",
} as const;

export type FontSizeKey = keyof typeof fontSizeClasses; // "wc1" | "wc2" | ... | "wc6"
