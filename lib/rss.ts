import * as rssParser from 'rss-parser';
import { cacheGet, cacheSet } from './cache';
import { getSourcesForCategory, recordSourceSuccess, recordSourceFailure, SOURCES } from './sources';
import { getDemoDataForCategory } from './demoData';
import type { NewsItem, FeedResponse, CategorySlug, Source } from './types';

const Parser = (rssParser as any).default || rssParser;

const parser = new Parser({
  timeout: 6000,
  customFields: {
    item: ['media:content', 'media:thumbnail', 'enclosure', 'image'],
  },
});

const CACHE_TTL_MS = 5 * 60 * 1000;
const BREAKING_WINDOW_MS = 30 * 60 * 1000;

function stripHtml(html: string, maxLen = 280): string {
  if (!html) return '';
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trim() + '…' : text;
}

function extractImageUrl(item: any): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item['media:content']?.['$']?.url) return item['media:content']['$'].url;
  if (item['media:thumbnail']?.['$']?.url) return item['media:thumbnail']['$'].url;
  if (item.image?.url) return item.image.url;
  const html = item.content || item['content:encoded'] || '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
  if (match) return match[1];
  return undefined;
}

function safeIsoDate(raw: any): string {
  try {
    const d = raw ? new Date(raw) : new Date();
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

async function fetchSource(source: Source): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const items: NewsItem[] = (feed.items || []).slice(0, 20).map((item: any, i) => {
      const publishedAt = safeIsoDate(item.pubDate || item.isoDate);
      const publishedTimestamp = new Date(publishedAt).getTime();
      return {
        id: `${source.id}-${i}-${publishedTimestamp}`,
        title: item.title?.trim() || '(başlıksız)',
        link: item.link || '',
        description: stripHtml(item.contentSnippet || item.content || item.summary || '', 320),
        source: source.name,
        sourceId: source.id,
        category: source.category,
        publishedAt,
        publishedTimestamp,
        isBreaking: Date.now() - publishedTimestamp < BREAKING_WINDOW_MS,
        imageUrl: extractImageUrl(item),
      };
    });
    recordSourceSuccess(source.id);
    return items;
  } catch (err) {
    recordSourceFailure(source.id);
    return [];
  }
}

export async function fetchCategory(category: CategorySlug): Promise<FeedResponse> {
  const cacheKey = `feed:${category}`;
  const cached = cacheGet<FeedResponse>(cacheKey);
  if (cached) {
    return { ...cached, meta: { ...cached.meta, fromCache: true } };
  }

  const sources = getSourcesForCategory(category);
  const results = await Promise.all(sources.map(fetchSource));
  const allItems = results.flat();
  const unavailable = sources
    .filter((_, i) => results[i].length === 0)
    .map(s => s.name);

  let items = allItems
    .filter(i => i.title && i.title !== '(başlıksız)')
    .sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);

  if (items.length === 0) {
    items = getDemoDataForCategory(category).sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);
  }

  const response: FeedResponse = {
    items,
    meta: {
      category,
      fetchedAt: Date.now(),
      sourceCount: sources.length,
      unavailable,
      fromCache: false,
      total: items.length,
    },
  };

  cacheSet(cacheKey, response, CACHE_TTL_MS);
  return response;
}

// Tüm kategorileri paralel çeker, TEK response döner.
// Client-side filter için optimize. Promise.allSettled ile bir kaynağın
// fail olması diğerlerini bloklamaz. 8s toplam timeout her kategori için.
export interface AllFeedsResponse {
  items: NewsItem[];                       // tüm kategorilerden birleşik, tarih sıralı
  byCategory: Record<string, NewsItem[]>;   // client-side anlık filter için
  meta: {
    fetchedAt: number;
    fromCache: boolean;
    sourceCount: number;
    unavailable: string[];                  // tüm fail olan kaynaklar
    categoryCounts: Record<string, number>;
    total: number;
  };
}

const ALL_CATEGORIES: CategorySlug[] = [
  'gundem', 'ekonomi', 'spor', 'teknoloji', 'politika',
  'dunya', 'kultur-sanat', 'saglik', 'cevre', 'egitim',
];

export async function fetchAllCategories(): Promise<AllFeedsResponse> {
  const cacheKey = 'feed:all';
  const cached = cacheGet<AllFeedsResponse>(cacheKey);
  if (cached) {
    return { ...cached, meta: { ...cached.meta, fromCache: true } };
  }

  // Her kategoriyi paralel çek
  const categoryResults = await Promise.allSettled(
    ALL_CATEGORIES.map(cat => fetchCategory(cat))
  );

  const byCategory: Record<string, NewsItem[]> = {};
  const unavailable: string[] = [];
  const categoryCounts: Record<string, number> = {};
  let totalItems = 0;

  categoryResults.forEach((result, idx) => {
    const cat = ALL_CATEGORIES[idx];
    if (result.status === 'fulfilled') {
      byCategory[cat] = result.value.items;
      categoryCounts[cat] = result.value.items.length;
      totalItems += result.value.items.length;
      result.value.meta.unavailable.forEach(name => {
        if (!unavailable.includes(name)) unavailable.push(name);
      });
    } else {
      byCategory[cat] = [];
      categoryCounts[cat] = 0;
    }
  });

  // Birleşik liste, tarih sıralı
  const allItems: NewsItem[] = Object.values(byCategory)
    .flat()
    .sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);

  const response: AllFeedsResponse = {
    items: allItems,
    byCategory,
    meta: {
      fetchedAt: Date.now(),
      fromCache: false,
      sourceCount: SOURCES.length,
      unavailable,
      categoryCounts,
      total: totalItems,
    },
  };

  cacheSet(cacheKey, response, CACHE_TTL_MS);
  return response;
}

export async function fetchBreaking(limit = 10): Promise<NewsItem[]> {
  const cacheKey = `breaking:${limit}`;
  const cached = cacheGet<NewsItem[]>(cacheKey);
  if (cached) return cached;

  const all = await fetchAllCategories();

  const breaking = all.items
    .filter(i => i.publishedTimestamp > Date.now() - 6 * 60 * 60 * 1000)
    .slice(0, limit);

  const final = breaking.length > 0 ? breaking : all.items.slice(0, limit);
  cacheSet(cacheKey, final, CACHE_TTL_MS);
  return final;
}
