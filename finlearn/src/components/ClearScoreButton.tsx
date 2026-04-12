"use client";

import { clearUserProgress } from "@/actions/progress";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function ClearScoreButton() {
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    if (!confirm("Are you sure you want to reset your score and points? This cannot be undone.")) {
      return;
    }
    
    setIsClearing(true);
    try {
      await clearUserProgress();
    } catch (error) {
      console.error("Failed to clear score:", error);
      alert("Failed to clear score. Please try again.");
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <button
      onClick={handleClear}
      disabled={isClearing}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-error/10 text-error hover:bg-error/20 transition-colors text-sm font-medium border border-error/20"
    >
      <Trash2 size={16} />
      {isClearing ? "Clearing..." : "Clear Score"}
    </button>
  );
}
