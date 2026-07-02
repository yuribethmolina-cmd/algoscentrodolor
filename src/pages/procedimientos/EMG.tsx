import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/PageHero";
import ProcedureDetails from "@/components/procedimiento/ProcedureDetails";
import ProcedureHeroImage from "@/components/procedimiento/ProcedureHeroImage";
import ProcedureSplitBlock from "@/components/procedimiento/ProcedureSplitBlock";
import ProcedureIntro from "@/components/procedimiento/ProcedureIntro";
import imgHeroAsset from "@/assets/emg-aguja-pie.jpeg.asset.json";
import imgPiernaAsset from "@/assets/emg-pierna.webp.asset.json";
import imgBrazoAsset from "@/assets/emg-conduccion-brazo.jpg.asset.json";
const imgHero = imgHeroAsset.url;
const imgPierna = imgPiernaAsset.url;
const imgBrazo = imgBrazoAsset.url;

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20información%20sobre%20la%20Electromiografía%20(EMG).";

export default function EMG() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <PageHero eyebrow="Estudio" title="Electromiografía (EMG)" subtitle="Estudio de los nervios y los músculos." />

        <ProcedureHeroImage
          src={imgHero}
          alt="Electromiografía con aguja guiada por el especialista"
          caption="Electromiografía con aguja: registro directo del músculo."
          mobileContain
        />

        <ProcedureIntro eyebrow="Qué es">
          Mide cómo viajan las señales por sus nervios y cómo responden sus músculos. Así se ve si un nervio está comprimido, irritado o dañado, y en qué punto exacto.
        </ProcedureIntro>

        <ProcedureSplitBlock
          image={imgBrazo}
          imageAlt="Estudio de conducción nerviosa en el brazo"
          eyebrow="Para qué sirve"
          imageCaption="Conducción nerviosa: estímulos suaves sobre la piel."
          mobileContain
        >
          <p>
            Es el estudio indicado cuando el dolor viene con hormigueo, adormecimiento, debilidad o corrientazos.
          </p>
          <p>
            Confirma, por ejemplo, el nervio comprometido de una ciática o el daño de la neuropatía diabética, y le señala al especialista dónde está el problema para tratar eso y no ir a ciegas.
          </p>
        </ProcedureSplitBlock>

        <ProcedureSplitBlock
          image={imgPierna}
          imageAlt="Electromiografía en la pierna con registro en pantalla"
          eyebrow="Cómo se hace"
          imageCaption="Registro en tiempo real durante el estudio."
          reverse
        >
          <p>
            El estudio se hace en dos partes: primero la conducción nerviosa, luego el registro con una aguja muy fina en algunos músculos.
          </p>
          <p>
            Todo ocurre en la misma sesión, de forma ambulatoria, y el especialista interpreta los registros en el momento.
          </p>
        </ProcedureSplitBlock>





        <ProcedureDetails
          facts={[
            { label: "Duración", value: "30 a 60 min" },
            { label: "Anestesia", value: "No requiere" },
            { label: "Modalidad", value: "Ambulatorio" },
            { label: "Después", value: "Puede irse enseguida" },
          ]}
          preparation="Acuda con la piel limpia, sin cremas ni aceites en brazos y piernas. Puede comer normal. Traiga estudios previos e informes si los tiene."
          steps={[
            { title: "Entrevista clínica", description: "Le preguntamos por sus síntomas, cuándo empezaron y qué medicamentos toma. Examinamos la zona." },
            { title: "Estudio de conducción nerviosa", description: "Se aplican estímulos eléctricos suaves sobre la piel para medir cómo viajan las señales por sus nervios. La sensación es como un corrientazo breve." },
            { title: "Electromiografía con aguja", description: "Se introduce una aguja muy fina en algunos músculos para registrar su actividad. Puede molestar un poco, pero es tolerable y dura pocos minutos por músculo." },
            { title: "Interpretación", description: "El especialista revisa los registros y le explica el hallazgo. Recibe un informe que orienta al médico tratante." },
          ]}
          faq={[
            { question: "¿Duele el estudio?", answer: "Los estímulos eléctricos son breves e incómodos, pero no dolorosos. La aguja fina puede causar una molestia leve por músculo evaluado. La mayoría lo tolera bien." },
            { question: "¿Puedo manejar después del estudio?", answer: "Sí. No queda con sedación ni anestesia. Puede retomar sus actividades normales de inmediato." },
            { question: "¿Necesito ayuno?", answer: "No. Coma normal antes del estudio." },
            { question: "¿Cuándo tengo el resultado?", answer: "El informe se entrega en pocos días, con la interpretación del especialista." },
          ]}
        />


        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[48ch] mx-auto">
              Cuéntenos sus síntomas y le orientamos sobre si este estudio aplica a su caso.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors">
              Escríbanos por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
