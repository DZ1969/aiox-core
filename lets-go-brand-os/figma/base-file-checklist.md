# Figma Base File — Checklist

> Checklist do que o arquivo-base do Figma precisa conter antes de ser considerado pronto para uso da equipe/parceiros de design.

## Conteúdo obrigatório

- [ ] **Logos** — wordmark tipográfico (até logo oficial ser fornecido, ver `ASSET_REQUEST.md`) em todas as variações de cor de fundo (sobre warm white, sobre travel ink)
- [ ] **Paleta** — as 7 cores de `tokens/tokens.json` como estilos de cor nomeados exatamente como no token (`travel-ink`, `warm-white`, `sand`, `heritage-gold`, `ocean-teal`, `action-green`, `coral-alert`)
- [ ] **Estilos de texto** — todos os estilos de `tokens/tokens.json` → `typography` (display, h1, h2, h3, body-lg, body, caption, cta) nomeados e aplicados com as três famílias tipográficas (Fraunces, DM Sans, IBM Plex Mono)
- [ ] **Grids** — grid de cada canvas (1080×1350, 1080×1920) com colunas e margens batendo com `tokens/tokens.json` (`spacing.safe-margin-feed`, `spacing.safe-margin-story`)
- [ ] **Safe zones** — componente de overlay mostrando as zonas seguras de cada formato (`social/safe-zones.md`), usado como camada de referência (não exportável)
- [ ] **Tratamento de foto** — componentes de scrim/overlay (`.lgwf-scrim-bottom`, `.lgwf-scrim-top` de `tokens/tokens.css`) como efeitos reutilizáveis
- [ ] **Cartões de rota** — componente para o template "roteiro/mapa funcional" (#7)
- [ ] **Cartões de preço** — componente para o template "preço com data e fonte" (#8), com campos de fonte/data sempre visíveis, nunca removíveis do componente
- [ ] **Cartões de fonte/data** — componente reutilizável de citação de fonte, usado em qualquer template que cite dado factual
- [ ] **Disclosure** — componente de disclosure (visível, não escondido), usado nos templates de UGC/review
- [ ] **CTA** — componente de botão/CTA em `action-green`, variantes por ação (`comment`, `save`, `link`, `subscribe`)
- [ ] **Exemplos aprovados/rejeitados** — página dedicada mostrando pelo menos 1 exemplo aprovado e 1 exemplo rejeitado por categoria de erro comum (contraste, safe zone, tom de voz, dado sem fonte)

## Organização

Ver `figma/page-structure.md` para como organizar essas peças em páginas, e `figma/component-naming.md` para convenção de nomes.
