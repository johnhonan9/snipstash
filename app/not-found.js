import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-7xl font-black">404</h1>
      <p className="mt-2 text-ink/70">This snippet got garbage-collected.</p>
      <Link href="/" className="card-edge mt-6 bg-acid px-5 py-2 font-bold">
        Back home
      </Link>
    </main>
  );
}
