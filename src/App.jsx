import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Rutas protegidas
import ProtectedRoute from "./routes/ProtectedRoute";

// Páginas públicas
import Home from "./pages/Inicio";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import Soluciones from "./pages/Soluciones";
import Contacto from "./pages/Contacto";

// Páginas del dashboard (privadas)
import Welcome from "./pages/dashboard/Welcome";
import Appointments from "./pages/dashboard/Appointments";
import MedicalRecords from "./pages/dashboard/MedicalRecords";
import VideoConsultation from "./pages/dashboard/VideoConsultation";
import Treatments from "./pages/dashboard/Treatments";
import MyNotes from "./pages/dashboard/MyNotes";
import Settings from "./pages/dashboard/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/soluciones" element={<Soluciones />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* RUTAS PRIVADAS (Dashboard) */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/welcome" element={<Welcome />} />
          <Route path="/dashboard/appointments" element={<Appointments />} />
          <Route path="/dashboard/medical-records" element={<MedicalRecords />} />
          <Route path="/dashboard/video-consultation" element={<VideoConsultation />} />
          <Route path="/dashboard/treatments" element={<Treatments />} />
          <Route path="/dashboard/my-notes" element={<MyNotes />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
