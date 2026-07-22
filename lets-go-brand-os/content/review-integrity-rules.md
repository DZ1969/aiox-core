# Review Integrity Rules

## Princípio

A confiança da audiência na Francis é o ativo mais valioso da marca (ver `brand/02-positioning.md`). Qualquer review, recomendação de hotel/restaurante/experiência precisa preservar essa confiança — o que significa nunca sugerir uma parceria que não existe, e nunca deixar patrocínio contaminar a honestidade de uma avaliação.

## Regras

1. **Nenhuma parceria implícita sem confirmação real.** Não usar logo de hotel, companhia aérea ou marca de destino de forma a sugerir parceria/patrocínio que não foi confirmado por escrito.
2. **Review orgânico é declaradamente orgânico.** Se Francis pagou pela própria estadia/experiência e está avaliando por vontade própria, isso deve ficar claro (não precisa de disclosure de anúncio, mas não deve ser confundido com parceria).
3. **Review patrocinado tem disclosure obrigatório e visível.** Ver `ugc/disclosure-rules.md` para posicionamento e formato.
4. **Patrocínio não compra nota.** Se o produto/experiência recebeu patrocínio mas a experiência real foi ruim, a marca registra isso — ou não publica. Nunca publicar avaliação positiva forjada para agradar patrocinador.
5. **"O que evitar" é tão válido quanto "o que vale".** Um review completo, coerente com o pilar de curadoria, sempre menciona limitação ou ressalva quando ela existir — review sem nenhum ponto negativo levanta suspeita de falta de honestidade.

## Template mínimo de review

```yaml
review:
  local: ""
  tipo_de_relacao: "organico" # organico | produto-enviado | pago | parceria-confirmada
  disclosure_necessario: false # true se tipo_de_relacao != organico
  experiencia_real: true       # nunca false — não publicar review de algo não vivido
  o_que_vale: []
  o_que_evitar: []
  para_quem_e: ""
  preco_referencia: ""         # com fonte e data, ou [VERIFICAR FONTE E DATA]
```

## O que isso impede

- Publicar review de hotel/restaurante com o qual há relação comercial não declarada
- Usar linguagem que sugira endosso institucional ("parceiro oficial", "recomendado por") sem contrato/confirmação
- Deixar patrocínio silenciar uma ressalva real que a audiência precisaria saber
