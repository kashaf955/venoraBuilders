import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { services } from "@shared/content.js";

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const node = document.querySelector(location.hash);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <>
      <PageHero
        kicker="Our services"
        title="Nine ways a building gets from plot to occupied."
        text="Pick a scope, or start with the calculator if you already know the covered area."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="section service-list">
        <div className="wrap">
          {services.map((service, index) => (
            <article id={service.slug} key={service.slug} className={`service-row ${index % 2 ? "flip" : ""}`}>
              <img src={service.image} alt="" />
              <div className="reveal">
                <p className="kicker">Service {service.code}</p>
                <h2>{service.title}</h2>
                <p className="lede">{service.summary}</p>
                <p>{service.detail}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link className="btn" to={`/contact?interest=${encodeURIComponent(service.title)}`}>
                  Discuss this service
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
