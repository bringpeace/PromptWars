import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FlashcardsPage from '@/app/flashcards/page';

// Mock the server action
jest.mock('@/actions/progress', () => ({
  submitAnswer: jest.fn().mockResolvedValue({
    isCorrect: true,
    explanation: 'Mock correct explanation',
    correctOptionIndex: 0
  })
}));

// Mock the questions data to have only 2 questions for easier testing of completion
jest.mock('@/data/questions', () => ({
  flashcardQuestions: [
    {
      id: "fc-1",
      text: "Test Question 1",
      options: ["Correct 1", "Wrong 1"],
      correctOptionIndex: 0,
      explanation: "Exp 1"
    },
    {
      id: "fc-2",
      text: "Test Question 2",
      options: ["Correct 2", "Wrong 2"],
      correctOptionIndex: 0,
      explanation: "Exp 2"
    }
  ]
}));

describe('Flashcards Page Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('completes the full flashcard flow: answer -> next -> answer -> completion -> restart', async () => {
    render(<FlashcardsPage />);
    
    // CARD 1
    expect(screen.getByText('Card 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Test Question 1')).toBeInTheDocument();

    // Select correct option
    fireEvent.click(screen.getByText('Correct 1'));
    fireEvent.click(screen.getByText('Flip Card'));

    await waitFor(() => {
      expect(screen.getByText('Spot on!')).toBeInTheDocument();
      expect(screen.getByText('Exp 1')).toBeInTheDocument();
    });

    // Move to next card
    fireEvent.click(screen.getByText('Next Flashcard'));

    // CARD 2
    expect(screen.getByText('Card 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('Test Question 2')).toBeInTheDocument();

    // Select correct option
    fireEvent.click(screen.getByText('Correct 2'));
    fireEvent.click(screen.getByText('Flip Card'));

    await waitFor(() => {
      expect(screen.getByText('Spot on!')).toBeInTheDocument();
    });

    // Finish set
    fireEvent.click(screen.getByText('Finish Set'));

    // COMPLETION SCREEN
    await waitFor(() => {
      expect(screen.getByText('All Cards Completed!')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument(); // 2 correct answers * 10 points
    });

    // Start Again
    fireEvent.click(screen.getByText('Start Again'));

    // Verify it reset to Card 1
    expect(screen.getByText('Card 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Test Question 1')).toBeInTheDocument();
  });

  it('shows session score correctly during the quiz', async () => {
    render(<FlashcardsPage />);
    
    // Initial session score
    expect(screen.getByText('0')).toBeInTheDocument();

    // Answer correctly
    fireEvent.click(screen.getByText('Correct 1'));
    fireEvent.click(screen.getByText('Flip Card'));

    await waitFor(() => {
      // Score should update to 10
      expect(screen.getAllByText('10').length).toBeGreaterThan(0);
    });
  });
});
