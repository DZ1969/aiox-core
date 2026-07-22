# Let's Go With Francis — Brand OS

Sistema de marca completo (Brand OS), biblioteca social reutilizável e prévia funcional (studio) para a Let's Go With Francis. Este documento explica a estrutura da pasta e como operar o sistema no dia a dia.

> Local de origem: este Brand OS vive dentro do repositório `aiox-core`, em `lets-go-brand-os/`, como pasta autocontida — não depende de nenhum outro código do repositório.

## Estrutura

```text
lets-go-brand-os/
  README.md                  # este arquivo
  ASSET_REQUEST.md           # ativos reais que Francis ainda precisa fornecer
  QA_REPORT.md               # relatório de qualidade (build, lint, safe zones, contraste, etc.)
  brand/                     # fundação, posicionamento, voz, sistema visual, direção de foto, bilíngue, acessibilidade
  tokens/                    # design tokens (tokens.json + tokens.css) — fonte única de cor/tipografia/espaçamento
  content/                   # pilares de conteúdo, templates de brief, regras de integridade e linguagem
  social/                    # especificação dos 14 templates, safe zones, sistemas de carrossel/story/reel/feed, exemplos
  ugc/                       # shot list, intake de marca, regras de disclosure, matriz de deliverables
  claude-design/             # prompts prontos para auditoria, novas direções, pacote social e deck de destino
  figma/                     # checklist de arquivo-base, estrutura de páginas, convenção de nomes de componente
  studio/                    # aplicação local (Vite + React + TypeScript) de prévia dos templates
  exports/                   # saída do pipeline de exportação da studio (gerado, não editar manualmente)
```

## Por onde começar

1. Leia `brand/01-foundation.md` até `brand/03-voice-and-messaging.md` — é o que define a voz e os limites da marca
2. Leia `brand/04-visual-system.md` e abra `tokens/tokens.json` — é a paleta e tipografia que tudo usa
3. Rode a studio (`studio/`) para ver os templates funcionando (instruções abaixo)

## Como editar textos

Todo texto publicável vive em dados estruturados, não em código de design:

- Campanhas: `social/examples/*.json` (ex.: `campaign-lost-luggage.pt.json` / `.en.json`)
- Exemplos avulsos por template: `studio/src/data/standaloneExamples.ts`
- Briefs de origem (antes de virar campanha): `content/destination-brief-template.md`, `content/ugc-campaign-template.md`

Editar o JSON/TS correspondente e a studio reflete a mudança automaticamente (`npm run dev`).

## Como trocar fotos

Hoje não há fotografia real no sistema (ver `ASSET_REQUEST.md`) — todo slide usa um placeholder de cor sólida com legenda descritiva (`altText`). Para inserir foto real:

1. Colocar o arquivo em uma pasta de ativos reais (ex.: `input-assets/`, fora deste sistema, organizada por destino/data — ver `claude-design/upload-checklist.md`)
2. No dado estruturado do slide, trocar `photoPlaceholder: true` por `false` e apontar para o arquivo (a studio atual simula visualmente os dois estados com o botão "Fotografia" — a integração de arquivo real é o próximo passo de implementação ao receber os ativos)
3. Seguir `brand/05-photo-and-video-direction.md` para critério de seleção/tratamento

## Como adaptar idiomas

PT-BR e EN-US são arquivos separados, nunca tradução automática literal — ver `brand/06-bilingual-rules.md`. Para adicionar um idioma a uma campanha nova, criar `nome-da-campanha.pt.json` e `nome-da-campanha.en.json` como conteúdo nativo em cada idioma, registrar em `studio/src/data/campaigns.ts`.

## Como inserir fonte/data

Todo template que carrega preço, regra ou dado factual (`price-source`, `alert-rule`) tem campos obrigatórios `source` e `dateChecked` nos dados estruturados. Se o dado não estiver confirmado, usar literalmente o texto `[VERIFICAR FONTE E DATA]` (`[VERIFY SOURCE AND DATE]` em inglês) — nunca deixar em branco e nunca inventar. Ver `content/source-and-date-rules.md`.

## Rodando a studio localmente (Windows, macOS ou Linux)

Pré-requisito: Node.js 18+ instalado.

```bash
cd lets-go-brand-os/studio
npm install
npm run dev
```

Abra o endereço mostrado no terminal (padrão `http://localhost:5173`). Na barra lateral é possível escolher: conteúdo (campanha ou exemplos avulsos), idioma, template/slide, estado com/sem fotografia, e exibição de safe zones.

### Scripts disponíveis

| Script | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento com hot reload |
| `npm run build` | Typecheck (`tsc -b`) + build de produção (`vite build`) em `studio/dist/` |
| `npm run typecheck` | Só o typecheck, sem gerar build |
| `npm run lint` | ESLint em todo o código da studio |
| `npm run export` | Pipeline de exportação real (ver abaixo) |
| `npm run preview` | Serve o build de produção localmente |

## Exportação — o que é preview e o que é entrega final

**Visualizar na studio (`npm run dev`) nunca é exportação final.** É preview em tela, útil para revisão e QA visual.

A exportação real roda com `npm run export`, que:

1. Garante que existe um build de produção (roda `vite build` se necessário)
2. Sobe o build localmente (`vite preview`)
3. Abre cada peça (campanha + exemplos avulsos, PT e EN) via Chromium local (Playwright) usando deep-link por query string
4. Captura apenas o elemento da peça (`#export-canvas`), sem a interface da studio
5. Lê o cabeçalho do PNG exportado e **valida a dimensão exata** contra o esperado por template (`tokens/tokens.json`)
6. Escreve `exports/EXPORT_LOG.md` com o resultado peça a peça — só considerar "pronto para uso" o que está marcado `OK` nesse log

PNGs exportados ficam em `exports/{campanha-ou-standalone}/{idioma}/{arquivo}.png`.

## Handoff para Figma / Claude Design

- `figma/base-file-checklist.md` lista tudo que o arquivo-base do Figma precisa conter (paleta, tipografia, grids, safe zones, componentes de rota/preço/disclosure/CTA, exemplos aprovados/rejeitados)
- `figma/page-structure.md` e `figma/component-naming.md` definem organização e convenção de nomes
- `claude-design/` tem 5 prompts prontos para copiar e colar em sessão de Claude Design: auditoria de peça existente, novas direções de arte, pacote social completo, e deck de destino/parceria
- Antes de qualquer upload de ativo para Figma/Claude Design, seguir `claude-design/upload-checklist.md`

## Controle de qualidade

Ver `QA_REPORT.md` para o relatório de build, lint, dimensões, safe zones, contraste, leitura em tela pequena, overflow PT/EN, integridade de links/ativos, presença de fonte/data, disclosure, e ausência de conteúdo inventado.

## Limites e integridade (resumo operacional)

Este sistema não inventa viagens, hospedagens, parcerias, reviews, preços, disponibilidade, campanhas, certificações ou experiências da Francis. Nenhuma foto da internet é usada sem licença verificável. Rosto/corpo da Francis nunca são alterados. Nenhum logo de marca/hotel/destino é usado de forma a sugerir parceria inexistente. Preço, regra de entrada, visto, bagagem ou política de empresa sempre exige data e fonte quando usado em campanha real. Nada aqui foi publicado, reservado, ou enviado externamente — este é um sistema de produção interna. Ver `brand/01-foundation.md` e `content/review-integrity-rules.md` para o racional completo.
