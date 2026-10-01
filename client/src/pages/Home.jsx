import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import { company, highlights, pillars, process, projects, reasons, services, stats, testimonials } from "@shared/content.js";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section news-section">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">Latest</p>
            <h2>What clients are asking about</h2>
          </div>
          <div className="news-grid">
            {highlights.map((item) => (
              <article key={item.title} className="news-card reveal">
                <img src={item.image} alt="" />
                <div>
                  <span className="pill">{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link to={item.to}>{item.link}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap split intro-split">
          <figure className="badge-frame reveal">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
              alt="A contemporary tower"
            />
            <div className="year-badge">
              <strong>100,000+</strong>
              <span>Sq. ft. constructed</span>
            </div>
          </figure>
          <div className="reveal">
            <p className="kicker">Since {company.founded}</p>
            <h2>Building trust. Creating landmarks.</h2>
            <p className="subhead">Your partners in construction, design, and handover.</p>
            <p className="lede">
              {company.legal} builds custom houses, commercial blocks, and turnkey projects from {company.headquarters}.
              Grade-60 steel, a written bill of quantities, and a {company.warranty}.
            </p>
            <p>
              Led by Chairman {company.leaders[0].name} and CEO {company.leaders[1].name}. An associated company of{" "}
              {company.associate}.
            </p>
            <Link className="btn" to="/about">
              Get to know us
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">How we work</p>
            <h2>Builder, designer, and the team that stays</h2>
          </div>
          <div className="pillar-grid">
            {pillars.map((item) => (
              <article key={item.title} className="pillar reveal">
                <span className="icon-dot" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">Featured</p>
            <h2>Developments across Lahore and Islamabad</h2>
            <p>Signature houses and commercial frames.</p>
          </div>
          <div className="feature-grid">
            {projects.slice(0, 3).map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className="feature-card reveal" style={{ backgroundImage: `url(${project.image})` }}>
                <span className="pill light">{project.status}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.location}</p>
                  <em>Explore project</em>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">Services</p>
            <h2>From the first drawing to the last coat</h2>
          </div>
          <div className="card-grid four">
            {services.slice(0, 4).map((service) => (
              <Link key={service.slug} to={`/services#${service.slug}`} className="service-card reveal">
                <img src={service.image} alt="" />
                <div>
                  <span>{service.code}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <strong>Learn more</strong>
                </div>
              </Link>
            ))}
          </div>
          <div className="center-link">
            <Link className="btn ghost-dark" to="/services">
              All services
            </Link>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">Portfolio</p>
            <h2>Selected work</h2>
          </div>
          <div className="spec-list">
            {projects.slice(0, 4).map((project) => (
              <article key={project.slug} className="spec-card reveal">
                <img src={project.image} alt="" />
                <div>
                  <span className="pill">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul>
                    <li>
                      <b>Location</b>
                      {project.location}
                    </li>
                    <li>
                      <b>Plot</b>
                      {project.plot}
                    </li>
                    <li>
                      <b>Scale</b>
                      {project.area}
                    </li>
                    <li>
                      <b>Status</b>
                      {project.status}
                    </li>
                  </ul>
                  <div className="spec-actions">
                    <Link className="text-link" to={`/projects/${project.slug}`}>
                      View more
                    </Link>
                    <Link className="btn" to="/contact">
                      Get quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="center-link">
            <Link className="btn ghost-dark" to="/projects">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      <section className="milestones">
        <div className="wrap">
          <div className="section-head center light">
            <p className="kicker">Key milestones</p>
            <h2>A construction company measured by the frame</h2>
          </div>
          <div className="stat-band">
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">Method</p>
            <h2>Eight steps from the site walk to the keys</h2>
          </div>
          <ol className="process">
            {process.map((item) => (
              <li key={item.step} className="reveal">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">Standards</p>
            <h2>Why the cheapest rate is rarely the cheapest house</h2>
          </div>
          <div className="reason-grid">
            {reasons.map((item) => (
              <article key={item.title} className="reveal">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="kicker">Clients</p>
            <h2>What our clients say</h2>
          </div>
          <div className="quote-grid">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="reveal">
                <p>“{item.quote}”</p>
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.meta}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-inner">
          <div>
            <p className="kicker">Schedule a meeting</p>
            <h2>Tell us the plot. We will price the structure.</h2>
          </div>
          <div className="band-actions">
            <Link className="btn" to="/calculator">
              Construction calculator
            </Link>
            <Link className="btn ghost" to="/contact">
              Contact the office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
