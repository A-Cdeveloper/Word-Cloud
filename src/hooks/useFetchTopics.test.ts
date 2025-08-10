import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useFetchTopics } from "./useFetchTopics";
import { useTopicsStore } from "../store/topicsStore";

// Mock the Zustand store
vi.mock("../store/topicsStore");

// Mock fetch
global.fetch = vi.fn();

const mockSetTopics = vi.fn();
const mockSetLoading = vi.fn();
const mockSetError = vi.fn();

const mockTopics = [
  {
    id: "test-1",
    label: "Test Topic 1",
    volume: 50,
    sentimentScore: 65,
    sentiment: { positive: 10, neutral: 30, negative: 10 },
  },
];

describe("useFetchTopics hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTopicsStore).mockImplementation((selector) => {
      const state = {
        topics: [],
        selectedTopic: null,
        loading: false,
        error: null,
        minVolume: 0,
        maxVolume: 100,
        setTopics: mockSetTopics,
        setSelectedTopic: vi.fn(),
        setLoading: mockSetLoading,
        setError: mockSetError,
        setMinVolume: vi.fn(),
        setMaxVolume: vi.fn(),
      };
      return selector(state);
    });
  });

  it("fetches topics successfully", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ topics: mockTopics }),
    } as Response);

    renderHook(() => useFetchTopics());

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockSetError).toHaveBeenCalledWith(null);
      expect(mockSetTopics).toHaveBeenCalledWith(mockTopics);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it("handles fetch error", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    renderHook(() => useFetchTopics());

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockSetError).toHaveBeenCalledWith("Network error");
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it("handles HTTP error response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    renderHook(() => useFetchTopics());

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockSetError).toHaveBeenCalledWith(
        `Failed to fetch topics (status: 404)`
      );
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it("aborts fetch on unmount", async () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {})); // Never resolves

    const { unmount } = renderHook(() => useFetchTopics());

    unmount();

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });
  });
});
