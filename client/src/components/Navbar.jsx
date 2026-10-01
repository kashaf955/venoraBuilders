import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

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
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={open ? "show" : ""}>
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
