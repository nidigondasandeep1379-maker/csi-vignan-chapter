import { Link } from "@tanstack/react-router";
import {
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

const FOOTER_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Team", href: "/#team" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
  { label: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border/60" data-ocid="footer">
      {/* Main footer content */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/csi-logo.png"
                alt="CSI Logo"
                className="h-10 w-10 object-contain"
              />
              <img
                src="/assets/college-logo.png"
                alt="Vignan University"
                className="h-10 w-auto object-contain opacity-90"
              />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-1">
              CSI Student Chapter
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Computer Society of India — Vignan Foundation for Science,
              Technology &amp; Research University
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span>
                  Vadlamudi, Guntur District, Andhra Pradesh, India — 522 213
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:csi@vignan.ac.in"
                  className="hover:text-accent transition-colors duration-200"
                >
                  csi@vignan.ac.in
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-smooth"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-section-label mb-4 text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About CSI */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-section-label mb-4 text-muted-foreground">
              About CSI
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              CSI is a premier professional body dedicated to advancing
              computing science and IT across India.
            </p>
            <a
              href="https://csi-india.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors duration-200 font-medium"
            >
              Visit CSI India
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40 px-4 md:px-6 py-4">
        <div className="container max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {year} CSI Student Chapter, Vignan University. All rights
            reserved.
          </span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
