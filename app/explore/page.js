import Navbar from "@/components/Navbar";
import SnippetCard from "@/components/SnippetCard";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;
export const metadata = {
  title: "Explore snippets",
  description: "Browse public code snippets shared by the community.",
};

export default async function Explore() {
  const supabase = await createClient();
  const { data: snippets } = await supabase
    .from("snippets")
    .select("slug,title,description,language,code")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(60);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <h1 className="mb-6 font-display text-4xl font-black">Explore</h1>
        {snippets?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snippets.map((s) => (
              <SnippetCard key={s.slug} snippet={s} />
            ))}
          </div>
        ) : (
          <p className="text-ink/60">No public snippets yet.</p>
        )}
      </main>
    </>
  );
}
