import { r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-DMe-1VHT.js";
import { B as Badge } from "./badge-4BsiW2Yp.js";
import { B as Button } from "./button-DBRJMU4i.js";
import { P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, u as ue } from "./index-CaXxiCeY.js";
import { L as Label, I as Input } from "./label-ouO4IPI4.js";
import { S as SquarePen, a as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./select-EPYX1dcf.js";
import { T as Textarea } from "./textarea-Dyo7P4ma.js";
import { u as useEvents, a as useCreateEvent, b as useDeleteEvent } from "./useEvents-BqfivaJz.js";
import { T as Trash2 } from "./trash-2-CZyA6rXf.js";
import { C as Calendar } from "./calendar-Cc1g2emD.js";
import "./index-D8jkdHVW.js";
const STATUS_COLORS = {
  upcoming: "bg-accent/15 text-accent border-accent/30",
  ongoing: "bg-primary/15 text-primary-foreground border-primary/30",
  completed: "bg-muted text-muted-foreground border-border"
};
const CATEGORIES = [
  "workshop",
  "seminar",
  "hackathon",
  "competition",
  "social",
  "other"
];
const STATUSES = ["upcoming", "ongoing", "completed"];
const defaultForm = {
  title: "",
  description: "",
  date: "",
  venue: "",
  category: "workshop",
  status: "upcoming",
  imageUrl: "",
  registrationLink: ""
};
function AdminEvents() {
  const { data: events, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingEvent, setEditingEvent] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(defaultForm);
  const openAdd = () => {
    setEditingEvent(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };
  const openEdit = (event) => {
    setEditingEvent(event);
    const { id: _id, ...rest } = event;
    setForm(rest);
    setDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent.mutateAsync(form);
      ue.success(editingEvent ? "Event updated" : "Event added");
      setDialogOpen(false);
    } catch {
      ue.error("Failed to save event");
    }
  };
  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await deleteEvent.mutateAsync(id);
      ue.success("Event deleted");
    } catch {
      ue.error("Failed to delete event");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin-events", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Events" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage chapter events and activities." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold",
          onClick: openAdd,
          "data-ocid": "admin-add-event",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Event"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-secondary/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell", children: "Venue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["s1", "s2", "s3", "s4"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }) }) }, sk)) : events == null ? void 0 : events.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-secondary/30 transition-colors",
            "data-ocid": `admin-event-${event.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate max-w-[200px]", children: event.title }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground hidden md:table-cell", children: new Date(event.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell truncate max-w-[160px]", children: event.venue }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs capitalize text-muted-foreground", children: event.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `capitalize text-xs ${STATUS_COLORS[event.status]}`,
                  children: event.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-muted-foreground hover:text-foreground",
                    onClick: () => openEdit(event),
                    "aria-label": "Edit event",
                    "data-ocid": `admin-edit-event-${event.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-muted-foreground hover:text-destructive",
                    onClick: () => handleDelete(event.id, event.title),
                    "aria-label": "Delete event",
                    "data-ocid": `admin-delete-event-${event.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          event.id
        )) })
      ] }),
      !isLoading && (!events || events.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-16 text-center text-muted-foreground",
          "data-ocid": "events-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No events yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: 'Click "Add Event" to create your first event.' })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: editingEvent ? "Edit Event" : "Add New Event" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-title", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ev-title",
              value: form.title,
              onChange: (e) => setForm({ ...form, title: e.target.value }),
              placeholder: "e.g. Web3 Hackathon 2026",
              required: true,
              "data-ocid": "event-title-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-desc", children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "ev-desc",
              value: form.description,
              onChange: (e) => setForm({ ...form, description: e.target.value }),
              placeholder: "Describe the event…",
              rows: 3,
              required: true,
              "data-ocid": "event-desc-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-date", children: "Date *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ev-date",
                type: "date",
                value: form.date,
                onChange: (e) => setForm({ ...form, date: e.target.value }),
                required: true,
                "data-ocid": "event-date-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-status", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.status,
                onValueChange: (v) => setForm({ ...form, status: v }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "ev-status", "data-ocid": "event-status-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s }, s)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-venue", children: "Venue *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ev-venue",
              value: form.venue,
              onChange: (e) => setForm({ ...form, venue: e.target.value }),
              placeholder: "e.g. Main Auditorium",
              required: true,
              "data-ocid": "event-venue-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-cat", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.category,
              onValueChange: (v) => setForm({ ...form, category: v }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "ev-cat", "data-ocid": "event-category-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, className: "capitalize", children: c }, c)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-image", children: "Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ev-image",
              value: form.imageUrl ?? "",
              onChange: (e) => setForm({ ...form, imageUrl: e.target.value }),
              placeholder: "https://…",
              "data-ocid": "event-image-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-reg", children: "Registration Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ev-reg",
              value: form.registrationLink ?? "",
              onChange: (e) => setForm({ ...form, registrationLink: e.target.value }),
              placeholder: "https://…",
              "data-ocid": "event-reg-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "bg-accent text-accent-foreground hover:bg-accent/90",
              disabled: createEvent.isPending,
              "data-ocid": "save-event-btn",
              children: editingEvent ? "Save Changes" : "Add Event"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminEvents as default
};
