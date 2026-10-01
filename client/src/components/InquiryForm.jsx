import { useEffect, useState } from "react";
import { company } from "@shared/content.js";

const interests = [
  "Grey structure",
  "Turnkey house",
  "Commercial project",
  "Architectural design",
  "Interior design",
  "Renovation",
  "Consultancy",
  "Other",
];

export default function InquiryForm({
  source = "contact",
  interest = "General",
  estimate = null,
  submitLabel = "Send message",
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Islamabad",
    interest,
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const options = interests.includes(form.interest) ? interests : [form.interest, ...interests];

  useEffect(() => {
    if (!interest) return;
    setForm((current) => ({ ...current, interest }));
  }, [interest]);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source, estimate }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err.message);
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <h3>Message received.</h3>
        <p>A Venora coordinator will call you on {form.phone}. If it is urgent, WhatsApp us directly.</p>
        <a className="btn light" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
          Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={update} required autoComplete="name" />
      </label>
      <label>
        Phone
        <input name="phone" value={form.phone} onChange={update} required autoComplete="tel" placeholder="03xx xxx xxxx" />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" />
      </label>
      <label>
        City
        <select name="city" value={form.city} onChange={update}>
          {company.regions.concat("Other").map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </label>
      <label className="full">
        Interested in
        <select name="interest" value={form.interest} onChange={update}>
          {options.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="full">
        Message
        <textarea name="message" rows="5" value={form.message} onChange={update} placeholder="Plot size, location, and what you want built." />
      </label>
      {error ? <p className="form-error full">{error}</p> : null}
      <div className="full form-actions">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className="fine">We use these details only to reply about your project.</p>
      </div>
    </form>
  );
}
