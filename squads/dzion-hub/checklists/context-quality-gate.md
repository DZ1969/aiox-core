# Checklist: Context Quality Gate

**Used by:** `tasks/create-context.md` (Phase 10), aiox-chief-architect on any
new or edited file under `squads/dzion-hub/context/`.
**Verdict options:** PASS / CONCERNS / FAIL

A file only counts as "pronto" if it PASSes. CONCERNS means it can be used as
draft/working material but must be flagged. FAIL blocks promotion to context/.

---

## 1. Classification & Sourcing

- [ ] Every factual statement carries one of: `[FATO CONFIRMADO]`,
      `[DECISÃO DA FUNDADORA]`, `[INFERÊNCIA]`, `[HIPÓTESE]`, `[DESCONHECIDO]`,
      `[CONTRADIÇÃO]`, `[EXIGE VALIDAÇÃO]`
- [ ] Every `[FATO CONFIRMADO]` has a traceable `[SOURCE: ...]`
- [ ] No AI-generated summary (from this or another chat) is treated as a primary source
- [ ] No statement fills a gap with a plausible-sounding guess left unlabeled

**FAIL if:** any factual statement has no classification, or a `[FATO
CONFIRMADO]` has no source.

## 2. Duplication

- [ ] Checked against `context/_index.md` for an existing equivalent file
- [ ] No content block is copied verbatim into two different canonical files
- [ ] If overlap with an existing file was found, it was merged or cross-referenced,
      not duplicated

**FAIL if:** the same fact lives as independent, divergent copies in two canonical files.

## 3. Conflict Handling

- [ ] Compared against existing context in the same category
- [ ] Any contradiction found is labeled `[CONTRADIÇÃO]` and left for human/decision-log
      resolution — not silently resolved by the agent

**FAIL if:** a known contradiction was resolved unilaterally without flagging it.

## 4. Critical Data Preservation

- [ ] Names, prices, metrics, dates, and constraints are preserved verbatim,
      not paraphrased into vaguer language

**CONCERNS if:** a critical number/name was paraphrased but the original is still
recoverable from the source. **FAIL if:** it is lost entirely.

## 5. Gaps

- [ ] Every unanswered question from the source material appears explicitly
      under "Lacunas Abertas" — none were silently dropped

**FAIL if:** a known gap is missing from the file.

## 6. Versioning

- [ ] File has `Versão` and `Última atualização` (or equivalent) at the top
- [ ] `context/_index.md` was updated to reference this file

**CONCERNS if:** versioning present but index not yet updated (must be fixed
before session ends).

## 7. Structural Hygiene

- [ ] File does not mix persona definition, procedural instructions, and factual
      context in the same document (separation of concerns)
- [ ] File lives in the correct category folder (`founder/`, `audience/`,
      `brands/`, `offers/`, `methods/`, `evidence/`, `research/`)

**FAIL if:** a new context category was created without explicit approval.

---

## Verdict

| Result | Meaning |
|---|---|
| **PASS** | All FAIL-conditions clear. File promoted to context/, index updated. |
| **CONCERNS** | Usable as working draft; flagged gaps must be resolved before external use. |
| **FAIL** | Blocked. Returned to aiox-chief-architect with the specific list of what's missing. |
