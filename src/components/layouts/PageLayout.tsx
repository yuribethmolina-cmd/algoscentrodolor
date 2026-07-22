import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <HomeFooter />
    </div>
  );
}
