# Upload Checklist — Antes de Enviar Ativos para Claude Design / Figma

> Checklist para preparar arquivos antes de qualquer sessão de design assistido (Claude Design ou Figma). Evita retrabalho e evita que ativos não verificados entrem no pipeline visual.

## Antes de enviar

- [ ] Todo arquivo de imagem tem origem confirmada (arquivo pessoal da Francis ou banco licenciado com licença anexada)?
- [ ] Nenhuma imagem tem o rosto/corpo de Francis alterado?
- [ ] Nenhum logo de marca/hotel/destino está presente sem confirmação de parceria real?
- [ ] Arquivos estão nomeados de forma descritiva (`destino_tipo-de-shot_data.ext`), não `IMG_0001.jpg`?
- [ ] Tokens de marca (`tokens/tokens.json`, `tokens/tokens.css`) estão anexados ou referenciados na sessão?
- [ ] O documento de marca relevante (`brand/04-visual-system.md`, `brand/05-photo-and-video-direction.md`) foi revisado antes da sessão?

## Metadados mínimos por imagem

```yaml
arquivo: ""
origem: ""              # pessoal-francis | banco-licenciado | placeholder
licenca: ""             # se banco licenciado — tipo de licença
data_da_foto: ""
destino_ou_contexto: ""
uso_pretendido: ""       # qual template (ver social/template-specifications.md)
```

## Pasta de entrada

Ativos reais devem ser organizados em `input-assets/` (fora deste sistema, na raiz do projeto ou local acordado com Francis) antes do upload. Nenhum ativo deve ser inventado ou baixado da internet sem licença — ver `ASSET_REQUEST.md` para lacunas atuais.
