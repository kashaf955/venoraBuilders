import { Link, useParams } from "react-router-dom";
import { projects } from "@shared/content.js";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="section missing">
        <div className="wrap">
          <h1>That project is not on this site.</h1>
          <Link className="btn" to="/projects">
            Back to projects
          </Link>
        </div>
      </section>
    );
  }

  const related = projects.filter((item) => item.slug !== project.slug && item.category === project.category).slice(0, 2);

  return (
    <>
      <header className="page-hero short" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="page-hero-shade" />
        <div className="wrap page-hero-copy">
          <p className="kicker">
            {project.category} · {project.status}
          </p>
          <h1>{project.title}</h1>
          <p>{project.location}</p>
        </div>
      </header>
      <section className="section">
        <div className="wrap project-detail">
          <div className="reveal">
            <p className="lede">{project.summary}</p>
            <p>{project.story}</p>
            <h2>Services on this job</h2>
            <ul className="tags">
              {project.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <Link className="btn" to="/contact">
              Start a similar project
            </Link>
          </div>
          <aside className="fact-card reveal">
            <h2>At a glance</h2>
            <dl>
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>Plot</dt>
                <dd>{project.plot}</dd>
              </div>
              <div>
                <dt>Scale</dt>
                <dd>{project.area}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
          </aside>
        </div>
        {related.length ? (
          <div className="wrap related">
            <h2>Related work</h2>
            <div className="project-grid">
              {related.map((item) => (
                <Link key={item.slug} to={`/projects/${item.slug}`} className="project-card">
                  <img src={item.image} alt="" />
                  <div>
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
