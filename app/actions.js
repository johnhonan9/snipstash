"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text) {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "snippet"}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function signInWithEmail(formData) {
  const email = formData.get("email");
  const supabase = await createClient();
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${site}/auth/callback` },
  });

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/login?sent=1");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function createSnippet(formData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) redirect("/login");

  const title = formData.get("title");
  const payload = {
    user_id: auth.user.id,
    title,
    description: formData.get("description") || null,
    language: formData.get("language") || "text",
    code: formData.get("code"),
    is_public: formData.get("is_public") === "on",
    slug: slugify(title),
  };

  const { error } = await supabase.from("snippets").insert(payload);
  if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/dashboard");
  revalidatePath("/explore");
  redirect("/dashboard");
}

export async function deleteSnippet(formData) {
  const supabase = await createClient();
  const id = formData.get("id");
  await supabase.from("snippets").delete().eq("id", id);
  revalidatePath("/dashboard");
  revalidatePath("/explore");
}
