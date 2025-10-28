import NavBar from "../components/NavBar";
import {  Outlet } from "react-router-dom";
import Footer from "../components/Footer";


function PublicLayout({ children }) {
  return (
    <div>
      <NavBar />
      <main className="min-h-[calc(100vh-64px)] pt-[70px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
