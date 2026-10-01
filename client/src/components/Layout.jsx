import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import MobileBar from "./MobileBar.jsx";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Venora Builders",
      "/about": "About Us · Venora Builders",
      "/services": "Our Services · Venora Builders",
      "/projects": "Our Projects · Venora Builders",
      "/calculator": "Construction Calculator · Venora Builders",
      "/contact": "Contact Us · Venora Builders",
    };
    document.title =
      titles[location.pathname] ||
      (location.pathname.startsWith("/projects/") ? "Project · Venora Builders" : "Venora Builders");
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.14 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
