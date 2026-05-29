import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions";

export default async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <nav className="sticky top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight">
          <span className="flex flex-col gap-[3px] rounded-md bg-ink p-[6px]" aria-hidden="true">
            <span className="h-[5px] w-[22px] rounded-sm bg-acid" />
            <span className="ml-[6px] h-[5px] w-[16px] rounded-sm bg-paper" />
            <span className="h-[5px] w-[22px] rounded-sm bg-rust" />
          </span>
          Snip<span className="bg-ink px-1 text-acid">Stash</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/explore" className="hover:text-rust">Explore</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-rust">Dashboard</Link>
              <form action={signOut}>
                <button className="border-2 border-ink bg-ink px-3 py-1 text-paper hover:bg-rust">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="border-2 border-ink bg-acid px-3 py-1 hover:bg-ink hover:text-acid">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
