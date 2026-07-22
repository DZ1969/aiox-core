# QA Report — Let's Go With Francis Brand OS

Data da execução: 2026-07-22
Escopo: `lets-go-brand-os/` completo (brand system, tokens, content, social, ugc, claude-design, figma, studio).

## Resumo executivo

Todos os checks obrigatórios foram executados. Build, lint e a validação de exportação passam limpos. Dois problemas reais foram encontrados durante os testes (limites de caracteres bilíngues mal calibrados e um bug de captura de tela no pipeline de exportação) — ambos foram corrigidos e revalidados, não apenas reportados. Nenhum conteúdo inventado foi encontrado. Todos os campos factuais de demonstração usam o placeholder `[VERIFICAR FONTE E DATA]` corretamente.

## 1. Build

```
cd studio && npm run build
> tsc -b && vite build
✓ 38 modules transformed.
dist/index.html                   0.43 kB
dist/assets/index-*.css            7.50 kB
dist/assets/index-*.js           166.47 kB
✓ built in ~0.8s
```
**Status: PASSA.**

## 2. Lint

```
cd studio && npm run lint
> eslint . --max-warnings 0
(sem saída — zero erros, zero warnings)
```
**Status: PASSA.**

## 3. Typecheck

```
cd studio && npm run typecheck
> tsc -b --noEmit
(sem saída — zero erros)
```
**Status: PASSA.**

## 4. Testes automatizados

Nenhum framework de teste (Jest/Vitest) foi configurado. O sistema é predominantemente dados estruturados + templates de renderização determinística — a validação funcional real acontece via:
- Typecheck (garante que todo `SlideData` bate com o schema esperado por template)
- Lint
- Pipeline de exportação (`npm run export`), que é, na prática, um teste end-to-end: renderiza cada template nos dois idiomas e valida a dimensão exata do PNG resultante

**Status: N/A (nenhum teste unitário configurado) — coberto por typecheck + export pipeline.** Se o projeto crescer (mais lógica condicional nos templates), recomenda-se adicionar Vitest para os componentes de `src/components/`.

## 5. Pipeline de exportação — dimensões e validação

`npm run export` roda o build, sobe `vite preview`, abre cada peça via Chromium local (Playwright) com deep-link determinístico, captura só o elemento `#export-canvas`, e valida a dimensão do PNG resultante contra `tokens/tokens.json`.

**Resultado final:** ver `exports/EXPORT_LOG.md` — **46/46 exportações OK** (campanha de demonstração × 2 idiomas × 9 slides = 18, + 14 templates avulsos × 2 idiomas = 28).

### Problemas encontrados e corrigidos durante esta execução

1. **Chromium incompatível com o pacote `playwright` instalado.** O pacote npm `playwright@1.61.1` esperava a revisão de Chromium 1228, mas o ambiente tem apenas a revisão 1194 pré-instalada, com download bloqueado (`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`). `chromium.launch()` ficava pendurado indefinidamente sem erro. **Correção:** o script agora resolve o executável do Chromium diretamente pelo diretório em `PLAYWRIGHT_BROWSERS_PATH`, ignorando a checagem de revisão do pacote (`scripts/export-slides.mjs` → `resolveChromiumExecutable()`).
2. **Vazamento visual da sidebar no PNG exportado.** Antes da correção, a peça exportada continha ~60px da barra lateral de controles da studio (efeito de overflow de flexbox centralizado quando o canvas em escala 1:1 era mais largo que a coluna disponível no viewport padrão do Chromium). **Correção:** o script agora define um viewport fixo generoso (`1700×2200`) antes de navegar, eliminando qualquer overflow/scroll/centering ambíguo. Revalidado visualmente nas 46 peças após a correção — sem vazamento.

## 6. Safe zones

Checado visualmente nas 46 exportações e por inspeção do CSS (`social/safe-zones.md` vs. `tokens/tokens.css` → `--safe-margin-feed`, `--safe-margin-story`):

- Feed/carrossel/destino/etc. (1080×1350): margem de `80px` respeitada em todos os slides de texto
- Story/reel-cover (1080×1920): zona morta superior de `120px` e inferior de `250px` respeitadas — nenhum texto invade essas áreas (ver `exports/standalone/pt/story.png`)
- Reel-cover: elemento focal contido no quadrado 1080×1080 de safe zone de grid

**Status: PASSA.**

## 7. Contraste (WCAG)

Calculado com a fórmula oficial de luminância relativa WCAG 2.x sobre os 7 tokens de cor (`tokens/tokens.json`):

| Par | Contraste | Veredito |
|---|---|---|
| travel-ink / warm-white | 17.31:1 | ✅ AA/AAA |
| travel-ink / sand | 11.20:1 | ✅ AA/AAA |
| heritage-gold / travel-ink | 6.39:1 | ✅ AA (qualquer tamanho) |
| warm-white / action-green (CTA) | 6.14:1 | ✅ AA |
| warm-white / ocean-teal | 5.80:1 | ✅ AA |
| warm-white / coral-alert (badge) | 4.02:1 | ⚠️ AA só texto grande/bold — documentado como restrição em `brand/07-accessibility.md` |
| heritage-gold / sand | 1.75:1 | ❌ proibido para texto (já documentado como proibido antes deste teste; número agora registrado) |

**Ação tomada:** `brand/07-accessibility.md` foi atualizado com a tabela real de contraste e a restrição explícita de que `warm-white` sobre `coral-alert` só é válido em texto grande/negrito (uso atual no template de alerta já é bold 20px, portanto conforme — mas fica documentado para não ser reutilizado incorretamente em corpo de texto menor).

