import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { name: "", email: "", subject: "", message: "" };

const INFO_ITEMS = [
  {
    icon: MapPin,
    label: "Address",
    value: "Vadlamudi, Guntur District\nAndhra Pradesh — 522 213",
  },
  {
    icon: Mail,
    label: "Email",
    value: "csi@vignan.ac.in",
    href: "mailto:csi@vignan.ac.in",
  },
  {
    icon: Phone,
    label: "Department",
    value: "Computer Science & Engineering\nVignan University",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid =
    form.name.trim().length > 0 &&
    form.email.includes("@") &&
    form.message.trim().length > 10;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    // Simulate slight delay for UX polish, no API needed
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-muted/20 section-divider"
      data-ocid="contact-section"
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-section-label mb-3">Get in Touch</p>
          <h2 className="text-section-heading text-foreground mb-4">
            Contact <span className="text-gold-gradient">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Have a question, collaboration idea, or just want to say hello? We'd
            love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {INFO_ITEMS.map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border/60 rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-foreground hover:text-accent transition-colors duration-200 font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground whitespace-pre-line">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="bg-card border border-border/60 rounded-2xl overflow-hidden h-40 flex items-center justify-center relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, oklch(0.72 0.15 75) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
                aria-hidden="true"
              />
              <div className="text-center relative z-10">
                <MapPin className="h-8 w-8 text-accent mx-auto mb-1 opacity-60" />
                <p className="text-xs text-muted-foreground">
                  Vignan University, Vadlamudi
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border/60 rounded-2xl p-7 md:p-9">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                  data-ocid="contact-success"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-xl mb-2">
                    Message Received!
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible at{" "}
                    <span className="text-accent font-medium">
                      {form.email}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    className="mt-6 text-xs text-muted-foreground hover:text-accent transition-colors duration-200 underline underline-offset-4"
                    onClick={() => {
                      setForm(INITIAL);
                      setSubmitted(false);
                    }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact-form"
                >
                  <h3 className="font-display font-semibold text-foreground text-xl mb-1">
                    Send us a Message
                  </h3>
                  <p className="text-xs text-muted-foreground mb-5">
                    All fields marked are required.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name" className="text-sm">
                        Full Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="bg-background border-border focus:border-accent"
                        data-ocid="contact-input-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email" className="text-sm">
                        Email Address <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="bg-background border-border focus:border-accent"
                        data-ocid="contact-input-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject" className="text-sm">
                      Subject
                    </Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="e.g. Event collaboration, Membership inquiry"
                      className="bg-background border-border focus:border-accent"
                      data-ocid="contact-input-subject"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message" className="text-sm">
                      Message <span className="text-accent">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                      className="bg-background border-border focus:border-accent resize-none"
                      data-ocid="contact-input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold transition-smooth"
                    disabled={!isValid || loading}
                    data-ocid="contact-submit"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
