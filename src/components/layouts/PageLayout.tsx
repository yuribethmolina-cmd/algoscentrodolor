import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import GlobalNavbar from "@/components/GlobalNavbar";
import GlobalFooter from "@/components/GlobalFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <GlobalNavbar />
      <main className="pt-20">{children}</main>
      <GlobalFooter />
      <WhatsAppButton />
    </div>
  );
}
