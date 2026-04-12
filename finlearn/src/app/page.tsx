import { getServerSession } from "next-auth";
import { authOptions, prisma } from "@/lib/auth";
import { redirect } from "next/navigation";
import { onboardingQuestions } from "@/data/questions";
import Link from "next/link";
import { BookOpen, Award, TrendingUp, Layers } from "lucide-react";
import OnboardingQuiz from "@/components/OnboardingQuiz";
import ClearScoreButton from "@/components/ClearScoreButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Check onboarding status
  const onboardingIds = onboardingQuestions.map(q => q.id);
  const userAnswers = await prisma.userAnswer.findMany({
    where: { 
      userId: session.user.id,
      questionId: { in: onboardingIds }
    }
  });

  const onboardingCompleted = userAnswers.length >= onboardingQuestions.length;

  if (!onboardingCompleted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to finlearn!
          </h1>
          <p className="text-text-muted">
            Let's start with a quick 4-question quiz to gauge your financial literacy.
          </p>
        </div>
        <OnboardingQuiz questions={onboardingQuestions} answeredIds={userAnswers.map(a => a.questionId)} />
      </div>
    );
  }

  const progress = await prisma.userProgress.findUnique({
    where: { userId: session.user.id }
  });

  return (
    <div className="glass rounded-3xl p-8 min-h-[calc(100vh-4rem)]">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Hello, {session.user.name || 'Student'}! 👋</h1>
          <p className="text-text-muted text-lg">Here's your learning progress today.</p>
        </div>
        <ClearScoreButton />
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="glass overflow-hidden rounded-2xl p-6 relative group border-t-4 border-t-primary transition-all hover:translate-y-[-2px] hover:shadow-xl">
          <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors">
            <Award size={48} />
          </div>
          <p className="text-text-muted font-medium mb-1">Total Score</p>
          <h2 className="text-4xl font-extrabold text-white">{progress?.totalScore || 0}</h2>
        </div>

        <div className="glass overflow-hidden rounded-2xl p-6 relative group border-t-4 border-t-secondary transition-all hover:translate-y-[-2px] hover:shadow-xl">
          <div className="absolute top-4 right-4 text-secondary/20 group-hover:text-secondary/40 transition-colors">
            <TrendingUp size={48} />
          </div>
          <p className="text-text-muted font-medium mb-1">Reward Points</p>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-secondary">{progress?.rewardPoints || 0}</h2>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/chapters" className="group p-6 rounded-2xl glass hover:bg-surface-hover transition-colors border border-transparent hover:border-primary/30 flex items-start gap-4">
          <div className="bg-primary/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
            <BookOpen className="text-primary h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">Continue Learning</h3>
            <p className="text-text-muted">Read chapters on budgeting, saving, and investing.</p>
          </div>
        </Link>
        <Link href="/flashcards" className="group p-6 rounded-2xl glass hover:bg-surface-hover transition-colors border border-transparent hover:border-secondary/30 flex items-start gap-4">
          <div className="bg-secondary/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
            <Layers className="text-secondary h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-xl mb-1 group-hover:text-secondary transition-colors">Practice Flashcards</h3>
            <p className="text-text-muted">Test your knowledge with quick interactive quizzes.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
