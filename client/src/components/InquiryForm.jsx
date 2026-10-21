import { useEffect, useState } from "react";
import { company } from "@shared/content.js";

export default function InquiryForm({
  source = "contact",
  interest = "General",
  estimate = null,
  submitLabel = "Send message",
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest,
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

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
        Name<span className="req">*</span>
        <input name="name" value={form.name} onChange={update} required autoComplete="name" />
      </label>
      <label>
        Phone number<span className="req">*</span>
        <input name="phone" value={form.phone} onChange={update} required autoComplete="tel" placeholder="03xx xxx xxxx" />
      </label>
      <label className="full">
        Message<span className="req">*</span>
        <textarea name="message" rows="5" value={form.message} onChange={update} required placeholder="Plot size, location, and what you want built." />
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
