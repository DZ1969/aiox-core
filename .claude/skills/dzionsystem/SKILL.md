---
name: dzionsystem
description: Sistema operacional pessoal do DZION. Integra PRD Híbrido (Petrucio Framework), Neurociência Aplicada (Harvard papers) e Conteúdo Viral (Dan Koe). Ativar quando o usuário pede PRD, copy, produto, agente, squad, post viral, conteúdo, briefing ou qualquer operação de criação DZION. Gate obrigatório antes de qualquer código novo.
---

# DZION System — Skill Expandida

Sistema operacional de criação do DZION. 3 módulos integrados, ativados por contexto.

**Regra de ouro:** Toda operação de criação DZION passa pelos 3 módulos nesta ordem:
1. PRD Híbrido → clarifica O QUÊ construir
2. Neurociência → valida POR QUÊ o mercado vai comprar
3. Dan Koe → define COMO distribuir o conteúdo

---

## MÓDULO 1 — PRD HÍBRIDO (Framework Petrucio)

### Ativação
Ativar quando: novo agente, novo squad, novo produto, nova feature, novo briefing. **Qualquer criação começa aqui.**

### Detecção Automática: MVP vs Feature

Antes de qualquer elicitação, classificar automaticamente:

| Sinal | MVP | Feature |
|-------|-----|---------|
| Novo produto/agente do zero | ✓ | — |
| Adicionar em produto existente | — | ✓ |
| Sem usuários ainda | ✓ | — |
| Usuários com feedback específico | — | ✓ |
| Prazo < 2 semanas | ✓ | — |
| Integração com sistema existente | — | ✓ |

**MVP → PRD completo (seções 1-8)**
**Feature → PRD Delta (seções 1, 3, 5, 7 apenas)**

### Elicitação Estruturada (máximo 5 perguntas)

Fazer EXATAMENTE estas perguntas, na ordem, parando quando tiver o suficiente:

```
P1: "O que esse [produto/agente/squad] faz em uma frase?"
P2: "Quem usa? Qual a dor principal deles?"
P3: "O que define que deu certo? (métrica ou comportamento observável)"
P4: "O que NÃO está no escopo desta versão?"
P5: "Tem alguma restrição técnica, de prazo ou de orçamento que eu preciso saber?"
```

Nunca fazer P4 e P5 se as respostas já estiverem implícitas nas anteriores.

### Template PRD — Estrutura de Pastas

```
docs/prd/
├── {produto}/
│   ├── PRD.md              ← documento principal
│   ├── EPICS-INDEX.md      ← mapa de épics
│   └── ambiguidades/
│       └── {data}-{tema}.md
```

### Template PRD.md

```markdown
# PRD: {Nome do Produto/Feature}
**Versão:** {N} | **Status:** {Draft/Validado/Em Execução} | **Data:** {YYYY-MM-DD}
**Tipo:** {MVP | Feature} | **Dono:** {DZION | Squad}

## 1. Problema
{1-2 frases. O que está quebrado ou faltando no mundo do usuário?}

## 2. Usuário-Alvo
**Quem:** {Descrição concisa}
**Dor principal:** {Comportamento atual + custo emocional/financeiro}
**Momento de compra:** {O que acontece imediatamente antes de procurar a solução?}

## 3. Solução Proposta
{O que fazemos. Sem jargão técnico. Foco no resultado para o usuário.}

## 4. Fora de Escopo (v1)
- {Item 1}
- {Item 2}

## 5. Critérios de Sucesso
| Métrica | Baseline | Meta v1 | Prazo |
|---------|----------|---------|-------|
| {KPI 1} | {valor}  | {valor} | {data} |

## 6. Épics Index
Ver EPICS-INDEX.md

## 7. Restrições
- **Técnicas:** {ou "nenhuma identificada"}
- **Prazo:** {ou "a definir"}
- **Orçamento:** {ou "a definir"}

## 8. Decisões em Aberto
Ver ambiguidades/{data}-{tema}.md
```

### Épics Index (EPICS-INDEX.md)

