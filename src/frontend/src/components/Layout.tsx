import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  /** Hide footer — useful for admin pages */
  hideFooter?: boolean;
  /** Pass extra classes to the main wrapper */
  className?: string;
}

export default function Layout({
  children,
  hideFooter = false,
  className = "",
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 pt-16 ${className}`}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
