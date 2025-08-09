export function handleError(
  error: unknown,
  setError: (errorMessage: string | null) => void
) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return;
  }
  if (error instanceof SyntaxError) {
    setError("Data received is corrupted or invalid JSON.");
  } else if (error instanceof Error) {
    setError(error.message);
  } else {
    setError(String(error));
  }
}
