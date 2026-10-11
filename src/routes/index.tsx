import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, ArrowRight, BarChart3, Download, FolderOpen, Handshake, Instagram, Landmark,
  LayoutDashboard, Leaf, Lock, Smartphone, Sparkles, Sprout, TrendingUp,
} from "lucide-react";
import plant from "@/assets/hero-plant.jpg";
import { appLinks, isValidUrl, productionReady } from "@/config/appLinks";
import { btn, DemoDownloadButton, ExternalLink, Footer, Header } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TeraFarm — Grow Smarter. Farm Better." },
      { name: "description", content: "TeraFarm is an AI-powered farming app: crop recommendations, market prices, collaboration and government schemes in one place." },
      { property: "og:title", content: "TeraFarm — Grow Smarter. Farm Better." },
      { property: "og:description", content: "AI-powered farming companion. Download the demo APK." },
      { property: "og:image", content: "/terafarm-logo.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/terafarm-logo.png" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Downloads />
      <Community />
      <Footer />
    </div>
  );
}

function Phone() {
  return (
    <div className="relative mx-auto w-[260px] animate-float sm:w-[300px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.75rem] border-[10px] border-foreground/90 bg-deep shadow-phone">
        <img src={plant} alt="Healthy young green seedling growing in rich soil" width={768} height={1536} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-foreground" />
        <div className="absolute inset-x-0 top-10 flex items-center justify-between px-4 text-deep-foreground">
          <span className="flex items-center gap-1 text-xs font-bold"><Sprout className="h-3.5 w-3.5" /> TeraFarm</span>
          <span className="rounded-full bg-deep/60 px-2 py-0.5 text-[10px] backdrop-blur">Crop health · Good</span>
        </div>
        <div className="absolute inset-x-3 bottom-4 space-y-2 rounded-2xl bg-deep/70 p-3 text-deep-foreground backdrop-blur">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> Farm insights</span>
            <span className="text-leaf">Day 24</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-deep-foreground/20">
            <div className="h-full w-2/3 rounded-full bg-leaf" />
          </div>
          <p className="text-[10px] opacity-80">Growth progress · 66%</p>
        </div>
      </div>
    </div>
  );
}

function HeroButton({ icon, label, main, onClick, href }: { icon: React.ReactNode; label: string; main: string; onClick?: () => void; href?: string }) {
  const cls = "flex items-center gap-3 rounded-2xl border border-foreground/80 bg-card px-4 py-2.5 text-left shadow-soft transition hover:-translate-y-0.5";
  const inner = (
    <>
      {icon}
      <span><span className="block text-[10px] font-medium tracking-wide">{label}</span><span className="block text-base font-bold leading-tight">{main}</span></span>
    </>
  );
  if (onClick) return <button onClick={onClick} className={cls}>{inner}</button>;
  return <ExternalLink href={href ?? ""} className={cls} fallback="Drive link coming soon">{inner}</ExternalLink>;
}

function Hero() {
  const toDownloads = () => document.getElementById("downloads")?.scrollIntoView({ behavior: "smooth" });
  const left = <HeroButton icon={<Smartphone className="h-7 w-7 text-leaf" />} label="GET THE ANDROID APP" main="Download Demo APK" onClick={toDownloads} />;
  const right = <HeroButton icon={<FolderOpen className="h-7 w-7 text-primary" />} label="EXPLORE THE PROJECT" main="View Demo on Drive" href={appLinks.demoDriveUrl} />;
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-field-pattern" />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 text-center animate-rise">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" /> 🌱 Meet TeraFarm — Farming, Smarter
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Grow Smarter. Farm Better.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Discover a smarter way to manage your farm, explore AI-powered recommendations, track agricultural opportunities, and connect with the farming community — all in one place.
        </p>
        <div className="relative mt-12 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden justify-end md:flex">{left}</div>
          <div className="relative">
            <Leaf className="absolute -left-10 top-20 h-10 w-10 -rotate-12 text-leaf/30" />
            <Leaf className="absolute -right-8 top-48 h-8 w-8 rotate-45 text-leaf/30" />
            <Phone />
          </div>
          <div className="hidden justify-start md:flex">{right}</div>
          <div className="flex flex-col items-center gap-3 md:hidden">{left}{right}</div>
        </div>
        <p className="py-10 text-sm text-muted-foreground">Built for smarter farming. Designed for real-world impact.</p>
      </div>
      <div className="h-[3px] bg-leaf-line" />
    </section>
  );
}

