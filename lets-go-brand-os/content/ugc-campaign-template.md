# UGC / Campaign Brief — Template

> Usar este template para qualquer campanha com marca parceira, produto enviado, ou colaboração remunerada. Ver `ugc/disclosure-rules.md` e `content/review-integrity-rules.md` antes de aprovar qualquer peça gerada a partir deste brief.

```yaml
campanha:
  nome: ""
  marca_parceira: ""
  tipo_de_relacao: ""          # produto-gratuito | pago | affiliate | sem-relacao-review-organico
  status: "DEMONSTRAÇÃO"       # trocar para "REAL" apenas quando a parceria for confirmada por escrito

escopo:
  objetivo: ""
  pilar_de_conteudo: ""        # repertorio-real | vida-eua | curadoria
  familia_visual: ""           # editorial-escape | field-notes | brand-story-ugc
  formatos_solicitados: []     # feed | story | reel-cover | carrossel | newsletter

deliverables:
  - formato: ""
    quantidade: 0
    idioma: []                # pt | en
    prazo: ""

disclosure:
  obrigatorio: true
  tipo: ""                    # #ad | #parceria-paga | #produto-enviado | nao-aplicavel
  posicionamento: "visível no primeiro frame/slide, não escondido em hashtag final"

limites_de_conteudo:
  o_que_a_marca_pode_pedir: ""
  o_que_a_marca_nao_pode_pedir: ""   # ex.: alterar avaliação real, omitir disclosure, usar dado não verificado

narrativa:
  gancho: ""
  cena: ""
  integracao_do_produto: ""    # produto/experiência integrado à narrativa humana, nunca estética de anúncio artificial

aprovacao:
  briefing_aprovado_por: ""
  data: ""
```

## Regras não negociáveis

- Toda campanha com produto/pagamento envolvido exige disclosure visível — sem exceção, sem "escondido em hashtag"
- Nenhuma campanha de exemplo neste sistema representa parceria real até que seja confirmada por escrito e o campo `status` seja alterado para `"REAL"`
- Ver `content/review-integrity-rules.md` para o que acontece quando review e patrocínio coexistem
