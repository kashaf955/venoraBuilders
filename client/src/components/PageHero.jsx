export default function PageHero({ kicker, title, text, image }) {
  return (
    <header className="page-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-hero-shade" />
      <div className="wrap page-hero-copy">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {text ? <p>{text}</p> : null}
      </div>
    </header>
  );
}
