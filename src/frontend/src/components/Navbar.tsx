import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Team", href: "/#team" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { identity } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      if (currentPath !== "/") {
        window.location.href = href;
        return;
      }
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      data-ocid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/95 backdrop-blur-md nav-shadow"
          : "bg-card/80 backdrop-blur-sm border-b border-border/50"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 min-w-0 group"
          data-ocid="nav-logo"
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/assets/csi-logo.png"
              alt="CSI Logo"
              className="h-9 w-9 object-contain"
            />
            <img
              src="/assets/college-logo.png"
              alt="Vignan University"
              className="h-9 w-auto object-contain hidden sm:block opacity-90"
            />
          </div>
          <div className="hidden md:block min-w-0">
            <div className="text-sm font-semibold font-display text-foreground leading-tight truncate">
              CSI Student Chapter
            </div>
            <div className="text-xs text-muted-foreground truncate leading-tight">
              Vignan University · Hyderabad
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted/50"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {identity ? (
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-accent/40 text-accent hover:bg-accent/10 hover:text-accent font-medium"
                data-ocid="nav-admin-link"
              >
                Admin Panel
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          ) : (
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-accent/40 text-accent hover:bg-accent/10 hover:text-accent font-medium"
                data-ocid="nav-admin-link"
              >
                Admin
              </Button>
            </Link>
          )}
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-glow-gold"
            onClick={() => handleNavClick("/#contact")}
            data-ocid="nav-cta"
          >
            Join CSI
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav-mobile-toggle"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4 pt-2 animate-fade-in">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
            <Link to="/admin" onClick={() => setMobileOpen(false)}>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-accent/40 text-accent hover:bg-accent/10"
                data-ocid="nav-mobile-admin"
              >
                Admin Panel
              </Button>
            </Link>
            <Button
              size="sm"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              onClick={() => handleNavClick("/#contact")}
            >
              Join CSI
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
