import PageLayout from "@/components/layouts/PageLayout";

export default function AvisoLegalPage() {
  return (
    <PageLayout>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="scroll-reveal">
            <h1 className="text-3xl md:text-4xl font-extralight text-foreground leading-tight mb-8">
              Aviso <span className="font-light text-secondary">Legal</span>
            </h1>
            <div className="prose prose-sm max-w-none text-muted-foreground font-light leading-relaxed space-y-6">
              <p>
                Este sitio web es propiedad de ALGOS, Centro de Dolor Intervencionista, con sede en Maracaibo, Venezuela.
              </p>
              <h2 className="text-lg font-medium text-foreground">Propósito informativo</h2>
              <p>El contenido de este sitio web tiene carácter exclusivamente informativo y no constituye consejo médico. Consulte siempre con un profesional de salud calificado.</p>
              <h2 className="text-lg font-medium text-foreground">Propiedad intelectual</h2>
              <p>Todo el contenido, diseño, imágenes y textos son propiedad de ALGOS y están protegidos por las leyes de propiedad intelectual aplicables.</p>
              <h2 className="text-lg font-medium text-foreground">Limitación de responsabilidad</h2>
              <p>ALGOS no se hace responsable por el uso que los usuarios hagan de la información publicada en este sitio web.</p>
              <h2 className="text-lg font-medium text-foreground">Contacto</h2>
              <p>Para consultas legales: <a href="mailto:info@algoscentrodolor.com" className="text-secondary hover:underline">info@algoscentrodolor.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
