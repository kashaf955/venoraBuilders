import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { projects } from "@shared/content.js";

const filters = ["All", "Residential", "Commercial", "Interior", "Grey Structure"];

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const category = filters.includes(params.get("category")) ? params.get("category") : "All";
  const visible = useMemo(
    () => (category === "All" ? projects : projects.filter((item) => item.category === category)),
    [category]
  );

  return (
    <>
      <PageHero
        kicker="Our projects"
        title="Houses, plazas, and the structures between them."
        text="A selection of delivered and active Venora work. Open a project for the brief and the services used."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="section">
        <div className="wrap">
          <div className="filters" role="tablist" aria-label="Project categories">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                className={category === item ? "on" : ""}
                onClick={() => setParams(item === "All" ? {} : { category: item })}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="project-grid gallery">
            {visible.map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className="project-card reveal">
                <img src={project.image} alt="" />
                <div>
                  <span>
                    {project.category} · {project.status}
                  </span>
                  <h3>{project.title}</h3>
                  <p>
                    {project.location}
                    <br />
                    {project.plot}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
