# Task: Create Context (Context Engineering)

**Task ID:** DZH-ARCH-001
**Version:** 0.1.0
**Command:** `*create-context`
**Orchestrator:** Axis (aiox-chief-architect)
**Purpose:** Transformar uma conversa, transcrição, pesquisa ou documento bruto em
arquivo(s) modular(es) de contexto em `squads/dzion-hub/context/`, sem deixar
conteúdo não verificado contaminar o conhecimento acumulado do Dzion Hub.

---

## Overview

```
  +-------------------+     +-------------------+     +-------------------+
  | 1. Escopo &       | --> | 2. Extrair        | --> | 3. Classificar    |
  |    Objetivo       |     |    Decisões        |     |    Afirmações     |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 4. Deduplicar     | --> | 5. Preservar      | --> | 6. Registrar      |
  |    sem perder     |     |    dados críticos  |     |    Fontes         |
  |    significado    |     |    (nomes/preços)  |     |                   |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 7. Identificar    | --> | 8. Listar         | --> | 9. Versionar &    |
  |    Conflitos      |     |    Lacunas         |     |    Datar          |
  +-------------------+     +-------------------+     +-------------------+
       |                          |
       v                          v
  +-------------------+     +-------------------+
  | 10. Auditoria de  | --> | 11. Bloquear      |
  |     Completude    |     |     conteúdo não   |
  |                   |     |     verificado     |
  +-------------------+     +-------------------+
```

---

## Inputs

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| source_material | text/file | Conversa, transcrição, pesquisa, documento fornecido pelo usuário | Yes | Deve ter origem identificável (não pode ser "lembrança" do próprio Claude) |
| target_folder | string | `squads/dzion-hub/context/{founder\|audience\|brands\|offers\|methods\|evidence\|research}/` | Yes | Deve mapear para uma categoria existente; se nenhuma servir, perguntar ao usuário (bloqueador) antes de criar categoria nova |
| objective | string | Usuário ou inferido do pedido | Yes | Deve ser verificável no arquivo final (o arquivo resolve o que promete resolver?) |

---

## Preconditions

- `squads/dzion-hub/context/_index.md` foi lido nesta sessão (para checar duplicação)
- `squads/dzion-hub/decisions/decision-log.md` foi lido nesta sessão (para checar decisão prévia sobre o mesmo tema)
- O material de origem existe e pode ser citado (path, transcrição, ou texto colado pelo usuário)

---

## Execution Phases

### Phase 1: Escopo & Objetivo
Identifique o que este contexto precisa resolver e para qual categoria (`founder/`,
`audience/`, `brands/`, `offers/`, `methods/`, `evidence/`, `research/`) ele pertence.
Se nenhuma categoria servir, isso é uma decisão estrutural — pergunte, não crie
categoria nova silenciosamente.

### Phase 2: Extrair Decisões
Separe, do material bruto, o que é **decisão explícita da fundadora** (algo que
foi dito para ser seguido) do que é **observação, contexto ou digressão**.

### Phase 3: Classificar Afirmações
Toda frase que vira contexto recebe uma etiqueta:
`[FATO CONFIRMADO]` `[DECISÃO DA FUNDADORA]` `[INFERÊNCIA]` `[HIPÓTESE]`
`[DESCONHECIDO]` `[CONTRADIÇÃO]` `[EXIGE VALIDAÇÃO]`.
Nenhuma afirmação factual entra sem etiqueta.

### Phase 4: Deduplicar sem Perder Significado
Remova repetição literal, mas nunca colapse duas afirmações que parecem
iguais mas carregam nuance diferente (ex: "público A" vs "público A, exceto
quando X" são diferentes).

### Phase 5: Preservar Dados Críticos
Nomes próprios, preços, métricas, prazos e restrições NUNCA são
parafraseados de forma que percam precisão. Copie-os literalmente.

### Phase 6: Registrar Fontes
Cada bloco de conteúdo aponta de onde veio (`[SOURCE: nome-do-arquivo-ou-conversa,
data]`). Sem fonte, a afirmação não pode ser `[FATO CONFIRMADO]` — no máximo
`[INFERÊNCIA]` ou `[EXIGE VALIDAÇÃO]`.

### Phase 7: Identificar Conflitos
Compare com `context/_index.md` e arquivos já existentes na mesma categoria.
Se houver contradição com algo já registrado, marque `[CONTRADIÇÃO]` e não
resolva sozinho — leve para o usuário ou para `decisions/decision-log.md`
como pendência.

### Phase 8: Listar Lacunas
Toda pergunta que ficou sem resposta no material de origem vira uma linha
explícita em "Lacunas Abertas" no arquivo final — nunca é preenchida por
suposição.

### Phase 9: Versionar & Datar
Todo arquivo de contexto novo ou atualizado recebe `Versão` e `Última
atualização` no topo (front-matter simples em markdown).

### Phase 10: Auditoria de Completude
Antes de finalizar, rode `squads/dzion-hub/checklists/context-quality-gate.md`
contra o arquivo produzido.

### Phase 11: Bloquear Conteúdo Não Verificado
Se o quality gate falhar, o arquivo NÃO é promovido a "pronto" — fica
marcado como rascunho e a lacuna é reportada ao usuário.

---

## Output Format

```markdown
# {Título do Contexto}

**Categoria:** {founder|audience|brands|offers|methods|evidence|research}
**Versão:** {N}
**Última atualização:** {YYYY-MM-DD}
**Fonte(s):** {lista de fontes}

## Conteúdo

{blocos de conteúdo, cada afirmação factual com etiqueta de classificação}

## Lacunas Abertas

- {pergunta ou informação faltante, explícita}

## Contradições Detectadas

- {conflito com arquivo existente, se houver, com path do arquivo em conflito}
```

Depois de gerar o arquivo, atualize `squads/dzion-hub/context/_index.md` para
referenciá-lo.

---

## Veto Conditions

- **NEVER** grava uma afirmação factual sem etiqueta de classificação.
- **NEVER** trata resumo gerado por IA (deste ou de outro chat) como fonte primária.
- **NEVER** resolve uma contradição sozinho sem levar ao usuário ou ao decision-log.
- **NEVER** cria uma nova categoria de contexto sem aprovação explícita.
- **NEVER** promove um arquivo a "pronto" sem passar pelo context-quality-gate.md.

---

## Completion Criteria

- [ ] Objetivo e categoria confirmados
- [ ] Toda afirmação factual classificada e, quando aplicável, com fonte
- [ ] Nenhuma duplicação com `context/_index.md` existente
- [ ] Dados críticos (nomes, preços, métricas, prazos) preservados literalmente
- [ ] Lacunas e contradições listadas explicitamente
- [ ] Arquivo versionado e datado
- [ ] `context-quality-gate.md` executado e aprovado
- [ ] `context/_index.md` atualizado
