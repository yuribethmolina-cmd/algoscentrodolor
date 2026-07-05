import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import EquipoPage from "@/pages/Equipo";
import ContactoPage from "@/pages/Contacto";
import PrivacidadPage from "@/pages/Privacidad";
import AvisoLegalPage from "@/pages/AvisoLegal";

// New pages per brief v2
import EstudiosLaboratorio from "@/pages/EstudiosLaboratorio";
import PreguntasFrecuentes from "@/pages/PreguntasFrecuentes";
import Especialidades from "@/pages/Especialidades";
import EstudiosDiagnosticos from "@/pages/EstudiosDiagnosticos";

// Condition pages
import CondicionesIndex from "@/pages/condiciones/CondicionesIndex";
import Ciatica from "@/pages/condiciones/Ciatica";
import HerniaDiscal from "@/pages/condiciones/HerniaDiscal";
import DolorLumbar from "@/pages/condiciones/DolorLumbar";
import DolorCervical from "@/pages/condiciones/DolorCervical";
import NeuropatiaDiabetica from "@/pages/condiciones/NeuropatiaDiabetica";
import DolorTrasCirugia from "@/pages/condiciones/DolorTrasCirugia";

// Procedure pages
import Infiltraciones from "@/pages/procedimientos/Infiltraciones";
import Ozono from "@/pages/procedimientos/Ozono";
import EMG from "@/pages/procedimientos/EMG";
import EEG from "@/pages/procedimientos/EEG";
import Radiofrecuencia from "@/pages/procedimientos/Radiofrecuencia";

// Legacy pages (kept to avoid 404s on old links)
import Tratamientos from "@/pages/Tratamientos";
import TratamientoDetalle from "@/pages/TratamientoDetalle";
import Pacientes from "@/pages/Pacientes";
import Medicos from "@/pages/Medicos";
import Instituciones from "@/pages/Instituciones";
import BlogPage from "@/pages/Blog";

function wrap(Component: React.ComponentType) {
  return (
    <PageTransition>
      <Component />
    </PageTransition>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={wrap(Index)} />

          {/* Conditions */}
          <Route path="/condiciones" element={wrap(CondicionesIndex)} />
          <Route path="/condiciones/ciatica" element={wrap(Ciatica)} />
          <Route path="/condiciones/hernia-discal" element={wrap(HerniaDiscal)} />
          <Route path="/condiciones/dolor-lumbar" element={wrap(DolorLumbar)} />
          <Route path="/condiciones/dolor-cervical" element={wrap(DolorCervical)} />
          <Route path="/condiciones/neuropatia-diabetica" element={wrap(NeuropatiaDiabetica)} />
          <Route path="/condiciones/dolor-tras-cirugia" element={wrap(DolorTrasCirugia)} />

          {/* Procedures */}
          <Route path="/procedimientos/infiltraciones-y-bloqueos" element={wrap(Infiltraciones)} />
          <Route path="/procedimientos/ozono-hernia-discal" element={wrap(Ozono)} />
          <Route path="/procedimientos/emg" element={wrap(EMG)} />
          <Route path="/procedimientos/eeg" element={wrap(EEG)} />
          <Route path="/procedimientos/radiofrecuencia" element={wrap(Radiofrecuencia)} />
          <Route path="/procedimientos" element={<Navigate to="/procedimientos/infiltraciones-y-bloqueos" replace />} />

          {/* Main pages */}
          <Route path="/estudios-laboratorio" element={wrap(EstudiosLaboratorio)} />
          <Route path="/estudios-diagnosticos" element={wrap(EstudiosDiagnosticos)} />
          <Route path="/especialidades" element={wrap(Especialidades)} />
          <Route path="/equipo" element={wrap(EquipoPage)} />
          <Route path="/preguntas-frecuentes" element={wrap(PreguntasFrecuentes)} />
          <Route path="/contacto" element={wrap(ContactoPage)} />
          <Route path="/privacidad" element={wrap(PrivacidadPage)} />
          <Route path="/aviso-legal" element={wrap(AvisoLegalPage)} />

          {/* Legacy routes kept active */}
          <Route path="/tratamientos" element={wrap(Tratamientos)} />
          <Route path="/tratamientos/:slug" element={wrap(TratamientoDetalle)} />
          <Route path="/pacientes" element={wrap(Pacientes)} />
          <Route path="/pacientes/*" element={wrap(Pacientes)} />
          <Route path="/medicos" element={wrap(Medicos)} />
          <Route path="/medicos/*" element={wrap(Medicos)} />
          <Route path="/instituciones" element={wrap(Instituciones)} />
          <Route path="/instituciones/*" element={wrap(Instituciones)} />
          <Route path="/blog" element={wrap(BlogPage)} />

          <Route path="*" element={wrap(NotFound)} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
