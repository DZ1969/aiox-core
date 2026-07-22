# 06 — Bilingual Rules (PT-BR / EN-US)

## Princípio central

PT-BR e EN-US são tratados como **duas edições editoriais**, não uma tradução mecânica uma da outra. Cada idioma tem seu próprio arquivo de conteúdo. Componentes visuais podem ser compartilhados entre idiomas, mas precisam tolerar expansão/contração de texto sem quebrar o layout.

## Regra de arquivos separados

- Todo conteúdo publicável existe em dois arquivos: `*.pt.md`/`*.pt.json` e `*.en.md`/`*.en.json` (ou pasta `pt/` e `en/` conforme o caso)
- Nunca combinar os dois idiomas na mesma peça de arte final, exceto quando houver razão estratégica clara e espaço comprovadamente suficiente (ex.: um card de glossário rota PT→EN). Isso é exceção, não padrão.
- Ver `social/bilingual-layout-system.md` para as regras de layout que dão suporte a isso.

## Tradução vs. adaptação

- **Não fazer tradução literal** quando ela destruir naturalidade, o gancho ou o ritmo da frase
- **Preservar a mesma ideia e intenção**, adaptando a linguagem, expressões idiomáticas e humor ao idioma de destino
- Um gancho que funciona em português por causa de um trocadilho pode precisar de um gancho completamente diferente em inglês para gerar o mesmo efeito — isso é esperado e correto
- Referências culturais (feriados, comida, expressões) devem ser adaptadas ao contexto do leitor daquele idioma, não traduzidas termo a termo

## Processo de criação bilíngue

1. Definir a ideia central e o objetivo da peça (independente de idioma)
2. Escrever a versão PT-BR como conteúdo nativo completo
3. Escrever a versão EN-US como conteúdo nativo completo — não como tradução da etapa 2, mas partindo do mesmo objetivo
4. Revisar as duas versões lado a lado apenas para confirmar que a intenção e a informação factual (preço, data, fonte, regra) são idênticas
5. Nunca aprovar uma versão sem revisar a outra — ambas precisam atingir o mesmo padrão de qualidade

## Limites de caracteres recomendados por componente

| Componente | PT-BR (máx.) | EN-US (máx.) | Nota |
|---|---|---|---|
| Título de capa / gancho (feed/carrossel) | 60 caracteres | 70 caracteres | Calibrado contra teste real na studio (ver `QA_REPORT.md`) — um gancho editorial de frase completa ("A viagem mais bonita da minha vida quase começou sem mala.") ocupa ~58-67 caracteres e renderiza em 2 linhas sem estourar a safe zone |
| Subtítulo de capa | 70 caracteres | 80 caracteres | — |
| Legenda de slide (corpo) | 180 caracteres | 200 caracteres | Por slide de carrossel |
| CTA curto (botão/rodapé/chip) | 24 caracteres | 24 caracteres | Só para label curto de botão (ex.: "Salvar", "Comentar") — **não** para o corpo do slide de CTA (template #11), que segue o limite de "Subtítulo de capa" acima |
| Legenda de post (primeira linha, above the fold) | 90 caracteres | 100 caracteres | Antes do "ver mais" |
| Story (texto sobreposto) | 60 caracteres | 70 caracteres | Tela pequena, leitura rápida |

Estes limites são recomendações de design, não limite técnico rígido — mas ultrapassá-los exige teste de overflow (ver `QA_REPORT.md` e `studio/`). O primeiro teste real (campanha de demonstração `social/examples/`) já recalibrou a linha de "Título de capa" e esclareceu a diferença entre CTA-botão-curto e o corpo do slide de CTA — mantenha esta tabela viva conforme mais conteúdo real for testado.

## Data, moeda e formato

- Datas: escrever por extenso e sem ambiguidade (`22 de julho de 2026` / `July 22, 2026`) — nunca usar formato numérico ambíguo tipo `07/22/26`
- Moeda: sempre indicar `USD`, `BRL` etc. explicitamente junto do valor
- Unidades (distância, temperatura): manter no padrão do idioma de destino quando fizer diferença prática para o leitor (ex.: milhas para público EUA quando relevante), mas nunca omitir a unidade

## QA bilíngue obrigatório

Todo componente compartilhado deve ser testado com o texto mais longo esperado nos dois idiomas antes de aprovação. Ver `QA_REPORT.md` → seção "Overflow em PT e EN".
