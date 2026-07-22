import type { Language, SlideData, TemplateId } from './types';

// Exemplos avulsos (DEMONSTRAÇÃO) para templates que não fazem parte da
// campanha "lost-luggage-demo" — garante que todo template de
// social/template-specifications.md tenha algo para visualizar na studio.
// Nenhum dado factual real: preços/fontes usam o placeholder padrão.

const PLACEHOLDER_SOURCE = {
  pt: '[VERIFICAR FONTE E DATA]',
  en: '[VERIFY SOURCE AND DATE]',
};

export const standaloneExamples: Record<TemplateId, Record<Language, SlideData>> = {
  'feed-portrait': {
    pt: {
      template: 'feed-portrait',
      headline: 'A vista que vale o voo de 11 horas.',
      subhead: 'Editorial Escape — exemplo de demonstração',
      photoPlaceholder: true,
      altText: '[FOTO A DEFINIR] — panorâmica de destino ao entardecer',
    },
    en: {
      template: 'feed-portrait',
      headline: 'The view that earns the 11-hour flight.',
      subhead: 'Editorial Escape — demonstration example',
      photoPlaceholder: true,
      altText: '[PHOTO TBD] — wide destination shot at dusk',
    },
  },
  story: {
    pt: {
      template: 'story',
      overlayText: 'Pergunta rápida: você prepara plano B de bagagem antes de viajar?',
      photoPlaceholder: true,
      altText: '[FOTO A DEFINIR] — bastidor de preparação de viagem',
    },
    en: {
      template: 'story',
      overlayText: 'Quick one: do you pack a backup plan for your luggage?',
      photoPlaceholder: true,
      altText: '[PHOTO TBD] — behind-the-scenes trip prep',
    },
  },
  'reel-cover': {
    pt: {
      template: 'reel-cover',
      title: '3 erros de bagagem',
      seriesLabel: 'Field Notes EP.03',
      photoPlaceholder: true,
      altText: '[FOTO A DEFINIR] — detalhe de mala e passaporte',
    },
    en: {
      template: 'reel-cover',
      title: '3 luggage mistakes',
      seriesLabel: 'Field Notes EP.03',
      photoPlaceholder: true,
      altText: '[PHOTO TBD] — suitcase and passport detail',
    },
  },
  'carousel-cover': {
    pt: {
      template: 'carousel-cover',
      headline: 'A viagem mais bonita da minha vida quase começou sem mala.',
      subhead: 'O que ninguém te conta sobre bagagem extraviada.',
      photoPlaceholder: true,
      altText: '[FOTO A DEFINIR] — mala sozinha em esteira de aeroporto vazia',
    },
    en: {
      template: 'carousel-cover',
      headline: 'The most beautiful trip of my life almost started with no suitcase.',
      subhead: "What nobody tells you about lost luggage.",
      photoPlaceholder: true,
      altText: '[PHOTO TBD] — a single suitcase on an empty airport carousel',
    },
  },
  destination: {
    pt: {
      template: 'destination',
      destinationName: '[DESTINO A DEFINIR]',
      country: '[PAÍS A DEFINIR]',
      hook: 'O lugar que me fez repensar o que eu chamava de "viagem tranquila".',
      photoPlaceholder: true,
      altText: '[FOTO A DEFINIR] — establishing shot do destino',
    },
    en: {
      template: 'destination',
      destinationName: '[DESTINATION TBD]',
      country: '[COUNTRY TBD]',
      hook: 'The place that made me rethink what I called an "easy trip."',
      photoPlaceholder: true,
      altText: '[PHOTO TBD] — establishing shot of the destination',
    },
  },
  'worth-it': {
    pt: {
      template: 'worth-it',
      subject: '[EXPERIÊNCIA/LOCAL A DEFINIR]',
      verdict: 'depende',
      criteria: ['Critério 1 [A DEFINIR]', 'Critério 2 [A DEFINIR]'],
      forWhom: 'Para quem [A DEFINIR]',
      notForWhom: 'Para quem não [A DEFINIR]',
    },
    en: {
      template: 'worth-it',
      subject: '[EXPERIENCE/PLACE TBD]',
      verdict: 'it depends',
      criteria: ['Criterion 1 [TBD]', 'Criterion 2 [TBD]'],
      forWhom: 'Worth it for [TBD]',
      notForWhom: 'Not worth it for [TBD]',
    },
  },
  route: {
    pt: {
      template: 'route',
      routeSteps: [
        { step: '1', action: 'Registrar o relatório de irregularidade antes de sair da área de retirada' },
        { step: '2', action: 'Guardar comprovantes e número de rastreamento' },
      ],
      mapNote: null,
    },
    en: {
      template: 'route',
      routeSteps: [
        { step: '1', action: 'File the irregularity report before leaving baggage claim' },
        { step: '2', action: 'Keep receipts and the tracking number' },
      ],
      mapNote: null,
    },
  },
  'price-source': {
    pt: {
      template: 'price-source',
      item: '[ITEM A DEFINIR]',
      price: PLACEHOLDER_SOURCE.pt,
      currency: PLACEHOLDER_SOURCE.pt,
      source: PLACEHOLDER_SOURCE.pt,
      dateChecked: PLACEHOLDER_SOURCE.pt,
    },
    en: {
      template: 'price-source',
      item: '[ITEM TBD]',
      price: PLACEHOLDER_SOURCE.en,
      currency: PLACEHOLDER_SOURCE.en,
      source: PLACEHOLDER_SOURCE.en,
      dateChecked: PLACEHOLDER_SOURCE.en,
    },
  },
  'alert-rule': {
    pt: {
      template: 'alert-rule',
      alertTitle: 'Antes de embarcar',
      ruleText: 'Regra a confirmar diretamente com a fonte oficial.',
      source: PLACEHOLDER_SOURCE.pt,
      dateChecked: PLACEHOLDER_SOURCE.pt,
    },
    en: {
      template: 'alert-rule',
      alertTitle: 'Before you board',
      ruleText: 'Rule to be confirmed directly with the official source.',
      source: PLACEHOLDER_SOURCE.en,
      dateChecked: PLACEHOLDER_SOURCE.en,
    },
  },
  'personal-experience': {
    pt: {
      template: 'personal-experience',
      sceneText: 'Cena real de viagem [A DEFINIR].',
      lessonText: 'O que essa cena ensina [A DEFINIR].',
      photoPlaceholder: true,
      altText: '[FOTO A DEFINIR] — momento pessoal',
    },
    en: {
      template: 'personal-experience',
      sceneText: 'Real trip scene [TBD].',
      lessonText: 'What this scene teaches [TBD].',
      photoPlaceholder: true,
      altText: '[PHOTO TBD] — personal moment',
    },
  },
  cta: {
    pt: {
      template: 'cta',
      ctaText: 'Salva esse post pra próxima viagem.',
      ctaAction: 'save',
    },
    en: {
      template: 'cta',
      ctaText: 'Save this for your next trip.',
      ctaAction: 'save',
    },
  },
  'ugc-product-feature': {
    pt: {
      template: 'ugc-product-feature',
      productName: '[PRODUTO A DEFINIR]',
      partnerName: '[PARCEIRO A DEFINIR]',
      disclosureType: 'produto-enviado',
      narrativeText: 'Como esse produto entrou na cena real da viagem [A DEFINIR].',
      photoPlaceholder: true,
      altText: '[FOTO A DEFINIR] — produto integrado à cena',
    },
    en: {
      template: 'ugc-product-feature',
      productName: '[PRODUCT TBD]',
      partnerName: '[PARTNER TBD]',
      disclosureType: 'gifted product',
      narrativeText: 'How this product fit into the real trip scene [TBD].',
      photoPlaceholder: true,
      altText: '[PHOTO TBD] — product integrated into the scene',
    },
  },
  review: {
    pt: {
      template: 'review',
      venueName: '[LOCAL A DEFINIR]',
      relationshipType: 'organico',
      whatWorked: ['Ponto positivo 1 [A DEFINIR]'],
      whatToSkip: ['Ponto de atenção 1 [A DEFINIR]'],
      forWhom: 'Para quem [A DEFINIR]',
    },
    en: {
      template: 'review',
      venueName: '[VENUE TBD]',
      relationshipType: 'organico',
      whatWorked: ['What worked 1 [TBD]'],
      whatToSkip: ['What to skip 1 [TBD]'],
      forWhom: 'Worth it for [TBD]',
    },
  },
  'newsletter-card': {
    pt: {
      template: 'newsletter-card',
      headline: 'O que aprendi revisando 3 anos de bagagem perdida',
      teaserText: 'Um resumo prático — direto na sua caixa de entrada.',
      ctaSubscribe: 'Assinar a newsletter',
    },
    en: {
      template: 'newsletter-card',
      headline: 'What 3 years of lost luggage taught me',
      teaserText: 'A practical recap — straight to your inbox.',
      ctaSubscribe: 'Subscribe to the newsletter',
    },
  },
};
