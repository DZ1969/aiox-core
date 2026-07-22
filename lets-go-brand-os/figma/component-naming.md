# Figma Component Naming Convention

## Padrão

```
[categoria]/[família-visual ou global]/[nome-do-componente]/[variante]
```

## Exemplos

```
template/editorial-escape/destination-slide/default
template/field-notes/route-card/with-mono-data
template/field-notes/price-source-card/missing-source   ← usado só para exemplo rejeitado
template/brand-story-ugc/product-feature/with-disclosure
component/global/cta-button/comment
component/global/cta-button/save
component/global/disclosure-tag/paid-partnership
component/global/source-date-citation/default
component/global/verdict-badge/vale
component/global/verdict-badge/nao-vale
component/global/verdict-badge/depende
style/color/travel-ink
style/color/action-green
style/text/h1-editorial
style/text/caption-data
```

## Regras

- Nomes em inglês técnico minúsculo com hífen (`kebab-case`), para compatibilidade com convenção de arquivos do resto do sistema
- Nome de cor/estilo de texto deve bater exatamente com a chave em `tokens/tokens.json` (`style/color/{token-key}`)
- Variantes de estado de erro (usadas só em página de exemplos rejeitados) sempre levam sufixo explícito (`/missing-source`, `/low-contrast`) e vivem exclusivamente na página "07 — Examples: Approved / Rejected"
- Nunca reutilizar o nome de um componente mestre para uma instância de campanha real — instâncias de campanha vivem na página "08 — Campaign Workspace" com nome de instância específico da campanha, não do template
