import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { slides } from "@shared/content.js";

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];
  const prev = () => setIndex((index + slides.length - 1) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);

  return (
    <section className="hero" aria-roledescription="carousel">
      {slides.map((item, itemIndex) => (
        <div
          key={item.title}
          className={`hero-slide ${itemIndex === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${item.image})` }}
          aria-hidden={itemIndex !== index}
        />
      ))}
      <div className="hero-shade" />
      <button className="hero-arrow prev" type="button" aria-label="Previous slide" onClick={prev}>
        ‹
      </button>
      <button className="hero-arrow next" type="button" aria-label="Next slide" onClick={next}>
        ›
      </button>
      <div className="hero-copy">
        <h1>{slide.title}</h1>
        <p className="hero-kicker">{slide.kicker}</p>
        <p className="hero-text">{slide.text}</p>
        <div className="hero-actions">
          <Link className="btn" to={slide.primary.to}>
            {slide.primary.label}
          </Link>
          <Link className="btn ghost" to={slide.secondary.to}>
            {slide.secondary.label}
          </Link>
        </div>
      </div>
      <div className="dots" role="tablist" aria-label="Slides">
        {slides.map((item, itemIndex) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show slide ${itemIndex + 1}`}
            className={itemIndex === index ? "on" : ""}
            onClick={() => setIndex(itemIndex)}
          />
        ))}
      </div>
    </section>
  );
}
