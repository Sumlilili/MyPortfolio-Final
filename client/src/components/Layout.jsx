import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // make sure path is correct

export default function Layout() {
  const { token, logout } = useAuth();

  return (
    <div className="page-wrap">
      <header className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/education">Education</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/profile">Profile</Link></li>

          {!token && (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}

          {token && (
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
        <img src="/Logo.png" alt="TS logo" className="logo-img" />
      </header>

      <div className="content-wrap">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
