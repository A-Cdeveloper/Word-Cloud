import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Word from "./Word";
import { useTopicsStore } from "../store/topicsStore";
import type { Topic } from "../types";

// Mock the Zustand store
vi.mock("../store/topicsStore");

const mockSetSelectedTopic = vi.fn();

const mockTopic: Topic = {
  id: "test-id",
  label: "Test Topic",
  volume: 50,
  sentimentScore: 65,
  sentiment: {
    positive: 10,
    neutral: 30,
    negative: 10,
  },
};

const renderComponent = (topic: Topic = mockTopic) => {
  const user = userEvent.setup();

  render(<Word topic={topic} />);

  return {
    topic,
    wordElement: screen.getByRole("button", { name: topic.label }),
    user,
    mockSetSelectedTopic,
  };
};

describe("Word component", () => {
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
        setTopics: vi.fn(),
        setSelectedTopic: mockSetSelectedTopic,
        setLoading: vi.fn(),
        setError: vi.fn(),
        setMinVolume: vi.fn(),
        setMaxVolume: vi.fn(),
      };
      return selector(state);
    });
  });

  it("Show topic label", () => {
    const { wordElement } = renderComponent();

    expect(wordElement).toBeInTheDocument();
    expect(wordElement).toHaveTextContent(mockTopic.label);
  });

  it("calls setSelectedTopic when clicked", async () => {
    const { wordElement, user, topic } = renderComponent();

    await user.click(wordElement);

    expect(mockSetSelectedTopic).toHaveBeenCalledWith(topic);
  });
});
