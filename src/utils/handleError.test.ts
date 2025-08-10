import { describe, it, expect, vi } from "vitest";
import { handleError } from "./handleError";

describe("handleError", () => {
  const mockSetError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not call setError for AbortError", () => {
    const abortError = new DOMException("Aborted", "AbortError");
    handleError(abortError, mockSetError);
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it("calls setError with specific message for SyntaxError", () => {
    const syntaxError = new SyntaxError("Invalid JSON");
    handleError(syntaxError, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith(
      "Data received is corrupted or invalid JSON."
    );
  });

  it("calls setError with error message for Error instances", () => {
    const error = new Error("Network error");
    handleError(error, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith("Network error");
  });

  it("calls setError with stringified value for non-Error objects", () => {
    const nonError = "Some string error";
    handleError(nonError, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith("Some string error");
  });

  it("calls setError with stringified value for numbers", () => {
    const numberError = 404;
    handleError(numberError, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith("404");
  });

  it("calls setError with stringified value for objects", () => {
    const objectError = { message: "Custom error" };
    handleError(objectError, mockSetError);
    expect(mockSetError).toHaveBeenCalledWith("[object Object]");
  });
});
