import { u as useInternetIdentity, B as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-DMe-1VHT.js";
import { B as Button } from "./button-DBRJMU4i.js";
import { S as Shield } from "./shield-Dws8xE_8.js";
import { L as LoaderCircle } from "./loader-circle-Cd0gNYgB.js";
function AdminLogin() {
  const { login, identity, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (identity) {
      navigate({ to: "/admin/events" });
    }
  }, [identity, navigate]);
  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const isLoading = loginStatus === "logging-in";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4 bg-hero-pattern", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/csi-logo-019d6e6d-4dd0-77ff-aafb-401b0b2ce328.png",
            alt: "CSI Logo",
            className: "h-14 w-14 object-contain"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/image-019d6e6d-4e76-7698-9d38-f685fbe5d7c1.png",
            alt: "Vignan University Logo",
            className: "h-14 w-auto object-contain opacity-90"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground text-center", children: "CSI Admin Panel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 text-center", children: "Vignan University · Hyderabad" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border/60 rounded-xl p-8",
        "data-ocid": "admin-login-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-2", children: "Administrator Login" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in with Internet Identity to access the admin panel." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2",
              onClick: handleLogin,
              disabled: isLoading,
              "data-ocid": "admin-login-btn",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Signing in…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                "Sign In with Internet Identity"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-4 leading-relaxed", children: "Secure, decentralized authentication via the Internet Computer. The first user to sign in becomes the administrator." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-6 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "hover:text-accent transition-colors", children: "← Back to public site" }) })
  ] }) });
}
export {
  AdminLogin as default
};
