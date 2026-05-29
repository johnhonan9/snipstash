import Link from "next/link";
import Navbar from "@/components/Navbar";
import SnippetCard from "@/components/SnippetCard";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();
  const { data: snippets } = await supabase
    .from("snippets")
    .select("slug,title,description,language,code")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5">
        <section className="py-20 text-center">
          <h1 className="rise font-display text-5xl font-black leading-[0.95] sm:text-7xl">
            Stash the code <br /> you keep <span className="bg-acid px-2">re-googling</span>.
          </h1>
          <p className="rise mx-auto mt-6 max-w-xl text-ink/70" style={{ animationDelay: "0.1s" }}>
            Save snippets privately. Publish the good ones. Each public snippet gets its
            own clean, fast, indexable page — so people actually find your solutions.
          </p>
          <div className="rise mt-8 flex justify-center gap-3" style={{ animationDelay: "0.2s" }}>
            <Link href="/login" className="border-2 border-ink bg-ink px-6 py-3 font-bold text-acid hover:bg-rust hover:text-paper">
              Start stashing →
            </Link>
            <Link href="/explore" className="border-2 border-ink px-6 py-3 font-bold hover:bg-acid">
              Explore
            </Link>
          </div>
        </section>

        {snippets?.length > 0 && (
          <section className="pb-24">
            <h2 className="mb-5 font-display text-2xl font-bold">Fresh from the community</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {snippets.map((s) => (
                <SnippetCard key={s.slug} snippet={s} />
              ))}
            </div>
          </section>
        )}
      </main>
      <footer className="border-t-2 border-ink py-8 text-center text-sm text-ink/60">
        Built with Next.js + Supabase · SnipStash
      </footer>
    </>
  );
}
