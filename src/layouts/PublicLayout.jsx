import NavBar from "../components/NavBar";
import {  Outlet } from "react-router-dom";
import Footer from "../components/Footer";


function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
