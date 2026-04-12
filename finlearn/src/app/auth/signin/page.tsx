"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { ArrowRight, BookOpen, Search, LogIn } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-app p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-secondary/20 blur-[120px]" />
      </div>
      
      <div className="z-10 w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white">Welcome to finlearn</h1>
            <p className="text-text-muted">Your journey to financial literacy begins here</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-muted">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="demo@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.2)] px-4 py-3 pl-10 text-white placeholder-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
                <LogIn className="absolute left-3 top-3.5 h-5 w-5 text-text-muted" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-primary/25 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span className="relative z-10">Continue with Email</span>
                  <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-text-muted">
            <p>For this demo, entering any email will create an account or log you in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