const features = [
  { icon: LayoutDashboard, t: "Smart Dashboard", d: "An overview of your farming activities, products, and relevant information in one convenient place." },
  { icon: Sprout, t: "AI Crop Recommendations", d: "Explore suitable crops based on land area, budget, soil type, and cultivation duration, with profitability-oriented suggestions." },
  { icon: TrendingUp, t: "Market Price Insights", d: "Agricultural market-price information to help you understand trends and make more informed selling decisions." },
  { icon: BarChart3, t: "Plant Growth Analysis", d: "A dedicated space for crop-growth observations and plant-related analysis to follow crop development." },
  { icon: Handshake, t: "Farm Collaboration", d: "Connect with farmers through collaboration requests, cooperative opportunities, and shared activities." },
  { icon: Landmark, t: "Government Schemes & Subsidies", d: "Discover agricultural schemes, subsidies, and government support information more easily." },
];

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything Your Farm Needs. In One Place.</h2>
        <p className="mt-4 text-muted-foreground">Explore the tools designed to make farming more informed, connected, and accessible.</p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: I, t, d }) => (
          <article key={t} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <I className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </article>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">Curious about how everything works?</p>
        <Link to="/features" className={btn.primary}>Explore All Features <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

function Downloads() {
  const ready = productionReady();
  return (
    <section id="downloads" className="scroll-mt-20 bg-secondary/50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get Your Hands on TeraFarm</h2>
          <p className="mt-4 text-muted-foreground">Explore the current demo and stay tuned for the next evolution of smarter farming.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-leaf/40 bg-card p-8 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-leaf"><Smartphone className="h-6 w-6" /></div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold tracking-wide text-primary">AVAILABLE NOW</span>
            </div>
            <h3 className="mt-6 text-2xl font-bold">TeraFarm Demo</h3>
            <p className="text-sm text-muted-foreground">Explore the early experience. · {appLinks.demoVersion}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed">This is the demo application. It's still a work in progress, but it gives you a glimpse of the features, ideas, and upcoming functionality we're building for TeraFarm.</p>
            <div className="mt-6 space-y-3">
              <DemoDownloadButton />
              <ExternalLink href={appLinks.demoDriveUrl} className="block text-sm font-medium text-primary underline-offset-4 hover:underline">View demo files on Google Drive ↗</ExternalLink>
            </div>
          </article>
          <article className="flex flex-col rounded-3xl border border-primary/20 bg-gradient-primary p-8 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-foreground/10">{ready ? <Download className="h-6 w-6" /> : <Lock className="h-6 w-6" />}</div>
              <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold tracking-wide">{ready ? "AVAILABLE NOW" : "IN DEVELOPMENT"}</span>
            </div>
            <h3 className="mt-6 text-2xl font-bold">TeraFarm Production</h3>
            <p className="text-sm opacity-75">The next chapter of smarter farming. · {appLinks.productionVersion}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed opacity-90">An upgraded TeraFarm experience with a refined UI, improved usability, expanded features, and a more complete farming workflow. We're working on bringing the next version to life.</p>
            <div className="mt-6 space-y-3">
              {ready ? (
                <a href={appLinks.productionApkUrl} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5">↓ Download Production APK</a>
              ) : (
                <>
                  <button disabled className="cursor-not-allowed rounded-full bg-primary-foreground/15 px-6 py-3 text-sm font-semibold opacity-80">Coming Soon</button>
                  <p className="text-xs opacity-70">Production APK will be available here once it's ready.</p>
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Follow the Journey. Grow With Us.</h2>
        <p className="mt-4 text-muted-foreground">Explore the project, discover the demo, and follow our journey as TeraFarm grows.</p>
      </div>
      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        <article className="flex flex-col rounded-3xl border border-border bg-card p-7">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-chart-4 via-destructive to-primary text-primary-foreground"><Instagram className="h-6 w-6" /></div>
          <h3 className="mt-5 text-xl font-bold">Follow TeraFarm</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">Get a closer look at our progress, new ideas, feature previews, and the journey behind building TeraFarm.</p>
          <ExternalLink href={appLinks.instagramUrl} className={`${btn.outline} mt-6`} fallback="Instagram link coming soon">Visit Instagram ↗</ExternalLink>
        </article>
        <article className="flex flex-col rounded-3xl border-2 border-leaf/50 bg-card p-7 shadow-soft lg:-translate-y-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary"><FolderOpen className="h-6 w-6" /></div>
          <h3 className="mt-5 text-xl font-bold">Explore the Demo</h3>
          <p className="mt-2 text-sm text-muted-foreground">Curious about what we're building? Take a closer look at the demo resources and explore the project for yourself.</p>
          <p className="mt-4 flex-1 rounded-xl bg-secondary p-4 text-sm font-medium text-primary">“A little peek into a bigger vision. 🌱 Open the Drive, explore the demo, and see where smarter farming begins.”</p>
          <ExternalLink href={appLinks.demoDriveUrl} className={`${btn.primary} mt-6`} fallback="Drive link coming soon">Explore Demo on Drive ↗</ExternalLink>
        </article>
        <article className="flex flex-col rounded-3xl border border-border bg-card p-7">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-earth text-primary"><Sprout className="h-6 w-6" /></div>
          <h3 className="mt-5 text-xl font-bold">Built With Purpose</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">TeraFarm is an evolving agriculture technology project focused on making farming tools, information, and collaboration more accessible.</p>
          {isValidUrl(appLinks.projectUrl) ? (
            <ExternalLink href={appLinks.projectUrl} className={`${btn.outline} mt-6`}>Discover TeraFarm ↗</ExternalLink>
          ) : (
            <Link to="/features" className={`${btn.outline} mt-6`}>Discover TeraFarm</Link>
          )}
        </article>
      </div>
    </section>
  );
}
