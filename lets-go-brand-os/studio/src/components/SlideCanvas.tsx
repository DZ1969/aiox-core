import type { CSSProperties } from 'react';
import type { SlideData, TemplateId } from '../data/types';
import { TEMPLATE_DIMENSIONS } from '../data/types';

interface SlideCanvasProps {
  data: SlideData;
  hasPhoto: boolean;
  showSafeZones: boolean;
  scale: number;
  language: 'pt' | 'en';
}

// Substitui os acentos comuns em PT/EN por ASCII simples, sem depender de
// ranges unicode em regex literal (evita risco de codificação em build).
const ACCENT_MAP: Record<string, string> = {
  á: 'a', à: 'a', â: 'a', ã: 'a', ä: 'a',
  é: 'e', è: 'e', ê: 'e', ë: 'e',
  í: 'i', ì: 'i', î: 'i', ï: 'i',
  ó: 'o', ò: 'o', ô: 'o', õ: 'o', ö: 'o',
  ú: 'u', ù: 'u', û: 'u', ü: 'u',
  ç: 'c', ñ: 'n',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((char) => ACCENT_MAP[char] ?? char)
    .join('')
    .replace(/\s+/g, '-');
}

const STORY_LIKE: TemplateId[] = ['story', 'reel-cover'];
const PHOTO_LIKE: TemplateId[] = [
  'feed-portrait',
  'carousel-cover',
  'story',
  'reel-cover',
  'destination',
  'personal-experience',
  'ugc-product-feature',
];

function PhotoLayer({ hasPhoto, altText }: { hasPhoto: boolean; altText: string }) {
  return (
    <>
      <div className="lgwf-photo-area" aria-hidden={hasPhoto} />
      {!hasPhoto && (
        <div className="lgwf-photo-placeholder-label" role="img" aria-label={altText}>
          {altText}
        </div>
      )}
      <div className="lgwf-scrim-fill lgwf-scrim-bottom" />
    </>
  );
}

export default function SlideCanvas({ data, hasPhoto, showSafeZones, scale, language }: SlideCanvasProps) {
  const dims = TEMPLATE_DIMENSIONS[data.template];
  const isStoryLike = STORY_LIKE.includes(data.template);
  const isPhotoLike = PHOTO_LIKE.includes(data.template);
  const isDarkBase = isPhotoLike; // texto claro por padrão quando há camada de foto/scrim

  const style: CSSProperties = {
    width: dims.width,
    height: dims.height,
    transform: `scale(${scale})`,
  };

  const sourceLabel = language === 'pt' ? 'Fonte' : 'Source';
  const checkedLabel = language === 'pt' ? 'consultado em' : 'checked on';

  return (
    <div
      id="export-canvas"
      className={`lgwf-canvas ${isDarkBase ? 'lgwf-canvas--dark' : ''}`}
      style={style}
      data-template={data.template}
      data-width={dims.width}
      data-height={dims.height}
    >
      {isPhotoLike && 'photoPlaceholder' in data && (
        <PhotoLayer hasPhoto={hasPhoto} altText={'altText' in data ? data.altText : ''} />
      )}

      {showSafeZones && <SafeZones template={data.template} />}

      <div className={`lgwf-content ${isStoryLike ? 'lgwf-content--story' : ''}`}>
        {renderBody(data, sourceLabel, checkedLabel)}
      </div>
    </div>
  );
}

