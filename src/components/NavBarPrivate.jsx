import React from "react";
import { useNavigate } from "react-router-dom";

function NavBarPrivate() {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-white shadow-sm">
      <div className="flex-1">
        <button
          onClick={() => navigate("/dashboard/welcome")}
          className="btn btn-ghost text-xl text-blue-700"
        >
          SaludOne
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="justify-between"
              >
                Profile
                <span className="badge">New</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/dashboard/settings")}>
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBarPrivate;
