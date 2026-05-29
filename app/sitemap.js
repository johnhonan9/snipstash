import { createClient } from "@/lib/supabase/server";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const supabase = await createClient();
  const { data: snippets } = await supabase
    .from("snippets")
    .select("slug,created_at")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(5000);

  const snippetUrls = (snippets || []).map((s) => ({
    url: `${SITE}/s/${s.slug}`,
    lastModified: s.created_at,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: SITE, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/explore`, changeFrequency: "daily", priority: 0.8 },
    ...snippetUrls,
  ];
}
