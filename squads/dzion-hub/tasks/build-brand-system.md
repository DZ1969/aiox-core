# Task: Build / Review Brand System

**Task ID:** DZH-BRAND-001
**Version:** 0.1.0
**Command:** `*build-brand-system`
**Orchestrator:** Norte (brand-chief)
**Purpose:** Desenvolver ou revisar o sistema de marca do Dzion Hub a partir
apenas do que existe em `squads/dzion-hub/context/`, produzindo um documento
de posicionamento rastreável — nunca uma lista de adjetivos inventados.

---

## Overview

```
  +-------------------+     +-------------------+     +-------------------+
  | 1. Diagnóstico    | --> | 2. Contexto de    | --> | 3. Público         |
  |                   |     |    Mercado         |     |    Prioritário     |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 4. Problema &     | --> | 5. Posicionamento | --> | 6. Proposta de    |
  |    Transformação  |     |    & Diferenciais  |     |    Valor          |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 7. Crenças &      | --> | 8. Personalidade  | --> | 9. Voz &          |
  |    Arquétipos     |     |                    |     |    Mensagens       |
  +-------------------+     +-------------------+     +-------------------+
       |                          |
       v                          v
  +-------------------+     +-------------------+
  | 10. Narrativa &   | --> | 11. Diretrizes    |
  |     Coerência     |     |     Visuais (alto  |
  |                   |     |     nível)         |
  +-------------------+     +-------------------+
```

Fluxo **unidirecional**: posicionamento vem antes de arquétipo, que vem antes
de voz. Nunca inverta — escolher arquétipo/voz antes de fechar posicionamento
é o anti-padrão mais comum neste tipo de trabalho.

---

## Inputs

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| context_brands | folder | `squads/dzion-hub/context/brands/` | Yes | Ler tudo antes de propor qualquer coisa nova |
| context_audience | folder | `squads/dzion-hub/context/audience/` | No (mas bloqueante se ausente) | Se vazio, público é `[PENDENTE DE VALIDAÇÃO]` — não inventar |
| context_offers | folder | `squads/dzion-hub/context/offers/` | No | Usado para checar coerência oferta ↔ posicionamento |
| mode | string | Usuário | Yes | `diagnose` (só avalia o que existe) ou `build` (constrói/atualiza) |

---

## Preconditions

- `squads/dzion-hub/context/_index.md` lido nesta sessão
- `squads/dzion-hub/decisions/decision-log.md` lido nesta sessão (para não recontestar decisão de posicionamento já tomada)
- Existe ao menos um problema central OU um público nomeado — ainda que como `[HIPÓTESE]`. Se nenhum dos dois existir, o modo `build` para na Phase 3/4 e reporta bloqueio.

---

## Execution Phases

### Phase 1: Diagnóstico
Liste o que já existe em `context/brands/`, `context/offers/`, `context/audience/`.
Classifique o estado atual: inexistente / parcial / completo mas não validado /
completo e validado. Não avance para construção sem esse diagnóstico.

### Phase 2: Contexto de Mercado Disponível
Use apenas o que está documentado em `context/research/` e `context/evidence/`.
Se não houver pesquisa de mercado, registre isso como lacuna — **não invente
concorrentes, tamanho de mercado ou tendências**.

### Phase 3: Público Prioritário
Extraia de `context/audience/` o público prioritário. Se ausente, marque
`[PENDENTE DE VALIDAÇÃO]` e pare aqui em modo `build` (bloqueador) — em modo
`diagnose`, apenas reporte a ausência.

### Phase 4: Problema Central & Transformação
Nomeie o problema que o público prioritário tem e a transformação que a
oferta promete. Ambos precisam ser específicos o suficiente para serem
falsificáveis (dá para testar se aconteceram ou não).

### Phase 5: Posicionamento & Diferenciais
Construa o posicionamento a partir de categoria + diferenciação + público +
problema. Teste cada diferencial com a pergunta: "e se o concorrente também
disser isso amanhã?" — se sobreviver, é diferencial real; se não, é adjetivo.

### Phase 6: Proposta de Valor
Articule o que a oferta entrega, para quem, e por que isso importa mais do
que as alternativas — sempre referenciando `context/offers/`.

### Phase 7: Crenças & Arquétipos
Só agora, com posicionamento fechado, derive as crenças da marca e o(s)
arquétipo(s) coerente(s) com esse posicionamento — nunca ao contrário.

### Phase 8: Personalidade
Defina a personalidade de marca (não confundir com a personalidade da
fundadora — marque a diferença explicitamente se as duas se sobrepõem).

### Phase 9: Voz & Mensagens
Derive identidade verbal e sistema de mensagens do posicionamento +
arquétipo + personalidade já definidos.

### Phase 10: Narrativa & Coerência
Monte a narrativa da marca e audite: oferta, comunicação e (se existirem)
diretrizes visuais contam a mesma história? Liste toda inconsistência
encontrada, mesmo que pequena.

### Phase 11: Diretrizes Visuais (alto nível)
Aponte apenas princípios de alto nível derivados do posicionamento/arquétipo
(ex: "tom visual deve reforçar X"). **Não** desenhe, não escolha paleta, não
cria logo — isso é do Design Squad, fora do escopo desta task.

---

## Output Format

```markdown
# Sistema de Marca — Dzion Hub

**Versão:** {N}
**Última atualização:** {YYYY-MM-DD}
**Modo:** {diagnose|build}

## 1. Diagnóstico
{estado atual de cada componente}

## 2. Contexto de Mercado Disponível
{apenas o que tem fonte; lacunas explícitas}

## 3. Público Prioritário
{classificação: FATO | HIPÓTESE | PENDENTE DE VALIDAÇÃO}

## 4. Problema Central & Transformação

## 5. Posicionamento & Diferenciais
{cada diferencial testado contra "e se o concorrente também disser isso?"}

## 6. Proposta de Valor

## 7. Crenças & Arquétipos

## 8. Personalidade de Marca

## 9. Voz & Sistema de Mensagens

## 10. Narrativa

## 11. Diretrizes Visuais (alto nível, não peças finais)

## Inconsistências Encontradas

## Próximos Experimentos Sugeridos
```

Depois de gerar, atualize `context/brands/` com os componentes aprovados e
registre a decisão de posicionamento em `decisions/decision-log.md`.

---

## Veto Conditions

- **NEVER** define arquétipo, personalidade ou voz antes de fechar posicionamento.
- **NEVER** inventa pesquisa de público, concorrente ou dado de mercado sem fonte.
- **NEVER** aprova um diferencial que é só um adjetivo.
- **NEVER** escreve copy final de venda dentro desta task (isso é Copy Squad).
- **NEVER** cria peça visual final dentro desta task (isso é Design Squad).
- **NEVER** aprova claim público sem evidência associada.

---

## Completion Criteria

- [ ] Diagnóstico do estado atual registrado
- [ ] Público e problema central nomeados (fato ou hipótese rotulada)
- [ ] Cada diferencial passou no teste "e se o concorrente também disser isso?"
- [ ] Arquétipo/personalidade/voz derivados do posicionamento, nesta ordem
- [ ] Todo claim carrega classificação de evidência
- [ ] Inconsistências entre oferta/comunicação/visual listadas
- [ ] `brand-quality-gate.md` executado e aprovado
- [ ] `context/brands/` e `decisions/decision-log.md` atualizados
