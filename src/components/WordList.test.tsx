import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import WordList from "./WordList";
import { useTopicsStore } from "../store/topicsStore";
import type { Topic } from "../types";

// Mock the Zustand store
vi.mock("../store/topicsStore");

const mockSetMinVolume = vi.fn();
const mockSetMaxVolume = vi.fn();

// State variables for testing
let mockLoading = false;
let mockError: string | null = null;
let mockTopics: Topic[] = [];
const mockTestTopics: Topic[] = [
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
];

const renderComponent = () => {
  const user = userEvent.setup();

  render(<WordList />);

  return {
    user,
    mockSetMinVolume,
    mockSetMaxVolume,
    wordElements: screen.queryAllByRole("button"),
  };
};

describe("WordList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTopicsStore).mockImplementation((selector) => {
      const state = {
        topics: mockTopics,
        selectedTopic: null,
        loading: mockLoading,
        error: mockError,
        minVolume: 0,
        maxVolume: 100,
        setTopics: vi.fn(),
        setSelectedTopic: vi.fn(),
        setLoading: vi.fn(),
        setError: vi.fn(),
        setMinVolume: mockSetMinVolume,
        setMaxVolume: mockSetMaxVolume,
      };
      return selector(state);
    });
  });

  it("shows loading message when loading is true", () => {
    mockLoading = true;
    mockError = null;
    mockTopics = [];

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when error is present", () => {
    mockLoading = false;
    mockError = "Failed to fetch topics";
    mockTopics = [];

    renderComponent();

    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });

  it("shows no topics message when topics array is empty", () => {
    mockLoading = false;
    mockError = null;
    mockTopics = [];

    renderComponent();

    expect(screen.getByText(/no topics/i)).toBeInTheDocument();
  });

  it("renders Word components when topics are present", () => {
    mockLoading = false;
    mockError = null;
    mockTopics = mockTestTopics;

    const { wordElements } = renderComponent();

    expect(wordElements.length).toBe(mockTestTopics.length);

    mockTestTopics.forEach((topic) => {
      expect(screen.getByText(topic.label)).toBeInTheDocument();
    });

    mockTestTopics.forEach((topic, index) => {
      expect(wordElements[index]).toHaveTextContent(topic.label);
    });
  });
});
