import NavBar from "../components/NavBar";
import {  Outlet } from "react-router-dom";
import Footer from "../components/Footer";


function PublicLayout({ children }) {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
