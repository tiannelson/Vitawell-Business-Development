// Generic sortable / filterable table renderer + Vitawell dashboard wiring.
// No build step, no external libraries — works by opening index.html directly.

/**
 * Renders a sortable, filterable table into `container`.
 * columns: [{ key, label, type: 'string'|'number', align, format(v,row), wrap }]
 * rows: array of plain objects
 * opts: { caption, searchKeys: [colKey,...], filterKey, filterLabel, defaultSort: {key, dir}, rowClass(row) }
 */
function renderTable(container, columns, rows, opts = {}) {
  const state = {
    search: "",
    filterValue: "",
    sortKey: opts.defaultSort ? opts.defaultSort.key : null,
    sortDir: opts.defaultSort ? opts.defaultSort.dir : "asc",
  };

  const toolbar = document.createElement("div");
  toolbar.className = "table-toolbar";

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Search this table…";
  searchInput.setAttribute("aria-label", "Search table");
  searchInput.addEventListener("input", () => {
    state.search = searchInput.value.trim().toLowerCase();
    draw();
  });
  toolbar.appendChild(searchInput);

  let filterSelect = null;
  if (opts.filterKey) {
    const uniqueValues = Array.from(new Set(rows.map((r) => String(r[opts.filterKey])))).sort();
    filterSelect = document.createElement("select");
    filterSelect.setAttribute("aria-label", opts.filterLabel || opts.filterKey);
    const allOpt = document.createElement("option");
    allOpt.value = "";
    allOpt.textContent = opts.filterLabel ? `All ${opts.filterLabel}` : "All";
    filterSelect.appendChild(allOpt);
    uniqueValues.forEach((v) => {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      filterSelect.appendChild(o);
    });
    filterSelect.addEventListener("change", () => {
      state.filterValue = filterSelect.value;
      draw();
    });
    toolbar.appendChild(filterSelect);
  }

  const rowCount = document.createElement("span");
  rowCount.className = "row-count";
  toolbar.appendChild(rowCount);

  const wrap = document.createElement("div");
  wrap.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "data-table";

  if (opts.caption) {
    const caption = document.createElement("caption");
    caption.textContent = opts.caption;
    table.appendChild(caption);
  }

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col.label;
    if (col.sortable === false) {
      th.classList.add("no-sort");
    } else {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      th.appendChild(arrow);
      th.addEventListener("click", () => {
        if (state.sortKey === col.key) {
          state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
        } else {
          state.sortKey = col.key;
          state.sortDir = "asc";
        }
        draw();
      });
    }
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  wrap.appendChild(table);

  container.appendChild(toolbar);
  container.appendChild(wrap);

  const searchKeys = opts.searchKeys || columns.map((c) => c.key);

  function draw() {
    let data = rows.slice();

    if (opts.filterKey && state.filterValue) {
      data = data.filter((r) => String(r[opts.filterKey]) === state.filterValue);
    }

    if (state.search) {
      data = data.filter((r) =>
        searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(state.search))
      );
    }

    if (state.sortKey) {
      const col = columns.find((c) => c.key === state.sortKey);
      const dir = state.sortDir === "asc" ? 1 : -1;
      data.sort((a, b) => {
        let av = a[state.sortKey];
        let bv = b[state.sortKey];
        if (col && col.type === "number") {
          av = Number(av);
          bv = Number(bv);
          return (av - bv) * dir;
        }
        av = String(av ?? "").toLowerCase();
        bv = String(bv ?? "").toLowerCase();
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
        return 0;
      });
    }

    // update sort arrows
    Array.from(headRow.children).forEach((th, i) => {
      const col = columns[i];
      const arrow = th.querySelector(".arrow");
      if (!arrow) return;
      if (col.key === state.sortKey) {
        arrow.textContent = state.sortDir === "asc" ? "▲" : "▼";
      } else {
        arrow.textContent = "↕";
      }
    });

    tbody.innerHTML = "";
    if (data.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = columns.length;
      td.className = "no-results";
      td.textContent = "No rows match your search/filter.";
      tr.appendChild(td);
      tbody.appendChild(tr);
    } else {
      data.forEach((row) => {
        const tr = document.createElement("tr");
        if (opts.rowClass) {
          const cls = opts.rowClass(row);
          if (cls) tr.className = cls;
        }
        columns.forEach((col) => {
          const td = document.createElement("td");
          if (col.wrap) td.classList.add("wrap");
          if (col.align) td.style.textAlign = col.align;
          if (col.format) {
            td.innerHTML = col.format(row[col.key], row);
          } else {
            td.textContent = row[col.key];
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }

    rowCount.textContent = `${data.length} of ${rows.length} rows`;
  }

  draw();
}

function fmtMoney(v) {
  return `$${Number(v).toLocaleString(undefined, { maximumFractionDigits: 1 })}M`;
}
function fmtPct(v, withSign = false) {
  const n = Number(v);
  const sign = withSign && n > 0 ? "+" : "";
  const cls = n > 0 ? "pos" : n < 0 ? "neg" : "";
  return `<span class="${cls}">${sign}${n}%</span>`;
}
function fmtDollarSigned(v) {
  const n = Number(v);
  if (n === 0) return "baseline";
  const cls = n > 0 ? "neg" : "pos"; // higher price vs Vitawell shown as a "negative" for the competitor's affordability, kept neutral here
  const sign = n > 0 ? "+" : "";
  return `${sign}$${n.toFixed(2)}`;
}

// ---------- Section builders ----------

function buildOverview() {
  const kpiRow = document.getElementById("kpi-row");
  VITAWELL_DATA.kpis.forEach((k) => {
    const card = document.createElement("div");
    card.className = "kpi-card";
    card.innerHTML = `<div class="value">${k.value}</div><div class="label">${k.label}</div><div class="note">${k.note}</div>`;
    kpiRow.appendChild(card);
  });

  const list = document.getElementById("exec-summary-list");
  VITAWELL_DATA.executiveSummary.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    list.appendChild(li);
  });

  const recWrap = document.getElementById("overview-recommendations");
  VITAWELL_DATA.recommendations.forEach((r) => {
    const div = document.createElement("div");
    div.className = `recommendation ${r.priority.toLowerCase()}`;
    div.innerHTML = `<div class="priority">${r.priority} priority</div><div>${r.text}</div>`;
    recWrap.appendChild(div);
  });
}

function buildMarketPosition() {
  renderTable(
    document.getElementById("segment-share-table"),
    [
      { key: "company", label: "Company" },
      { key: "revenue", label: "Revenue ($M)", type: "number", align: "right", format: fmtMoney },
      { key: "share", label: "Segment Share", type: "number", align: "right", format: (v) => `${v}%` },
      { key: "yoyGrowth", label: "YoY Growth", type: "number", align: "right", format: (v) => fmtPct(v, true) },
    ],
    VITAWELL_DATA.segmentShare,
    {
      caption: "Segment Share — Premium Functional & Therapeutic Pet Nutrition (FY2025). Est. total segment size: $3,400M.",
      defaultSort: { key: "revenue", dir: "desc" },
      rowClass: (r) => (r.company === "Vitawell Animal Nutrition" ? "highlight-row" : ""),
    }
  );

  renderTable(
    document.getElementById("retail-pricing-table"),
    [
      { key: "company", label: "Company" },
      { key: "pricePerLb", label: "$ / lb", type: "number", align: "right", format: (v) => `$${v.toFixed(2)}` },
      { key: "vsVitawell", label: "vs. Vitawell", type: "number", align: "right", format: fmtDollarSigned },
    ],
    VITAWELL_DATA.retailPricing,
    {
      caption: "Retail Pricing — Premium Adult Dry Kibble (15 lb bag)",
      defaultSort: { key: "pricePerLb", dir: "asc" },
      rowClass: (r) => (r.company === "Vitawell Animal Nutrition" ? "highlight-row" : ""),
    }
  );

  renderTable(
    document.getElementById("product-gaps-table"),
    [
      { key: "formula", label: "Formula / Capability", wrap: true },
      {
        key: "vitawell",
        label: "Vitawell",
        format: (v) => `<span class="tag ${v.toLowerCase()}">${v}</span>`,
      },
      { key: "competitors", label: "Competitors Offering It", wrap: true },
    ],
    VITAWELL_DATA.productGaps,
    {
      caption: "Product Line Gaps vs. Competitors",
      filterKey: "vitawell",
      filterLabel: "status",
      defaultSort: { key: "vitawell", dir: "asc" },
    }
  );

  const swot = VITAWELL_DATA.swot;
  const map = { strengths: "swot-strengths", weaknesses: "swot-weaknesses", opportunities: "swot-opportunities", threats: "swot-threats" };
  Object.keys(map).forEach((k) => {
    const ul = document.getElementById(map[k]);
    swot[k].forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  });
}

function buildSalesPerformance() {
  renderTable(
    document.getElementById("revenue-by-product-table"),
    [
      { key: "line", label: "Product Line" },
      { key: "revenue", label: "FY2025 Revenue", type: "number", align: "right", format: fmtMoney },
      { key: "pctOfTotal", label: "% of Total", type: "number", align: "right", format: (v) => `${v}%` },
      { key: "growthVsFY23", label: "Growth vs. FY2023", type: "number", align: "right", format: (v) => fmtPct(v, true) },
    ],
    VITAWELL_DATA.revenueByProductLine,
    {
      caption: "Revenue by Product Line — FY2025",
      defaultSort: { key: "revenue", dir: "desc" },
      rowClass: (r) => (r.line === "Total Company" ? "highlight-row" : ""),
    }
  );

  renderTable(
    document.getElementById("revenue-by-region-table"),
    [
      { key: "region", label: "Region" },
      { key: "revenue", label: "FY2025 Revenue", type: "number", align: "right", format: fmtMoney },
      { key: "pctOfTotal", label: "% of Total", type: "number", align: "right", format: (v) => `${v}%` },
      { key: "yoyGrowth", label: "YoY Growth", type: "number", align: "right", format: (v) => fmtPct(v, true) },
    ],
    VITAWELL_DATA.revenueByRegion,
    {
      caption: "Revenue by Region — FY2025",
      defaultSort: { key: "revenue", dir: "desc" },
    }
  );

  renderTable(
    document.getElementById("revenue-by-channel-table"),
    [
      { key: "channel", label: "Channel", wrap: true },
      { key: "fy2023", label: "FY2023", type: "number", align: "right", format: fmtMoney },
      { key: "fy2025", label: "FY2025", type: "number", align: "right", format: fmtMoney },
      { key: "pctChange", label: "% Change", type: "number", align: "right", format: (v) => fmtPct(v, true) },
    ],
    VITAWELL_DATA.revenueByChannel,
    {
      caption: "Revenue by Customer Channel — FY2023 vs. FY2025",
      defaultSort: { key: "pctChange", dir: "desc" },
    }
  );
}

function buildCustomerInsights() {
  renderTable(
    document.getElementById("purchase-drivers-table"),
    [
      { key: "driver", label: "Driver", wrap: true },
      { key: "pctTop2", label: "% Ranking Top 2", type: "number", align: "right", format: (v) => `${v}%` },
      { key: "note", label: "Note", wrap: true },
    ],
    VITAWELL_DATA.purchaseDrivers,
    {
      caption: "Purchase Drivers — online survey of 850 dog/cat owners (55% Vitawell customers, 45% competitor-brand), fielded Jan 5-19, 2026",
      defaultSort: { key: "pctTop2", dir: "desc" },
    }
  );

  const painList = document.getElementById("pain-points-list");
  VITAWELL_DATA.painPoints.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = p;
    painList.appendChild(li);
  });

  const trendList = document.getElementById("trend-notes-list");
  VITAWELL_DATA.trendNotes.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    trendList.appendChild(li);
  });
}