```markdown
# Épics Index — {Produto}

| ID | Épic | Status | Stories |
|----|------|--------|---------|
| E1 | {Nome} | {Planejado/Em execução/Done} | {N} |

## Dependências
{Mapa de dependências entre épics}

## Próximo Gate
{O que precisa estar pronto para começar E{N+1}?}
```

### Resolução de Ambiguidades

Classificar cada ambiguidade com:

- 🔴 **BLOQUEANTE** — não pode avançar sem decisão. Escalar imediatamente.
- 🟡 **IMPORTANTE** — decidir antes da próxima sprint. Documenta e agenda.
- 🟢 **COSMÉTICA** — decide qualquer um, anota e segue.

Formato do arquivo `ambiguidades/{data}-{tema}.md`:

```markdown
## Ambiguidade: {tema}
**Classificação:** 🔴/🟡/🟢
**Contexto:** {Por que isso surgiu?}
**Opções:**
  A) {opção + trade-off}
  B) {opção + trade-off}
**Decisão:** {A/B/C ou "pendente"}
**Decidido por:** {DZION | data}
```

### Red Flags — Parar e perguntar se:

- PRD tem mais de 3 objetivos para v1 → cortar
- "Usuários" não está definido → perguntar P2 de novo
- Nenhuma métrica de sucesso → a feature não pode ser validada, bloquear
- Prazo impossível detectado → sinalizar 🔴 antes de prosseguir
- Feature sem dono claro → designar antes de criar story

---

## MÓDULO 2 — NEUROCIÊNCIA APLICADA (Harvard Papers)

### Base Científica
Princípios extraídos de pesquisas em neurociência cognitiva (Harvard) traduzidos em regras operacionais para produto e copy DZION.

### Princípios Fundamentais → Aplicações Diretas

#### Modularidade Cerebral → Arquitetura de Squads

O cérebro não é monolítico — processa em módulos especializados que se coordenam.

**Aplicação DZION:**
- Cada agente do squad tem **1 responsabilidade dominante** (sem sobreposição)
- Handoffs são explícitos, não implícitos (como sinapses entre módulos)
- Squads > 7 agentes perdem coerência (limite de working memory)
- Validação: cada agente deve completar "Eu sou responsável por X e APENAS X"

#### Plasticidade Neural → Promessas com Base Científica

O cérebro muda fisicamente com experiência repetida — mas precisa de intensidade suficiente.

**Aplicação DZION em copy:**
- Promessa de transformação deve especificar **prazo** (cérebro precisa de horizonte temporal)
- Repetição com variação > repetição idêntica (não repita o mesmo claim na mesma peça)
- Copy que ativa 3+ sentidos (visual, auditivo, cinestésico) retém 65% mais
- Template: "Em {X dias/semanas}, você vai {verbo concreto} {resultado específico} sem {objeção principal}"

#### Emergência Neural → Posicionamento de Transformação

Propriedades emergentes surgem de interações simples — o todo é mais que a soma.

**Aplicação DZION:**
- Produto/agente não vende funcionalidades — vende o **estado emergente**
- Exemplo errado: "Nosso agente cria PRDs automaticamente"
- Exemplo certo: "Você para de perder semanas em briefings e começa a lançar"
- Posicionamento: descrever o estado DEPOIS da transformação, não as features

#### Déficits Seletivos → Diagnóstico Preciso de Cliente

Lesões cerebrais específicas eliminam capacidades específicas — provando modularidade.

**Aplicação DZION em diagnóstico:**
- Identificar qual módulo do cliente está "lesionado" (qual habilidade específica falta)
- Não tratar sintomas, tratar o déficit raiz
- Diagnóstico template:
  ```
  "O que você consegue fazer bem hoje?"    → mapear capacidades intactas
  "Onde você trava repetidamente?"          → identificar déficit específico
  "Quando isso trava, o que você faz?"      → resposta compensatória atual
  → Sua solução endereça o déficit, não a compensação
  ```

### Os 3 Arquétipos DesRuptura™ (Base Junguiana + Neurofisiologia)

