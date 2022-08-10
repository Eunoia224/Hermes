import React from "react";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <footer>
      <>
        <div className="links">
          <NavLink to="/">
            <button className="footer-logo logo"> HERMES <small>Made by ALAZAR MICHAEL </small> </button>
          </NavLink>
          <a
            href="https://github.com/Eunoia224"
            target="_blank"
            rel="noreferrer"
          >
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </div>
      </>
    </footer>
  );
}
