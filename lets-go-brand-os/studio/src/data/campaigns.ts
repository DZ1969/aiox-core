import type { Campaign } from './types';
import lostLuggagePt from '../../../social/examples/campaign-lost-luggage.pt.json';
import lostLuggageEn from '../../../social/examples/campaign-lost-luggage.en.json';

// Fonte da verdade dos dados de exemplo é social/examples/*.json — a studio
// apenas lê e renderiza, nunca duplica o conteúdo em código.
export const campaigns: Record<string, { pt: Campaign; en: Campaign }> = {
  'lost-luggage-demo': {
    pt: lostLuggagePt as Campaign,
    en: lostLuggageEn as Campaign,
  },
};

export const campaignIds = Object.keys(campaigns);
