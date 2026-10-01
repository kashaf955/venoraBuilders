import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import InquiryForm from "../components/InquiryForm.jsx";
import { company } from "@shared/content.js";

export default function Contact() {
  const [params] = useSearchParams();
  const interest = useMemo(() => params.get("interest") || "General", [params]);

  return (
    <>
      <PageHero
        kicker="Contact us"
        title="Tell us the plot. We will tell you if we should build it."
        text="Call, WhatsApp, or send the form. Site visits are by appointment."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="section">
        <div className="wrap contact-layout">
          <div className="contact-facts">
            <article className="reveal">
              <h2>Office</h2>
              <p>{company.legal}</p>
              <p>{company.headquarters}</p>
              <p>Working across {company.regions.join(", ")}.</p>
            </article>
            <article className="reveal">
              <h2>Phone</h2>
              {company.phones.map((phone) => (
                <p key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </p>
              ))}
              <p>
                <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp {company.phones[0]}
                </a>
              </p>
            </article>
            <article className="reveal">
              <h2>Email</h2>
              <p>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
              <p>Ask for {company.leaders[1].name}, CEO, or {company.leaders[0].name}, Chairman.</p>
            </article>
          </div>
          <InquiryForm source="contact" interest={interest} />
        </div>
      </section>
    </>
  );
}
