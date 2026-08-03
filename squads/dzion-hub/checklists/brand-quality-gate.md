# Checklist: Brand Quality Gate

**Used by:** `tasks/build-brand-system.md` (Phase 10-11), brand-chief on any
document under `squads/dzion-hub/context/brands/`.
**Verdict options:** PASS / CONCERNS / FAIL

---

## 1. Foundation Before Style

- [ ] A named target audience exists (fact or explicitly labeled hypothesis)
- [ ] A named central problem exists (fact or explicitly labeled hypothesis)
- [ ] Archetype, personality, and voice were derived *after* positioning was
      closed — not chosen first

**FAIL if:** archetype/voice were defined with no audience or problem named,
or were defined before positioning.

## 2. Real Differentiation

- [ ] Every claimed differentiator was tested against: "what if a competitor
      says this too tomorrow?" and survives
- [ ] No differentiator is a bare adjective ("innovative", "premium", "complete")
      standing in for a structural decision

**FAIL if:** the positioning's core differentiator is an adjective with no
supporting decision behind it.

## 3. Evidence Discipline

- [ ] Every public-facing claim (result, comparison, promise) has an evidence
      classification: proven / to-be-proven with a plan / unverifiable-remove
- [ ] No market research, competitor data, or audience insight appears without
      a source in `context/research/` or `context/evidence/`

**FAIL if:** an unsourced market claim or unproven public claim is present
without a `[EXIGE VALIDAÇÃO]` label.

## 4. Scope Discipline (No Overreach)

- [ ] Document does not contain finished sales/ad copy (that's Copy Squad's job)
- [ ] Document does not contain final visual assets, logos, or palettes
      (that's Design Squad's job) — only high-level visual principles derived
      from positioning
- [ ] No audience research was invented to fill a gap

**FAIL if:** the document oversteps into Copy or Design execution instead of
strategy.

## 5. Coherence

- [ ] Offer, communication, and (if present) visual guidelines were cross-checked
- [ ] Every inconsistency found is listed explicitly, not smoothed over

**FAIL if:** a known inconsistency between offer/communication/visual is not
disclosed in the output.

## 6. Traceability

- [ ] The positioning decision (and any rejected alternatives) is logged in
      `decisions/decision-log.md`
- [ ] `context/brands/` reflects the latest approved state, versioned and dated

**CONCERNS if:** content is correct but decision-log entry is missing (must be
added before session ends).

---

## Verdict

| Result | Meaning |
|---|---|
| **PASS** | All FAIL-conditions clear. Brand system promoted, decision logged. |
| **CONCERNS** | Usable internally; gaps must close before any public/external use. |
| **FAIL** | Blocked. Returned to brand-chief with the specific list of what's missing. |
