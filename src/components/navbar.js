import React from "react";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <NavLink to="/">
        <>
          <button className="logo"> HERMES </button>
        </>
      </NavLink>
      <NavLink to="/create">
        <button className="btn btn-create">
          <span className="material-symbols-outlined ">add</span>
        </button>
      </NavLink>
    </div>
  );
}
