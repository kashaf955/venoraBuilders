import { Link } from "react-router-dom";
import { company } from "@shared/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p className="logo footer-logo">
            <span className="mark">V</span>
            <span>
              <strong>Venora</strong>
              <em>Builders</em>
            </span>
          </p>
          <p>
            {company.legal} designs and builds houses, commercial buildings, and turnkey projects from{" "}
            {company.headquarters}. An associated company of {company.associate}.
          </p>
        </div>
        <div>
          <h2>Visit</h2>
          <p>{company.headquarters}</p>
          <p>Site visits by appointment in {company.regions.join(", ")}.</p>
          <p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          {company.phones.map((phone) => (
            <p key={phone}>
              <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            </p>
          ))}
        </div>
        <div>
          <h2>Pages</h2>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/projects">Our Projects</Link>
          <Link to="/calculator">Construction Calculator</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
      <div className="footer-base">
        <span>
          © {new Date().getFullYear()} {company.legal}. All rights reserved.
        </span>
        <span>{company.tagline}</span>
      </div>
    </footer>
  );
}
