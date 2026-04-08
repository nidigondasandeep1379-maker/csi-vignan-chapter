import { CheckCircle2, Globe, Lightbulb, Users } from "lucide-react";
import { motion } from "motion/react";

const GOALS = [
  {
    icon: Lightbulb,
    title: "Technical Excellence",
    description:
      "Organizing workshops, hackathons, and seminars to sharpen students' technical skills.",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Creating a collaborative network of tech enthusiasts, mentors, and industry professionals.",
  },
  {
    icon: Globe,
    title: "Industry Connect",
    description:
      "Bridging the gap between academia and industry through guest lectures and internship drives.",
  },
];

const HIGHLIGHTS = [
  "Official student chapter of the Computer Society of India",
  "Regular workshops on emerging technologies",
  "Annual Tech Fest with 500+ participants",
  "Mentorship from experienced faculty advisors",
  "Networking with CSI chapters across India",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-muted/20 section-divider"
      data-ocid="about-section"
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-section-label mb-3">Who We Are</p>
          <h2 className="text-section-heading text-foreground mb-4">
            About <span className="text-gold-gradient">CSI Vignan</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The Computer Society of India (CSI) Student Chapter at Vignan
            University is a premier student-run organization dedicated to
            advancing computer science education and professional development.
          </p>
        </motion.div>

        {/* 2-column: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded under the umbrella of the Computer Society of India — the
              country's first and largest professional body in the field of IT —
              our chapter brings together passionate students, faculty, and
              industry experts to foster a culture of innovation and lifelong
              learning.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From cutting-edge workshops and hackathons to national-level
              competitions and community projects, CSI Vignan is where
              technology meets opportunity.
            </p>

            <ul className="space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl">
              <img
                src="/assets/generated/about-tech-bg.dim_700x500.jpg"
                alt="CSI Vignan community"
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border/60">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/csi-logo.png"
                    alt="CSI"
                    className="h-10 w-10 object-contain flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold text-foreground font-display">
                      Affiliated with CSI India
                    </div>
                    <div className="text-xs text-muted-foreground">
                      National body since 1965 · 500+ chapters
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative accent bar */}
            <div
              className="absolute -top-3 -left-3 w-16 h-16 rounded-xl opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.15 75), transparent)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Goal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GOALS.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border/60 rounded-2xl p-6 card-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <goal.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {goal.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {goal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
