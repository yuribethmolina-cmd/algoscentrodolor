import PageLayout from "@/components/layouts/PageLayout";

export default function PrivacidadPage() {
  return (
    <PageLayout>
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="scroll-reveal">
            <h1 className="text-3xl md:text-4xl font-extralight text-foreground leading-tight mb-8">
              Política de <span className="font-light text-secondary">Privacidad</span>
            </h1>
            <div className="prose prose-sm max-w-none text-muted-foreground font-light leading-relaxed space-y-6">
              <p>
                ALGOS, Centro de Dolor Intervencionista se compromete a proteger la privacidad de sus pacientes y usuarios. Esta política describe cómo recopilamos, utilizamos y protegemos su información personal.
              </p>
              <h2 className="text-lg font-medium text-foreground">Información que recopilamos</h2>
              <p>Recopilamos información personal cuando usted agenda una cita, nos contacta o utiliza nuestros servicios. Esto puede incluir nombre, teléfono, email y datos clínicos relevantes.</p>
              <h2 className="text-lg font-medium text-foreground">Uso de la información</h2>
              <p>Su información se utiliza exclusivamente para fines clínicos, comunicación sobre sus citas y mejora de nuestros servicios.</p>
              <h2 className="text-lg font-medium text-foreground">Protección de datos</h2>
              <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado.</p>
              <h2 className="text-lg font-medium text-foreground">Contacto</h2>
              <p>Para consultas sobre privacidad: <a href="mailto:info@algoscentrodolor.com" className="text-secondary hover:underline">info@algoscentrodolor.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
