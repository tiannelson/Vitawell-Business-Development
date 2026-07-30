# Vitawell Animal Nutrition — Growth Strategy Dashboard

An interactive dashboard that consolidates the Vitawell Animal Nutrition growth-strategy briefing (competitor market analysis, FY2023–25 sales performance, R&D pipeline, customer research, and leadership action items) into one filterable, sortable view — built so someone deciding where to invest next could actually use it, not just read about it.


Vitawell is a **fictional company** used for a business-strategy course scenario. All figures come from the consolidated briefing document prepared for this assignment.

## What it does

- **Overview** — top-line KPIs, executive summary, and the highest-priority recommendations at a glance.
- **Market Position** — segment share, retail pricing vs. competitors, product-line gaps, and a SWOT summary. Vitawell's own row is bolded in the comparison tables.
- **Sales Performance** — FY2025 revenue broken out by product line, region, and customer channel, with growth vs. prior year.
- **Customer Insights** — survey-based purchase drivers, recurring customer pain points, and industry trend notes.
- **R&D Pipeline** — status, target-lock date, and target-launch date for each formula in development, plus formulation targets and flagged supply/production risks.
- **Action Items** — the owner, action, and due date for each commitment made at the Jan 22, 2026 leadership strategy meeting, plus open risks/questions.
- **Recommendations** — the consolidated, cross-referenced recommendations in one place, tagged by priority.

Every data table can be:
- **Sorted** — click any column header to sort ascending/descending (click again to reverse).
- **Searched** — the search box above each table filters rows as you type.
- **Filtered** — tables with a natural category (product status, R&D target launch, action-item owner) also have a dropdown filter.

## How to run it

This is a static, dependency-free web page — no build step, no server, no install required.

1. Download or clone this repository.
2. Open `index.html` by double-clicking it (or right-click → Open With → your browser).

That's it. It runs entirely in your browser using the local files (`index.html`, `styles.css`, `app.js`, `data.js`) — no internet connection needed after download.

**Note:** GitHub's file viewer shows HTML as source code, not as a running page, so you won't see the working dashboard by clicking `index.html` on github.com. To actually use it, either:
- Download the repo (**Code → Download ZIP**, unzip, open `index.html`), or
- Clone it:
  ```bash
  git clone <this-repo-url>
  cd vitawell-dashboard
  open index.html
  ```
  (On Windows/Linux, replace `open` with double-clicking the file or `start index.html` / `xdg-open index.html`.)
- Or use **GitHub Pages** for this repo (Settings → Pages → Deploy from branch → `main` / root) to get a live hosted link.
- Click on this link https://tiannelson.github.io/Vitawell-Business-Development/ to view dashboard in a browser.
  

## Repository contents

| File | Purpose |
|---|---|
| `index.html` | Dashboard page structure (tabs, panels, table containers) |
| `styles.css` | All styling |
| `data.js` | Consolidated data extracted from the source briefing |
| `app.js` | Sortable/filterable table engine and dashboard rendering logic |
| [`docs/GRASP-brief-1.md`](docs/GRASP-brief-1.md) | GRASP brief 1 |
| [`docs/GRASP-brief-2.md`](docs/GRASP-brief-2.md) | GRASP brief 2 |
| [`docs/REFLECTION.md`](docs/REFLECTION.md) | Written reflection |

## Updating the data

All source data lives in `data.js` as plain JavaScript objects/arrays — edit the values there and reload `index.html` in your browser to see the change. No other file needs to change unless you're adding a new table or section.
