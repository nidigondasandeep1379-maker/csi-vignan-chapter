import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Shield } from "lucide-react";
import { useEffect } from "react";

export default function AdminLogin() {
  const { login, identity, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 bg-hero-pattern">
      <div className="w-full max-w-md">
        {/* Logos */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/assets/csi-logo-019d6e6d-4dd0-77ff-aafb-401b0b2ce328.png"
              alt="CSI Logo"
              className="h-14 w-14 object-contain"
            />
            <img
              src="/assets/image-019d6e6d-4e76-7698-9d38-f685fbe5d7c1.png"
              alt="Vignan University Logo"
              className="h-14 w-auto object-contain opacity-90"
            />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground text-center">
            CSI Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm mt-1 text-center">
            Vignan University · Hyderabad
          </p>
        </div>

        {/* Login card */}
        <div
          className="bg-card border border-border/60 rounded-xl p-8"
          data-ocid="admin-login-card"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-display font-semibold text-lg text-foreground mb-2">
              Administrator Login
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in with Internet Identity to access the admin panel.
            </p>
          </div>

          <Button
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2"
            onClick={handleLogin}
            disabled={isLoading}
            data-ocid="admin-login-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Sign In with Internet Identity
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
            Secure, decentralized authentication via the Internet Computer. The
            first user to sign in becomes the administrator.
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-muted-foreground">
          <a href="/" className="hover:text-accent transition-colors">
            ← Back to public site
          </a>
        </p>
      </div>
    </div>
  );
}
