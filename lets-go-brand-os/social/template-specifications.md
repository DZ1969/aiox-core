# Template Specifications

Especificação funcional dos 14 templates obrigatórios. Implementação editável vive em `studio/src/templates/` (dados em `studio/src/data/`). Toda dimensão e safe zone referencia `tokens/tokens.json` e `social/safe-zones.md`.

| # | Template | Canvas | Família(s) aplicável(is) |
|---|---|---|---|
| 1 | Feed portrait | 1080×1350 | Todas |
| 2 | Story | 1080×1920 | Todas |
| 3 | Reel cover (safe zone grid) | 1080×1920 | Todas |
| 4 | Capa de carrossel | 1080×1350 | Todas |
| 5 | Slide de destino | 1080×1350 | Editorial Escape |
| 6 | Slide "vale ou não vale" | 1080×1350 | Field Notes / Editorial Escape |
| 7 | Slide de roteiro/mapa funcional | 1080×1350 | Field Notes |
| 8 | Slide de preço com data e fonte | 1080×1350 | Field Notes |
| 9 | Slide de alerta/regra | 1080×1350 | Field Notes |
| 10 | Slide de experiência pessoal | 1080×1350 | Editorial Escape |
| 11 | Slide de CTA | 1080×1350 | Todas |
| 12 | UGC product feature | 1080×1350 | Brand Story/UGC |
| 13 | Hotel/restaurant review (sem parceria implícita) | 1080×1350 | Brand Story/UGC / Field Notes |
| 14 | Newsletter card | variável (ver nota) | Todas |

## 1. Feed portrait
Campos: `photo`, `headline`, `caption`, `credit`. Foto dominante, scrim se necessário, headline em Fraunces.

## 2. Story
Campos: `photo?`, `overlayText`, `sticker?`. Respeita zonas mortas de `social/safe-zones.md`.

## 3. Reel cover
Campos: `photo`, `title?`, `seriesLabel?`. Elemento focal contido no quadrado central 1080×1080 (safe zone de grid).

## 4. Capa de carrossel
Campos: `photo`, `title`, `slideCountIndicator`. Deve funcionar como thumbnail isolado.

## 5. Slide de destino
Campos: `photo`, `destinationName`, `country`, `hook`. Família Editorial Escape — foto dominante.

## 6. Slide "vale ou não vale"
Campos: `subject`, `verdict` (`vale` | `não vale` | `depende`), `criteria[]`, `forWhom`, `notForWhom`. Verdict usa cor: `action-green` para "vale", `coral-alert` para "não vale", `heritage-gold` para "depende".

## 7. Slide de roteiro/mapa funcional
Campos: `routeSteps[]` (ponto, decisão, trade-off), `mapNote?`. Mapa só entra se comunicar rota real — nunca decorativo (ver `brand/05-photo-and-video-direction.md`). Dados de trecho em `IBM Plex Mono`.

## 8. Slide de preço com data e fonte
Campos: `item`, `price`, `currency`, `source`, `dateChecked`. **Obrigatório**: se `source`/`dateChecked` ausentes, renderizar `[VERIFICAR FONTE E DATA]` no lugar do valor (ver `content/source-and-date-rules.md`). O componente de studio impõe essa regra por dado, não deixa omitir silenciosamente.

## 9. Slide de alerta/regra
Campos: `alertTitle`, `ruleText`, `source`, `dateChecked`. Cor de destaque: `coral-alert`. Mesma obrigatoriedade de fonte/data do template 8.

## 10. Slide de experiência pessoal
Campos: `photo`, `sceneText`, `lessonText`. Primeira pessoa (ver `brand/03-voice-and-messaging.md`).

## 11. Slide de CTA
Campos: `ctaText`, `ctaAction` (`comment` | `save` | `link` | `subscribe`). Cor: `action-green` — uso exclusivo de CTA real (ver `brand/04-visual-system.md`).

## 12. UGC product feature
Campos: `photo` (produto integrado à cena, não still de catálogo), `productName`, `partnerName`, `disclosureType`, `narrativeText`. `disclosureType` obrigatório e visível — ver `ugc/disclosure-rules.md`.

## 13. Hotel/restaurant review
Campos: `venueName`, `relationshipType` (`organico` | `produto-enviado` | `pago` | `parceria-confirmada`), `whatWorked[]`, `whatToSkip[]`, `forWhom`, `disclosureType?`. Nenhum logo de marca/hotel usado de forma a sugerir parceria não confirmada (ver `content/review-integrity-rules.md`).

## 14. Newsletter card
Campos: `headline`, `teaserText`, `ctaSubscribe`. Formato variável porque é consumido fora do grid social (email/link preview) — dimensão de referência 1200×630 (padrão de preview de link), mas trata-se de card, não de canvas fixo de rede social.

## Regras transversais a todos os templates

- Todo campo de crédito/data/fonte/CTA/disclosure vem de dados estruturados (`studio/src/data/`), nunca hardcoded na peça de design — ver `README.md` (seção "como editar")
- Todo template tem estado "sem fotografia" (placeholder de cor sólida) — ver `brand/05-photo-and-video-direction.md`
- Todo template é testado nos dois idiomas antes de aprovação (`brand/06-bilingual-rules.md`)
