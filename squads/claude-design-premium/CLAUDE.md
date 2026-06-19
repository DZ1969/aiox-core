# Claude Design Premium Protocol

You operate inside **Claude Design Web** under a document-backed premium UI protocol.

Runtime contract: [`docs/canvas-runtime.md`](docs/canvas-runtime.md) · Script pipeline:
[`docs/script-pipeline.md`](docs/script-pipeline.md) · Honest limits: [`LIMITATIONS.md`](LIMITATIONS.md)

Claude Design Web has a fixed, closed set of native product Skills. This starter does not install new
native Skills. Instead, this root `CLAUDE.md` acts as the bootstrap file, and the `.skill.md` files
are **documental procedures**: reusable operating instructions that you apply when relevant. Apply
only the procedures relevant to the current task  -  **except** `harness-auto-setup`, which always
runs first when the harness is unconfigured (see below).

## Auto-bootstrap gate (HIGHEST PRIORITY  -  runs before everything)

**On every new conversation, before interpreting the user's message**, check whether the harness
needs setup. If yes, run `scripts/context-signals.mjs` logic, then
`skills/harness-auto-setup.skill.md` **immediately and completely**  -  do not ask permission, do not
wait for a magic keyword. Execute the script pipeline in
[`docs/script-pipeline.md`](docs/script-pipeline.md), not a hand-waved summary.

### Setup needed when ANY of these is true

- `styles.css` contains `UNBOUND`
- `BOUND_DS.json` is missing or has no `namespace`
- `DESIGN.md` contains `CDP:UNCONFIGURED` or §1 template filler (`Describe the product's visual register`)
- Any root `*.dc.html` contains `{{DS_HELMET_BLOCK}}` or `{{BOUND_DS_`
- `BOUND_DS.json` is stale or out of sync with the live DS (`bindingSchemaStale` / `bindingOutOfSync` in `context-signals`)

### Setup complete when ALL of these pass

- `BOUND_DS.json` exists with `hostMode`, `bindingSource`, `namespace`, `root`, `components`, `globalCssPaths` and matches live DS detection
- `DESIGN.md` names the real product/DS and has no stub phrases
- `styles.css` re-exports the bound DS (`@import` lines, no `UNBOUND`)
- All `*.dc.html` helmets are patched (zero `{{` placeholders)

### What auto-setup must do (canvas  -  execute script pipeline)

Follow [`docs/script-pipeline.md`](docs/script-pipeline.md) steps 0 - 4 in order:

1. **`context-signals.mjs`**  -  inventory health; confirm `needsAutoSetup`
2. **`detect-bound-ds.mjs`** - resolve binding (`builder` root or `consumer` `_ds/<bundle>/`)
3. **`extract-ds-voice.mjs`**  -  derive communication/voice from DS readme
4. **`bootstrap-harness.mjs`**  -  write `BOUND_DS.json`, `styles.css`, `ds-helmet.snippet.html`; materialize design-system DC scaffold + `.cdp/showcase-brief.json`
5. **`personalize-dc.mjs`**  -  bootstrap seam (no-op today; scaffold is fully written in step 4)
6. **Synthesize** full `DESIGN.md` (skill Phase 5)
7. **Report** `HARNESS AUTO-SETUP` + `SCRIPTS APPLIED`, then answer the user's message

If the user only said "oi", "olá", or anything vague, finish setup and ask: *qual é a primeira
superfície que você quer desenhar?*

Inside the canvas, **read and execute** `scripts/*.mjs`  -  apply their JavaScript logic to project
files and write outputs. Do not ask the user to run shell commands. Local `node scripts/*.mjs` mirrors
the same logic for maintainers (see § Deterministic script pipeline).

**Never skip auto-setup** because the user's message sounds unrelated. Greetings, typos, one-word
prompts, **`GO`**, `activation-prompt.md`, and "começa" all trigger setup when the harness is unbound.

### Activation flow (human)

Same harness, two host projects:

**Consumer** (app/landing/deck consuming an exported DS):

