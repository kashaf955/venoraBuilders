import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import InquiryForm from "../components/InquiryForm.jsx";
import { plotPresets, rateCard } from "@shared/content.js";
import { buildEstimate, money } from "../lib/estimate.js";

const initial = {
  projectType: "residential",
  city: "Islamabad",
  plot: "10-marla",
  covered: 2800,
  storeys: 2,
  scope: "turnkey",
  level: "Standard",
  basement: false,
  boundary: false,
  solar: false,
  kitchen: false,
};

export default function Calculator() {
  const [input, setInput] = useState(initial);
  const result = useMemo(() => buildEstimate(input), [input]);

  function setField(name, value) {
    setInput((current) => ({ ...current, [name]: value }));
  }

  function choosePlot(id) {
    const preset = plotPresets.find((item) => item.id === id);
    setInput((current) => ({
      ...current,
      plot: id,
      covered: id === "custom" ? current.covered : preset.covered * (current.storeys > 2 ? 1.25 : 1),
    }));
  }

  const snapshot = {
    total: result.total,
    low: result.low,
    high: result.high,
    covered: result.covered,
    scope: result.scope,
    level: result.level,
    city: result.city,
    projectType: result.projectType,
  };

  return (
    <>
      <PageHero
        kicker="Construction calculator"
        title="A first number before the bill of quantities."
        text="Turnkey (grey + finishing) from Rs 5,500 per sq. ft. and finishing only from Rs 2,700 per sq. ft. The figure is a planning range, not a contract."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="section">
        <div className="wrap calc-layout">
          <form className="calc-panel reveal" onSubmit={(event) => event.preventDefault()}>
            <fieldset>
              <legend>Project</legend>
              <div className="choice-row">
                {[
                  ["residential", "Residential"],
                  ["commercial", "Commercial"],
                ].map(([value, label]) => (
                  <button key={value} type="button" className={input.projectType === value ? "on" : ""} onClick={() => setField("projectType", value)}>
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label>
              City
              <select value={input.city} onChange={(event) => setField("city", event.target.value)}>
                {rateCard.cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend>Plot</legend>
              <div className="choice-row wrap-choices">
                {plotPresets.map((plot) => (
                  <button key={plot.id} type="button" className={input.plot === plot.id ? "on" : ""} onClick={() => choosePlot(plot.id)}>
                    {plot.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="pair">
              <label>
                Covered area (sq. ft.)
                <input
                  type="number"
                  min="600"
                  max="80000"
                  value={input.covered}
                  onChange={(event) => setField("covered", Number(event.target.value))}
                />
              </label>
              <label>
                Storeys
                <select value={input.storeys} onChange={(event) => setField("storeys", Number(event.target.value))}>
                  {[1, 2, 3, 4].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset>
              <legend>Scope</legend>
              <div className="choice-row wrap-choices">
                {[
                  ["turnkey", "Grey + finishing (turnkey)"],
                  ["finishing", "Finishing only"],
                  ["grey", "Grey structure"],
                ].map(([value, label]) => (
                  <button key={value} type="button" className={input.scope === value ? "on" : ""} onClick={() => setField("scope", value)}>
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Specification</legend>
              <div className="choice-row">
                {["Standard", "Premium", "Luxury"].map((level) => (
                  <button key={level} type="button" className={input.level === level ? "on" : ""} onClick={() => setField("level", level)}>
                    {level}
                  </button>
                ))}
              </div>
              <p className="fine">
                {input.scope === "grey" ? "Grey structure" : input.scope === "finishing" ? "Finishing only" : "Turnkey"} at{" "}
                {input.level} is {money(result.rate)} / sq. ft.
                {rateCard.cityDiscount[input.city]
                  ? ` (Rs ${rateCard.cityDiscount[input.city]} less than the Islamabad rate).`
                  : "."}
              </p>
            </fieldset>

            <fieldset>
              <legend>Add-ons</legend>
              <div className="addon-grid">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={input.basement}
                    disabled={input.scope === "finishing"}
                    onChange={(event) => setField("basement", event.target.checked)}
                  />
                  Basement
                </label>
                <label className="check">
                  <input type="checkbox" checked={input.boundary} onChange={(event) => setField("boundary", event.target.checked)} />
                  Boundary wall and gate
                </label>
                <label className="check">
                  <input type="checkbox" checked={input.solar} onChange={(event) => setField("solar", event.target.checked)} />
                  Solar-ready electrical
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={input.kitchen}
                    disabled={input.scope === "grey"}
                    onChange={(event) => setField("kitchen", event.target.checked)}
                  />
                  Premium kitchen
                </label>
              </div>
            </fieldset>
          </form>

          <aside className="estimate reveal">
            <p className="kicker">Indicative range</p>
            <h2>{money(result.low)} – {money(result.high)}</h2>
            <p className="estimate-mid">Mid figure {money(result.total)}</p>
            <dl>
              <div>
                <dt>Covered area</dt>
                <dd>{result.covered.toLocaleString("en-PK")} sq. ft.</dd>
              </div>
              <div>
                <dt>Rate</dt>
                <dd>{money(result.rate)} / sq. ft.</dd>
              </div>
              <div>
                <dt>Grey rate</dt>
                <dd>{result.greyRate ? `${money(result.greyRate)} / sq. ft.` : "—"}</dd>
              </div>
              <div>
                <dt>Finishing rate</dt>
                <dd>{result.finishRate ? `${money(result.finishRate)} / sq. ft.` : "—"}</dd>
              </div>
              <div>
                <dt>Working duration</dt>
                <dd>
                  {result.months}–{result.monthsHigh} months
                </dd>
              </div>
            </dl>
            <div className="bars">
              {result.lines.map((line) => (
                <div key={line.label}>
                  <span>
                    {line.label}
                    <em>{money(line.amount)}</em>
                  </span>
                  <i style={{ width: `${Math.max(8, (line.amount / result.total) * 100)}%` }} />
                </div>
              ))}
              {result.addons.map((line) => (
                <div key={line.label}>
                  <span>
                    {line.label}
                    <em>{money(line.amount)}</em>
                  </span>
                  <i style={{ width: `${Math.max(8, (line.amount / result.total) * 100)}%` }} />
                </div>
              ))}
            </div>
            <p className="fine">
              Planning aid only. Soil, drawings, bylaws, and a surveyed bill of quantities replace this number. Send it
              to the office and we will confirm what applies to your plot.
            </p>
          </aside>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap contact-layout">
          <div>
            <p className="kicker">Send this estimate</p>
            <h2>Ask Venora to turn the range into a bill of quantities.</h2>
            <p>Include the plot address in your message. The estimate above is attached to the inquiry.</p>
          </div>
          <InquiryForm
            source="calculator"
            interest="Construction estimate"
            estimate={snapshot}
            submitLabel="Request this estimate"
          />
        </div>
      </section>
    </>
  );
}
