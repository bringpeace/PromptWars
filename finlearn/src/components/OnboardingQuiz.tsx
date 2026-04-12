"use client";

import { useState } from "react";
import { Question } from "@/data/questions";
import { submitAnswer } from "@/actions/progress";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export default function OnboardingQuiz({ questions, answeredIds }: { questions: Question[], answeredIds: string[] }) {
  const unanswered = questions.filter(q => !answeredIds.includes(q.id));
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string; correctIndex: number } | null>(null);
  const [loading, setLoading] = useState(false);

  if (unanswered.length === 0) {
    return null; // Will redirect or show dashboard
  }

  const question = unanswered[currentQuestionIdx];

  const handleSubmit = async () => {
    if (selectedOpt === null) return;
    setLoading(true);
    const res = await submitAnswer(question.id, selectedOpt);
    setFeedback({ isCorrect: res.isCorrect, explanation: res.explanation, correctIndex: res.correctOptionIndex });
    setLoading(false);
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOpt(null);
    if (currentQuestionIdx < unanswered.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      window.location.reload(); // Reload to hit the server logic and see dashboard
    }
  };

  return (
    <div className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-text-muted">
        <span>Question {currentQuestionIdx + 1} of {unanswered.length}</span>
        <div className="flex gap-1">
          {unanswered.map((_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full ${i <= currentQuestionIdx ? 'bg-primary' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <h2 className="mb-8 text-2xl font-bold">{question.text}</h2>

      <div className="space-y-4 mb-8">
        {question.options.map((opt, i) => {
          let styleClass = "border border-white/10 bg-white/5 hover:bg-white/10";
          if (selectedOpt === i) styleClass = "border-primary bg-primary/20 ring-2 ring-primary/50";
          
          if (feedback) {
            if (i === feedback.correctIndex) styleClass = "border-success bg-success/20 ring-2 ring-success/50";
            else if (i === selectedOpt && !feedback.isCorrect) styleClass = "border-error bg-error/20 ring-2 ring-error/50 opacity-70";
            else styleClass = "border-white/10 opacity-50";
          }

          return (
            <button
              key={i}
              onClick={() => !feedback && setSelectedOpt(i)}
              disabled={!!feedback}
              className={`w-full rounded-xl p-4 text-left transition-all ${styleClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!feedback ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOpt === null || loading}
          className="w-full flex justify-center items-center rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-4 font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "Checking..." : "Submit Answer"}
        </button>
      ) : (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
          <div className={`mb-6 rounded-xl p-4 flex items-start gap-4 ${feedback.isCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            {feedback.isCorrect ? <CheckCircle2 className="mt-1" /> : <XCircle className="mt-1" />}
            <div>
              <p className="font-bold mb-1">{feedback.isCorrect ? "Correct!" : "Not quite right"}</p>
              <p className="text-sm opacity-90">{feedback.explanation}</p>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="w-full flex justify-center items-center gap-2 rounded-xl bg-white text-background-app px-6 py-4 font-bold transition-transform hover:scale-[1.02]"
          >
            {currentQuestionIdx < unanswered.length - 1 ? "Next Question" : "Complete Setup"}
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