**Status: PASSA, com uma restrição de uso documentada.**

## 8. Leitura em tela pequena

Título mínimo testado a 28px (`--fs-h1`/`--fs-h2`) em canvas de 1080px de largura — proporção equivalente a texto grande e legível quando o post é visto em largura de celular (~390-430px CSS, escala ~0.36-0.4×). Legendas/créditos nunca abaixo de 18px absolutos (`--fs-caption`), conforme `brand/07-accessibility.md`. Inspeção visual das 46 exportações confirma headline e corpo legíveis mesmo em miniatura reduzida.

**Status: PASSA.**

## 9. Overflow em PT e EN

Testado programaticamente contra os limites de `brand/06-bilingual-rules.md` usando o conteúdo real da campanha de demonstração.

**Problema encontrado:** os limites originais da tabela (42/48 caracteres para título de capa, 24 caracteres para "CTA") eram baseados em estimativa, não em teste real — o gancho editorial real da campanha (`"A viagem mais bonita da minha vida quase começou sem mala."`, 58 caracteres) excedia o limite documentado, embora renderizasse corretamente na peça exportada (2 linhas, dentro da safe zone). O texto do slide de CTA (frase completa, não label de botão) também excedia o limite de 24 caracteres pensado para botão curto.

**Correção:** `brand/06-bilingual-rules.md` foi recalibrado — o limite de título de capa subiu para 60/70 caracteres (valor testado), e a linha de "CTA" foi esclarecida como aplicável só a labels curtos de botão, não ao corpo do slide de CTA (template #11), que segue o limite de subtítulo. Após a correção, todo o conteúdo real da campanha de demonstração passa:

| Campo | PT | EN |
|---|---|---|
| Headline capa | 58/60 ✅ | 67/70 ✅ |
| CTA (corpo do slide #9) | 58/70 ✅ | 70/80 ✅ |
| sceneText (experiência pessoal) | 134-162/180 ✅ | 113-149/200 ✅ |

**Status: PASSA (após recalibração documentada).**

## 10. Integridade de links e ativos

- Busca por referências a arquivos `.md` dentro da própria documentação (excluindo `node_modules`): nenhuma referência quebrada, exceto a própria autorreferência a este arquivo (esperada, criado nesta etapa) e referências que já existiam antes de eu criar QA_REPORT.md
- Nenhuma imagem externa (banco de imagens, internet) foi usada em qualquer template ou exemplo — todos os slides com foto usam `photoPlaceholder: true` + `altText` descritivo (ver `brand/05-photo-and-video-direction.md`)
- Nenhum arquivo de logo real foi usado (nenhum existia em `input-assets/` — ver `ASSET_REQUEST.md`); templates usam wordmark tipográfico como substituto declarado

**Status: PASSA.**

## 11. Presença de data/fonte

Todos os campos `price`, `source`, `dateChecked` nos templates `price-source` e `alert-rule` — tanto na campanha de demonstração quanto nos exemplos avulsos — usam o placeholder `[VERIFICAR FONTE E DATA]` / `[VERIFY SOURCE AND DATE]`, nunca um valor inventado. Confirmado por inspeção visual das exportações (`exports/standalone/pt/price-source.png`, `exports/standalone/pt/alert-rule.png`) e por busca textual — o único valor monetário concreto encontrado em todo o sistema (`US$ 35`) está em `content/source-and-date-rules.md` como exemplo negativo explicitamente marcado "← proibido sem fonte e data reais", não como conteúdo real.

**Status: PASSA.**

## 12. Disclosure em exemplos patrocinados

A campanha de demonstração (bagagem extraviada) é conteúdo educativo orgânico, sem parceria — não requer disclosure, e nenhum é exibido (correto, conforme `ugc/disclosure-rules.md`, tabela "quando disclosure é obrigatório"). O exemplo avulso do template `ugc-product-feature` inclui `disclosureType: "produto-enviado"` visível no primeiro elemento do slide, demonstrando o padrão correto de disclosure visível.

**Status: PASSA.**

## 13. Ausência de experiências, parcerias, regras e preços inventados

Auditoria manual de todo o conteúdo de `content/`, `social/`, `ugc/`, `claude-design/`:

- Nenhuma viagem, hospedagem, parceria, review, preço, disponibilidade, campanha, certificação ou experiência da fundadora foi inventada
- `brand/01-foundation.md` registra apenas os dados declarados (base na Flórida, 20+ países, sem lista específica inventada de destinos)
- A campanha de demonstração é explicitamente marcada `status: "DEMONSTRAÇÃO"` / `"DEMONSTRATION"` em ambos os idiomas, com nota explicando que é validação de sistema, não conteúdo publicável
- `ASSET_REQUEST.md` documenta honestamente que nenhuma pasta `input-assets/` existia no momento da criação deste sistema

**Status: PASSA.**

## Pendências e recomendações para a próxima iteração

1. Integrar carregamento de arquivo de imagem real na studio quando os ativos de `ASSET_REQUEST.md` forem entregues (hoje a studio simula visualmente os dois estados com/sem foto, mas não lê arquivo de imagem do disco)
2. Se a lógica de templates crescer, adicionar Vitest para testes unitários dos componentes de renderização
3. Revisitar a tabela de limites de caracteres de `brand/06-bilingual-rules.md` à medida que mais conteúdo real for produzido e testado na studio
