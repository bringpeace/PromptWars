import { submitAnswer, getUserProgress, clearUserProgress } from "../progress";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { allQuestions } from "@/data/questions";

// Mock next-auth
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

// Mock next/cache
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Mock prisma
jest.mock("@/lib/auth", () => ({
  authOptions: {},
  prisma: {
    $transaction: jest.fn((callback) => callback(prisma)),
    userAnswer: {
      create: jest.fn(),
    },
    userProgress: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

describe("Progress Actions", () => {
  const mockUserId = "user-123";
  const mockSession = { user: { id: mockUserId } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("submitAnswer", () => {
    it("throws error if user is not authenticated", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      await expect(submitAnswer("q1", 0)).rejects.toThrow("Unauthorized");
    });

    it("throws error if question is not found", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      await expect(submitAnswer("invalid-q", 0)).rejects.toThrow("Question not found");
    });

    it("saves answer and updates progress correctly for correct answer", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      const question = allQuestions[0];
      const correctIdx = question.correctOptionIndex;

      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue({
        userId: mockUserId,
        totalScore: 50,
      });

      const result = await submitAnswer(question.id, correctIdx);

      expect(result.isCorrect).toBe(true);
      expect(prisma.userAnswer.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: mockUserId,
          questionId: question.id,
          isCorrect: true,
        }),
      });
      expect(prisma.userProgress.update).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        data: {
          totalScore: { increment: 10 },
          rewardPoints: { increment: 5 },
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("saves answer and does NOT update progress for incorrect answer", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      const question = allQuestions[0];
      const incorrectIdx = (question.correctOptionIndex + 1) % 3;

      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue({
        userId: mockUserId,
        totalScore: 50,
      });

      const result = await submitAnswer(question.id, incorrectIdx);

      expect(result.isCorrect).toBe(false);
      expect(prisma.userAnswer.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          isCorrect: false,
        }),
      });
      expect(prisma.userProgress.update).not.toHaveBeenCalled();
    });
  });

  describe("getUserProgress", () => {
    it("returns null if user is not authenticated", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      const result = await getUserProgress();
      expect(result).toBeNull();
    });

    it("returns progress if user is authenticated", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      const mockProgress = { userId: mockUserId, totalScore: 100 };
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue(mockProgress);

      const result = await getUserProgress();
      expect(result).toEqual(mockProgress);
    });
  });

  describe("clearUserProgress", () => {
    it("throws error if user is not authenticated", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      await expect(clearUserProgress()).rejects.toThrow("Unauthorized");
    });

    it("upserts progress to zero for authenticated user", async () => {
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);
      await clearUserProgress();

      expect(prisma.userProgress.upsert).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        update: { totalScore: 0, rewardPoints: 0 },
        create: { userId: mockUserId, totalScore: 0, rewardPoints: 0 },
      });
    });
  });
});
