import { getUserHistory } from "@/actions/progress";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default async function HistoryPage() {
  const history = await getUserHistory();

  return (
    <div className="mx-auto max-w-4xl pb-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Your Learning History</h1>
        <p className="text-text-muted text-lg">
          Review your past quiz and flashcard responses.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <Clock className="mx-auto mb-4 h-16 w-16 text-white/20" />
          <h2 className="text-2xl font-bold text-white mb-2">No history yet</h2>
          <p className="text-text-muted">Complete some flashcards or quizzes to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="glass rounded-2xl p-6 flex flex-col md:flex-row gap-6 border border-white/5 transition-all hover:bg-white/5">
              <div className="flex-shrink-0 mt-1">
                {item.isCorrect ? (
                  <div className="bg-success/20 p-3 rounded-xl text-success">
                    <CheckCircle2 size={24} />
                  </div>
                ) : (
                  <div className="bg-error/20 p-3 rounded-xl text-error">
                    <XCircle size={24} />
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white">{item.questionText}</h3>
                  <span className="text-xs font-medium text-text-muted bg-surface px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  {item.options.map((opt: string, i: number) => {
                    const isSelected = item.selectedOptionIndex === i;
                    
                    if (!isSelected) {
                      // Only show selected option, occasionally the correct one if it wasn't selected
                      return null;
                    }

                    return (
                      <div key={i} className={`p-3 rounded-lg text-sm flex items-center gap-3 ${item.isCorrect ? 'bg-success/10 text-success border border-success/20' : 'bg-error/10 text-error border border-error/20'}`}>
                        <span className="font-bold opacity-50 uppercase text-xs tracking-wider">Your Answer:</span>
                        <span className="font-medium">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
