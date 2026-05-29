# SnipStash

A free, SEO-friendly code-snippet manager. Save snippets privately, publish the good
ones, and each public snippet gets its own fast, indexable page. Built on the all-free
stack: **Next.js (App Router, JSX) + Supabase + Vercel**.

## What it does

- Magic-link auth (no passwords) via Supabase Auth — free.
- Private dashboard to create/delete snippets.
- Public snippets get a clean URL `/s/<slug>` with proper `<title>`, meta description,
  Open Graph tags, canonical URL, and `SoftwareSourceCode` JSON-LD structured data.
- Auto-generated `sitemap.xml` (lists every public snippet) and `robots.txt`.
- Row-Level Security so users only touch their own data; the public can only read
  snippets flagged public.

## Why it's SEO-friendly

- Server-rendered pages (real HTML, not a client-only SPA) → crawlable.
- Per-snippet dynamic metadata + canonical + JSON-LD.
- Dynamic sitemap regenerated from the database.
- Each public snippet is a long-tail landing page that can rank on search.

---

## Folder structure

```
snipstash/
├─ app/
│  ├─ actions.js            # server actions: auth + snippet CRUD
│  ├─ globals.css
│  ├─ layout.js             # root layout + global SEO metadata
│  ├─ page.js               # landing page
│  ├─ not-found.js
│  ├─ robots.js             # robots.txt
│  ├─ sitemap.js            # dynamic sitemap.xml
│  ├─ login/page.js
│  ├─ dashboard/page.js     # protected
│  ├─ explore/page.js       # public snippet feed
│  ├─ auth/callback/route.js# magic-link exchange
│  └─ s/[slug]/page.js      # public snippet page (the SEO surface)
├─ components/
│  ├─ Navbar.jsx
│  └─ SnippetCard.jsx
├─ lib/supabase/
│  ├─ client.js             # browser client
│  ├─ server.js             # server client
│  └─ middleware.js         # session refresh helper
├─ middleware.js            # keeps auth session fresh
├─ supabase-schema.sql      # run this in Supabase
├─ tailwind.config.js
├─ postcss.config.js
├─ next.config.mjs
├─ jsconfig.json
├─ .env.local.example
└─ package.json
```

---

## Setup — step by step

### 1. Create a Supabase project (free)
1. Go to https://supabase.com → New project. Pick the free tier.
2. Once it's ready, open **Project Settings → API**. Copy:
   - **Project URL**
   - **anon public** key

### 2. Create the database table
1. In Supabase, open **SQL Editor → New query**.
2. Paste the contents of `supabase-schema.sql` and click **Run**.
   This creates the `snippets` table, indexes, and Row-Level Security policies.

### 3. Configure auth redirect URLs
In Supabase → **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:3000` (change to your Vercel URL after deploy)
- **Redirect URLs**: add `http://localhost:3000/auth/callback`
  and later `https://YOUR-APP.vercel.app/auth/callback`.

### 4. Local environment
```bash
cp .env.local.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Install & run
```bash
npm install
npm run dev
```
Open http://localhost:3000. Sign in with your email, click the magic link in your
inbox, and you'll land on the dashboard.

### 6. Build check (optional)
```bash
npm run build
npm start
```

---

## Deploy to Vercel (free)

### Option A — via GitHub (recommended)
```bash
git init
git add .
git commit -m "init snipstash"
git branch -M main
git remote add origin https://github.com/YOU/snipstash.git
git push -u origin main
```
1. Go to https://vercel.com → **Add New → Project** → import the repo.
2. In **Environment Variables**, add the same three keys from `.env.local`
   but set `NEXT_PUBLIC_SITE_URL` to your Vercel domain
   (e.g. `https://snipstash.vercel.app`).
3. Click **Deploy**.

### Option B — via CLI
```bash
npm i -g vercel
vercel            # follow prompts
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

### After deploy
- Update Supabase **Site URL** and **Redirect URLs** to your Vercel domain.
- Submit `https://YOUR-APP.vercel.app/sitemap.xml` to Google Search Console.

---

## All npm commands, in order

```bash
npm install      # install deps
npm run dev      # local dev server (localhost:3000)
npm run build    # production build
npm start        # serve the production build locally
npm run lint     # lint
```

That's it. Everything runs on free tiers: Supabase (DB + auth) and Vercel (hosting).
