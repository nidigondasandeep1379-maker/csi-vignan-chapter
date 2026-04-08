import { Skeleton } from "@/components/ui/skeleton";
import { useCommitteeMembers, useLeadershipTeam } from "@/hooks/useTeamMembers";
import type { TeamMember } from "@/types";
import { Linkedin, Mail, User } from "lucide-react";
import { motion } from "motion/react";

function MemberAvatar({
  member,
  size = "md",
}: { member: TeamMember; size?: "sm" | "md" | "lg" }) {
  const sizeClass = { sm: "h-16 w-16", md: "h-20 w-20", lg: "h-24 w-24" }[size];
  const iconClass = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-11 w-11" }[size];

  if (member.imageUrl) {
    return (
      <img
        src={member.imageUrl}
        alt={member.name}
        className={`${sizeClass} rounded-full object-cover border-2 border-border`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-muted border-2 border-border flex items-center justify-center`}
    >
      <User className={`${iconClass} text-muted-foreground/50`} />
    </div>
  );
}

function LeadershipCard({
  member,
  index,
}: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col items-center text-center card-hover relative overflow-hidden"
      data-ocid={`leader-card-${member.id}`}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="relative mb-4">
        <MemberAvatar member={member} size="lg" />
        {/* Role ring */}
        <div
          className="absolute -inset-1 rounded-full opacity-20"
          style={{ boxShadow: "0 0 0 2px oklch(0.72 0.15 75)" }}
          aria-hidden="true"
        />
      </div>

      <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-1">
        {member.name}
      </h3>
      <span className="badge-gold mb-2">{member.roleLabel}</span>
      <p className="text-xs text-muted-foreground mb-1">{member.department}</p>
      {member.year && (
        <p className="text-xs text-muted-foreground/70 mb-3">{member.year}</p>
      )}
      {member.bio && (
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {member.bio}
        </p>
      )}

      {/* Social links */}
      <div className="flex items-center gap-2 mt-auto">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="w-8 h-8 rounded-lg bg-muted hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-smooth"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
        )}
        {member.linkedIn && (
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="w-8 h-8 rounded-lg bg-muted hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-smooth"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function CommitteeMemberCard({
  member,
  index,
}: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-card/60 border border-border/50 rounded-xl p-4 flex items-center gap-3 card-hover"
      data-ocid={`member-card-${member.id}`}
    >
      <MemberAvatar member={member} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="font-medium text-foreground text-sm truncate">
          {member.name}
        </div>
        <div className="text-xs text-accent truncate">{member.roleLabel}</div>
        <div className="text-xs text-muted-foreground truncate">
          {member.department}
        </div>
        {member.year && (
          <div className="text-xs text-muted-foreground/60">{member.year}</div>
        )}
      </div>
      <div className="flex flex-col gap-1 flex-shrink-0">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="w-7 h-7 rounded-md bg-muted hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-smooth"
          >
            <Mail className="h-3 w-3" />
          </a>
        )}
        {member.linkedIn && (
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="w-7 h-7 rounded-md bg-muted hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent transition-smooth"
          >
            <Linkedin className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const { data: leadership, isLoading: leadLoading } = useLeadershipTeam();
  const { data: committee, isLoading: commLoading } = useCommitteeMembers();

  return (
    <section
      id="team"
      className="py-20 md:py-28 bg-muted/20 section-divider"
      data-ocid="team-section"
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
          <p className="text-section-label mb-3">The People Behind It</p>
          <h2 className="text-section-heading text-foreground mb-4">
            Meet the <span className="text-gold-gradient">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Our dedicated team of 17 members drives innovation, organises
            events, and builds the CSI Vignan community.
          </p>
        </motion.div>

        {/* Leadership */}
        <div className="mb-14">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-3"
          >
            <span className="flex-1 h-px bg-border/60" />
            Leadership Team
            <span className="flex-1 h-px bg-border/60" />
          </motion.h3>

          {leadLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-card rounded-2xl p-5 space-y-3 flex flex-col items-center"
                >
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {(leadership ?? []).map((member, index) => (
                <LeadershipCard key={member.id} member={member} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Committee & Members */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-3"
          >
            <span className="flex-1 h-px bg-border/60" />
            Committee &amp; Members
            <span className="flex-1 h-px bg-border/60" />
          </motion.h3>

          {commLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="bg-card/60 border border-border/50 rounded-xl p-4 flex items-center gap-3"
                >
                  <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(committee ?? []).map((member, index) => (
                <CommitteeMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
