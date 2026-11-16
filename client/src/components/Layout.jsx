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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    const watch = (root) => {
      if (root.nodeType !== 1) return;
      if (root.matches(".reveal:not(.in)")) observer.observe(root);
      root.querySelectorAll(".reveal:not(.in)").forEach((node) => observer.observe(node));
    };
    watch(document.body);
    // Cards added after load (filters, hot reload) need observing too, or they stay hidden.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(watch));
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <div key={location.pathname} className="page">
          <Outlet />
        </div>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
