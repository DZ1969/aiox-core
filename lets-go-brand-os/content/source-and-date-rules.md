# Source & Date Rules

## Regra central

Qualquer conteúdo de **preço, regra de entrada, visto, bagagem ou política de empresa** usado em campanha real deve trazer **data e fonte** quando publicado como informação factual. Se a informação não estiver verificada no momento da produção, o slide/legenda usa o placeholder `[VERIFICAR FONTE E DATA]` no lugar do dado — nunca um número ou regra inventados, e nunca a omissão silenciosa do requisito de checagem.

## Onde isso se aplica

- Slide de preço (`social/template-specifications.md` → "Slide de preço com data e fonte")
- Slide de alerta/regra (documentação, bagagem, entrada em país)
- Qualquer legenda que cite valor monetário, prazo, taxa ou norma
- Reviews que mencionem preço (ver `content/review-integrity-rules.md`)

## Formato de citação de fonte

```
[dado] — fonte: [nome da fonte oficial], consultado em [DD/MM/AAAA]
```

Exemplo de placeholder correto em conteúdo de demonstração:
```
Taxa de bagagem despachada: [VERIFICAR FONTE E DATA]
```

Exemplo do que **nunca** fazer:
```
Taxa de bagagem despachada: US$ 35   ← proibido sem fonte e data reais
```

## Validade e revalidação

- Informação de preço/regra tem prazo de validade curto. Conteúdo evergreen (posts que continuam circulando) que cite preço/regra deve ser revisado periodicamente; se não for possível confirmar que ainda é válido, o post deve ser editado, arquivado ou receber nota de atualização.
- Regras de visto e documentação mudam com frequência e têm consequência real para o leitor — tratar como a categoria de maior risco, exigindo fonte oficial (site do governo/companhia), nunca fonte secundária (outro criador, fórum, etc.).

## Checklist antes de publicar

- [ ] Todo preço citado tem fonte + data, ou está marcado `[VERIFICAR FONTE E DATA]`?
- [ ] Toda regra de entrada/visto/bagagem cita fonte oficial + data de consulta?
- [ ] Se o conteúdo é "demonstração"/exemplo, ele está claramente marcado como tal (ver campanha de exemplo em `social/examples/`)?
