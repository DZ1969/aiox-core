# 04 — Visual System

> Direção inicial (V1). Substituir valores apenas quando ativos oficiais da marca (guia de marca real, arquivos de logo, paleta aprovada) justificarem a mudança. Qualquer substituição deve ser registrada aqui com data e motivo.

## Paleta

| Nome | Hex | Papel |
|---|---|---|
| Travel ink | `#101417` | Base escura — texto principal, fundos escuros, contraste máximo |
| Warm white | `#FAF7F1` | Fundo principal — não usar branco puro |
| Sand | `#D8C7AE` | Superfícies e calor — cards, blocos secundários |
| Heritage gold | `#B99155` | Assinatura premium — detalhes, linhas, ícones de destaque, nunca como fundo de texto longo |
| Ocean teal | `#1C6B70` | Descoberta, localização e informação de viagem — badges de destino, mapas, rota |
| Action green | `#0B6B43` | CTA e conversão — botões de ação, links de "saiba mais" |
| Coral alert | `#C35A4A` | Avisos e urgência real — alertas, mudanças de regra, "atenção" |

### Papel de cada cor na hierarquia

A marca deve manter **forte presença de off-white, preto (travel ink) e dourado**. Teal diferencia conteúdo de viagem/localização; verde fica **reservado exclusivamente para ação/conversão** — nunca usar action green de forma decorativa, ou o CTA perde força visual quando aparece. Coral é só para alerta real (mudança de regra, erro comum, cuidado) — não usar como cor de destaque estético.

### Combinações aprovadas

- Texto travel ink sobre warm white ou sand (contraste alto, uso padrão de corpo de texto)
- Texto warm white sobre travel ink (blocos escuros, capas, stories)
- Heritage gold como linha, ícone ou palavra-chave curta sobre travel ink ou warm white — nunca como fundo de bloco de texto longo (dourado sobre dourado ou texto longo em dourado reduz legibilidade)
- Action green e coral alert sempre como acento pontual (botão, badge, ícone), nunca como fundo dominante de slide inteiro

### Combinações proibidas

- Texto pequeno em heritage gold sobre sand (contraste insuficiente)
- Action green e coral alert no mesmo componente sem hierarquia clara (confunde "aja agora" com "atenção/risco")
- Saturação adicional além da paleta para "destacar" — se algo precisa destacar, use hierarquia tipográfica ou espaço, não uma cor nova

## Tipografia

| Uso | Fonte primária | Fallback | Categoria |
|---|---|---|---|
| Títulos editoriais | Fraunces | Georgia | serif |
| Corpo, legenda visual, CTA | DM Sans | Arial | sans-serif |
| Dados de rota / info compacta | IBM Plex Mono | monospace | monospace — só quando melhora legibilidade (números, coordenadas, códigos de voo, listas técnicas) |

### Regras de uso tipográfico

- Fraunces é reservado para títulos e destaques editoriais — nunca para corpo de texto longo (serif editorial cansa em blocos grandes)
- DM Sans é o cavalo de batalha: corpo, legendas, CTAs, UI da studio
- IBM Plex Mono só entra quando o conteúdo é literalmente tabular/técnico (preço, data, código, coordenada); usar por padrão em texto narrativo é erro
- Hierarquia mínima por peça: 1 título (Fraunces), 1 corpo (DM Sans), opcionalmente 1 elemento mono

## Grid e espaçamento

Ver `tokens/tokens.json` para escala formal de espaçamento, raio de borda e sombra. Regra geral: espaço generoso, sem amontoar elementos — "quiet luxury" implica respiro visual, não densidade.

## Safe zones e formatos

Ver `social/safe-zones.md` para especificações por formato (feed, story, reel cover, carrossel).

## Logo e uso de marca

Nenhum arquivo de logo oficial foi fornecido nesta pasta ou em `input-assets/` no momento da criação deste sistema. Até que a Francis forneça arquivos de logo vetoriais (SVG/AI), todos os templates usam **wordmark tipográfico** ("Let's Go With Francis" em Fraunces, peso Medium/SemiBold) como substituto — nunca um logo inventado ou gerado. Ver `ASSET_REQUEST.md`.

## Checklist visual rápido

- [ ] Off-white, preto e dourado presentes e dominantes?
- [ ] Teal usado só para descoberta/localização, verde só para ação, coral só para alerta real?
- [ ] Contraste de texto verificado (ver `07-accessibility.md`)?
- [ ] Nenhuma cor fora da paleta de 7 tons foi introduzida sem justificativa registrada?