1. Upload ZIP to a Claude Design project that already has `_ds/<bundle>/`.
2. Copy harness files -> project root (keep `_ds/`).
3. New tab -> **`GO`**.

**Builder** (Design System project under construction):

1. Upload ZIP to the DS project root (already has `_ds_manifest.json` + `_ds_bundle.js` + tokens).
2. Copy harness files -> project root (do not nest the DS inside `_ds/`).
3. New tab -> **`GO`**.

Auto-setup detects `hostMode` (`builder` | `consumer`) and writes the same artifacts in both cases.

## Core context

- `CLAUDE.md`: workflow, routing, and behavior rules (this file).
- **Host DS** (not shipped with the harness):
  - **Builder:** `_ds_manifest.json`, `_ds_bundle.js`, token CSS at project root (`hostMode: builder`).
  - **Consumer:** same files under `_ds/<bundle>/` (`hostMode: consumer`).
- `BOUND_DS.json`: **generated cache** from bootstrap (`hostMode`, `bindingSource`, component inventory,
  `tokenCount`, slim `voice`). Full token values stay in manifest/CSS - not duplicated in the binding cache.
  If missing, run auto-setup or read manifest from the detected host path.
- `DESIGN.md`: visual identity, layout principles, and aesthetic constraints - the *interpretive*
  layer for the bound DS. When it disagrees with token CSS, the CSS wins - flag the mismatch.
- `styles.css`: root canvas entry that **re-exports the bound DS token graph**. Ships UNBOUND in the
  ZIP; populated by bootstrap after the host DS is present. Never put token values here - edit them in
  the bound DS.
- `ds-helmet.snippet.html`: generated copy-paste `<helmet>` block (after bootstrap). Before bootstrap,
  use `{{DS_HELMET_BLOCK}}` in DC templates or build from `_ds_manifest.json` -> `globalCssPaths`.
- **Design-system DC** (`design-system.dc.html`): bootstrap writes **scaffold +** `.cdp/showcase-brief.json`
  from `scripts/templates/intro.dc.html`. The **active model** assembles the full customized vitrine
  (`skills/assemble-design-system-showcase.skill.md`) - JS binds helmet/metrics/prompts; the model composes
  tokens, specimens, and every component in product voice. Copy its `<helmet>` block when starting deliverables.
- `skills/*.skill.md`: document-backed procedures for design-system enforcement, audits, polish,
  implementation review, and final checks.
- `scripts/*.mjs`: **deterministic JavaScript pipeline**  -  dependency-free (`node:fs`, `node:path`
  only, no npm). Claude reads and executes their logic in the canvas; skills pair with them in a fixed
  order ([`docs/script-pipeline.md`](docs/script-pipeline.md)). `support.js` is browser runtime for DC
  previews; `scripts/*.mjs` are the harness brain.

## Skill inventory

- `harness-auto-setup`: **mandatory on first turn** when harness is unbound  -  inventories repo,
  discovers `_ds/`, writes binding artifacts, synthesizes `DESIGN.md`, patches all DC templates.
- `brief-framing`: classifies the surface, captures missing context, and prevents premature invention.
- `design-system-guardian`: checks `DESIGN.md` + active token CSS. Almost always first.
- `visual-originality-audit`: catches generic template reflexes and category clichés.
- `ui-audit`: hierarchy, composition, rhythm, clarity, IA, and empty/loading/error states.
- `polish-phase`: microcopy, alignment, subtle motion, and perceived premium quality.
- `text-integrity-audit`: checks UI copy, docs, prompts, reports, and public text for generic wording,
  weak voice, and banned typography.
- `fivu-identity-showcase`: condenses FIVU voice/corpus/system-prompt work into one procedure for
  premium identity pages and FIVU-grade design-system showcases.
- `mobile-first-audit`: responsive behavior, breakpoints, and touch targets.
- `accessibility-audit`: contrast, semantics, keyboard, focus, and reduced motion.

Handoff / code-phase skills (not part of the canvas design loop):

- `tailwind-audit`: class quality and token adherence. Only when Tailwind/code exists.
- `framework-handoff`: component inventory and Astro/Vite/Next handoff planning after canvas direction is approved.
