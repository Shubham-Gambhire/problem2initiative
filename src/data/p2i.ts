export type Rating = "H" | "M" | "L";

export type Initiative = {
  id: string;
  name: string;
  short: string;
  rationale: string;
};

export const PROBLEMS: string[] = [
  "Poor end-to-end supply chain visibility",
  "Long or unreliable lead times",
  "High inventory levels or poor inventory turns",
  "Weak supplier collaboration or responsiveness",
  "Slow response to demand changes",
  "Frequent production or logistics disruptions",
  "High cost-to-serve",
  "Limited ability to re-plan or prioritise quickly",
  "Poor coordination between production and logistics",
  "Lack of reliable data for decision making",
  "Inability to sense or react to supply risks early",
  "Inaccurate or siloed demand forecasts",
  "Excessive expediting and premium freight costs",
  "Low On-Time In-Full (OTIF) performance",
  "Poor warehouse / distribution centre productivity",
  "Limited multi-echelon network visibility",
  "Weak S&OP / IBP process maturity",
  "High scrap, obsolescence or write-offs",
  "Inability to run rapid what-if scenarios",
  "Fragmented systems and manual hand-offs",
];

export const INITIATIVES: Initiative[] = [
  {
    id: "control-tower",
    name: "Supply Chain Control Tower",
    short:
      "Real-time end-to-end visibility platform aggregating data across plants, warehouses, suppliers and logistics.",
    rationale: "Creates a single source of truth and accelerates exception management.",
  },
  {
    id: "aps",
    name: "Advanced Planning & Scheduling (APS)",
    short: "Constraint-based production scheduling and material planning engine.",
    rationale: "Shortens planning cycles and improves feasibility of plans.",
  },
  {
    id: "meio",
    name: "Multi-Echelon Inventory Optimisation",
    short:
      "Sets optimal inventory targets across the full network balancing service and working capital.",
    rationale: "Reduces excess stock while protecting service levels.",
  },
  {
    id: "supplier-portal",
    name: "Supplier Collaboration Portal",
    short:
      "Shared digital workspace for forecasts, orders, capacity and performance with key suppliers.",
    rationale: "Increases supplier responsiveness and cuts information lag.",
  },
  {
    id: "demand-sensing",
    name: "AI Demand Sensing & Forecasting",
    short:
      "Uses near-real-time signals and machine learning to improve short-term demand forecasts.",
    rationale: "Enables faster, more accurate response to demand shifts.",
  },
  {
    id: "digital-twin",
    name: "Supply Chain Digital Twin",
    short: "Virtual model of the network for rapid what-if simulation and re-planning.",
    rationale: "Supports scenario evaluation and disruption response in hours instead of days.",
  },
  {
    id: "risk-sensing",
    name: "Predictive Risk Sensing Platform",
    short:
      "Monitors external and internal signals to flag supply risks early and recommend actions.",
    rationale: "Moves the organisation from reactive to proactive risk management.",
  },
  {
    id: "cost-to-serve",
    name: "Cost-to-Serve Analytics",
    short: "Granular profitability and cost analysis by customer, product, channel and route.",
    rationale: "Reveals true cost drivers and margin leakage.",
  },
  {
    id: "ibp",
    name: "Integrated Business Planning (IBP)",
    short:
      "Cross-functional planning process and system linking demand, supply, finance and operations.",
    rationale: "Creates one aligned plan and improves functional coordination.",
  },
  {
    id: "iot-tracking",
    name: "IoT Tracking & Condition Monitoring",
    short:
      "Sensors and trackers for real-time location, temperature and status of goods and assets.",
    rationale: "Closes visibility gaps in transit and at facilities.",
  },
  {
    id: "wms",
    name: "Warehouse Management System (WMS) Upgrade",
    short: "Modern WMS with slotting, labour management and real-time inventory accuracy.",
    rationale: "Directly lifts warehouse productivity and order accuracy.",
  },
  {
    id: "tms",
    name: "Transportation Management System (TMS)",
    short: "Optimises carrier selection, routing, load building and freight audit.",
    rationale: "Reduces freight cost and improves delivery reliability.",
  },
  {
    id: "s-and-op",
    name: "S&OP Process & Tooling Enhancement",
    short: "Structured monthly S&OP cycle supported by collaborative planning software.",
    rationale: "Aligns demand and supply plans and reduces firefighting.",
  },
  {
    id: "network-design",
    name: "Network Design & Optimisation Tool",
    short: "Models facility locations, flows and inventory policies to minimise total cost.",
    rationale: "Improves structural efficiency of the physical network.",
  },
  {
    id: "master-data",
    name: "Master Data Management (MDM)",
    short: "Single source of truth for product, customer, supplier and location data.",
    rationale: "Eliminates data quality issues that undermine every planning decision.",
  },
  {
    id: "exception-mgmt",
    name: "Automated Exception Management",
    short: "Rules-based and AI-driven detection and prioritisation of supply-chain exceptions.",
    rationale: "Focuses planners on the few issues that truly matter.",
  },
  {
    id: "collaborative-forecast",
    name: "Collaborative Forecasting Platform",
    short: "Shared demand planning workspace with sales, customers and suppliers.",
    rationale: "Improves forecast accuracy by incorporating front-line insights.",
  },
  {
    id: "premium-freight",
    name: "Premium Freight Analytics & Control",
    short: "Tracks root causes and cost of expedites; enforces approval workflows.",
    rationale: "Cuts avoidable premium freight spend.",
  },
  {
    id: "otif-dashboard",
    name: "OTIF Performance Management Suite",
    short: "End-to-end On-Time In-Full measurement, root-cause analysis and action tracking.",
    rationale: "Drives accountability and systematic improvement of service levels.",
  },
  {
    id: "process-mining",
    name: "Process Mining for Supply Chain",
    short:
      "Discovers actual process flows from system logs and highlights bottlenecks and rework.",
    rationale:
      "Reveals hidden inefficiencies caused by fragmented systems and manual hand-offs.",
  },
];

