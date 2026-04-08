import { r as reactExports, j as jsxRuntimeExports, c as cn, u as useInternetIdentity, b as useQueryClient, a as useRouterState, L as Link, O as Outlet } from "./index-DMe-1VHT.js";
import { c as createLucideIcon, B as Button } from "./button-DBRJMU4i.js";
import { P as Primitive, X } from "./index-D8jkdHVW.js";
import { S as Shield } from "./shield-Dws8xE_8.js";
import { C as Calendar } from "./calendar-Cc1g2emD.js";
import { U as Users, C as ChevronRight, M as Menu } from "./users-EE9Ce7qR.js";
import { I as Image } from "./image-D5fFz_U-.js";
import { M as Mail } from "./mail-B7Nrb0BG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const NAV_ITEMS = [
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Contacts", href: "/admin/contacts", icon: Mail }
];
function AdminLayout() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };
  const principalShort = identity ? `${identity.getPrincipal().toString().slice(0, 10)}…` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed inset-y-0 left-0 z-40 w-60 bg-card border-r border-border flex flex-col transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`,
        "data-ocid": "admin-sidebar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 h-16 border-b border-border flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold font-display text-foreground", children: "CSI Admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Vignan University" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "flex-1 px-3 py-4 space-y-1",
              "aria-label": "Admin navigation",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/admin",
                    className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${currentPath === "/admin" ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
                    onClick: () => setSidebarOpen(false),
                    "data-ocid": "admin-nav-dashboard",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4 flex-shrink-0" }),
                      "Dashboard"
                    ]
                  }
                ),
                NAV_ITEMS.map(({ label, href, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: href,
                    className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${currentPath === href ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
                    onClick: () => setSidebarOpen(false),
                    "data-ocid": `admin-nav-${label.toLowerCase()}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 flex-shrink-0" }),
                      label
                    ]
                  },
                  href
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-foreground truncate", children: "Administrator" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: principalShort })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-full border-border text-muted-foreground hover:text-foreground hover:border-destructive/40 hover:bg-destructive/5",
                onClick: handleLogout,
                "data-ocid": "admin-logout",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5 mr-2" }),
                  "Sign Out"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors mt-2 py-1",
                children: [
                  "View Website ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                ]
              }
            )
          ] })
        ]
      }
    ),
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden",
        onClick: () => setSidebarOpen(false),
        onKeyDown: (e) => e.key === "Escape" && setSidebarOpen(false),
        role: "button",
        tabIndex: 0,
        "aria-label": "Close sidebar"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "lg:hidden bg-card border-b border-border h-14 flex items-center gap-3 px-4 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Toggle sidebar",
            className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50",
            onClick: () => setSidebarOpen(!sidebarOpen),
            children: sidebarOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-7 w-7 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm font-display", children: "CSI Admin Panel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as default
};
