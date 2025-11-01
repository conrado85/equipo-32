
import {  Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBarPrivateUser from "../components/NavbarPrivateUser";


function PrivateUserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBarPrivateUser />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PrivateUserLayout;