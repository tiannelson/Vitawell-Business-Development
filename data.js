// Vitawell Animal Nutrition — Growth Strategy Briefing
// Consolidated data extracted from: Competitor Market Analysis, Sales Performance FY2023-25,
// R&D Formulation Notes, Leadership Strategy Meeting Notes, Market Research Summary.
// Fictional company data for planning-scenario use only.

const VITAWELL_DATA = {
  meta: {
    company: "Vitawell Animal Nutrition",
    title: "Growth Strategy Briefing — Consolidated Data & Insights",
    prepared: "January 2026",
    sources: "Competitor Market Analysis, Sales Performance FY2023-25, R&D Formulation Notes, Leadership Strategy Meeting Notes, Market Research Summary",
  },

  kpis: [
    { label: "FY2025 Revenue", value: "$52.0M", note: "1.5% share of $3.4B segment" },
    { label: "FY2028 Goal", value: "5.0% share", note: "~$170M target" },
    { label: "Revenue Growth (YoY)", value: "18.1%", note: "FY2025 vs FY2024" },
    { label: "Fastest Channel", value: "E-commerce/DTC", note: "+191% since FY2023" },
  ],

  executiveSummary: [
    "FY2025 revenue: $52.0M — 1.5% share of the $3.4B premium functional/therapeutic pet nutrition segment. Goal: 5.0% share (~$170M) by FY2028.",
    "Two growth levers set at the Jan 22, 2026 strategy meeting: (1) close the product-line gap with two new functional formulas, and (2) expand distribution into the South/West and the veterinary channel.",
    "Fastest-growing channels are also the most under-penetrated: E-commerce/DTC revenue is up 191% since FY2023 (now $7.9M) and Veterinary Clinics are up 55% (now $5.9M) — Independent Retailers, the historical base, grew just 0.4%.",
    "Customer survey (n=850) confirms vet recommendation (58%) and ingredient transparency (51%) outweigh price (39%) as purchase drivers for this segment — directly supporting the vet-channel investment.",
    "Two formulas are in active R&D: Joint/Mobility (target launch Q4 2026) and Senior Gut Health (target launch Q1 2027). Both close gaps identified independently by the competitor teardown and the customer survey.",
    "Biggest cross-cutting risk: single-source supply of green-lipped mussel extract (GLM), flagged by both R&D and the leadership team as a launch risk for the Joint/Mobility formula.",
  ],

  // 2.1 Segment share
  segmentShare: [
    { company: "Hill's Science Diet", revenue: 680, share: 20.0, yoyGrowth: 4.8 },
    { company: "Purina Pro Plan Veterinary Diets", revenue: 612, share: 18.0, yoyGrowth: 3.9 },
    { company: "Royal Canin Veterinary", revenue: 571, share: 16.8, yoyGrowth: 4.1 },
    { company: "Blue Buffalo Natural Vet Diet", revenue: 340, share: 10.0, yoyGrowth: 5.2 },
    { company: "Open Farm", revenue: 102, share: 3.0, yoyGrowth: 11.0 },
    { company: "Vitawell Animal Nutrition", revenue: 52, share: 1.5, yoyGrowth: 8.5 },
  ],

  // 2.2 Retail pricing
  retailPricing: [
    { company: "Blue Buffalo", pricePerLb: 3.95, vsVitawell: -0.30 },
    { company: "Purina Pro Plan", pricePerLb: 4.10, vsVitawell: -0.15 },
    { company: "Vitawell Animal Nutrition", pricePerLb: 4.25, vsVitawell: 0.00 },
    { company: "Hill's Science Diet", pricePerLb: 4.60, vsVitawell: 0.35 },
    { company: "Royal Canin", pricePerLb: 4.85, vsVitawell: 0.60 },
    { company: "Open Farm", pricePerLb: 5.20, vsVitawell: 0.95 },
  ],

  // 2.3 Product line gaps
  productGaps: [
    { formula: "Joint / Mobility Formula", vitawell: "Gap", competitors: "Hill's, Purina, Royal Canin (3 of 5)" },
    { formula: "Senior Gut Health Formula", vitawell: "Gap", competitors: "Hill's, Purina, Royal Canin (3 of 5)" },
    { formula: "Vet-Exclusive Channel", vitawell: "Gap", competitors: "Hill's, Purina, Royal Canin (3 of 5)" },
    { formula: "Weight Management Formula", vitawell: "Have", competitors: "All 5 competitors also offer — needs feature parity" },
    { formula: "DTC Subscription", vitawell: "Have", competitors: "Only Open Farm also offers — competitive strength" },
  ],

  // 2.4 SWOT
  swot: {
    strengths: [
      "400+ independent retailer relationships in the Upper Midwest",
      "~9-month R&D turnaround vs. 18-24 months for large competitors",
      "Clean-label reputation",
    ],
    weaknesses: [
      "Under 5% shelf presence outside Midwest/Northeast",
      "Marketing budget ~1/20th of top competitors",
      "Only 3 core formulas vs. 8-12 for major competitors",
    ],
    opportunities: [
      "Senior pet population growing ~6%/yr",
      "Functional nutrition trend outpacing the category",
      "DTC/subscription growing faster than retail",
    ],
    threats: [
      "Private-label price pressure",
      "Ingredient cost inflation",
      "Large competitors could close the functional-formula gap quickly given their R&D budgets",
    ],
  },

  // 3.1 Revenue by product line
  revenueByProductLine: [
    { line: "Core Adult Formula", revenue: 31.2, pctOfTotal: 60, growthVsFY23: 14.5 },
    { line: "Puppy/Kitten Formula", revenue: 7.3, pctOfTotal: 14, growthVsFY23: 12.4 },
    { line: "Senior Formula", revenue: 6.2, pctOfTotal: 12, growthVsFY23: 39.2 },
    { line: "Treats & Supplements", revenue: 7.3, pctOfTotal: 14, growthVsFY23: 25.4 },
  ],

  // 3.2 Revenue by region
  revenueByRegion: [
    { region: "Midwest", revenue: 22.2, pctOfTotal: 43, yoyGrowth: 6 },
    { region: "Northeast", revenue: 11.8, pctOfTotal: 23, yoyGrowth: 9 },
    { region: "South", revenue: 6.2, pctOfTotal: 12, yoyGrowth: 14 },
    { region: "West", revenue: 3.9, pctOfTotal: 7.5, yoyGrowth: 12 },
    { region: "Online / DTC", revenue: 7.9, pctOfTotal: 15, yoyGrowth: 31 },
  ],

  // 3.3 Revenue by channel FY2023 vs FY2025
  revenueByChannel: [
    { channel: "Independent Pet Retailers", fy2023: 26.0, fy2025: 26.1, pctChange: 0.4 },
    { channel: "Regional Grocery/Retail Chains", fy2023: 11.5, fy2025: 12.1, pctChange: 5.2 },
    { channel: "Veterinary Clinics", fy2023: 3.8, fy2025: 5.9, pctChange: 55.3 },
    { channel: "E-commerce / DTC Subscription", fy2023: 2.7, fy2025: 7.9, pctChange: 190.8 },
  ],

  // 4.1 Purchase drivers
  purchaseDrivers: [
    { driver: "Veterinarian recommendation", pctTop2: 58, note: "Strongest for senior/functional formulas" },
    { driver: "Ingredient transparency / clean label", pctTop2: 51, note: "Plays to Vitawell's existing reputation" },
    { driver: "Price", pctTop2: 39, note: "More relevant to core/everyday formulas" },
    { driver: "Life-stage / breed-specific formulation", pctTop2: 34, note: "Senior-specific demand rising fastest" },
    { driver: "Brand reputation / word of mouth", pctTop2: 22, note: "Secondary, reinforces top 2" },
  ],

  painPoints: [
    "“My dog seems hungry all the time on the current weight management formula” — matches the fiber/satiety review already underway in R&D.",
    "“Wish there was a senior formula with probiotics built in” — direct support for the Senior Gut Health project.",
    "“I'd switch brands if my vet recommended a different one” — reinforces the vet-channel investment.",
    "“Hard to find in stores near me” — most common complaint among South/West respondents, matching the known distribution gap.",
  ],

  trendNotes: [
    "Functional/therapeutic nutrition is estimated to grow 6-8%/yr vs. 3-4%/yr for the overall category.",
    "Senior pet population is growing faster than the overall pet population, driven by improved veterinary care.",
    "DTC/subscription models continue to take share from traditional retail, especially among senior/special-needs pet owners.",
    "Specialty joint-support ingredients (e.g., marine-derived) have fewer suppliers than commodity ingredients — a cost and supply-chain risk as category demand grows.",
  ],

  // 5. R&D Pipeline
  rdPipeline: [
    { project: "Joint/Mobility (“Vita-Mobile”)", status: "Trial batch #2 complete — 0.75% green-lipped mussel extract selected; shelf-life/oxidation test pending", targetLock: "Q2 2026", targetLaunch: "Q4 2026" },
    { project: "Senior Gut Health (“Vita-Senior+”)", status: "Trial batch #1 complete — pivoting to spray-on probiotic coating after 40% CFU loss during extrusion", targetLock: "Q3 2026", targetLaunch: "Q1 2027" },
    { project: "Weight Management (reformulation)", status: "Adding L-carnitine + increased fiber for satiety; no new SKU required", targetLock: "Q2 2026", targetLaunch: "Q2 2026" },
  ],

  formulationTargets: [
    "Joint/Mobility: glucosamine HCI ≥500 mg/kg, chondroitin sulfate ≥400 mg/kg, omega-3 (EPA+DHA) ≥1.2%, green-lipped mussel extract 0.75%. Cost target: +$0.35/lb vs. core adult formula.",
    "Senior Gut Health: 3-strain probiotic blend (target 50M CFU/lb at manufacture), chicory root inulin 1.5-2.0%, duck protein under evaluation (~18% cost premium vs. chicken).",
  ],

  flaggedRisks: [
    "Green-lipped mussel extract has limited suppliers — second-sourcing assigned to Supply Chain, due Q2 2026.",
    "Probiotic viability drops ~40% during kibble extrusion — spray-on coating raises cost but preserves CFU count; 90-day feeding trial planned.",
    "Fresh/frozen product line and insect-protein trials are parked in the backlog — would require new manufacturing capability.",
  ],

  // 6. Growth strategy action items
  actionItems: [
    { owner: "R&D", action: "Lock Joint/Mobility and Senior Gut Health formulations", due: "Q2 2026 / Q3 2026" },
    { owner: "Supply Chain", action: "Secure second supplier for green-lipped mussel extract", due: "Q2 2026" },
    { owner: "Marketing", action: "Draft and pilot vet-channel outreach plan (2 states)", due: "Next meeting" },
    { owner: "Sales", action: "Build South region distribution plan — 3 regional chain partnerships", due: "Q4 2026" },
    { owner: "Finance", action: "Model phased regional marketing budget (South, then West)", due: "FY2027 planning cycle" },
  ],

  openQuestions: [
    "Can GLM ingredient supply be secured at scale without hurting margins?",
    "Vet-clinic trust-building is a multi-year channel investment, not a quick win — pacing needs to be realistic.",
    "Should Vitawell make a defensive pricing move on Core Adult Formula given private-label pressure, while investing in new formulas elsewhere?",
  ],

  // 7. Consolidated recommendations
  recommendations: [
    { priority: "High", text: "Prioritize Joint/Mobility and Senior Gut Health first — this is the rare case where competitive white space, customer survey data, and R&D feasibility all point to the same two formulas." },
    { priority: "High", text: "Double down on DTC/e-commerce and veterinary clinics — the two fastest-growing channels (+191% and +55% since FY2023) are also the most under-penetrated, and vet recommendation is the #1 purchase driver in survey data." },
    { priority: "High", text: "Treat South/West distribution expansion as a prerequisite, not a parallel workstream — “hard to find in stores” is the top complaint concentrated in exactly those regions." },
    { priority: "Medium", text: "Secure second-source GLM supply before formulation lock — flagged independently by R&D and leadership as the single biggest launch risk; resolving it early de-risks the Q4 2026 launch date." },
    { priority: "Medium", text: "Fix the weight-management satiety complaint now — it's the lowest-cost, fastest win available (no new SKU, Q2 2026 rollout) and directly answers the most frequent complaint in the survey." },
    { priority: "Medium", text: "Watch private-label pricing pressure on Core Adult Formula ($31.2M, 60% of revenue) — it's the most price-exposed line (39% of buyers cite price) even as the growth story shifts toward premium functional formulas." },
  ],
};
