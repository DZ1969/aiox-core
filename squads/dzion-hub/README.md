# Dzion Hub — Company OS (Phase 1)

> Núcleo mínimo de um AI-First Company Operating System: governança de
> contexto, prevenção de invenção/duplicação, e o primeiro squad funcional
> (Branding). Construído para acumular conhecimento entre sessões sem
> multiplicar erros.

**Version:** 0.1.0 | **Created:** 2026-08-03

## Por que este squad existe

Este squad implementa a Fase 1 do AIOX Company OS para o Dzion Hub: a menor
fundação que (1) funciona, (2) pode ser testada, (3) preserva conhecimento,
(4) reduz alucinação, (5) permite evolução, (6) não inventa fatos para
parecer completa. Ele **não** contém os "sete departamentos" de uma empresa
inteira — isso é deliberado (ver `decisions/decision-log.md` e
`config.yaml` → `roadmap_not_yet`).

## Arquitetura do Squad

```
                    Axis (Governança / Context Engineering)
                       aiox-chief-architect [Tier 0]
                                  |
                                  v
                    Norte (Estratégia de Marca)
                       brand-chief [Tier 1]
```

| Tier | Agent | Codename | Foco |
|------|-------|----------|------|
| 0 | aiox-chief-architect | Axis 🧭 | Governança, engenharia de contexto, anti-invenção, anti-duplicação, ROI de complexidade |
| 1 | brand-chief | Norte 🎯 | Posicionamento, diferenciação, arquétipos, voz, sistema de mensagens |

Nenhum agente aqui carrega biografia inventada como fonte de autoridade —
ver a seção `mission` / `limits` de cada `agents/*.md`. Autoridade vem da
qualidade do raciocínio, critérios de decisão e quality gates, não de
currículo fictício.

## Quick Start

### Ativar o orquestrador de governança
```
@dzion-hub:aiox-chief-architect
```

### Ativar o Brand Chief diretamente
```
@dzion-hub:brand-chief
```

## Componentes

| Tipo | Path | Propósito |
|---|---|---|
| Agente (Tier 0) | `agents/aiox-chief-architect.md` | Governança e engenharia de contexto |
| Agente (Tier 1) | `agents/brand-chief.md` | Estratégia de marca |
| Task | `tasks/create-context.md` | Transforma material bruto em contexto modular e classificado |
| Task | `tasks/build-brand-system.md` | Constrói/revisa o sistema de marca |
| Checklist | `checklists/context-quality-gate.md` | Gate de qualidade para qualquer arquivo em `context/` |
| Checklist | `checklists/brand-quality-gate.md` | Gate de qualidade para o sistema de marca |
| Index | `context/_index.md` | Fonte única de verdade sobre o que existe em `context/` |
| Log | `decisions/decision-log.md` | Toda decisão estrutural/posicionamento, com alternativas rejeitadas e motivo |

## Estado do Contexto (Fase 1)

Todas as 7 categorias de `context/` existem como estrutura, mas estão
**vazias por design** — cada uma tem um marcador `_pending.md` explicando o
que falta e por que nada foi inventado para preenchê-la:

- `context/founder/` · `context/audience/` · `context/brands/` ·
  `context/offers/` · `context/methods/` · `context/evidence/` ·
  `context/research/`

Para popular qualquer uma delas, forneça a fonte real (conversa, transcrição,
documento) e rode `*create-context` via `aiox-chief-architect`.

## O que NÃO foi construído nesta fase (de propósito)

Ver `config.yaml` → `roadmap_not_yet`: Copy Squad, Design Squad, Growth
Squad, Sales Squad, Finance Squad, Risk Squad, `playbooks/` por
canal/formato. Esses só devem ser criados quando houver um gatilho real de
trabalho — nunca por completude antecipada.

## Testes Simulados Executados na Criação

1. **Transformar uma conversa em contexto** — `tasks/create-context.md`
   percorrido mentalmente contra um input fictício: classificação, fontes e
   bloqueio de invenção funcionam como especificado.
2. **Iniciar um manual de marca** — `tasks/build-brand-system.md` bloqueia
   corretamente no modo `build` quando `context/audience/` e
   `context/offers/` estão vazios, exigindo público/problema nomeados
   (mesmo que como hipótese) antes de prosseguir.
3. **Detectar um claim sem evidência** — `checklists/brand-quality-gate.md`
   item 3 (Evidence Discipline) marca FAIL para qualquer claim público sem
   classificação de evidência.

Onde isso pode falhar: os quality gates dependem do agente aplicá-los
honestamente — não há enforcement automático (hook/script) nesta fase.
Isso é uma lacuna conhecida, não escondida.
