# Destination Brief — Template

> Preencher um brief por destino antes de produzir qualquer peça de conteúdo sobre ele. Campos sem informação confirmada devem ficar marcados `[VERIFICAR FONTE E DATA]` ou `[A CONFIRMAR COM FRANCIS]` — nunca inventados. Ver `content/source-and-date-rules.md`.

```yaml
destino:
  nome: ""
  pais: ""
  data_da_viagem: ""            # quando Francis esteve lá — importante para validade da informação
  pilar_principal: ""           # repertorio-real | vida-eua | curadoria
  familia_visual_sugerida: ""   # editorial-escape | field-notes | brand-story-ugc

contexto_pessoal:
  por_que_foi: ""
  com_quem: ""
  quanto_tempo_ficou: ""

o_que_vale:
  - item: ""
    motivo: ""
  - item: ""
    motivo: ""

o_que_evitar:
  - item: ""
    motivo: ""

informacao_pratica:
  preco_referencia: ""          # valor + moeda + [VERIFICAR FONTE E DATA] se não confirmado
  documentacao_necessaria: ""   # visto/passaporte — sempre com [VERIFICAR FONTE E DATA]
  melhor_epoca: ""
  como_chegar: ""

para_quem_e: ""
para_quem_nao_e: ""

fotografia:
  disponivel: false             # true/false
  fonte: ""                     # arquivo pessoal da Francis | banco licenciado (citar licença) | placeholder
  licenca_verificada: false

ganchos_possiveis:
  - ""
  - ""

cta_sugerido: ""
```

## Como usar

1. Copiar o bloco YAML para um novo arquivo em `content/destinations/{slug}.pt.yaml` (e a versão `.en.yaml` — ver `brand/06-bilingual-rules.md`)
2. Preencher com dados reais confirmados por Francis
3. Nunca avançar para produção de arte com campos de preço/documentação sem fonte e data, ou sem o placeholder explícito
4. O brief preenchido alimenta os templates de `social/` (slide de destino, vale ou não vale, roteiro, preço, alerta)