export const MAPPING: Record<number, string[]> = {
  0: ["control-tower", "iot-tracking", "exception-mgmt", "master-data"],
  1: ["aps", "tms", "supplier-portal", "exception-mgmt"],
  2: ["meio", "demand-sensing", "wms", "network-design"],
  3: ["supplier-portal", "collaborative-forecast", "control-tower"],
  4: ["demand-sensing", "collaborative-forecast", "aps", "s-and-op"],
  5: ["risk-sensing", "digital-twin", "exception-mgmt", "control-tower"],
  6: ["cost-to-serve", "tms", "network-design", "premium-freight"],
  7: ["digital-twin", "aps", "exception-mgmt", "ibp"],
  8: ["ibp", "wms", "tms", "control-tower"],
  9: ["master-data", "control-tower", "process-mining", "ibp"],
  10: ["risk-sensing", "supplier-portal", "digital-twin", "control-tower"],
  11: ["demand-sensing", "collaborative-forecast", "s-and-op", "master-data"],
  12: ["premium-freight", "tms", "exception-mgmt", "aps"],
  13: ["otif-dashboard", "tms", "wms", "exception-mgmt"],
  14: ["wms", "process-mining", "iot-tracking", "exception-mgmt"],
  15: ["control-tower", "network-design", "meio", "iot-tracking"],
  16: ["s-and-op", "ibp", "collaborative-forecast", "demand-sensing"],
  17: ["meio", "demand-sensing", "wms", "master-data"],
  18: ["digital-twin", "network-design", "aps", "ibp"],
  19: ["process-mining", "master-data", "control-tower", "exception-mgmt"],
};

export const KEYWORDS: Record<number, string[]> = {
  0: ["visibility", "see", "track", "end-to-end", "transparent", "blind", "where is", "status"],
  1: ["lead time", "lead-time", "delivery time", "late", "delay", "unreliable", "long lead"],
  2: ["inventory", "stock", "turns", "overstock", "excess", "working capital", "obsolescence"],
  3: ["supplier", "vendor", "collaboration", "responsiveness", "partner", "tier"],
  4: ["demand", "forecast", "order change", "volatility", "customer change", "sales spike"],
  5: ["disruption", "breakdown", "stoppage", "logistics failure", "production stop"],
  6: ["cost-to-serve", "cost to serve", "profitability", "margin", "expensive to serve"],
  7: ["re-plan", "replan", "prioritise", "prioritize", "agile planning", "what-if", "scenario"],
  8: ["coordination", "production and logistics", "handoff", "warehouse", "shipping sync"],
  9: ["data", "reliable data", "decision", "information quality", "single source", "truth"],
  10: ["risk", "sense", "early warning", "geopolitical", "supply risk", "anticipate"],
  11: ["forecast accuracy", "siloed", "demand forecast", "inaccurate forecast", "bias"],
  12: ["expedite", "premium freight", "air freight", "rush order", "emergency shipment"],
  13: ["otif", "on-time", "in-full", "service level", "fill rate", "perfect order"],
  14: ["warehouse", "distribution centre", "dc productivity", "picking", "slotting"],
  15: ["multi-echelon", "network visibility", "echelon", "nodes"],
  16: ["s&op", "sales and operations", "ibp maturity", "integrated business planning"],
  17: ["scrap", "obsolescence", "write-off", "write off", "expired", "dead stock"],
  18: ["what-if", "scenario planning", "simulation", "scenario analysis"],
  19: ["fragmented", "manual hand-off", "spreadsheet", "swivel chair", "system integration"],
};