function buildRnd() {
  renderTable(
    document.getElementById("rd-pipeline-table"),
    [
      { key: "project", label: "Project", wrap: true },
      { key: "status", label: "Status (as of 02/2026)", wrap: true },
      { key: "targetLock", label: "Target Lock" },
      { key: "targetLaunch", label: "Target Launch" },
    ],
    VITAWELL_DATA.rdPipeline,
    {
      caption: "R&D Pipeline",
      filterKey: "targetLaunch",
      filterLabel: "target launch",
    }
  );

  const targetsList = document.getElementById("formulation-targets-list");
  VITAWELL_DATA.formulationTargets.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    targetsList.appendChild(li);
  });

  const risksList = document.getElementById("flagged-risks-list");
  VITAWELL_DATA.flaggedRisks.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = r;
    risksList.appendChild(li);
  });
}

function buildActionItems() {
  renderTable(
    document.getElementById("action-items-table"),
    [
      { key: "owner", label: "Owner" },
      { key: "action", label: "Action Item", wrap: true },
      { key: "due", label: "Due" },
    ],
    VITAWELL_DATA.actionItems,
    {
      caption: "Growth Strategy Action Items — from the leadership strategy meeting, Jan 22, 2026",
      filterKey: "owner",
      filterLabel: "owner",
    }
  );

  const openList = document.getElementById("open-questions-list");
  VITAWELL_DATA.openQuestions.forEach((q) => {
    const li = document.createElement("li");
    li.textContent = q;
    openList.appendChild(li);
  });
}

function buildRecommendations() {
  const wrap = document.getElementById("recommendations-full-list");
  VITAWELL_DATA.recommendations.forEach((r) => {
    const div = document.createElement("div");
    div.className = `recommendation ${r.priority.toLowerCase()}`;
    div.innerHTML = `<div class="priority">${r.priority} priority</div><div>${r.text}</div>`;
    wrap.appendChild(div);
  });
}

function setupTabs() {
  const buttons = document.querySelectorAll("nav.tabs button");
  const panels = document.querySelectorAll("section.panel");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.target).classList.add("active");
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("company-name").textContent = VITAWELL_DATA.meta.company;
  document.getElementById("briefing-title").textContent = VITAWELL_DATA.meta.title;
  document.getElementById("meta-line").textContent =
    `Prepared: ${VITAWELL_DATA.meta.prepared}  |  Sources: ${VITAWELL_DATA.meta.sources}  |  Fictional company data for planning-scenario use only.`;

  setupTabs();
  buildOverview();
  buildMarketPosition();
  buildSalesPerformance();
  buildCustomerInsights();
  buildRnd();
  buildActionItems();
  buildRecommendations();
});
