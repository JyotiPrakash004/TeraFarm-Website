import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3, Bot, Handshake, Landmark, LayoutDashboard, Package, ShoppingCart, Sprout, TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { btn, DemoDownloadButton, Footer, Header, StatusBadge } from "@/components/site";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "How TeraFarm Works — Feature Guide" },
      { name: "description", content: "A clear guide to every TeraFarm module: dashboard, crop recommendations, market prices, growth analysis, collaboration and more." },
      { property: "og:title", content: "How TeraFarm Works — Feature Guide" },
      { property: "og:description", content: "Get to know your farming companion, module by module." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturesPage,
});

type S = "Available" | "Demo" | "In Development" | "Coming Soon";
const sections: { id: string; icon: typeof Sprout; t: string; s: S; body: string; steps: string[]; note?: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, t: "Dashboard & Farm Overview", s: "Demo", body: "The dashboard brings together your farm-related information, the products you manage, and summaries of recent activity, so you can see what matters at a glance.", steps: ["Open the app and sign in", "Review your farm and product summary", "Jump into any module from the dashboard"] },
  { id: "crops", icon: Sprout, t: "Crop Recommendations", s: "Demo", body: "Enter a few details about your situation and TeraFarm suggests crops that may suit it, with profit-oriented context drawn from market-price data where available.", steps: ["Enter available land area", "Enter your budget", "Choose cultivation duration in months", "Select your soil type", "Review the suggested crops"], note: "Suggestions support your decision — they are not guaranteed profits or precise predictions." },
  { id: "market", icon: TrendingUp, t: "Agricultural Market Prices", s: "Demo", body: "Market-price information helps you compare selling opportunities and understand current market conditions for different crops.", steps: ["Open Market Prices", "Pick a crop or market", "Compare prices before selling"], note: "In the demo, prices may be sample data rather than live feeds. Always confirm with your local market." },
  { id: "growth", icon: BarChart3, t: "Plant Growth Analysis", s: "In Development", body: "A dedicated space to record crop-growth observations and get plant-related analysis that helps you understand how your crop is developing.", steps: ["Add observations about your plants", "Review the analysis returned", "Track changes over time"], note: "This module is still being built; results are early and limited." },
  { id: "products", icon: Package, t: "Products & Farm Management", s: "Demo", body: "Manage your agricultural products, review their details, and explore farm listings from other users.", steps: ["Add a product", "Edit details as things change", "Browse farm listings"] },
  { id: "collab", icon: Handshake, t: "Collaboration & Community", s: "Demo", body: "Send and receive collaboration requests, see which are pending, and keep track of active collaborations with other farmers.", steps: ["Send a collaboration request", "Accept or decline pending requests", "Manage active collaborations"] },
  { id: "orders", icon: ShoppingCart, t: "Orders & Ratings", s: "Demo", body: "Handle order requests and leave ratings so others can share feedback about farms and products.", steps: ["Receive or place an order request", "Track its status", "Rate the farm or product afterwards"] },
  { id: "schemes", icon: Landmark, t: "Government Schemes & Subsidies", s: "Available", body: "Browse agricultural schemes and subsidies relevant to farmers, gathered in one easy place.", steps: ["Open Schemes", "Read the summary of each scheme", "Follow the official source to apply"], note: "Always verify eligibility, deadlines, and requirements through official government sources." },
  { id: "ai", icon: Bot, t: "AI-Powered Assistance", s: "Coming Soon", body: "AI currently powers the crop recommendation experience. Broader AI assistance — such as conversational help — is planned for the production version.", steps: ["Use AI crop recommendations today", "More AI assistance arrives with production"] },
];

function FeaturesPage() {
  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-field-pattern" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center animate-rise">
          <p className="text-xs font-bold tracking-[0.2em] text-leaf">INSIDE TERAFARM</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Get to Know Your Farming Companion.</h1>
          <p className="mt-5 text-muted-foreground">Explore the features, understand how they work, and discover how TeraFarm brings farming tools and agricultural insights together.</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Feature sections" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            {sections.map((s, i) => (
              <li key={s.id} className="shrink-0">
                <a href={`#${s.id}`} className={`block rounded-lg border-l-2 px-3 py-2 text-sm transition ${active === s.id ? "border-leaf bg-secondary font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}>
                  {i + 1}. {s.t}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-8">
          {sections.map(({ id, icon: I, t, s, body, steps, note }, i) => (
            <article id={id} key={id} className="scroll-mt-24 rounded-3xl border border-border bg-card p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><I className="h-5 w-5" /></div>
                <h2 className="text-xl font-bold sm:text-2xl">{i + 1}. {t}</h2>
                <StatusBadge s={s} />
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {steps.map((st, j) => (
                  <li key={st} className="flex items-start gap-3 rounded-xl bg-background p-3 text-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{j + 1}</span>
                    {st}
                  </li>
                ))}
              </ol>
              {note && <p className="mt-5 rounded-xl border border-leaf/30 bg-secondary/60 p-4 text-sm text-primary">{note}</p>}
            </article>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-3xl bg-gradient-primary px-6 py-16 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Explore TeraFarm?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-85">Start with the demo and see what we're building for the future of agriculture.</p>
          <div className="mt-8 flex flex-wrap items-start justify-center gap-4 [&_p]:text-primary-foreground/70">
            <DemoDownloadButton />
            <Link to="/" className={btn.outline}>Back to Home</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