Cada arquétipo ativa circuitos neurais diferentes. Usar o arquétipo errado = mensagem ignorada.

#### Arquétipo 1 — GATSBY (O Aspirante)
**Circuito ativado:** Dopamina/recompensa antecipada
**Identidade:** "Eu tenho potencial mas ainda não cheguei lá"
**Dor:** Distância entre quem sou e quem quero ser
**Hook:** Visão de chegada + prova de que é possível para alguém como ele
**Copy padrão:** "Você já tem tudo que precisa. Só falta o sistema."

#### Arquétipo 2 — FANTASMA (O Invisível)
**Circuito ativado:** Ameaça/sobrevivência (amígdala)
**Identidade:** "Eu trabalho muito mas ninguém me vê"
**Dor:** Irrelevância, esforço sem reconhecimento
**Hook:** Validação do esforço + caminho para visibilidade
**Copy padrão:** "Você não está errado. O problema é que ninguém te ensinou a ser visto."

#### Arquétipo 3 — MLK (O Líder com Missão)
**Circuito ativado:** Ocitocina/propósito (córtex pré-frontal + sistema límbico)
**Identidade:** "Eu tenho uma visão que vai além de mim"
**Dor:** Falta de impacto, missão sem escala
**Hook:** Legitimação da missão + alavanca para multiplicar
**Copy padrão:** "Sua mensagem merece mais do que um post. Ela merece um movimento."

**Diagnóstico de arquétipo (3 perguntas):**
```
1. "Quando você pensa no seu trabalho, o que mais te motiva?" → Gatsby=resultado próprio, Fantasma=reconhecimento, MLK=impacto coletivo
2. "O que mais te frustra hoje?" → Gatsby=lentidão, Fantasma=invisibilidade, MLK=falta de escala
3. "Como você se descreveria para alguém que nunca te viu trabalhar?" → Gatsby=potencial, Fantasma=esforço, MLK=propósito
```

### Validação Neurocientífica de Copy

Antes de publicar qualquer copy DZION, checar:

- [ ] Ativa arquétipo correto? (não misturar arquétipos na mesma peça)
- [ ] Promessa tem prazo específico?
- [ ] Descreve estado emergente (não features)?
- [ ] Diagnóstico do déficit raiz (não do sintoma)?
- [ ] Hook nos primeiros 3 segundos (limite de atenção pré-frontal)?

---

## MÓDULO 3 — CONTEÚDO VIRAL (Dan Koe System)

### Os 3 Arquétipos de Post

Toda peça de conteúdo DZION é um destes 3:

| Arquétipo | Função | Gatilho Principal |
|-----------|--------|------------------|
| **PENSAMENTO** | Mudar crença/perspectiva | Curiosidade + dissonância |
| **SISTEMA** | Ensinar método/framework | Utilidade + autoridade |
| **HISTÓRIA** | Criar conexão/prova | Identidade + emoção |

Regra de distribuição: 50% Pensamento / 30% Sistema / 20% História

### Estrutura de 5 Partes (Todo Post)

```
[1] HOOK (linha 1-2)
    → Afirmação controversa OU pergunta que incomoda OU número surpreendente

[2] TENSÃO (linha 3-5)
    → Aprofunda o conflito. Por que isso importa AGORA?

[3] REFRAME (linha 6-10)
    → A virada. A perspectiva que ninguém está dizendo.

[4] PROVA/SISTEMA (linha 11-18)
    → Evidência ou passo-a-passo que torna o reframe real

[5] CTA (última linha)
    → 1 ação clara. Nunca 2.
```

### Técnicas de Poder (Usar 1-2 por post)

- **Paradoxo declarado:** "Quanto mais [X esperado], menos [resultado desejado]"
- **Estatística invertida:** Usar dado conhecido mas com conclusão oposta ao óbvio
- **Continuação de thread:** Último post como premissa do próximo (cria dependência)
- **Especificidade brutal:** "47% dos criadores" > "a maioria dos criadores"
- **Nome do inimigo:** Dar nome à força que impede o resultado (não pessoa, sistema/crença)
- **Paradoxo temporal:** Fazer algo hoje que parece ineficiente mas acelera amanhã

