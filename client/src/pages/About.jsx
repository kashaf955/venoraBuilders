import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { company, process, reasons, stats } from "@shared/content.js";

export default function About() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="A construction company measured by the frame, not the brochure."
        text={`${company.legal} has built from ${company.headquarters} since ${company.founded}.`}
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="section">
        <div className="wrap narrow reveal">
          <p className="kicker">The practice</p>
          <h2>Houses, plazas, and the paperwork that keeps both honest.</h2>
          <p className="lede">
            Venora takes residential and commercial work from consultation through handover. The public record is
            straightforward: more than 100,000 square feet constructed, 140 clients, and grey-structure rates published
            from Rs 2,950 per square foot.
          </p>
          <p>
            Drawings follow the plot and the authority that governs it — CDA or RDA. Concrete is
            specified and tested before the next pour. Clients in {company.regions.join(", ")} get a bill of quantities
            they can read while the site is live.
          </p>
        </div>
        <div className="wrap stat-band">
          {stats.map((item) => (
            <div key={item.label} className="reveal">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section ink">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="kicker">Leadership</p>
            <h2>The names on the letterhead.</h2>
          </div>
          <div className="leader-grid">
            {company.leaders.map((leader) => (
              <article key={leader.name} className="reveal">
                <p className="kicker">{leader.role}</p>
                <h3>{leader.name}</h3>
                <p>{leader.message}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="kicker">Standards</p>
            <h2>What we will not leave to chance.</h2>
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

      <section className="section method">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="kicker">Method</p>
            <h2>The same sequence on every job.</h2>
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
          <div className="center-link">
            <Link className="btn" to="/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
