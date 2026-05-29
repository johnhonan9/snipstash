import Link from "next/link";

export default function SnippetCard({ snippet }) {
  return (
    <Link
      href={`/s/${snippet.slug}`}
      className="card-edge block bg-paper p-4 rise"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-bold leading-tight">{snippet.title}</h3>
        <span className="shrink-0 bg-ink px-2 py-0.5 text-xs text-acid">{snippet.language}</span>
      </div>
      {snippet.description && (
        <p className="mb-3 line-clamp-2 text-sm text-ink/70">{snippet.description}</p>
      )}
      <pre className="max-h-28 overflow-hidden rounded bg-ink p-3 text-xs text-paper">
        <code>{snippet.code.slice(0, 220)}</code>
      </pre>
    </Link>
  );
}
