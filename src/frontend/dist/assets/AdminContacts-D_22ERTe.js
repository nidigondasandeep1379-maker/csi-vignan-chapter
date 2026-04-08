import { j as jsxRuntimeExports, c as cn, r as reactExports } from "./index-DMe-1VHT.js";
import { B as Badge } from "./badge-4BsiW2Yp.js";
import { c as createLucideIcon, B as Button } from "./button-DBRJMU4i.js";
import { U as User } from "./user-mC8qHDbb.js";
import { M as Mail } from "./mail-B7Nrb0BG.js";
import { T as Trash2 } from "./trash-2-CZyA6rXf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const SAMPLE_CONTACTS = [
  {
    id: "1",
    name: "Ravi Kumar",
    email: "ravi.kumar@student.vignan.ac.in",
    subject: "Interest in joining CSI",
    message: "I'm a 2nd year CSE student and would like to know more about joining the CSI chapter and what benefits it offers.",
    submittedAt: "2026-04-07T14:30:00Z",
    status: "new"
  },
  {
    id: "2",
    name: "Sanjana Mehta",
    email: "sanjana.m@gmail.com",
    subject: "Workshop collaboration",
    message: "We're organizing a machine learning bootcamp and would love to partner with CSI Vignan for co-hosting.",
    submittedAt: "2026-04-06T09:15:00Z",
    status: "read"
  },
  {
    id: "3",
    name: "Prof. Dilip Babu",
    email: "dilip.babu@vignan.ac.in",
    subject: "Faculty involvement in events",
    message: "Interested in volunteering as a judge for the upcoming hackathon. Please let me know the requirements.",
    submittedAt: "2026-04-05T16:45:00Z",
    status: "replied"
  },
  {
    id: "4",
    name: "Anil Sharma",
    email: "anil.sharma@techcorp.in",
    subject: "Sponsorship for Tech Fest 2026",
    message: "Our company TechCorp is interested in sponsoring the CSI Annual Tech Fest 2026. What are the sponsorship tiers?",
    submittedAt: "2026-04-04T11:00:00Z",
    status: "new"
  },
  {
    id: "5",
    name: "Vikram Nair",
    email: "vikram.nair@company.com",
    subject: "Guest Lecture Request",
    message: "I am a software engineer at Infosys and would love to give a guest lecture on DevOps practices. Please let me know if there are any upcoming slots.",
    submittedAt: "2026-03-25T11:20:00Z",
    status: "read"
  }
];
const STATUS_STYLES = {
  new: "bg-accent/15 text-accent border-accent/30",
  read: "bg-muted text-muted-foreground border-border",
  replied: "bg-primary/15 text-primary-foreground border-primary/30"
};
function AdminContacts() {
  const [contacts, setContacts] = reactExports.useState(SAMPLE_CONTACTS);
  const [selected, setSelected] = reactExports.useState(null);
  const unread = contacts.filter((c) => c.status === "new").length;
  const markRead = (id) => {
    setContacts(
      (prev) => prev.map((c) => c.id === id ? { ...c, status: "read" } : c)
    );
  };
  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if ((selected == null ? void 0 : selected.id) === id) setSelected(null);
  };
  const openContact = (contact) => {
    setSelected(contact);
    if (contact.status === "new") markRead(contact.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin-contacts", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Contact Submissions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          contacts.length,
          " total · ",
          unread,
          " unread"
        ] })
      ] }),
      unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-gold", children: [
        unread,
        " New"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-2", children: contacts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 bg-card border border-dashed border-border/60 rounded-xl",
          "data-ocid": "contacts-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-10 w-10 text-muted-foreground/30 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No submissions yet" })
          ]
        }
      ) : contacts.map((contact) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `bg-card border-border/60 cursor-pointer transition-colors hover:border-accent/30
                  ${(selected == null ? void 0 : selected.id) === contact.id ? "border-accent/40 bg-accent/5" : ""}
                  ${contact.status === "new" ? "border-l-2 border-l-accent" : ""}`,
          onClick: () => openContact(contact),
          "data-ocid": `admin-contact-${contact.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: contact.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-1.5 py-0.5 rounded-full border flex-shrink-0 ${STATUS_STYLES[contact.status]}`,
                  children: contact.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate mb-1", children: contact.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              new Date(contact.submittedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })
            ] })
          ] })
        },
        contact.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border/60 h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-lg", children: selected.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
                selected.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `mailto:${selected.email}`,
                  className: "flex items-center gap-1 hover:text-accent transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
                    selected.email
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs border ${STATUS_STYLES[selected.status]}`,
                children: selected.status
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 h-auto",
                "aria-label": "Delete message",
                onClick: () => deleteContact(selected.id),
                "data-ocid": "admin-delete-contact",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap", children: selected.message }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `mailto:${selected.email}?subject=Re: ${selected.subject}`,
            className: "inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
              "Reply via Email"
            ]
          }
        ) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full min-h-[240px] bg-card border border-dashed border-border/60 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-10 w-10 text-muted-foreground/30 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select a message to view details" })
      ] }) })
    ] })
  ] });
}
export {
  AdminContacts as default
};
