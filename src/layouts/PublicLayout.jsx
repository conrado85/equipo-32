import NavBar from "../components/NavBar";
import {  Outlet } from "react-router-dom";

function PublicLayout({ children }) {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
