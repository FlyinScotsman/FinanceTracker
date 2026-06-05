# Finance Tracker — Context Handover

Read this first. It lets you continue an ongoing project with minimal token use. **Don't pull large files (the app code, spreadsheets) until a task actually needs them** — pointers are given below.

---

## Who / what
Allan: Glasgow, 46, IT contractor (inside IR35, ~£900/day umbrella PAYE), divorced, two daughters. Two strands of work:
1. **A finance-forecasting web app** (built and live — main ongoing work is small tweaks to it).
2. **An ongoing personal budgeting / "Emergency Mode" plan** (detail lives in a local folder — see below).

---

## The app (live PWA)
- Single-file HTML/JS app that forecasts a rolling bank balance from recurring + one-off money events.
- **Live URL:** https://flyinscotsman.github.io/FinanceTracker/
- **Repo:** `FlyinScotsman/FinanceTracker` (public). Files: `index.html` (the entire app), `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`.
- **Current code (fetch ONLY when a code change is needed):** https://raw.githubusercontent.com/FlyinScotsman/FinanceTracker/main/index.html
- Installed as a PWA on Allan's **iPhone 15 Pro**. Data is private — lives only in the browser's localStorage, never on the host.

### Update workflow & quirks (important)
- The served file MUST be named **`index.html`**. When giving Allan an updated app, tell him to **rename the download to `index.html` BEFORE uploading** to the repo (a wrong name = the live page won't change).
- `sw.js` is **network-first for the page**, so once live, updates appear on a normal reload. No cache-clearing needed anymore.
- Don't delete `index.html`. Don't re-read the whole app unless making a code change.

### App architecture (so you needn't re-read the code)
- State object `S = { settings, items }`, saved to localStorage key `allan_finance_tracker_v1`; Export/Import as JSON.
- `settings`: `startBalance, asAt (ISO start date), overdraft, floor, endDate (ISO; legacy "horizon" days as fallback), autoWage, autoWageAmt, autoWageWd`.
- `items[]`: `{ id, name, amount (signed £, negative = expense), kind: "monthly"|"weekly"|"oneoff", + day (1-31) | weekday (0=Sun..6) | date (ISO) }`.
- `buildForecast()` expands recurring + one-off + optional auto-wage continuation from `asAt` to `fcEnd()`, sorts by date, returns running balance, lowest point, end balance.
- Tabs: Dashboard (KPIs + SVG line chart + next 30 days), Forecast (full dated list), Schedule (templates; add/edit/delete), Add item, Big purchase (affordability check vs floor/overdraft), Settings.
- Mobile layout: tables wrap text columns at word boundaries; numbers/dates/pills stay one line; forms use `minmax(0,1fr)` grids + `min-width:0` inputs so nothing overflows.
- **Allan's real data** = `my-finance-data.json` (he has it locally; import to load his setup). **Keep it OFF the public repo.**

---

## The financial plan (headlines only — full detail in the folder)
Deliberate "Emergency Mode" (~12-18 months). It's a **cashflow/liquidity** problem, not insolvency.
- Outgoings ~£7,500/mo vs variable weekly contractor income (~£7,600/mo avg). Break-even-ish, zero buffer. Contract ends **Sep 2026**; 2-week notice either side → **income risk is continuous, not a one-off cliff.**
- **Buffer is the permanent priority.** Trigger to start clearing small debts = buffer hits ~£6k (≈1 month's essentials), NOT contract renewal.
- Zopa £15k buffer loan plan **collapsed** (credit dropped to "Fair"). **Avoid new credit applications** (hard searches hurt).
- **Van** (VW T6.1): negative equity, ~2yrs into 10yr finance, can't exit cheaply. Plan: use over summer, SORN on driveway in autumn (~£95/mo saving).
- **VM card:** £1,528 @24.9% (~£32/mo) + £15,860 @0% to Mar 2027. Pay minimum (~£204), stop new spend on it, clear the £1,528 only after buffer target; diarise Mar 2027 balance transfer.
- **Cull done:** ~£209/mo banked. Sky (£153) deferred — let it run out (~Aug/Sep) then Netflix+Disney (~£120/mo saving).
- **August 2026** = cash crunch (2 unpaid summer weeks + car insurance £412 + MOT): dips ~-£890, covered by the £5k arranged overdraft. **Christmas** = bigger risk (up to 3 unpaid weeks) → build a £6-8k Christmas fund through autumn.
- **Survival floor** = priority debts only (mortgage, council tax, utilities, food). Only the mortgage secures the house. **Keep the mortgage current** (also preserves a no-affordability-check product transfer at fix expiry). Ultimate backstop = sell house (~£57-77k equity; mortgage ~£343k, value ~£400-420k) — nuclear option.

### Full financial detail (read only if doing budgeting work)
Local folder: **`D:\Claude_Code_LOCAL\Finances`** — contains `Finances_v4.xlsx` (tabs: New Main Page, NEW ROLLING, Annual Payments, Debts) and `Emergency-Plan-Jun-Sep-2026.md`. Ask Allan to connect this folder if continuing the plan.

---

## How to continue (token-efficient)
- **App tweak:** fetch the raw `index.html`, make the change, hand back the updated file, remind Allan to rename to `index.html` + upload + reload.
- **Budgeting work:** connect `D:\Claude_Code_LOCAL\Finances` and read the plan + spreadsheet.
- Don't re-derive the plan or re-read the whole app unless the task requires it.
