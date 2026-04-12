import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OnboardingQuiz from "../OnboardingQuiz";
import { submitAnswer } from "@/actions/progress";

// Mock the action
jest.mock("@/actions/progress", () => ({
  submitAnswer: jest.fn(),
}));

const mockQuestions = [
  {
    id: "q1",
    text: "Question 1?",
    options: ["A", "B"],
    correctOptionIndex: 0,
    explanation: "Exp 1",
  },
  {
    id: "q2",
    text: "Question 2?",
    options: ["C", "D"],
    correctOptionIndex: 1,
    explanation: "Exp 2",
  },
];

describe("OnboardingQuiz", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() },
      writable: true,
    });
  });

  it("renders the first unanswered question", () => {
    render(<OnboardingQuiz questions={mockQuestions} answeredIds={[]} />);
    expect(screen.getByText("Question 1 of 2")).toBeInTheDocument();
    expect(screen.getByText("Question 1?")).toBeInTheDocument();
  });

  it("skips already answered questions", () => {
    render(<OnboardingQuiz questions={mockQuestions} answeredIds={["q1"]} />);
    expect(screen.getByText("Question 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("Question 2?")).toBeInTheDocument();
  });

  it("handles correct answer and moves to next question", async () => {
    (submitAnswer as jest.Mock).mockResolvedValue({
      isCorrect: true,
      explanation: "Exp 1",
      correctOptionIndex: 0,
    });

    render(<OnboardingQuiz questions={mockQuestions} answeredIds={[]} />);

    fireEvent.click(screen.getByText("A"));
    fireEvent.click(screen.getByText("Submit Answer"));

    await waitFor(() => {
      expect(screen.getByText("Correct!")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Next Question"));

    expect(screen.getByText("Question 2 of 2")).toBeInTheDocument();
  });

  it("reloads page after the last question", async () => {
    (submitAnswer as jest.Mock).mockResolvedValue({
      isCorrect: true,
      explanation: "Exp 2",
      correctOptionIndex: 1,
    });

    render(<OnboardingQuiz questions={mockQuestions} answeredIds={["q1"]} />);

    fireEvent.click(screen.getByText("D"));
    fireEvent.click(screen.getByText("Submit Answer"));

    await waitFor(() => {
      expect(screen.getByText("Complete")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Complete"));

    expect(window.location.reload).toHaveBeenCalled();
  });
});
