import { useMemo, useState } from 'react';
import SlideCanvas from './components/SlideCanvas';
import { campaigns, campaignIds } from './data/campaigns';
import { standaloneExamples } from './data/standaloneExamples';
import type { Language, SlideData, TemplateId } from './data/types';
import { TEMPLATE_DIMENSIONS, TEMPLATE_LABELS } from './data/types';

const TEMPLATE_ORDER: TemplateId[] = [
  'feed-portrait',
  'story',
  'reel-cover',
  'carousel-cover',
  'destination',
  'worth-it',
  'route',
  'price-source',
  'alert-rule',
  'personal-experience',
  'cta',
  'ugc-product-feature',
  'review',
  'newsletter-card',
];

type Source = 'standalone' | (typeof campaignIds)[number];

// Permite deep-link via query string, usado pelo pipeline de exportação
// (scripts/export-slides.mjs) para abrir cada peça de forma determinística:
// ?source=lost-luggage-demo&language=pt&slide=0&photo=1&safezones=0
function readQueryDefaults() {
  const params = new URLSearchParams(window.location.search);
  return {
    language: (params.get('language') as Language) ?? 'pt',
    source: (params.get('source') as Source) ?? 'lost-luggage-demo',
    template: (params.get('template') as TemplateId) ?? 'carousel-cover',
    slideIndex: params.has('slide') ? Number(params.get('slide')) : 0,
    hasPhoto: params.get('photo') === '1',
    showSafeZones: params.get('safezones') !== '0',
    exportMode: params.get('export') === '1',
  };
}

export default function App() {
  const initial = useMemo(readQueryDefaults, []);
  const [language, setLanguage] = useState<Language>(initial.language);
  const [source, setSource] = useState<Source>(initial.source);
  const [template, setTemplate] = useState<TemplateId>(initial.template);
  const [slideIndex, setSlideIndex] = useState(initial.slideIndex);
  const [hasPhoto, setHasPhoto] = useState(initial.hasPhoto);
  const [showSafeZones, setShowSafeZones] = useState(initial.showSafeZones);

  const campaign = source === 'standalone' ? null : campaigns[source]?.[language];

  const campaignSlides = useMemo(() => campaign?.slides ?? [], [campaign]);

  const activeSlide: SlideData = useMemo(() => {
    if (source === 'standalone') {
      return standaloneExamples[template][language];
    }
    const slide = campaignSlides[slideIndex];
    return slide ?? standaloneExamples[template][language];
  }, [source, template, language, campaignSlides, slideIndex]);

  const dims = TEMPLATE_DIMENSIONS[activeSlide.template];
  // Em modo de exportação a peça precisa renderizar em pixels reais (scale 1)
  // — o pipeline de export (scripts/export-slides.mjs) captura o elemento
  // pelo bounding box pós-transform, então qualquer scale < 1 encolheria o PNG.
  const scale = initial.exportMode ? 1 : Math.min(360 / dims.width, 520 / dims.height, 1);

  return (
    <div className="studio-shell">
      <aside className="studio-controls">
        <h1>Let&apos;s Go With Francis</h1>
        <p className="studio-subtitle">Brand OS — Preview Studio</p>

        <div className="studio-field">
          <label htmlFor="source-select">Conteúdo</label>
          <select
            id="source-select"
            value={source}
            onChange={(e) => {
              const value = e.target.value as Source;
              setSource(value);
              setSlideIndex(0);
            }}
          >
            <option value="standalone">Exemplos avulsos por template</option>
            {campaignIds.map((id) => (
              <option key={id} value={id}>
                Campanha: {campaigns[id].pt.meta.campaignTitle}
              </option>
            ))}
          </select>
        </div>

        <div className="studio-field">
          <label htmlFor="language-select">Idioma</label>
          <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
            <option value="pt">Português (PT-BR)</option>
            <option value="en">English (EN-US)</option>
          </select>
        </div>

        {source === 'standalone' ? (
          <div className="studio-field">
            <label htmlFor="template-select">Template</label>
            <select id="template-select" value={template} onChange={(e) => setTemplate(e.target.value as TemplateId)}>
              {TEMPLATE_ORDER.map((id) => (
                <option key={id} value={id}>
                  {TEMPLATE_LABELS[id]}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="studio-field">
            <label>Slide ({slideIndex + 1} / {campaignSlides.length})</label>
            <div className="studio-thumb-row">
              <button
                className="toggle"
                onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
                disabled={slideIndex === 0}
              >
                ← anterior
              </button>
              <button
                className="toggle"
                onClick={() => setSlideIndex((i) => Math.min(campaignSlides.length - 1, i + 1))}
                disabled={slideIndex >= campaignSlides.length - 1}
              >
                próximo →
              </button>
            </div>
          </div>
        )}

        <div className="studio-field">
          <label>Fotografia</label>
          <button className="toggle" aria-pressed={hasPhoto} onClick={() => setHasPhoto((v) => !v)}>
            {hasPhoto ? 'Com fotografia (simulada)' : 'Sem fotografia (placeholder)'}
          </button>
        </div>

        <div className="studio-field">
          <label>QA</label>
          <button className="toggle" aria-pressed={showSafeZones} onClick={() => setShowSafeZones((v) => !v)}>
            {showSafeZones ? 'Safe zones visíveis' : 'Safe zones ocultas'}
          </button>
        </div>

        <div className="studio-meta-box">
          <strong>{TEMPLATE_LABELS[activeSlide.template]}</strong>
          {dims.width}×{dims.height}px
          {campaign && (
            <>
              <br />
              status: {campaign.meta.status}
            </>
          )}
        </div>
      </aside>

      <main className="studio-canvas-wrap">
        <div className="studio-canvas-scale" style={{ width: dims.width * scale, height: dims.height * scale }}>
          <SlideCanvas data={activeSlide} hasPhoto={hasPhoto} showSafeZones={showSafeZones} scale={scale} language={language} />
        </div>
        <p className="studio-export-log">
          Este é um preview em tela. Nenhum arquivo é considerado exportação final até passar pelo pipeline de{' '}
          <code>npm run export</code> — ver README na raiz de <code>lets-go-brand-os/</code>.
        </p>
      </main>
    </div>
  );
}
