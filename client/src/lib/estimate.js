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
  const level = rateCard[kind].grey[input.level] ? input.level : "Standard";
  const cityFactor = rateCard.cities[input.city] ?? 1;
  const storeys = Math.min(4, Math.max(1, Number(input.storeys) || 2));
  const covered = Math.min(80000, Math.max(600, Number(input.covered) || 0));
  const greyRate = Math.round(rateCard[kind].grey[level] * cityFactor);
  const finishRate = Math.round(rateCard[kind].finishing[level] * cityFactor);

  const includeGrey = input.scope !== "finishing";
  const includeFinish = input.scope === "complete" || input.scope === "turnkey";
  const greyCost = includeGrey ? greyRate * covered : 0;
  const finishCost = includeFinish ? finishRate * covered : 0;
  const management = input.scope === "turnkey" ? Math.round((greyCost + finishCost) * 0.08) : 0;

  const lines = [];
  if (includeGrey) {
    GREY_SPLIT.forEach(([label, share]) => lines.push({ label, amount: Math.round(greyCost * share) }));
  }
  if (includeFinish) {
    FINISH_SPLIT.forEach(([label, share]) => lines.push({ label, amount: Math.round(finishCost * share) }));
  }
  if (management) lines.push({ label: "Design, approvals & management", amount: management });

  const addons = [];
  if (input.basement && includeGrey) {
    const floor = covered / storeys;
    addons.push({
      label: "Basement",
      amount: Math.round(greyRate * floor * 1.35),
    });
  }
  if (input.boundary) {
    addons.push({ label: "Boundary wall & gate", amount: Math.round(rateCard.addons.boundary.flat * cityFactor) });
  }
  if (input.solar) {
    addons.push({ label: "Solar-ready electrical", amount: Math.round(rateCard.addons.solar.perSqft * covered) });
  }
  if (input.kitchen && includeFinish) {
    addons.push({ label: "Premium kitchen", amount: Math.round(rateCard.addons.kitchen.flat * cityFactor) });
  }

  const addonTotal = addons.reduce((sum, item) => sum + item.amount, 0);
  const total = greyCost + finishCost + management + addonTotal;
  const months = Math.min(
    24,
    Math.max(4, Math.round((covered / 750) * (input.scope === "grey" ? 0.65 : input.scope === "turnkey" ? 1.15 : 1)))
  );

  return {
    covered,
    storeys,
    city: input.city,
    level,
    scope: input.scope,
    projectType: kind,
    greyRate: includeGrey ? greyRate : 0,
    finishRate: includeFinish ? finishRate : 0,
    greyCost,
    finishCost,
    management,
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
