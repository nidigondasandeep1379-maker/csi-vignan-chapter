import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Users } from "lucide-react";
import { motion } from "motion/react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background bg-hero-pattern"
      data-ocid="hero-section"
    >
      {/* Background hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-csi-vignan.dim_1400x700.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Decorative gold ring */}
      <div
        className="absolute top-1/4 right-12 w-64 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ border: "1px solid oklch(0.72 0.15 75)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-8 w-40 h-40 rounded-full opacity-5 pointer-events-none"
        style={{ border: "1px solid oklch(0.72 0.15 75)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 container max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        {/* Logos row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <img
            src="/assets/csi-logo.png"
            alt="CSI Logo"
            className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
          />
          <div className="w-px h-12 md:h-16 bg-accent/30" aria-hidden="true" />
          <img
            src="/assets/college-logo.png"
            alt="Vignan University"
            className="h-16 md:h-20 w-auto object-contain drop-shadow-lg opacity-95"
          />
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-section-label mb-4"
        >
          Computer Society of India
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-hero mb-4"
        >
          <span className="text-foreground">CSI Student</span>{" "}
          <span className="text-gold-gradient">Chapter</span>
        </motion.h1>

        {/* University name */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mb-3 leading-relaxed"
        >
          Vignan Foundation for Science, Technology and Research University
          <span className="text-accent/70"> · </span>
          Hyderabad
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="text-sm md:text-base text-muted-foreground max-w-xl mb-10 leading-relaxed"
        >
          Empowering students through technology, innovation, and community.
          Join India's premier computing society.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 transition-smooth"
            onClick={() => scrollTo("events")}
            data-ocid="hero-cta-events"
          >
            View Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent/40 text-accent hover:bg-accent/10 hover:text-accent font-semibold text-base px-8 transition-smooth"
            onClick={() => scrollTo("team")}
            data-ocid="hero-cta-team"
          >
            <Users className="mr-2 h-4 w-4" />
            Meet the Team
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 md:gap-12 border border-border/60 rounded-2xl px-8 py-5 bg-card/60 backdrop-blur-sm"
        >
          {[
            { value: "200+", label: "Members" },
            { value: "6+", label: "Events / Year" },
            { value: "3+", label: "Years Active" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-display text-gold-gradient">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors duration-200 cursor-pointer"
        onClick={() => scrollTo("about")}
        data-ocid="hero-scroll-down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
