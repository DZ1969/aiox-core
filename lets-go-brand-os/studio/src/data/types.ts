// Tipos de dados estruturados do sistema de templates.
// Espelham social/template-specifications.md — qualquer novo campo de template
// deve ser adicionado aqui e naquele documento junto.

export type Language = 'pt' | 'en';

export type VisualFamily = 'editorial-escape' | 'field-notes' | 'brand-story-ugc';

export type TemplateId =
  | 'feed-portrait'
  | 'story'
  | 'reel-cover'
  | 'carousel-cover'
  | 'destination'
  | 'worth-it'
  | 'route'
  | 'price-source'
  | 'alert-rule'
  | 'personal-experience'
  | 'cta'
  | 'ugc-product-feature'
  | 'review'
  | 'newsletter-card';

export interface CanvasDimensions {
  width: number;
  height: number;
}

// Dimensão de export por template — ver tokens/tokens.json > dimension
// e social/template-specifications.md para a tabela completa.
export const TEMPLATE_DIMENSIONS: Record<TemplateId, CanvasDimensions> = {
  'feed-portrait': { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
  'reel-cover': { width: 1080, height: 1920 },
  'carousel-cover': { width: 1080, height: 1350 },
  destination: { width: 1080, height: 1350 },
  'worth-it': { width: 1080, height: 1350 },
  route: { width: 1080, height: 1350 },
  'price-source': { width: 1080, height: 1350 },
  'alert-rule': { width: 1080, height: 1350 },
  'personal-experience': { width: 1080, height: 1350 },
  cta: { width: 1080, height: 1350 },
  'ugc-product-feature': { width: 1080, height: 1350 },
  review: { width: 1080, height: 1350 },
  'newsletter-card': { width: 1200, height: 630 },
};

export const TEMPLATE_LABELS: Record<TemplateId, string> = {
  'feed-portrait': 'Feed portrait',
  story: 'Story',
  'reel-cover': 'Reel cover',
  'carousel-cover': 'Capa de carrossel',
  destination: 'Slide de destino',
  'worth-it': 'Vale ou não vale',
  route: 'Roteiro / mapa funcional',
  'price-source': 'Preço com data e fonte',
  'alert-rule': 'Alerta / regra',
  'personal-experience': 'Experiência pessoal',
  cta: 'CTA',
  'ugc-product-feature': 'UGC product feature',
  review: 'Hotel/restaurant review',
  'newsletter-card': 'Newsletter card',
};

export interface RouteStep {
  step: string;
  action: string;
}

// União discriminada por `template`. Cada variante corresponde a um dos
// 14 templates obrigatórios listados em social/template-specifications.md.
export type SlideData =
  | {
      template: 'carousel-cover' | 'feed-portrait';
      index?: number;
      headline: string;
      subhead?: string;
      photoPlaceholder: boolean;
      altText: string;
    }
  | {
      template: 'story';
      index?: number;
      overlayText: string;
      photoPlaceholder: boolean;
      altText: string;
    }
  | {
      template: 'reel-cover';
      index?: number;
      title?: string;
      seriesLabel?: string;
      photoPlaceholder: boolean;
      altText: string;
    }
  | {
      template: 'destination';
      index?: number;
      destinationName: string;
      country: string;
      hook: string;
      photoPlaceholder: boolean;
      altText: string;
    }
  | {
      template: 'worth-it';
      index?: number;
      subject: string;
      verdict: string;
      criteria: string[];
      forWhom: string;
      notForWhom: string;
    }
  | {
      template: 'route';
      index?: number;
      routeSteps: RouteStep[];
      mapNote?: string | null;
    }
  | {
      template: 'price-source';
      index?: number;
      item: string;
      price: string;
      currency: string;
      source: string;
      dateChecked: string;
      note?: string;
    }
  | {
      template: 'alert-rule';
      index?: number;
      alertTitle: string;
      ruleText: string;
      source: string;
      dateChecked: string;
    }
  | {
      template: 'personal-experience';
      index?: number;
      sceneText: string;
      lessonText?: string;
      photoPlaceholder: boolean;
      altText: string;
    }
  | {
      template: 'cta';
      index?: number;
      ctaText: string;
      ctaAction: 'comment' | 'save' | 'link' | 'subscribe';
    }
  | {
      template: 'ugc-product-feature';
      index?: number;
      productName: string;
      partnerName: string;
      disclosureType: string;
      narrativeText: string;
      photoPlaceholder: boolean;
      altText: string;
    }
  | {
      template: 'review';
      index?: number;
      venueName: string;
      relationshipType: 'organico' | 'produto-enviado' | 'pago' | 'parceria-confirmada';
      whatWorked: string[];
      whatToSkip: string[];
      forWhom: string;
      disclosureType?: string;
    }
  | {
      template: 'newsletter-card';
      index?: number;
      headline: string;
      teaserText: string;
      ctaSubscribe: string;
    };

export interface CampaignMeta {
  status: 'DEMONSTRAÇÃO' | 'DEMONSTRATION' | 'REAL';
  note: string;
  campaignId: string;
  language: Language;
  pillar: string;
  visualFamily: VisualFamily;
  campaignTitle: string;
  theme: string;
  credit: string;
  dateChecked: string;
  source: string;
}

export interface Campaign {
  meta: CampaignMeta;
  slides: SlideData[];
}
