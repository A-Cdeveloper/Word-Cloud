import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TopicDetails from "./TopicDetails";
import { useTopicsStore } from "../store/topicsStore";
import type { Topic } from "../types";

// Mock the Zustand store
vi.mock("../store/topicsStore");

// State variables for testing
let mockSelectedTopic: Topic | null = null;
const mockTestTopic: Topic = {
  id: "test-1",
  label: "Test Topic",
  volume: 150,
  sentimentScore: 65,
  sentiment: { positive: 50, neutral: 80, negative: 20 },
};

const renderComponent = () => {
  const user = userEvent.setup();

  render(<TopicDetails />);

  return {
    user,
    noTopicMessage: screen.queryByText(/please select/i),
    topicInfo: screen.queryByRole("heading", { name: /Information on topic:/ }),
    totalMentions: screen.queryByTestId("total-mentions"),
    positiveMentions: screen.queryByTestId("positive-mentions"),
    neutralMentions: screen.queryByTestId("neutral-mentions"),
    negativeMentions: screen.queryByTestId("negative-mentions"),
  };
};

describe("TopicDetails component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTopicsStore).mockImplementation((selector) => {
      const state = {
        topics: [],
        selectedTopic: mockSelectedTopic,
        loading: false,
        error: null,
        minVolume: 0,
        maxVolume: 100,
        setTopics: vi.fn(),
        setSelectedTopic: vi.fn(),
        setLoading: vi.fn(),
        setError: vi.fn(),
        setMinVolume: vi.fn(),
        setMaxVolume: vi.fn(),
      };
      return selector(state);
    });
  });

  it("shows no selection message when no topic is selected", () => {
    mockSelectedTopic = null;

    const { noTopicMessage } = renderComponent();

    expect(noTopicMessage).toBeInTheDocument();
  });

  it("shows topic details when topic is selected", () => {
    mockSelectedTopic = mockTestTopic;
    const {
      topicInfo,
      totalMentions,
      positiveMentions,
      neutralMentions,
      negativeMentions,
    } = renderComponent();

    expect(topicInfo).toBeInTheDocument();
    expect(totalMentions).toBeInTheDocument();
    expect(totalMentions).toHaveTextContent(
      `Total Mentions: ${mockTestTopic.volume}`
    );
    expect(positiveMentions).toBeInTheDocument();
    expect(positiveMentions).toHaveTextContent(
      `Positive Mentions: ${mockTestTopic.sentiment?.positive}`
    );
    expect(neutralMentions).toBeInTheDocument();
    expect(neutralMentions).toHaveTextContent(
      `Neutral Mentions: ${mockTestTopic.sentiment?.neutral}`
    );
    expect(negativeMentions).toBeInTheDocument();
    expect(negativeMentions).toHaveTextContent(
      `Negative Mentions: ${mockTestTopic.sentiment?.negative}`
    );
  });

  it("shows topic details with fallback values when sentiment is undefined", () => {
    mockSelectedTopic = {
      ...mockTestTopic,
      sentiment: undefined,
    };
    const {
      topicInfo,
      totalMentions,
      positiveMentions,
      neutralMentions,
      negativeMentions,
    } = renderComponent();

    expect(topicInfo).toBeInTheDocument();
    expect(totalMentions).toBeInTheDocument();
    expect(totalMentions).toHaveTextContent(
      `Total Mentions: ${mockTestTopic.volume}`
    );
    expect(positiveMentions).toBeInTheDocument();
    expect(positiveMentions).toHaveTextContent(/0/i);
    expect(neutralMentions).toBeInTheDocument();
    expect(neutralMentions).toHaveTextContent(/0/i);
    expect(negativeMentions).toBeInTheDocument();
    expect(negativeMentions).toHaveTextContent(/0/i);
  });
});
