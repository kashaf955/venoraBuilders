import { testimonials } from "@shared/content.js";

export default function Testimonials() {
  return (
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
  );
}
