"use client";

import { useState } from "react";
import { flashcardQuestions } from "@/data/questions";
import { submitAnswer } from "@/actions/progress";
import { CheckCircle2, XCircle, RefreshCw, Zap } from "lucide-react";

export default function FlashcardsPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string; correctIndex: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  const activeQuestion = flashcardQuestions[currentIdx];

  const handleSubmit = async () => {
    if (selectedOpt === null) return;
    setLoading(true);
    try {
      const res = await submitAnswer(activeQuestion.id, selectedOpt);
      setFeedback({ 
        isCorrect: res.isCorrect, 
        explanation: res.explanation, 
        correctIndex: res.correctOptionIndex 
      });
      if (res.isCorrect) setSessionScore(s => s + 10);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOpt(null);
    setCurrentIdx((prev) => (prev + 1) % flashcardQuestions.length);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4 inline-block">Flashcards</h1>
          <p className="text-text-muted text-lg">
            Test your knowledge. Immediate feedback, real-time points.
          </p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
          <Zap className="text-secondary" />
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Session Score</p>
            <p className="text-xl font-bold text-white">{sessionScore}</p>
          </div>
        </div>
      </div>

      <div className="perspective-1000">
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative border border-white/5 bg-gradient-to-br from-surface to-background-app">
          <div className="absolute top-0 right-0 w-full h-2 bg-white/5 rounded-t-3xl overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-500 ease-out"
              style={{ width: \`\${((currentIdx + 1) / flashcardQuestions.length) * 100}%\` }}
            />
          </div>

          <div className="mb-8 flex items-center justify-between">
            <span className="bg-white/10 text-white/70 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
              Card {currentIdx + 1} of {flashcardQuestions.length}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-10 leading-tight">
            {activeQuestion.text}
          </h2>

          <div className="space-y-4">
            {activeQuestion.options.map((opt, i) => {
              let styleClass = "border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20";
              
              if (selectedOpt === i) {
                styleClass = "border-secondary bg-secondary/20 ring-2 ring-secondary/50 text-white";
              }
              
              if (feedback) {
                if (i === feedback.correctIndex) {
                  styleClass = "border-success bg-success/20 ring-2 ring-success/50 text-white";
                } else if (i === selectedOpt && !feedback.isCorrect) {
                  styleClass = "border-error bg-error/20 ring-2 ring-error/50 opacity-70";
                } else {
                  styleClass = "border-white/5 opacity-40";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => !feedback && setSelectedOpt(i)}
                  disabled={!!feedback}
                  className={\`w-full text-left p-5 rounded-2xl transition-all duration-200 text-lg flex items-center justify-between \${styleClass}\`}
                >
                  <span>{opt}</span>
                  {feedback && i === feedback.correctIndex && <CheckCircle2 className="text-success inline-block ml-4 flex-shrink-0" />}
                  {feedback && i === selectedOpt && !feedback.isCorrect && <XCircle className="text-error inline-block ml-4 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-10">
            {!feedback ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOpt === null || loading}
                className="w-full py-5 rounded-2xl bg-white text-background-app font-bold text-lg transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-xl shadow-white/10"
              >
                {loading ? "Checking..." : "Flip Card"}
              </button>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className={\`p-6 rounded-2xl mb-6 flex gap-4 \${feedback.isCorrect ? 'bg-success/10 border-l-4 border-success text-success' : 'bg-error/10 border-l-4 border-error text-error'}\`}>
                  <div className="flex-shrink-0 mt-1">
                    {feedback.isCorrect ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{feedback.isCorrect ? "Spot on!" : "Not quite."}</h3>
                    <p className="text-white/80 leading-relaxed">{feedback.explanation}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleNext}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-secondary to-primary text-white font-bold text-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-xl shadow-secondary/20"
                >
                  <RefreshCw size={20} />
                  Next Flashcard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
