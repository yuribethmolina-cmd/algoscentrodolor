import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import GlobalNavbar from "@/components/GlobalNavbar";
import GlobalFooter from "@/components/GlobalFooter";
import SectionNav from "@/components/SectionNav";
import WhatsAppButton from "@/components/WhatsAppButton";

interface SectionLayoutProps {
  children: ReactNode;
  sectionLinks: { label: string; href: string }[];
}

export default function SectionLayout({ children, sectionLinks }: SectionLayoutProps) {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <GlobalNavbar />
      <SectionNav links={sectionLinks} />
      <main className="pt-20">{children}</main>
      <GlobalFooter />
      <WhatsAppButton />
    </div>
  );
}
