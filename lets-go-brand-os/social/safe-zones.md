# Safe Zones — By Format

> Todo template em `studio/` e todo export em `exports/` deve respeitar estas zonas. QA verifica isso — ver `QA_REPORT.md`.

## Feed Portrait — 1080 × 1350

- Margem segura lateral: `80px` (`--safe-margin-feed`) de cada lado
- Margem segura superior: `80px`
- Margem segura inferior: `100px` (espaço extra para não colidir com ícones de interação do app quando visualizado no feed)
- Elemento de crédito/fonte: sempre no terço inferior, dentro da margem segura

```
┌─────────────────────────────┐
│ 80px margem                  │
│  ┌─────────────────────┐    │
│  │                      │    │
│  │   ÁREA DE CONTEÚDO   │    │
│  │      1080x1350       │    │ (canvas total)
│  │                      │    │
│  └─────────────────────┘    │
│ 100px margem inferior        │
└─────────────────────────────┘
```

## Story — 1080 × 1920

- Zona morta superior: `120px` (`--safe-margin-story`) — reservada para UI do app (relógio, ícone de perfil)
- Zona morta inferior: `250px` — reservada para caixa de resposta/sticker de compartilhamento do app
- Margem lateral: `64px`
- Nenhum texto ou elemento crítico pode entrar nessas zonas mortas

## Reel Cover — 1080 × 1920

- Mesmas zonas mortas de Story
- Zona adicional: **safe zone para grid** — como o reel cover também aparece como thumbnail quadrado no grid do perfil, o elemento principal (título, rosto, foco visual) deve estar contido no quadrado central de `1080×1080` a partir do topo da zona de conteúdo, para não ser cortado na visualização em grid
- Verificar sempre: a peça precisa funcionar tanto em 9:16 (reel) quanto no recorte quadrado central (grid)

## Carousel Cover — 1080 × 1350

- Mesmas regras de Feed Portrait
- Elemento de "swipe/arraste" (se usado) deve ficar dentro da margem inferior segura, nunca colado à borda

## Regra geral de contraste sobre foto

Sempre que texto for sobreposto a uma fotografia, aplicar `.lgwf-scrim-bottom` ou `.lgwf-scrim-top` (`tokens/tokens.css`) antes do texto, e confirmar contraste mínimo AA (ver `brand/07-accessibility.md`).
