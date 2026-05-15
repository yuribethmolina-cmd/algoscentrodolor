import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

import Pacientes from "@/pages/Pacientes";
import Tratamientos from "@/pages/Tratamientos";
import TratamientoDetalle from "@/pages/TratamientoDetalle";
import { Navigate } from "react-router-dom";
import Medicos from "@/pages/Medicos";
import Instituciones from "@/pages/Instituciones";

import EquipoPage from "@/pages/Equipo";
import BlogPage from "@/pages/Blog";
import ContactoPage from "@/pages/Contacto";
import PrivacidadPage from "@/pages/Privacidad";
import AvisoLegalPage from "@/pages/AvisoLegal";

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

        <Route path="/tratamientos" element={wrap(Tratamientos)} />
        <Route path="/tratamientos/:slug" element={wrap(TratamientoDetalle)} />

        <Route path="/pacientes/tratamientos" element={<Navigate to="/tratamientos" replace />} />
        <Route path="/pacientes" element={wrap(Pacientes)} />
        <Route path="/pacientes/*" element={wrap(Pacientes)} />

        <Route path="/medicos" element={wrap(Medicos)} />
        <Route path="/medicos/*" element={wrap(Medicos)} />

        <Route path="/instituciones" element={wrap(Instituciones)} />
        <Route path="/instituciones/*" element={wrap(Instituciones)} />

        <Route path="/equipo" element={wrap(EquipoPage)} />
        <Route path="/blog" element={wrap(BlogPage)} />
        <Route path="/contacto" element={wrap(ContactoPage)} />
        <Route path="/privacidad" element={wrap(PrivacidadPage)} />
        <Route path="/aviso-legal" element={wrap(AvisoLegalPage)} />

        <Route path="*" element={wrap(NotFound)} />
      </Routes>
    </AnimatePresence>
    </>
  );
}
