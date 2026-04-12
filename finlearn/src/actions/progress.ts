"use server";

import { getServerSession } from "next-auth";
import { authOptions, prisma } from "@/lib/auth";
import { allQuestions } from "@/data/questions";
import { revalidatePath } from "next/cache";

export async function submitAnswer(questionId: string, selectedOptionIndex: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const question = allQuestions.find((q) => q.id === questionId);

  if (!question) {
    throw new Error("Question not found");
  }

  const isCorrect = question.correctOptionIndex === selectedOptionIndex;
  
  // Use a transaction to ensure both answer and progress are updated atomically
  await prisma.$transaction(async (tx) => {
    // Save answer
    await tx.userAnswer.create({
      data: {
        userId,
        questionId,
        selectedOptionIndex,
        isCorrect,
      },
    });

    // Handle progress updates
    const existingProgress = await tx.userProgress.findUnique({
      where: { userId },
    });

    if (!existingProgress) {
      await tx.userProgress.create({
        data: { 
          userId, 
          totalScore: isCorrect ? 10 : 0, 
          rewardPoints: isCorrect ? 5 : 0 
        },
      });
    } else if (isCorrect) {
      await tx.userProgress.update({
        where: { userId },
        data: {
          totalScore: { increment: 10 },
          rewardPoints: { increment: 5 },
        },
      });
    }
  });

  revalidatePath("/history");
  revalidatePath("/");
  
  return {
    isCorrect,
    explanation: question.explanation,
    correctOptionIndex: question.correctOptionIndex,
  };
}

export async function getUserProgress() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }

  const progress = await prisma.userProgress.findUnique({
    where: { userId: session.user.id },
  });

  return progress;
}

export async function getUserHistory() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return [];
  }

  const answers = await prisma.userAnswer.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return answers.map(ans => {
    const q = allQuestions.find(qq => qq.id === ans.questionId);
    return {
      ...ans,
      questionText: q?.text || "Unknown Question",
      options: q?.options || [],
    };
  });
}
