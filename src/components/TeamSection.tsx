import { GraduationCap, Award, MapPin, Globe, Stethoscope, Bone, Activity, HeartPulse, Users, User } from "lucide-react";
import teamAtilio from "@/assets/team-atilio.png";
import teamLuis from "@/assets/team-luis.png";
import teamDaniel from "@/assets/team-daniel.png";

const team = [
  {
    name: "Dr. Atilio J. Rodríguez",
    role: "Director Médico",
    specialty: "Neurocirujano · Ozonoterapia · Electrodiagnóstico",
    location: "Maracaibo, Venezuela",
    credentials: "Jefe de Neurocirugía — Hospital General del Sur",
    description:
      "Coordinador del Postgrado de Neurocirugía de LUZ y del Capítulo Zuliano de Columna de la SVNC. Décadas de práctica activa, liderazgo académico y una red de exresidentes y especialistas en todo el Zulia.",
    certifications: ["Neurocirugía — LUZ", "Ozonoterapia Médica", "EMG · EEG"],
    socials: ["@neuroatilio", "@electromiografia.zulia", "@ozonoterapia.zulia"],
    photo: teamAtilio,
  },
  {
    name: "Dr. Luis Alberto Rodríguez",
    role: "Consultor Estratégico y Referente Clínico",
    specialty: "Neurocirujano · Medicina Intervencionista de Columna",
    location: "Alemania",
    credentials: "Neurocirujano activo en Alemania",
    description:
      "Diseña los protocolos clínicos del centro, adapta estándares europeos al contexto venezolano, revisa casos complejos y trabaja en alianzas institucionales desde Alemania.",
    certifications: ["Certficado de Columna por La Sociedad de Columna de Alemania DWG · EUROSPINE", "Miembro DWG · DGNC · EANS", "Dr. med. en proceso — Uni Lübeck"],
    photo: teamLuis,
  },
  {
    name: "Lcdo. Daniel Rodríguez",
    role: "Director de Nutrición",
    specialty: "Nutrición Clínica · Nutrición Antiinflamatoria",
    location: "Maracaibo, Venezuela",
    credentials: "LUZ · Hospital Clínico Maracaibo · 5+ años consulta privada",
    description:
      "Integra alimentación terapéutica, suplementación clínica y manejo metabólico del dolor como parte del protocolo asistencial de ALGOS. Único nutricionista en Maracaibo con posicionamiento específico en dolor crónico.",
    certifications: ["Diplomado en Obesidad", "Personal Trainer Certificado", "Inglés C1 Advanced"],
    socials: ["@kilocalorias"],
    photo: teamDaniel,
  },
  {
    name: "Dr. Por Confirmar",
    role: "Anestesiólogo",
    specialty: "Anestesiología · Manejo del Dolor Perioperatorio",
    location: "Maracaibo, Venezuela",
    credentials: "Especialista en sedación y analgesia para procedimientos",
    description:
      "Manejo del dolor perioperatorio, sedación para procedimientos intervencionistas y soporte anestésico integral dentro del protocolo ALGOS.",
    certifications: ["Anestesiología"],
    photo: null,
  },
  {
    name: "Dr. Por Confirmar",
    role: "Traumatólogo",
    specialty: "Traumatología · Ortopedia · Medicina Musculoesquelética",
    location: "Maracaibo, Venezuela",
    credentials: "Especialista en patología articular y traumatología",
    description:
      "Evaluación y tratamiento de patologías articulares, fracturas, lesiones musculoesqueléticas y rehabilitación ortopédica como parte del abordaje integral del dolor.",
    certifications: ["Traumatología y Ortopedia"],
    photo: null,
  },
  {
    name: "Dr. Por Confirmar",
    role: "Médico del Deporte",
    specialty: "Medicina Deportiva · Rehabilitación · Rendimiento Físico",
    location: "Maracaibo, Venezuela",
    credentials: "Especialista en lesiones deportivas y rehabilitación",
    description:
      "Diagnóstico y tratamiento de lesiones deportivas, programas de rehabilitación funcional y optimización del rendimiento físico integrados al protocolo de dolor.",
    certifications: ["Medicina del Deporte"],
    photo: null,
  },
  {
    name: "Dr. Por Confirmar",
    role: "Especialista en Dolor",
    specialty: "Medicina Intervencionista del Dolor · Dolor Crónico",
    location: "Maracaibo, Venezuela",
    credentials: "Especialista en manejo intervencionista del dolor crónico",
    description:
      "Manejo intervencionista del dolor crónico mediante técnicas guiadas por imagen, bloqueos nerviosos y terapias avanzadas dentro del ecosistema ALGOS.",
    certifications: ["Medicina del Dolor"],
    photo: null,
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="scroll-reveal text-center mb-20">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Equipo médico
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-foreground leading-tight mb-6">
            Equipo
            <br />
            <span className="font-light text-secondary">multidisciplinario</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg max-w-2xl mx-auto">
            Especialistas en neurocirugía, nutrición, anestesiología, ortopedia
            y medicina del deporte, bajo un mismo protocolo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={`${member.role}-${idx}`}
              className={`scroll-reveal scroll-reveal-delay-${(idx % 3) + 1} group relative overflow-hidden rounded-2xl border border-border/50 bg-background hover:border-secondary/30 transition-all duration-500`}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/90 to-secondary/70 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_hsl(var(--secondary)/0.3),_transparent_60%)]" />
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary-foreground/20 flex items-center justify-center bg-primary/40">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <User className="w-12 h-12 text-primary-foreground/50" />
                  )}
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/60 backdrop-blur-sm border border-primary-foreground/10">
                  <MapPin className="w-3 h-3 text-primary-foreground/70" />
                  <span className="text-xs text-primary-foreground/70 font-light">{member.location}</span>
                </div>

                {member.location.includes("Alemania") && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30">
                    <Globe className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent font-medium">Alemania</span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="mb-1">
                  <span className="text-xs tracking-[0.2em] uppercase text-secondary font-medium">{member.role}</span>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground font-light text-sm mb-4">{member.specialty}</p>

                <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-accent/5 border border-accent/10">
                  <GraduationCap className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-accent/90 font-medium leading-snug">{member.credentials}</span>
                </div>

                <p className="text-muted-foreground font-light text-sm leading-relaxed mb-5">
                  {member.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/5 border border-secondary/10">
                      <Award className="w-3 h-3 text-secondary/60" />
                      <span className="text-xs text-secondary/80 font-light">{cert}</span>
                    </div>
                  ))}
                </div>

                {"socials" in member && member.socials && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {member.socials.map((handle) => (
                      <a
                        key={handle}
                        href={`https://instagram.com/${handle.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent/70 hover:text-accent font-light transition-colors"
                      >
                        {handle}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
