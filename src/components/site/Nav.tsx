import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/induxtron-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/systems", label: "Systems" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Blog" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold tracking-wider text-foreground">
          <img src={logo} alt="Induxtron" className="h-8 w-auto" />
          <span className="hidden sm:inline">INDUXTRON</span>
        <Link to="/" className="flex items-center font-display font-bold tracking-wider text-foreground">
          <img src={logo} alt="Induxtron" className="h-8 w-auto" />
        </Link>
            const active =
              l.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-gold" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/apply"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:glow-primary transition-shadow"
          >
            Request Access
          </Link>
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-foreground py-2">
                {l.label}
              </Link>
            ))}
            <Link
              to="/apply"
              className="mt-2 px-4 py-3 rounded-md bg-primary text-primary-foreground text-center font-medium"
            >
              Request Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
