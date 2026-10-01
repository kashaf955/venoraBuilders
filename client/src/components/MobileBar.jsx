import { Link } from "react-router-dom";
import { company } from "@shared/content.js";

export default function MobileBar() {
  return (
    <div className="mobile-bar">
      <a href={`tel:${company.phones[0].replace(/\s/g, "")}`}>Call</a>
      <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      <Link to="/calculator">Estimate</Link>
    </div>
  );
}
