import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/useEvents";
import type { Event, EventCategory } from "@/types";
import { Calendar, CalendarX, ExternalLink, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";

const CATEGORY_LABELS: Record<EventCategory, string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  hackathon: "Hackathon",
  competition: "Competition",
  social: "Social",
  other: "Event",
};

const STATUS_STYLES = {
  upcoming: "bg-accent/10 text-accent border-accent/30",
  ongoing: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  completed: "bg-muted text-muted-foreground border-border",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="bg-card border border-border/60 rounded-2xl overflow-hidden card-hover flex flex-col"
      data-ocid={`event-card-${event.id}`}
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/40" />

      <div className="p-5 flex flex-col flex-1">
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="badge-gold">{CATEGORY_LABELS[event.category]}</span>
          <span
            className={`text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full border ${STATUS_STYLES[event.status]}`}
          >
            {event.status}
          </span>
        </div>

        <h3 className="font-display font-semibold text-foreground text-lg mb-2 leading-snug line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
          {event.description}
        </p>

        {/* Meta */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-accent flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          {event.maxAttendees && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 text-accent flex-shrink-0" />
              <span>Up to {event.maxAttendees} attendees</span>
            </div>
          )}
        </div>

        {/* CTA */}
        {event.registrationLink && event.status === "upcoming" && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-accent/40 text-accent hover:bg-accent/10 hover:text-accent font-medium"
            >
              Register Now
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </a>
        )}
      </div>
    </motion.article>
  );
}

function EventsSkeletons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="bg-card border border-border/60 rounded-2xl p-5 space-y-3"
        >
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default function EventsSection() {
  const { data: events, isLoading } = useEvents();

  return (
    <section
      id="events"
      className="py-20 md:py-28 bg-background section-divider"
      data-ocid="events-section"
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-section-label mb-3">What's Happening</p>
            <h2 className="text-section-heading text-foreground">
              Upcoming <span className="text-gold-gradient">Events</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-right">
            Stay updated with our latest workshops, hackathons, seminars, and
            competitions.
          </p>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <EventsSkeletons />
        ) : !events || events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 border border-dashed border-border/60 rounded-2xl"
            data-ocid="events-empty"
          >
            <CalendarX className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              No events yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Check back soon — exciting events are being planned!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
