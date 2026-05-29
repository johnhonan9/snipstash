import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { createSnippet, deleteSnippet } from "@/app/actions";
import { redirect } from "next/navigation";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) redirect("/login");

  const { data: snippets } = await supabase
    .from("snippets")
    .select("id,slug,title,language,is_public")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="mx-auto grid max-w-5xl gap-8 px-5 py-12 lg:grid-cols-[1fr_360px]">
        <section>
          <h1 className="mb-5 font-display text-3xl font-black">Your snippets</h1>
          {snippets?.length ? (
            <ul className="flex flex-col gap-3">
              {snippets.map((s) => (
                <li key={s.id} className="card-edge flex items-center justify-between bg-paper p-3">
                  <Link href={`/s/${s.slug}`} className="font-bold hover:text-rust">
                    {s.title}
                  </Link>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="bg-ink px-2 py-0.5 text-acid">{s.language}</span>
                    <span>{s.is_public ? "🌐 public" : "🔒 private"}</span>
                    <form action={deleteSnippet}>
                      <input type="hidden" name="id" value={s.id} />
                      <button className="text-rust hover:underline">delete</button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink/60">No snippets yet. Add your first one →</p>
          )}
        </section>

        <aside className="card-edge h-fit bg-paper p-5">
          <h2 className="mb-4 font-display text-xl font-bold">New snippet</h2>
          <form action={createSnippet} className="flex flex-col gap-3">
            <input name="title" required placeholder="Title"
              className="border-2 border-ink bg-paper px-3 py-2 outline-none focus:bg-acid/30" />
            <input name="description" placeholder="Short description (optional)"
              className="border-2 border-ink bg-paper px-3 py-2 outline-none focus:bg-acid/30" />
            <input name="language" placeholder="language (e.g. javascript)" defaultValue="javascript"
              className="border-2 border-ink bg-paper px-3 py-2 outline-none focus:bg-acid/30" />
            <textarea name="code" required rows={8} placeholder="paste code here…"
              className="border-2 border-ink bg-ink px-3 py-2 font-mono text-sm text-paper outline-none" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="is_public" className="h-4 w-4" />
              Make public (SEO-indexed)
            </label>
            <button className="border-2 border-ink bg-ink px-3 py-2 font-bold text-acid hover:bg-rust hover:text-paper">
              Save snippet
            </button>
          </form>
        </aside>
      </main>
    </>
  );
}
