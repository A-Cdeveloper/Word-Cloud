export function getColorBySentiment(
  sentimentScore: number | undefined
): string {
  if (sentimentScore === undefined || sentimentScore === null) {
    return "text-gray-500"; // gray  - no data
  }

  if (sentimentScore > 60) {
    return "text-sentimentGreen";
  }

  if (sentimentScore < 40) {
    return "text-sentimentRed";
  }

  return "text-gray-500"; // gray 40 - 60
}
