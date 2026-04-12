import { render, screen } from '@testing-library/react';
import Home from '../page';
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/auth";

// Mock next-auth
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Mock prisma
jest.mock("@/lib/auth", () => ({
  authOptions: {},
  prisma: {
    userAnswer: {
      findMany: jest.fn(),
    },
    userProgress: {
      findUnique: jest.fn(),
    },
  },
}));

// Mock components
jest.mock("@/components/OnboardingQuiz", () => {
  return function MockOnboardingQuiz() {
    return <div data-testid="onboarding-quiz">Onboarding Quiz</div>;
  };
});

jest.mock("@/components/ClearScoreButton", () => {
  return function MockClearScoreButton() {
    return <button>Clear Score</button>;
  };
});

describe('Dashboard Page Integration', () => {
  const mockUserId = "user-123";
  const mockSession = { user: { id: mockUserId, name: "Test User" } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders onboarding quiz if onboarding is not completed', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (prisma.userAnswer.findMany as jest.Mock).mockResolvedValue([]); // No answers yet

    // Server components are async, so we need to await the result if calling directly
    // or use a wrapper if using render. For simplicity in this environment, 
    // we'll treat it as a component that returns a promise.
    const Page = await Home();
    render(Page);
    
    expect(screen.getByTestId('onboarding-quiz')).toBeInTheDocument();
  });

  it('renders progress dashboard if onboarding is completed', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    // Mock enough answers to complete onboarding (4 questions)
    (prisma.userAnswer.findMany as jest.Mock).mockResolvedValue([
      { questionId: 'ob-1' }, { questionId: 'ob-2' }, { questionId: 'ob-3' }, { questionId: 'ob-4' }
    ]);
    (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue({
      totalScore: 150,
      rewardPoints: 75
    });

    const Page = await Home();
    render(Page);
    
    expect(screen.getByText('Hello, Test User! 👋')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('Continue Learning')).toBeInTheDocument();
    expect(screen.getByText('Practice Flashcards')).toBeInTheDocument();
  });
});