export const NEXT_STEPS: Record<string, string> = {
  "control-tower":
    "Start with a 60–90 day pilot covering one product family and the key warehouses to prove visibility value before scaling.",
  meio: "Begin with a multi-echelon pilot on the top 20% of SKUs by volume or value; measure working-capital impact after one quarter.",
  "exception-mgmt":
    "Define the top 10 exception types with planners and automate alerts for those first - quick win that builds trust.",
  "otif-dashboard":
    "Stand up a weekly OTIF review with root-cause categories; use it to drive accountability across planning, warehouse and logistics.",
  tms: "Pilot dynamic carrier selection and load consolidation on the highest-volume lanes first.",
  "demand-sensing":
    "Connect 2–3 near-real-time signals (orders, shipments, POS if available) for a single product category and compare forecast accuracy.",
  "supplier-portal":
    "Onboard the top 5–10 suppliers by spend or criticality and run a joint capacity review cycle.",
  "digital-twin":
    "Model one constrained value stream and run weekly what-if scenarios for the next S&OP cycle.",
  aps: "Implement constraint-based scheduling for the most complex production line or bottleneck work centre first.",
  wms: "Focus the WMS upgrade on slotting and inventory accuracy in the highest-throughput warehouse.",
  "master-data":
    "Cleanse and govern the top 500 SKUs and key location/supplier records; measure impact on planning errors.",
  ibp: "Run a single integrated monthly cycle with demand, supply and finance in the room for one quarter.",
  "s-and-op":
    "Formalise a monthly S&OP cadence with a single set of numbers and clear decision rights.",
  "risk-sensing":
    "Start by monitoring the top 20 suppliers and critical logistics lanes for early-warning signals.",
  "cost-to-serve":
    "Calculate true cost-to-serve for the top 10 customers or channels and identify quick margin opportunities.",
  "network-design":
    "Run a network optimisation study focused on the next 3-year demand outlook before committing to new sites.",
  "collaborative-forecast":
    "Invite the top 5 customers or sales regions into a shared forecast workspace for one category.",
  "premium-freight":
    "Track every expedite for 30 days, tag root causes, and put a simple approval threshold in place.",
  "process-mining":
    "Extract logs from ERP/WMS for the order-to-delivery process and identify the biggest rework loops.",
  "iot-tracking": "Pilot real-time tracking on high-value or temperature-sensitive shipments first.",
};

export const EXAMPLE_PROBLEMS = [0, 2, 13];

export const EXAMPLE_RATINGS: Record<string, { impact: Rating; effort: Rating }> = {
  "control-tower": { impact: "H", effort: "M" },
  meio: { impact: "H", effort: "M" },
  "exception-mgmt": { impact: "H", effort: "L" },
  "demand-sensing": { impact: "M", effort: "M" },
  "master-data": { impact: "M", effort: "L" },
  "iot-tracking": { impact: "M", effort: "H" },
  "otif-dashboard": { impact: "H", effort: "M" },
  tms: { impact: "H", effort: "M" },
  wms: { impact: "M", effort: "H" },
  "network-design": { impact: "L", effort: "H" },
};

export function score(impact: Rating, effort: Rating): number {
  const impactScore = { H: 3, M: 2, L: 1 }[impact];
  const effortScore = { L: 3, M: 2, H: 1 }[effort];
  return impactScore + effortScore;
}

export type Band = {
  label: "Start here" | "Medium priority" | "Lower priority";
  desc: string;
};

export function band(s: number): Band {
  if (s >= 5) return { label: "Start here", desc: "High Impact – Lower Effort" };
  if (s === 4)
    return { label: "Medium priority", desc: "High Impact – Higher Effort or balanced" };
  return { label: "Lower priority", desc: "Lower relative priority" };
}

export const ratingLabel = (v: Rating) => ({ H: "High", M: "Medium", L: "Low" })[v];

export function suggestNextStep(id: string): string {
  return (
    NEXT_STEPS[id] ??
    "Define a small, time-boxed pilot with clear success metrics and an executive sponsor before scaling."
  );
}

export function relevantInitiatives(selected: number[]): Initiative[] {
  const ids = new Set<string>();
  selected.forEach((p) => (MAPPING[p] ?? []).forEach((id) => ids.add(id)));
  return INITIATIVES.filter((i) => ids.has(i.id));
}

export function suggestFromText(text: string): number[] {
  const lower = text.toLowerCase().trim();
  const scores = Object.entries(KEYWORDS).map(([key, words]) => {
    const hits = words.reduce((acc, w) => acc + (lower.includes(w) ? 1 : 0), 0);
    return [Number(key), hits] as const;
  });
  return scores
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);
}
