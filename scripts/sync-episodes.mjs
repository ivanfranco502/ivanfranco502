#!/usr/bin/env node
import { writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const FEED_URL = 'https://anchor.fm/s/d79e1ec/podcast/rss';
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'episodes');

const itemRe = /<item>([\s\S]*?)<\/item>/g;
const tagRe = (name) =>
  new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${name}>`, 'i');

function tag(block, name) {
  const m = block.match(tagRe(name));
  return m ? m[1].trim() : null;
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function stripHtml(html) {
  return html
    .replace(/<li[^>]*>/gi, '\n• ')
    .replace(/<\/li>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseDurationSeconds(s) {
  if (!s) return null;
  const parts = s.split(':').map(Number);
  if (parts.some(isNaN)) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 1) return parts[0];
  return null;
}

function formatDuration(s) {
  if (!s) return null;
  const total = parseDurationSeconds(s);
  if (total == null) return s;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function escapeYaml(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

const res = await fetch(FEED_URL, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; matebreak-sync/1.0)' },
});
if (!res.ok) {
  console.error(`Feed fetch failed: ${res.status}`);
  process.exit(1);
}
const xml = await res.text();

// Clear out existing files to remove any stale episodes
mkdirSync(OUT_DIR, { recursive: true });
for (const f of readdirSync(OUT_DIR)) {
  if (f.endsWith('.md')) rmSync(join(OUT_DIR, f));
}

const items = xml.match(itemRe) ?? [];
const written = [];

for (const block of items) {
  const title = tag(block, 'title');
  const link = tag(block, 'link');
  const pubDate = tag(block, 'pubDate');
  if (!title || !link || !pubDate) continue;

  const date = new Date(pubDate).toISOString().slice(0, 10);
  const slug = slugify(title);
  const epNumRaw = tag(block, 'itunes:episode');
  const epNum = epNumRaw ? parseInt(epNumRaw, 10) : null;
  const seasonRaw = tag(block, 'itunes:season');
  const season = seasonRaw ? parseInt(seasonRaw, 10) : null;
  const durationRaw = tag(block, 'itunes:duration');
  const durationSeconds = parseDurationSeconds(durationRaw);
  const duration = formatDuration(durationRaw);
  const desc = stripHtml(tag(block, 'description') ?? '');
  let excerpt = desc.replace(/\s+/g, ' ').slice(0, 260).trim();
  if (desc.length > 260) excerpt = excerpt.replace(/\s+\S*$/, '') + '…';

  const seasonEp =
    season != null && epNum != null
      ? `s${String(season).padStart(2, '0')}e${String(epNum).padStart(2, '0')}`
      : null;
  const prefix = seasonEp ?? (epNum != null ? `e${String(epNum).padStart(3, '0')}` : date);
  const filename = `${prefix}-${slug}.md`;

  const lines = [
    '---',
    `title: "${escapeYaml(title)}"`,
    `url: ${link}`,
    `publishedAt: ${date}`,
  ];
  if (season != null) lines.push(`season: ${season}`);
  if (epNum != null) lines.push(`episodeNumber: ${epNum}`);
  if (duration) lines.push(`duration: "${duration}"`);
  if (durationSeconds != null) lines.push(`durationSeconds: ${durationSeconds}`);
  if (excerpt) lines.push(`excerpt: "${escapeYaml(excerpt)}"`);
  lines.push('---', '');

  writeFileSync(join(OUT_DIR, filename), lines.join('\n'));
  written.push({ filename, season, epNum, title, date, duration });
}

written.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
console.log(`Wrote ${written.length} episode(s) to ${OUT_DIR}`);
for (const w of written) {
  const tag = w.season && w.epNum ? `S${w.season}E${String(w.epNum).padStart(2, '0')}` : `ep${w.epNum ?? '?'}`;
  console.log(`  ${tag} · ${w.date} · ${w.duration ?? '?'} · ${w.title}`);
}
