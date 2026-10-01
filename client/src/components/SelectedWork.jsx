import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function SelectedWork({ projects }) {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const indexRef = useRef(null);
  const titleRef = useRef(null);
  const barRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const paintRef = useRef(() => {});
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return undefined;

    const cards = [...stack.querySelectorAll(".work-card")];
    const dots = [...section.querySelectorAll(".work-dots span")];
    const count = cards.length;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const travel = section.offsetHeight - window.innerHeight;
      const top = section.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(Math.max(-top / travel, 0), 1) : 0;
      const scaled = progress * Math.max(count - 1, 1);
      const active = Math.min(count - 1, Math.round(scaled));

      const height = stack.clientHeight;
      cards.forEach((card, index) => {
        const ahead = index - scaled;
        const passed = Math.min(Math.max(-ahead, 0), 1);
        const y = ahead <= 0 ? 0 : Math.min(ahead, 1) * height * 0.84;
        const scale = 1 - passed * 0.045;
        const tilt = index === active ? pointer.current.x * -2.2 : 0;
        card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale}) rotate(${tilt}deg)`;
        card.style.zIndex = String(10 + index);
      });

      if (indexRef.current) indexRef.current.textContent = String(active + 1).padStart(2, "0");
      if (titleRef.current) titleRef.current.textContent = projects[active]?.title ?? "";
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      dots.forEach((dot, index) => dot.classList.toggle("on", index === active));
    };

    const requestPaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paintRef.current = requestPaint;

    paint();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);
    return () => {
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, projects]);

  const onPointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    };
    paintRef.current();
  };

  const onPointerLeave = () => {
    pointer.current = { x: 0, y: 0 };
    paintRef.current();
  };

  if (reduced) {
    return (
      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <p className="kicker">Portfolio</p>
            <h2>Selected work</h2>
          </div>
          <div className="spec-list">
            {projects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="center-link">
            <Link className="btn ghost-dark" to="/projects">
              View all projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="work-pin"
      ref={sectionRef}
      style={{ "--steps": projects.length }}
      aria-label="Selected work"
    >
      <div className="work-stage" onMouseMove={onPointerMove} onMouseLeave={onPointerLeave}>
        <div className="wrap work-head">
          <div>
            <p className="kicker">Portfolio</p>
            <h2>Selected work</h2>
          </div>
          <p className="work-count">
            <span ref={indexRef}>01</span>
            <em ref={titleRef}>{projects[0]?.title}</em>
          </p>
        </div>

        <div className="work-stack" ref={stackRef}>
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} stacked />
          ))}
        </div>

        <div className="wrap work-foot">
          <div className="work-progress" aria-hidden="true">
            <span ref={barRef} />
          </div>
          <div className="work-dots" aria-hidden="true">
            {projects.map((project) => (
              <span key={project.slug} />
            ))}
          </div>
          <Link className="btn ghost-dark" to="/projects">
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, stacked = false }) {
  return (
    <article className={stacked ? "spec-card work-card" : "spec-card"}>
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
  );
}
