# Bilingual Layout System

> Complementa `brand/06-bilingual-rules.md` com regras específicas de layout/componente para o sistema social.

## Regra padrão: arte separada por idioma

Cada peça social é renderizada duas vezes — uma vez com dados PT-BR, uma vez com dados EN-US — a partir do **mesmo componente de layout**. O componente precisa ser testado com o texto mais longo esperado nos dois idiomas (ver limites em `brand/06-bilingual-rules.md`) antes de ser aprovado.

## Como o componente deve tolerar expansão de texto

- Título: usar `font-size` fluido/responsivo ao comprimento do texto (reduzir automaticamente se ultrapassar limite, nunca deixar vazar da safe zone)
- Corpo: altura de bloco de texto não fixa — o container cresce, mas nunca invade a safe zone inferior
- CTA: texto do botão deve ter largura mínima fixa e permitir crescimento horizontal limitado antes de quebrar linha

Ver implementação de referência em `studio/src/components/` (o componente de canvas usa `--safe-margin-*` dos tokens e testa overflow em tempo real).

## Exceção: layout bilíngue no mesmo asset

Só se aplica quando:
1. Há razão estratégica clara (ex.: card de glossário PT→EN, conteúdo para audiência mista que consome os dois idiomas)
2. Espaço comprovadamente suficiente sem comprometer legibilidade (testar com `studio/`)

Quando essa exceção é usada:
- Idiomas devem ter hierarquia visual clara (um idioma primário, um secundário — nunca peso visual idêntico, que confunde qual é a leitura principal)
- Nunca comprimir os dois idiomas na mesma frase/bloco de texto — cada idioma ocupa seu próprio bloco completo

## O que nunca fazer

- Traduzir dentro do mesmo balão de texto separado por barra (`PT / EN`) em corpo de legenda — isso quebra o ritmo de leitura e o layout
- Usar a versão EN como "legenda menor" abaixo da PT por padrão — isso não é o padrão do sistema (ver exceção acima para os casos raros em que layout bilíngue é justificado)
