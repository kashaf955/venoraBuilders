import { rateCard } from "@shared/content.js";

const GREY_SPLIT = [
  ["Excavation & foundation", 0.18],
  ["RCC frame", 0.42],
  ["Brick masonry", 0.16],
  ["Plaster & roof treatment", 0.14],
  ["Supervision & temporary works", 0.1],
];

const FINISH_SPLIT = [
  ["Flooring", 0.22],
  ["Joinery & kitchen", 0.18],
  ["Paint", 0.08],
  ["Electrical", 0.15],
  ["Plumbing & sanitary", 0.15],
  ["Doors, windows & aluminum", 0.16],
  ["Other finishes", 0.06],
];

export function buildEstimate(input) {
  const kind = input.projectType === "commercial" ? "commercial" : "residential";
  const level = rateCard.grey[input.level] ? input.level : "Standard";
  const scope = ["grey", "finishing", "turnkey"].includes(input.scope) ? input.scope : "grey";
  const discount = rateCard.cityDiscount[input.city] ?? 0;
  const storeys = Math.min(4, Math.max(1, Number(input.storeys) || 2));
  const covered = Math.min(80000, Math.max(600, Number(input.covered) || 0));

  // Turnkey is a single grey + finishing rate; the grey share is whatever the finishing rate leaves.
  const rate = rateCard[scope][level] - discount;
  const finishRate = scope === "grey" ? 0 : rateCard.finishing[level] - discount;
  const greyRate = scope === "finishing" ? 0 : rate - finishRate;

  const includeGrey = greyRate > 0;
  const includeFinish = finishRate > 0;
  const greyCost = greyRate * covered;
  const finishCost = finishRate * covered;

  const lines = [];
  if (includeGrey) {
    GREY_SPLIT.forEach(([label, share]) => lines.push({ label, amount: Math.round(greyCost * share) }));
  }
  if (includeFinish) {
    FINISH_SPLIT.forEach(([label, share]) => lines.push({ label, amount: Math.round(finishCost * share) }));
  }

  const addons = [];
  if (input.basement && includeGrey) {
    const floor = covered / storeys;
    addons.push({
      label: "Basement",
      amount: Math.round(greyRate * floor * 1.35),
    });
  }
  if (input.boundary) {
    addons.push({ label: "Boundary wall & gate", amount: rateCard.addons.boundary.flat });
  }
  if (input.solar) {
    addons.push({ label: "Solar-ready electrical", amount: Math.round(rateCard.addons.solar.perSqft * covered) });
  }
  if (input.kitchen && includeFinish) {
    addons.push({ label: "Premium kitchen", amount: rateCard.addons.kitchen.flat });
  }

  const addonTotal = addons.reduce((sum, item) => sum + item.amount, 0);
  const total = greyCost + finishCost + addonTotal;
  const months = Math.min(
    24,
    Math.max(4, Math.round((covered / 750) * (scope === "grey" ? 0.65 : scope === "finishing" ? 0.5 : 1.15)))
  );

  return {
    covered,
    storeys,
    city: input.city,
    level,
    scope,
    projectType: kind,
    rate,
    greyRate,
    finishRate,
    greyCost,
    finishCost,
    addons,
    lines,
    total,
    low: Math.round(total * 0.92),
    high: Math.round(total * 1.1),
    months,
    monthsHigh: months + 2,
  };
}

export function money(value) {
  return `Rs ${new Intl.NumberFormat("en-PK").format(Math.round(value || 0))}`;
}
