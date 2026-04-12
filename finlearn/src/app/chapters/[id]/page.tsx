import { chapters } from "@/data/chapters";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default async function ChapterPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const chapter = chapters.find((c) => c.id === params.id);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl pb-20">
      <Link href="/chapters" className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-10 group">
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to chapters
      </Link>

      <article className="glass rounded-3xl p-8 md:p-12 shadow-xl border-t-8 border-t-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {chapter.title}
        </h1>
        
        <p className="text-xl text-primary font-medium mb-10 pb-10 border-b border-white/10">
          {chapter.description}
        </p>

        <div className="prose prose-invert prose-lg max-w-none text-text-main leading-relaxed">
          <p className="whitespace-pre-line text-lg/8">
            {chapter.content}
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-success">
            <CheckCircle2 size={24} />
            <span className="font-bold">Awesome job reading this!</span>
          </div>
          
          <Link href="/flashcards" className="w-full md:w-auto px-8 py-4 bg-white text-background-app font-bold rounded-xl text-center hover:scale-105 transition-transform flex items-center justify-center gap-2">
            Practice what you learned
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </article>
    </div>
  );
}
