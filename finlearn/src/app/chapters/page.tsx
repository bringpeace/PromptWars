import { chapters } from "@/data/chapters";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

export default function ChaptersPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 inline-block">Learning Library</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          Dive into simple, practical guides to take control of your financial future. Complete these short reads to build a solid foundation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/chapters/${chapter.id}`}
            className="group glass rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 border border-[rgba(255,255,255,0.05)] flex flex-col h-full"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
              <BookOpen size={28} />
            </div>
            
            <h2 className="mb-3 text-2xl font-bold text-white group-hover:text-primary transition-colors">{chapter.title}</h2>
            <p className="mb-8 text-text-muted flex-grow line-clamp-3">
              {chapter.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between text-sm font-bold text-primary opacity-80 transition-all group-hover:opacity-100">
              <span>Read Chapter</span>
              <ChevronRight className="transition-transform group-hover:translate-x-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
