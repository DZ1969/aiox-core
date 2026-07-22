# 07 — Accessibility

## Por que isso importa para esta marca

O público central inclui pessoas 38+ e imigrantes lendo em segunda língua — dois grupos particularmente sensíveis a baixo contraste, texto pequeno e excesso de ruído visual. Acessibilidade aqui não é apenas conformidade técnica: é coerência com "para quem esta marca fala".

## Contraste mínimo

- Texto de corpo sobre fundo: mínimo **WCAG AA** (4.5:1) para texto normal, 3:1 para texto grande (≥ 24px ou 18.66px bold)
- Valores medidos (fórmula WCAG 2.x, relative luminance) para os pares usados nos templates:

| Par (texto sobre fundo) | Contraste | Status |
|---|---|---|
| travel-ink sobre warm-white | 17.31:1 | ✅ AA/AAA, qualquer tamanho |
| warm-white sobre travel-ink | 17.31:1 | ✅ AA/AAA, qualquer tamanho |
| travel-ink sobre sand | 11.20:1 | ✅ AA/AAA, qualquer tamanho |
| heritage-gold sobre travel-ink | 6.39:1 | ✅ AA, qualquer tamanho |
| warm-white sobre action-green (CTA) | 6.14:1 | ✅ AA, qualquer tamanho |
| warm-white sobre ocean-teal | 5.80:1 | ✅ AA, qualquer tamanho |
| warm-white sobre coral-alert (badge de alerta) | 4.02:1 | ⚠️ AA só em texto grande/bold (≥18.66px bold) — **não usar em texto de corpo normal** |
| heritage-gold sobre sand | 1.75:1 | ❌ proibido para texto, contraste insuficiente |

- Combinações pré-aprovadas (ver `04-visual-system.md`):
  - Travel ink (`#101417`) sobre warm white (`#FAF7F1`) → contraste alto, uso padrão ✅
  - Warm white (`#FAF7F1`) sobre travel ink (`#101417`) → contraste alto ✅
  - Heritage gold (`#B99155`) sobre travel ink → aprovado inclusive para corpo de texto (6.39:1)
  - Warm white sobre action-green → aprovado para CTA (6.14:1)
  - Warm white sobre coral-alert → **restrito a título/badge em texto grande ou negrito** (4.02:1 fica abaixo de AA para texto normal); para corpo de texto de alerta, usar travel-ink sobre fundo claro com coral-alert só como acento/borda, não como fundo do bloco de texto
  - Heritage gold sobre sand (`#D8C7AE`) → **proibido para texto**, contraste insuficiente (1.75:1)
- Toda combinação nova de cor/fundo deve ser checada com uma ferramenta de contraste antes de entrar em template

## Tamanho mínimo de texto

| Contexto | Tamanho mínimo recomendado |
|---|---|
| Corpo de slide (carrossel, feed) | 28px em tela de 1080px de largura (~ equivalente a texto legível a 1 braço de distância no celular) |
| CTA / rodapé | 24px |
| Legenda de crédito/fonte (menor elemento da peça) | 18px — nunca menor que isso, mesmo como "informação secundária" |

## Leitura em tela pequena

Toda peça precisa ser testada como thumbnail de feed (aprox. 150×150px) e como visualização de story em tela de celular padrão. Se o título ou o elemento principal não for legível nesse tamanho, a peça falha QA. Ver `studio/` para preview em diferentes tamanhos e `QA_REPORT.md` → "leitura em tela pequena".

## Texto alternativo e legendas

- Toda peça publicável deve ter um texto alternativo (alt text) descritivo em `content/` associado à imagem, descrevendo cena e função da imagem — não apenas "foto de viagem"
- Vídeos devem ter legenda (caption) embutida sempre que houver fala relevante — muitos usuários assistem sem som

## Estrutura e hierarquia

- Um título por peça, hierarquia visual clara entre título/subtítulo/corpo
- Não depender só de cor para comunicar significado (ex.: alerta não deve ser "só vermelho" — deve ter ícone ou palavra como "Atenção")

## Movimento e animação (vídeo/reels)

- Evitar flashes rápidos ou transições estroboscópicas
- Transições devem ter duração suficiente para leitura confortável

## Checklist de acessibilidade por peça

- [ ] Contraste de texto ≥ AA na combinação usada?
- [ ] Tamanho de texto dentro do mínimo por contexto?
- [ ] Legível como thumbnail pequeno?
- [ ] Alt text/legenda registrada?
- [ ] Alerta ou informação crítica não depende só de cor?
