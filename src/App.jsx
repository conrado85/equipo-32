import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Turnos from "./pages/Turnos";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Inicio />} />

        {/* Rutas protegidas */}
        <Route
          path="/turnos"
          element={
            <ProtectedRoute>
              <Turnos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

        
