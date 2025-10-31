import React from "react";

function NavBarPrivate() {
  return (
    <div className="navbar bg-white shadow-sm">
    <div className="flex-1">
  <a className="btn btn-ghost text-xl text-blue-700 flex items-center gap-2">
    <img
      src="/icons/logo.svg"
      alt="SaludOne logo"
      className="w-8 h-8"
    />
    SaludOne
  </a>
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
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a   onClick={() => {
              window.location.href = "/dashboard/settings";
            }}>Settings</a>
            </li>
            <li>
              <a  onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }} >Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBarPrivate;
