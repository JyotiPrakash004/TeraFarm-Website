import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { appLinks, isValidUrl } from "@/config/appLinks";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5 font-bold text-lg tracking-tight text-foreground transition-colors hover:text-primary">
      <img
        src="/terafarm-emblem.png"
        alt="TeraFarm"
        className="h-9 w-9 rounded-xl object-cover shadow-sm transition-all duration-200 ease-out group-hover:brightness-105 group-hover:shadow"
      />
      <span className="transition-colors duration-200 group-hover:text-primary">TeraFarm</span>
    </Link>
  );
}

const nav = [
  { label: "Home", to: "/" as const },
  { label: "Features", to: "/features" as const },
  { label: "How It Works", to: "/features" as const, hash: "dashboard" },
  { label: "Downloads", to: "/" as const, hash: "downloads" },
  { label: "Community", to: "/" as const, hash: "community" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden gap-7 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              {...(n.hash ? { hash: n.hash } : {})}
              activeOptions={{ exact: n.to === "/" && !n.hash }}
              activeProps={{ className: "text-primary font-semibold relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-primary" }}
              className="text-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="rounded-lg p-1 text-foreground/80 transition-colors duration-200 hover:bg-secondary hover:text-foreground active:scale-95 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 transition-all duration-200 md:hidden animate-reveal-up" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              {...(n.hash ? { hash: n.hash } : {})}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-secondary hover:text-primary active:bg-secondary/80"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function ExternalLink({ href, children, className, fallback = "Link coming soon" }: { href: string; children: ReactNode; className?: string; fallback?: string }) {
  if (!isValidUrl(href))
    return (
      <span aria-disabled="true" title={fallback} className={`${className} cursor-not-allowed opacity-60`}>
        {children}
      </span>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
    >
      {children}
    </a>
  );
}

export function Footer() {
  const link = "text-sm text-muted-foreground transition-all duration-200 hover:text-primary hover:translate-x-0.5";
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-muted-foreground">Growing a smarter future for agriculture.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link to="/" className={link}>Home</Link>
          <Link to="/features" className={link}>Features</Link>
          <Link to="/" hash="downloads" className={link}>Downloads</Link>
          <ExternalLink href={appLinks.instagramUrl} className={link}>Instagram</ExternalLink>
          <ExternalLink href={appLinks.demoDriveUrl} className={link}>Google Drive</ExternalLink>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-8 text-xs text-muted-foreground md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} TeraFarm. All rights reserved.</span>
        <span>Made with purpose for the farming community. 🌱</span>
      </div>
    </footer>
  );
}

export const btn = {
  primary: "group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 ease-out hover:bg-deep hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  outline: "group inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-card px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 ease-out hover:bg-secondary hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
  disabled: "inline-flex items-center justify-center gap-2 rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed",
};

export function DemoDownloadButton({ label = "Download Demo APK" }: { label?: string }) {
  if (!isValidUrl(appLinks.demoApkUrl))
    return (
      <div className="space-y-1.5">
        <button disabled className={btn.disabled}>↓ {label}</button>
        <p className="text-xs text-muted-foreground">Demo APK link isn't set up yet — check back soon.</p>
      </div>
    );
  return (
    <a
      href={appLinks.demoApkUrl}
      download={appLinks.demoApkUrl.endsWith(".apk") ? "TeraFarm-Demo.apk" : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className={btn.primary}
    >
      <span className="transition-transform duration-200 ease-out group-hover:translate-y-0.5">↓</span> {label}
    </a>
  );
}

export function StatusBadge({ s }: { s: "Available" | "Demo" | "In Development" | "Coming Soon" }) {
  const map = {
    Available: "bg-secondary text-primary",
    Demo: "bg-leaf/15 text-primary",
    "In Development": "bg-earth text-foreground",
    "Coming Soon": "bg-muted text-muted-foreground",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${map[s]}`}>{s}</span>;
}
