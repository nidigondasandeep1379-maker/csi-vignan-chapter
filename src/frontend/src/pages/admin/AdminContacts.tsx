import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ContactSubmission } from "@/types";
import { Clock, Eye, Inbox, Mail, Trash2, User } from "lucide-react";
import { useState } from "react";

// Sample contact submissions
const SAMPLE_CONTACTS: ContactSubmission[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    email: "ravi.kumar@student.vignan.ac.in",
    subject: "Interest in joining CSI",
    message:
      "I'm a 2nd year CSE student and would like to know more about joining the CSI chapter and what benefits it offers.",
    submittedAt: "2026-04-07T14:30:00Z",
    status: "new",
  },
  {
    id: "2",
    name: "Sanjana Mehta",
    email: "sanjana.m@gmail.com",
    subject: "Workshop collaboration",
    message:
      "We're organizing a machine learning bootcamp and would love to partner with CSI Vignan for co-hosting.",
    submittedAt: "2026-04-06T09:15:00Z",
    status: "read",
  },
  {
    id: "3",
    name: "Prof. Dilip Babu",
    email: "dilip.babu@vignan.ac.in",
    subject: "Faculty involvement in events",
    message:
      "Interested in volunteering as a judge for the upcoming hackathon. Please let me know the requirements.",
    submittedAt: "2026-04-05T16:45:00Z",
    status: "replied",
  },
  {
    id: "4",
    name: "Anil Sharma",
    email: "anil.sharma@techcorp.in",
    subject: "Sponsorship for Tech Fest 2026",
    message:
      "Our company TechCorp is interested in sponsoring the CSI Annual Tech Fest 2026. What are the sponsorship tiers?",
    submittedAt: "2026-04-04T11:00:00Z",
    status: "new",
  },
  {
    id: "5",
    name: "Vikram Nair",
    email: "vikram.nair@company.com",
    subject: "Guest Lecture Request",
    message:
      "I am a software engineer at Infosys and would love to give a guest lecture on DevOps practices. Please let me know if there are any upcoming slots.",
    submittedAt: "2026-03-25T11:20:00Z",
    status: "read",
  },
];

const STATUS_STYLES: Record<ContactSubmission["status"], string> = {
  new: "bg-accent/15 text-accent border-accent/30",
  read: "bg-muted text-muted-foreground border-border",
  replied: "bg-primary/15 text-primary-foreground border-primary/30",
};

export default function AdminContacts() {
  const [contacts, setContacts] =
    useState<ContactSubmission[]>(SAMPLE_CONTACTS);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  const unread = contacts.filter((c) => c.status === "new").length;

  const markRead = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "read" } : c)),
    );
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const openContact = (contact: ContactSubmission) => {
    setSelected(contact);
    if (contact.status === "new") markRead(contact.id);
  };

  return (
    <div className="space-y-6" data-ocid="admin-contacts">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Contact Submissions
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {contacts.length} total · {unread} unread
          </p>
        </div>
        {unread > 0 && <span className="badge-gold">{unread} New</span>}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {contacts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 bg-card border border-dashed border-border/60 rounded-xl"
              data-ocid="contacts-empty-state"
            >
              <Inbox className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                No submissions yet
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <Card
                key={contact.id}
                className={`bg-card border-border/60 cursor-pointer transition-colors hover:border-accent/30
                  ${selected?.id === contact.id ? "border-accent/40 bg-accent/5" : ""}
                  ${contact.status === "new" ? "border-l-2 border-l-accent" : ""}`}
                onClick={() => openContact(contact)}
                data-ocid={`admin-contact-${contact.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground truncate">
                        {contact.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full border flex-shrink-0 ${STATUS_STYLES[contact.status]}`}
                    >
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate mb-1">
                    {contact.subject}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(contact.submittedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          {selected ? (
            <Card className="bg-card border-border/60 h-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-foreground text-lg">
                      {selected.subject}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {selected.name}
                      </span>
                      <a
                        href={`mailto:${selected.email}`}
                        className="flex items-center gap-1 hover:text-accent transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {selected.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      className={`text-xs border ${STATUS_STYLES[selected.status]}`}
                    >
                      {selected.status}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 h-auto"
                      aria-label="Delete message"
                      onClick={() => deleteContact(selected.id)}
                      data-ocid="admin-delete-contact"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Reply via Email
                  </a>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[240px] bg-card border border-dashed border-border/60 rounded-xl">
              <Eye className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
