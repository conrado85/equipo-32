import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Turnos from "./pages/Turnos";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
        
