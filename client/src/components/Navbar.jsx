import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../theme.jsx";

const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Our Services", "/services"],
  ["Our Projects", "/projects"],
  ["Calculator", "/calculator"],
  ["Contact Us", "/contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const solid = scrolled || location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`nav ${solid ? "solid" : ""} ${open ? "open" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="logo" aria-label="Venora Builders home">
          <span className="mark" aria-hidden="true">
            V
          </span>
          <span>
            <strong>Venora</strong>
            <em>Builders</em>
          </span>
        </Link>
        <div className="nav-end">
          <nav className={open ? "show" : ""}>
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-tools">
            <button
              className="theme-btn"
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className="menu-btn"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 3.1a8.8 8.8 0 1 0 6.4 14.6A8.2 8.2 0 0 1 14.5 3.1Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        fill="currentColor"
        d="M11 2h2v3h-2zm0 17h2v3h-2zM2 11h3v2H2zm17 0h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4zM5.6 19.8l2.1-2.1 1.4 1.4-2.1 2.1zM16.3 6.3l2.1-2.1 1.4 1.4-2.1 2.1z"
      />
    </svg>
  );
}
