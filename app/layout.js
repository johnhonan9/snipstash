import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "SnipStash — Save & Share Code Snippets",
    template: "%s · SnipStash",
  },
  verification: {
    google: "OtoGTjExHxUAg_UnpJcMfsudkh6wBOsGPRUKirzL_fI",
  },
  description:
    "A fast, free home for your code snippets. Save them privately, publish them publicly, and let others find your solutions.",
  keywords: ["code snippets", "snippet manager", "developer tools", "share code"],
  openGraph: {
    title: "SnipStash — Save & Share Code Snippets",
    description: "Save code snippets privately, publish publicly, and get discovered.",
    url: SITE,
    siteName: "SnipStash",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnipStash",
    description: "Save & share code snippets.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain min-h-screen font-mono antialiased">{children}</body>
    </html>
  );
}
