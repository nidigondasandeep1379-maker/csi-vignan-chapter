import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Calendar,
  ChevronRight,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Shield,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
];

export default function AdminLayout() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const principalShort = identity
    ? `${identity.getPrincipal().toString().slice(0, 10)}…`
    : "";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-card border-r border-border flex flex-col transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}
        data-ocid="admin-sidebar"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
            <Shield className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="text-sm font-semibold font-display text-foreground">
              CSI Admin
            </div>
            <div className="text-xs text-muted-foreground">
              Vignan University
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 px-3 py-4 space-y-1"
          aria-label="Admin navigation"
        >
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${currentPath === "/admin" ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            onClick={() => setSidebarOpen(false)}
            data-ocid="admin-nav-dashboard"
          >
            <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
            Dashboard
          </Link>
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${currentPath === href ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
              onClick={() => setSidebarOpen(false)}
              data-ocid={`admin-nav-${label.toLowerCase()}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <Separator />

        {/* User + logout */}
        <div className="p-3 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-4 w-4 text-accent" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-foreground truncate">
                Administrator
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {principalShort}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-border text-muted-foreground hover:text-foreground hover:border-destructive/40 hover:bg-destructive/5"
            onClick={handleLogout}
            data-ocid="admin-logout"
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Sign Out
          </Button>
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors mt-2 py-1"
          >
            View Website <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden bg-card border-b border-border h-14 flex items-center gap-3 px-4 flex-shrink-0">
          <button
            type="button"
            aria-label="Toggle sidebar"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <Shield className="h-7 w-7 text-accent" />
          <span className="font-semibold text-sm font-display">
            CSI Admin Panel
          </span>
        </header>

        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
