import Navbar from "@/components/Navbar";
import { signInWithEmail } from "@/app/actions";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const sent = params?.sent;
  const error = params?.error;

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-md flex-col px-5 py-24">
        <h1 className="font-display text-4xl font-black">Sign in</h1>
        <p className="mt-2 text-ink/70">
          We use magic links — no passwords to forget. Enter your email and check your inbox.
        </p>

        {sent && (
          <div className="card-edge mt-6 bg-acid p-4 text-sm font-medium">
            Link sent. Go check your email.
          </div>
        )}
        {error && (
          <div className="card-edge mt-6 bg-rust p-4 text-sm font-medium text-paper">{error}</div>
        )}

        <form action={signInWithEmail} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="border-2 border-ink bg-paper px-4 py-3 outline-none focus:bg-acid/30"
          />
          <button className="border-2 border-ink bg-ink px-4 py-3 font-bold text-acid hover:bg-rust hover:text-paper">
            Send magic link
          </button>
        </form>
      </main>
    </>
  );
}
