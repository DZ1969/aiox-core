# Dzion Hub — Decision Log

Registro de decisões estruturais e de posicionamento do Dzion Hub. Toda
decisão relevante aqui inclui: data, decisão, alternativas rejeitadas, motivo,
e quem decidiu (humano vs. hipótese registrada por um agente aguardando
validação).

Ver `aiox-chief-architect` (responsibilities) e `brand-chief` (responsibilities)
para quando uma decisão deve ser registrada aqui.

---

## 2026-08-03 — Fundação do Dzion Hub Company OS (Fase 1)

**Decisão:** Construir o núcleo mínimo do Dzion Hub como um squad AIOX
self-contained (`squads/dzion-hub/`), reaproveitando a arquitetura de squads
já existente no framework (`squads/claude-code-mastery/` como precedente),
em vez de criar uma estrutura paralela de `context/ playbooks/ quality/
decisions/ outputs/` na raiz do repositório.

**Alternativas rejeitadas:**
1. Estrutura genérica na raiz do repo (`AIOX/CLAUDE.md`, `.claude/agents/`,
   `context/`, etc.) conforme o prompt original — rejeitada por duplicar
   diretórios que já existem no framework (`outputs/`, `governance/`) e por
   colocar conteúdo específico de uma marca/empresa dentro do roster global
   de agentes do framework (`.claude/agents/`), que é compartilhado por
   qualquer instalação do AIOX.
2. Adicionar agentes globais em `.claude/agents/aiox-chief-architect.md` e
   `.claude/agents/brand-chief.md` — rejeitada pelo mesmo motivo: não é
   conteúdo de framework, é conteúdo de projeto/empresa (L4).

**Motivo:** `CLAUDE.md` do repositório define o modelo L1-L4 (Framework vs
Project Boundary) e identifica `squads/` como camada L4 (sempre mutável,
"trabalho do projeto"). Squads existentes seguem um padrão consistente
(config.yaml, agents/, tasks/, checklists/, README.md) que já resolve
divulgação progressiva de contexto sem inventar uma segunda convenção.

**Escopo entregue nesta decisão:**
- Squad `dzion-hub` com 2 agentes (Tier 0 governança + Tier 1 branding)
- 2 tasks (create-context, build-brand-system)
- 2 quality gates (context, brand)
- `context/` com 7 categorias, todas vazias e marcadas `[PENDENTE DE
  VALIDAÇÃO]` — nenhum fato sobre a fundadora, público ou marca foi
  inventado para preencher esta fase

**Decidido por:** Axis (aiox-chief-architect), autonomamente, dentro da
autoridade de `decides_alone: "Estrutura de diretórios dentro de
squads/dzion-hub/"`. Não é uma decisão irreversível nem de conteúdo
factual — é estrutural, e pode ser revisada.

**Pendências abertas para o humano:**
- [ ] Confirmar se "Dzion Hub" é o nome definitivo da empresa/marca, ou um
  codinome de trabalho
- [ ] Fornecer a primeira fonte real para `context/founder/`,
  `context/audience/`, `context/offers/`
- [ ] Confirmar se squads futuros (Copy, Design, Growth, Sales, Finance,
  Risk) devem viver em `squads/` deste mesmo repositório (`aiox-core`) ou em
  um repositório de projeto separado