function renderBody(data: SlideData, sourceLabel: string, checkedLabel: string) {
  switch (data.template) {
    case 'feed-portrait':
    case 'carousel-cover':
      return (
        <>
          <div className="lgwf-footer">
            <h1 className="lgwf-headline">{data.headline}</h1>
            {data.subhead && <p className="lgwf-subhead">{data.subhead}</p>}
          </div>
        </>
      );

    case 'story':
      return (
        <div className="lgwf-footer">
          <p className="lgwf-body">{data.overlayText}</p>
        </div>
      );

    case 'reel-cover':
      return (
        <div className="lgwf-footer">
          {data.seriesLabel && <p className="lgwf-caption lgwf-mono">{data.seriesLabel}</p>}
          {data.title && <h1 className="lgwf-headline">{data.title}</h1>}
        </div>
      );

    case 'destination':
      return (
        <div className="lgwf-footer">
          <p className="lgwf-caption lgwf-mono">{data.country}</p>
          <h1 className="lgwf-headline">{data.destinationName}</h1>
          <p className="lgwf-subhead">{data.hook}</p>
        </div>
      );

    case 'worth-it': {
      const verdictClass = slugify(data.verdict);
      return (
        <>
          <span className={`lgwf-verdict-badge lgwf-verdict-badge--${verdictClass}`}>{data.verdict}</span>
          <h1 className="lgwf-headline" style={{ fontSize: 'var(--fs-h2)' }}>
            {data.subject}
          </h1>
          <ul className="lgwf-body">
            {data.criteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="lgwf-footer">
            <p className="lgwf-caption">
              <strong>{data.forWhom}</strong>
            </p>
            <p className="lgwf-caption">{data.notForWhom}</p>
          </div>
        </>
      );
    }

    case 'route':
      return (
        <>
          <h2 className="lgwf-headline" style={{ fontSize: 'var(--fs-h2)' }}>
            Roteiro
          </h2>
          <div>
            {data.routeSteps.map((s) => (
              <div className="lgwf-route-step" key={s.step}>
                <span className="lgwf-route-step-number">{s.step}</span>
                <span className="lgwf-body">{s.action}</span>
              </div>
            ))}
          </div>
          {data.mapNote && <p className="lgwf-caption">{data.mapNote}</p>}
        </>
      );

    case 'price-source':
      return (
        <>
          <h2 className="lgwf-headline" style={{ fontSize: 'var(--fs-h2)' }}>
            {data.item}
          </h2>
          <p className="lgwf-mono" style={{ fontSize: 'var(--fs-display)' }}>
            {data.price} {data.currency !== data.price ? data.currency : ''}
          </p>
          <div className="lgwf-footer">
            {data.note && <p className="lgwf-body">{data.note}</p>}
            <div className="lgwf-source-block lgwf-source-block--price">
              {sourceLabel}: {data.source} — {checkedLabel} {data.dateChecked}
            </div>
          </div>
        </>
      );

    case 'alert-rule':
      return (
        <>
          <span className="lgwf-verdict-badge" style={{ background: 'var(--color-coral-alert)' }}>
            {data.alertTitle}
          </span>
          <p className="lgwf-body">{data.ruleText}</p>
          <div className="lgwf-footer">
            <div className="lgwf-source-block">
              {sourceLabel}: {data.source} — {checkedLabel} {data.dateChecked}
            </div>
          </div>
        </>
      );

    case 'personal-experience':
      return (
        <div className="lgwf-footer">
          <p className="lgwf-body">{data.sceneText}</p>
          {data.lessonText && <p className="lgwf-caption">{data.lessonText}</p>}
        </div>
      );

    case 'cta':
      return (
        <div className="lgwf-footer">
          <div className="lgwf-cta-block">{data.ctaText}</div>
        </div>
      );

    case 'ugc-product-feature':
      return (
        <div className="lgwf-footer">
          <span className="lgwf-disclosure-tag">{data.disclosureType}</span>
          <p className="lgwf-caption lgwf-mono">{data.partnerName}</p>
          <h2 className="lgwf-headline" style={{ fontSize: 'var(--fs-h2)' }}>
            {data.productName}
          </h2>
          <p className="lgwf-body">{data.narrativeText}</p>
        </div>
      );

    case 'review':
      return (
        <>
          {data.disclosureType && <span className="lgwf-disclosure-tag">{data.disclosureType}</span>}
          <h2 className="lgwf-headline" style={{ fontSize: 'var(--fs-h2)' }}>
            {data.venueName}
          </h2>
          <p className="lgwf-caption">relação: {data.relationshipType}</p>
          <p className="lgwf-body">
            <strong>vale:</strong> {data.whatWorked.join(' · ')}
          </p>
          <p className="lgwf-body">
            <strong>evitar:</strong> {data.whatToSkip.join(' · ')}
          </p>
          <div className="lgwf-footer">
            <p className="lgwf-caption">{data.forWhom}</p>
          </div>
        </>
      );

    case 'newsletter-card':
      return (
        <div className="lgwf-newsletter-card">
          <h2 className="lgwf-headline" style={{ fontSize: 'var(--fs-h2)' }}>
            {data.headline}
          </h2>
          <p className="lgwf-body">{data.teaserText}</p>
          <div className="lgwf-cta-block" style={{ marginTop: 'var(--space-5)', alignSelf: 'flex-start' }}>
            {data.ctaSubscribe}
          </div>
        </div>
      );

    default:
      return null;
  }
}

function SafeZones({ template }: { template: TemplateId }) {
  if (template === 'story' || template === 'reel-cover') {
    return (
      <>
        <div className="lgwf-safe-zone-overlay" style={{ top: 0, height: 120, bottom: 'auto', border: 'none', borderBottom: '2px dashed rgba(195,90,74,0.85)' }} />
        <div className="lgwf-safe-zone-overlay" style={{ bottom: 0, top: 'auto', height: 250, border: 'none', borderTop: '2px dashed rgba(195,90,74,0.85)' }} />
        {template === 'reel-cover' && (
          <div className="lgwf-grid-safe-zone" style={{ left: 0, right: 0, top: 120, height: 1080 }} />
        )}
      </>
    );
  }
  return <div className="lgwf-safe-zone-overlay" style={{ inset: 0 }} />;
}
