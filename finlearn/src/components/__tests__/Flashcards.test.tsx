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

describe('Flashcards Page', () => {
  it('renders flashcard questions and handles correct interactions', async () => {
    render(<FlashcardsPage />);
    
    // Initial render checks
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
    const flipButton = screen.getByText('Flip Card');
    expect(flipButton).toBeDisabled();

    // Select the first option
    // Wait, the first question in our mock data is "In the 50/30/20 rule..."
    // We can find button with text "Wants (e.g., dining out, hobbies)"
    const optionButton = screen.getByText('Wants (e.g., dining out, hobbies)');
    fireEvent.click(optionButton);

    // Button should now be enabled
    expect(flipButton).not.toBeDisabled();

    // Click flip
    fireEvent.click(flipButton);

    // Verify mock response is rendered
    await waitFor(() => {
      expect(screen.getByText('Spot on!')).toBeInTheDocument();
      expect(screen.getByText('Mock correct explanation')).toBeInTheDocument();
    });
  });
});
