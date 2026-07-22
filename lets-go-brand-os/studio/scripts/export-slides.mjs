#!/usr/bin/env node
// Pipeline de exportação da studio.
//
// 1. Garante que existe um build (`vite build`) e sobe `vite preview`.
// 2. Abre cada peça via deep-link (?source=...&template=...&slide=...) com Playwright
//    (Chromium local, pré-instalado no ambiente — ver PLAYWRIGHT_BROWSERS_PATH).
// 3. Tira screenshot só do elemento #export-canvas (sem chrome do app).
// 4. Lê o cabeçalho PNG (IHDR) para validar que a largura/altura exportada bate
//    exatamente com a dimensão esperada do template (tokens/tokens.json).
// 5. Escreve exports/EXPORT_LOG.md com o resultado — export só é considerado
//    válido se todas as dimensões baterem. Isso é o pipeline de exportação real;
//    o preview em tela (`npm run dev`) nunca deve ser tratado como export final.

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve o Chromium pré-instalado do ambiente diretamente pelo binário,
// em vez de deixar o playwright resolver por revisão — o pacote npm
// "playwright" instalado localmente pode esperar uma revisão diferente da
// que está de fato instalada em PLAYWRIGHT_BROWSERS_PATH, o que trava
// launch() silenciosamente à espera de download (bloqueado por
// PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1). Ver README > "Exportação".
function resolveChromiumExecutable() {
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) return process.env.PLAYWRIGHT_CHROMIUM_PATH;
  const browsersPath = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!browsersPath || !existsSync(browsersPath)) return undefined;
  const candidate = readdirSync(browsersPath)
    .filter((name) => /^chromium-\d+$/.test(name))
    .sort()
    .pop();
  if (!candidate) return undefined;
  const binPath = path.join(browsersPath, candidate, 'chrome-linux', 'chrome');
  return existsSync(binPath) ? binPath : undefined;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const studioRoot = path.resolve(__dirname, '..');
const exportsDir = path.resolve(studioRoot, '..', 'exports');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const CAMPAIGN_SLIDE_COUNT = 9; // ver social/examples/campaign-lost-luggage.*.json
const STANDALONE_TEMPLATES = [
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

const TEMPLATE_DIMENSIONS = {
  'feed-portrait': [1080, 1350],
  story: [1080, 1920],
  'reel-cover': [1080, 1920],
  'carousel-cover': [1080, 1350],
  destination: [1080, 1350],
  'worth-it': [1080, 1350],
  route: [1080, 1350],
  'price-source': [1080, 1350],
  'alert-rule': [1080, 1350],
  'personal-experience': [1080, 1350],
  cta: [1080, 1350],
  'ugc-product-feature': [1080, 1350],
  review: [1080, 1350],
  'newsletter-card': [1200, 630],
};

function readPngDimensions(buffer) {
  // PNG: 8 bytes de assinatura, depois chunk IHDR (4 bytes de tamanho, 'IHDR',
  // 4 bytes width, 4 bytes height, big-endian). Sem dependência externa.
  if (buffer.readUInt32BE(12) !== 0x49484452 /* 'IHDR' */) {
    throw new Error('PNG inválido: chunk IHDR não encontrado na posição esperada');
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // servidor ainda não subiu
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Timeout esperando ${url} subir`));
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

async function run() {
  if (!existsSync(path.join(studioRoot, 'dist'))) {
    console.log('> dist/ não encontrado — rodando "vite build" primeiro...');
    await new Promise((resolve, reject) => {
      const build = spawn('npx', ['vite', 'build'], { cwd: studioRoot, stdio: 'inherit', shell: true });
      build.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`vite build saiu com código ${code}`))));
    });
  }

  console.log('> subindo vite preview...');
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: studioRoot,
    stdio: 'pipe',
    shell: true,
  });

  const results = [];

  try {
    await waitForServer(BASE_URL);

    const browser = await chromium.launch({
      executablePath: resolveChromiumExecutable(),
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // Viewport generoso o bastante para conter a maior peça (1080x1920) mais
    // a sidebar de controles (320px) e o padding do canvas-wrap, sem nunca
    // entrar em overflow/scroll — evita que o centering de flexbox desloque
    // o elemento capturado para dentro da coluna da sidebar.
    await page.setViewportSize({ width: 1700, height: 2200 });

    const jobs = [];

    for (const lang of ['pt', 'en']) {
      for (let i = 0; i < CAMPAIGN_SLIDE_COUNT; i++) {
        jobs.push({
          url: `${BASE_URL}/?source=lost-luggage-demo&language=${lang}&slide=${i}&safezones=0&export=1`,
          out: path.join(exportsDir, 'lost-luggage-demo', lang, `${String(i + 1).padStart(2, '0')}.png`),
        });
      }
      for (const template of STANDALONE_TEMPLATES) {
        jobs.push({
          url: `${BASE_URL}/?source=standalone&template=${template}&language=${lang}&safezones=0&export=1`,
          out: path.join(exportsDir, 'standalone', lang, `${template}.png`),
          template,
        });
      }
    }

    for (const job of jobs) {
      await page.goto(job.url, { waitUntil: 'networkidle' });
      const canvas = page.locator('#export-canvas');
      await canvas.waitFor({ state: 'visible' });

      mkdirSync(path.dirname(job.out), { recursive: true });
      const buffer = await canvas.screenshot({ path: job.out });

      const templateId = job.template ?? (await canvas.getAttribute('data-template'));
      const expected = TEMPLATE_DIMENSIONS[templateId];
      const actual = readPngDimensions(buffer);
      const pass = expected && expected[0] === actual.width && expected[1] === actual.height;

      results.push({
        file: path.relative(exportsDir, job.out),
        template: templateId,
        expected,
        actual: [actual.width, actual.height],
        pass,
      });
      console.log(`${pass ? 'OK  ' : 'FAIL'} ${job.out} (${actual.width}x${actual.height})`);
    }

    await browser.close();
  } finally {
    preview.kill();
  }

  const failCount = results.filter((r) => !r.pass).length;
  const log = [
    '# Export Log',
    '',
    `Gerado em: ${new Date().toISOString()}`,
    '',
    `Total: ${results.length} — OK: ${results.length - failCount} — FALHA: ${failCount}`,
    '',
    '| Arquivo | Template | Esperado | Real | Status |',
    '|---|---|---|---|---|',
    ...results.map(
      (r) =>
        `| ${r.file} | ${r.template} | ${r.expected?.join('x')} | ${r.actual.join('x')} | ${r.pass ? 'OK' : 'FALHA'} |`
    ),
    '',
    failCount > 0
      ? '**Atenção:** há exportações com dimensão divergente do esperado — não usar como entrega final até corrigir.'
      : 'Todas as dimensões batem com o esperado. Ainda assim, revisar visualmente antes de considerar entrega final (ver QA_REPORT.md).',
  ].join('\n');

  mkdirSync(exportsDir, { recursive: true });
  writeFileSync(path.join(exportsDir, 'EXPORT_LOG.md'), log, 'utf-8');
  console.log(`\n> Log escrito em ${path.join(exportsDir, 'EXPORT_LOG.md')}`);

  if (failCount > 0) {
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
