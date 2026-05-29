import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getSnippet(slug) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("snippets")
    .select("slug,title,description,language,code,created_at,is_public")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const snippet = await getSnippet(slug);
  if (!snippet) return { title: "Not found" };

  const desc =
    snippet.description ||
    `A ${snippet.language} code snippet: ${snippet.title}. View, copy, and reuse it on SnipStash.`;

  return {
    title: snippet.title,
    description: desc,
    alternates: { canonical: `${SITE}/s/${snippet.slug}` },
    openGraph: {
      title: snippet.title,
      description: desc,
      url: `${SITE}/s/${snippet.slug}`,
      type: "article",
    },
  };
}

export default async function SnippetPage({ params }) {
  const { slug } = await params;
  const snippet = await getSnippet(slug);
  if (!snippet) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: snippet.title,
    description: snippet.description || snippet.title,
    programmingLanguage: snippet.language,
    codeSampleType: "code snippet",
    dateCreated: snippet.created_at,
    url: `${SITE}/s/${snippet.slug}`,
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <article>
          <div className="mb-3 flex items-center gap-3">
            <span className="bg-ink px-2 py-0.5 text-sm text-acid">{snippet.language}</span>
            <time className="text-sm text-ink/50">
              {new Date(snippet.created_at).toLocaleDateString()}
            </time>
          </div>
          <h1 className="font-display text-4xl font-black leading-tight">{snippet.title}</h1>
          {snippet.description && (
            <p className="mt-3 text-ink/70">{snippet.description}</p>
          )}
          <div className="card-edge mt-6 bg-ink p-0">
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-paper">
              <code>{snippet.code}</code>
            </pre>
          </div>
        </article>
      </main>
    </>
  );
}
