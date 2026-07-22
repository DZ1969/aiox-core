# Examples — DEMONSTRAÇÃO

Todo conteúdo nesta pasta é **demonstração** do sistema de templates, não conteúdo pronto para publicação.

## Campanha de exemplo: "A viagem bonita que dá errado antes mesmo do embarque"

- **Tema:** bagagem extraviada, usado como contexto educativo (Field Notes / pilar "vida nos Estados Unidos")
- **Estrutura:** carrossel de 9 slides — gancho, cena, tensão, erro comum, virada, ação prática, prevenção, recapitulação, CTA (ver `social/carousel-system.md`)
- **Idiomas:** `campaign-lost-luggage.pt.json` e `campaign-lost-luggage.en.json` — arquivos separados, conteúdo adaptado (não traduzido literalmente), conforme `brand/06-bilingual-rules.md`
- **Integridade de dados:** nenhuma política, prazo ou valor de companhia aérea real foi confirmado. Todo campo factual (fonte, data, preço) usa o placeholder `[VERIFICAR FONTE E DATA]` / `[VERIFY SOURCE AND DATE]`, conforme `content/source-and-date-rules.md`. Não usar estes valores em campanha real sem substituir os placeholders por dados confirmados.
- **Fotografia:** todos os slides estão marcados `photoPlaceholder: true` com `altText` descritivo — nenhuma foto de banco de imagens foi usada (ver `brand/05-photo-and-video-direction.md`).

## Como visualizar

Abrir `studio/` (ver `README.md` na raiz do projeto) e selecionar a campanha "Lost Luggage Demo" no seletor de conteúdo — o preview carrega os dois arquivos JSON e permite alternar idioma, formato e família visual (Field Notes).

## Como reutilizar como base real

1. Copiar os dois arquivos JSON para um novo `campaignId`
2. Substituir `status: "DEMONSTRAÇÃO"` por `"REAL"` **apenas** depois que todo campo `[VERIFICAR FONTE E DATA]` tiver sido substituído por dado confirmado com fonte e data
3. Substituir `photoPlaceholder`/`altText` por fotografia real licenciada, seguindo `brand/05-photo-and-video-direction.md`
