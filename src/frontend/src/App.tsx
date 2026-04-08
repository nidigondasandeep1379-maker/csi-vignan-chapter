import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="space-y-4 w-full max-w-sm px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { identity } = useInternetIdentity();
  if (!identity) {
    return <Navigate to="/admin/login" />;
  }
  return <>{children}</>;
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

// Admin login (public)
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLogin,
});

// Admin layout (protected)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminGuard>
      <AdminLayout />
    </AdminGuard>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: () => <Navigate to="/admin/events" />,
});

const adminEventsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/events",
  component: AdminEvents,
});

const adminTeamRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/team",
  component: AdminTeam,
});

const adminGalleryRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/gallery",
  component: AdminGallery,
});

const adminContactsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/contacts",
  component: AdminContacts,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  adminLoginRoute,
  adminRoute.addChildren([
    adminIndexRoute,
    adminEventsRoute,
    adminTeamRoute,
    adminGalleryRoute,
    adminContactsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
