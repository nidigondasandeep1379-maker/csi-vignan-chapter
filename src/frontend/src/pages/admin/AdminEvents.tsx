import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEvent, useDeleteEvent, useEvents } from "@/hooks/useEvents";
import type { Event, EventCategory, EventStatus } from "@/types";
import { Calendar, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<EventStatus, string> = {
  upcoming: "bg-accent/15 text-accent border-accent/30",
  ongoing: "bg-primary/15 text-primary-foreground border-primary/30",
  completed: "bg-muted text-muted-foreground border-border",
};

const CATEGORIES: EventCategory[] = [
  "workshop",
  "seminar",
  "hackathon",
  "competition",
  "social",
  "other",
];

const STATUSES: EventStatus[] = ["upcoming", "ongoing", "completed"];

type EventFormData = Omit<Event, "id">;

const defaultForm: EventFormData = {
  title: "",
  description: "",
  date: "",
  venue: "",
  category: "workshop",
  status: "upcoming",
  imageUrl: "",
  registrationLink: "",
};

export default function AdminEvents() {
  const { data: events, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<EventFormData>(defaultForm);

  const openAdd = () => {
    setEditingEvent(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    const { id: _id, ...rest } = event;
    setForm(rest);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent.mutateAsync(form);
      toast.success(editingEvent ? "Event updated" : "Event added");
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save event");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted");
    } catch {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="space-y-6" data-ocid="admin-events">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Events
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage chapter events and activities.
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          onClick={openAdd}
          data-ocid="admin-add-event"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Title
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                Venue
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                Category
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? ["s1", "s2", "s3", "s4"].map((sk) => (
                  <tr key={sk} className="border-b border-border/50">
                    <td className="px-4 py-3" colSpan={6}>
                      <Skeleton className="h-5 w-full" />
                    </td>
                  </tr>
                ))
              : events?.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    data-ocid={`admin-event-${event.id}`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm text-foreground truncate max-w-[200px]">
                        {event.title}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell truncate max-w-[160px]">
                      {event.venue}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs capitalize text-muted-foreground">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={`capitalize text-xs ${STATUS_COLORS[event.status]}`}
                      >
                        {event.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => openEdit(event)}
                          aria-label="Edit event"
                          data-ocid={`admin-edit-event-${event.id}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(event.id, event.title)}
                          aria-label="Delete event"
                          data-ocid={`admin-delete-event-${event.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!isLoading && (!events || events.length === 0) && (
          <div
            className="py-16 text-center text-muted-foreground"
            data-ocid="events-empty-state"
          >
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No events yet</p>
            <p className="text-sm mt-1">
              Click "Add Event" to create your first event.
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="ev-title">Title *</Label>
              <Input
                id="ev-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Web3 Hackathon 2026"
                required
                data-ocid="event-title-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ev-desc">Description *</Label>
              <Textarea
                id="ev-desc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the event…"
                rows={3}
                required
                data-ocid="event-desc-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ev-date">Date *</Label>
                <Input
                  id="ev-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                  data-ocid="event-date-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ev-status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm({ ...form, status: v as EventStatus })
                  }
                >
                  <SelectTrigger id="ev-status" data-ocid="event-status-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ev-venue">Venue *</Label>
              <Input
                id="ev-venue"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                placeholder="e.g. Main Auditorium"
                required
                data-ocid="event-venue-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ev-cat">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm({ ...form, category: v as EventCategory })
                }
              >
                <SelectTrigger id="ev-cat" data-ocid="event-category-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ev-image">Image URL</Label>
              <Input
                id="ev-image"
                value={form.imageUrl ?? ""}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://…"
                data-ocid="event-image-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ev-reg">Registration Link</Label>
              <Input
                id="ev-reg"
                value={form.registrationLink ?? ""}
                onChange={(e) =>
                  setForm({ ...form, registrationLink: e.target.value })
                }
                placeholder="https://…"
                data-ocid="event-reg-input"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={createEvent.isPending}
                data-ocid="save-event-btn"
              >
                {editingEvent ? "Save Changes" : "Add Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
