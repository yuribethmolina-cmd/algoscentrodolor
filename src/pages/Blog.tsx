import PageLayout from "@/components/layouts/PageLayout";
import { FileText } from "lucide-react";

export default function BlogPage() {
  return (
    <PageLayout>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="scroll-reveal">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">Blog</p>
            <h1 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
              Contenido <span className="font-light text-secondary">educativo</span>
            </h1>
            <div className="p-12 rounded-2xl border border-dashed border-secondary/30 bg-card">
              <FileText className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-light text-lg mb-2">Próximamente</p>
              <p className="text-muted-foreground/60 font-light text-sm max-w-md mx-auto">
                Artículos sobre dolor crónico, tratamientos intervencionistas y bienestar, escritos por nuestro equipo médico.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
