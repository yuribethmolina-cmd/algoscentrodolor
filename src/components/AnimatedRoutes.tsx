import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import EquipoPage from "@/pages/Equipo";
import MedicoPerfil from "@/pages/MedicoPerfil";
import ContactoPage from "@/pages/Contacto";
import PrivacidadPage from "@/pages/Privacidad";
import AvisoLegalPage from "@/pages/AvisoLegal";
import PoliticaCookiesPage from "@/pages/PoliticaCookies";

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
import Cefaleas from "@/pages/condiciones/Cefaleas";

// Procedure pages
import Infiltraciones from "@/pages/procedimientos/Infiltraciones";
import Ozono from "@/pages/procedimientos/Ozono";
import EMG from "@/pages/procedimientos/EMG";
import EEG from "@/pages/procedimientos/EEG";
import Radiofrecuencia from "@/pages/procedimientos/Radiofrecuencia";

// Legacy pages (kept to avoid 404s on old links)
import Tratamientos from "@/pages/Tratamientos";
import TratamientoDetalle from "@/pages/TratamientoDetalle";
import BlogPage from "@/pages/Blog";

// Landing pages (Google Ads — sin nav, sin PageTransition)
import LpDiagnostico from "@/pages/lp/LpDiagnostico";
import LpDolor from "@/pages/lp/LpDolor";
import Unsubscribe from "@/pages/Unsubscribe";

// Internal admin
import ConversionesDashboard from "@/pages/admin/ConversionesDashboard";
import CitasDashboard from "@/pages/admin/CitasDashboard";
import UsuariosDashboard from "@/pages/admin/UsuariosDashboard";
import EquipoDashboard from "@/pages/admin/EquipoDashboard";
import AdminLogin from "@/pages/admin/Login";
import AdminForgotPassword from "@/pages/admin/ForgotPassword";
import AdminResetPassword from "@/pages/admin/ResetPassword";
import AdminRoute from "@/components/AdminRoute";
import Agendar from "@/pages/Agendar";

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
          <Route path="/condiciones/cefaleas" element={wrap(Cefaleas)} />

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
          <Route path="/equipo/:slug" element={wrap(MedicoPerfil)} />
          <Route path="/preguntas-frecuentes" element={wrap(PreguntasFrecuentes)} />
          <Route path="/contacto" element={wrap(ContactoPage)} />
          <Route path="/privacidad" element={wrap(PrivacidadPage)} />
          <Route path="/aviso-legal" element={wrap(AvisoLegalPage)} />
          <Route path="/politica-cookies" element={wrap(PoliticaCookiesPage)} />

          {/* Legacy routes kept active */}
          <Route path="/tratamientos" element={wrap(Tratamientos)} />
          <Route path="/tratamientos/cefaleas" element={<Navigate to="/condiciones/cefaleas" replace />} />
          <Route path="/tratamientos/:slug" element={wrap(TratamientoDetalle)} />
          <Route path="/pacientes" element={<Navigate to="/" replace />} />
          <Route path="/pacientes/*" element={<Navigate to="/" replace />} />
          <Route path="/medicos" element={<Navigate to="/" replace />} />
          <Route path="/medicos/*" element={<Navigate to="/" replace />} />
          <Route path="/instituciones" element={<Navigate to="/" replace />} />
          <Route path="/instituciones/*" element={<Navigate to="/" replace />} />
          <Route path="/blog" element={wrap(BlogPage)} />

          {/* Landing pages (Google Ads) */}
          <Route path="/lp/diagnostico" element={<LpDiagnostico />} />
          <Route path="/lp/dolor" element={<LpDolor />} />

          {/* Internal admin (unlisted) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route
            path="/admin/conversiones"
            element={<AdminRoute>{wrap(ConversionesDashboard)}</AdminRoute>}
          />
          <Route
            path="/admin/citas"
            element={<AdminRoute>{wrap(CitasDashboard)}</AdminRoute>}
          />
          <Route
            path="/admin/usuarios"
            element={<AdminRoute>{wrap(UsuariosDashboard)}</AdminRoute>}
          />
          <Route
            path="/admin/equipo"
            element={<AdminRoute>{wrap(EquipoDashboard)}</AdminRoute>}
          />



          {/* Public appointment form */}
          <Route path="/agendar" element={wrap(Agendar)} />

          <Route path="*" element={wrap(NotFound)} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