### Geração de 9 Posts (Demanda: "me dá 9 posts sobre X")

Ao receber pedido de múltiplos posts, gerar SEMPRE na distribuição:
- 4 posts PENSAMENTO (contrarian takes sobre o tema)
- 3 posts SISTEMA (frameworks, listas, processos)
- 2 posts HISTÓRIA (caso real ou cenário específico)

Para cada post, entregar:
```
POST {N} — {ARQUÉTIPO}
HOOK: [linha de abertura]
---
[corpo completo]
---
CTA: [ação]
TÉCNICA USADA: [nome da técnica]
```

### Títulos YouTube (Fórmulas DZION)

Para cada conteúdo longo, gerar 3 opções de título:

```
OPÇÃO A — CURIOSIDADE:
"{Número} {coisa surpreendente} que {autoridade inesperada} não quer que você saiba sobre {tema}"

OPÇÃO B — RESULTADO:
"Como eu {resultado concreto} em {prazo específico} sem {objeção principal}"

OPÇÃO C — CONTRARIAN:
"Por que {crença comum} é {consequência negativa} (e o que fazer)"
```

### Thought Partner Mode

Quando ativado com "thought partner" ou "me ajuda a pensar sobre":

1. **Não dar resposta imediata.** Fazer 1 pergunta de aprofundamento.
2. Depois da resposta, **refletir de volta** o que foi dito com mais precisão.
3. Propor **3 perspectivas diferentes** sobre o problema.
4. Perguntar qual ressoa mais antes de desenvolver.

Nunca: dar solução no primeiro turno / listar 10 opções / usar bullet points na fase de exploração.

### Deep Post Outline

Para conteúdo longo (thread, artigo, newsletter):

```markdown
# DEEP OUTLINE: {tema}

## Premissa Central
{A crença que você quer instalar no leitor. 1 frase.}

## Objeção Principal
{O que o leitor vai pensar antes de concordar?}

## Arco Narrativo
1. Ponto de entrada: {onde o leitor está agora}
2. Conflito: {o que está errado com a visão atual}
3. Virada: {novo frame}
4. Prova: {evidência ou exemplo}
5. Saída: {onde o leitor estará depois}

## Seções
| # | Título da Seção | Função | ~Palavras |
|---|----------------|--------|-----------|
| 1 | {título}       | Hook   | 150       |
| 2 | {título}       | Tensão | 200       |
| 3 | {título}       | Reframe| 300       |
| 4 | {título}       | Prova  | 400       |
| 5 | {título}       | CTA    | 100       |

## CTAs por Plataforma
- **Twitter/X:** {CTA curto}
- **LinkedIn:** {CTA profissional}
- **Newsletter:** {CTA de ação}
```

### Checklist de Qualidade Viral

Antes de publicar qualquer conteúdo DZION:

- [ ] Hook passa no teste de "pararia de scrollar?" em 1 segundo?
- [ ] Tem 1 ideia central (não 3)?
- [ ] Usa especificidade brutal (números, nomes, datas)?
- [ ] Reframe é genuinamente contrarian (não óbvio)?
- [ ] CTA é 1 ação única e clara?
- [ ] Arquétipo correto para o público alvo?
- [ ] Técnica de poder presente?

---

## Ativação por Contexto

| Pedido do usuário | Módulo ativado |
|-------------------|---------------|
| "Cria PRD / briefing / especificação" | M1 obrigatório |
| "Novo agente / squad / produto" | M1 → M2 validação |
| "Copy / texto de vendas / landing" | M2 + M3 |
| "Post / conteúdo / thread" | M3 primário |
| "Me ajuda a pensar" | M3 Thought Partner |
| "9 posts sobre X" | M3 geração em lote |
| "Título para YouTube" | M3 fórmulas |
| "Diagnóstico do cliente" | M2 déficits seletivos |
| "Qual arquétipo é meu cliente?" | M2 Junguiano |
