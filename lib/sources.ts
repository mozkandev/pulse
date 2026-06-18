import type { Source, SourceHealth } from './types';

export const SOURCES: Source[] = [
  // ===== GÜNDEM (TR) =====
  { id: 'aa-guncel', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=guncel', category: 'gundem' },
  { id: 'ntv-gundem', name: 'NTV', url: 'https://www.ntv.com.tr/gundem.rss', category: 'gundem' },
  { id: 'bbc-tr', name: 'BBC Türkçe', url: 'https://feeds.bbci.co.uk/turkce/rss.xml', category: 'gundem' },
  { id: 'euronews-tr', name: 'Euronews TR', url: 'https://tr.euronews.com/rss', category: 'gundem' },

  // ===== EKONOMİ (TR + global) =====
  { id: 'bloomberght', name: 'Bloomberg HT', url: 'https://www.bloomberght.com/rss', category: 'ekonomi' },
  { id: 'aa-ekonomi', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=ekonomi', category: 'ekonomi' },
  { id: 'bbc-business', name: 'BBC Business', url: 'https://feeds.bbci.co.uk/news/business/rss.xml', category: 'ekonomi' },

  // ===== SPOR (TR + EN) =====
  { id: 'fanatik', name: 'Fanatik', url: 'https://www.fanatik.com.tr/rss/anasayfa.xml', category: 'spor' },
  { id: 'trtspor', name: 'TRT Spor', url: 'https://www.trtspor.com.tr/rss/anasayfa.xml', category: 'spor' },
  { id: 'espn', name: 'ESPN', url: 'https://www.espn.com/espn/rss/news', category: 'spor' },
  { id: 'bbc-sport', name: 'BBC Sport', url: 'https://feeds.bbci.co.uk/sport/rss.xml', category: 'spor' },

  // ===== TEKNOLOJİ (TR + EN, ağırlıklı) =====
  { id: 'webrazzi', name: 'Webrazzi', url: 'https://webrazzi.com/feed', category: 'teknoloji' },
  { id: 'chip', name: 'Chip', url: 'https://www.chip.com.tr/rss', category: 'teknoloji' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: 'teknoloji' },
  { id: 'theverge', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'teknoloji' },
  { id: 'arstechnica', name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', category: 'teknoloji' },
  { id: 'macrumors', name: 'MacRumors', url: 'https://feeds.macrumors.com/MacRumors-All', category: 'teknoloji' },
  { id: 'hn-frontpage', name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: 'teknoloji' },
  { id: 'lobsters', name: 'Lobsters', url: 'https://lobste.rs/rss', category: 'teknoloji' },
  { id: 'bleepingcomputer', name: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/feed/', category: 'teknoloji' },
  { id: 'bbc-tech', name: 'BBC Technology', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', category: 'teknoloji' },

  // ===== POLİTİKA (TR) =====
  { id: 'aa-siyaset', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=politika', category: 'politika' },

  // ===== DÜNYA (global + TR) =====
  { id: 'bbc-world', name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', category: 'dunya' },
  { id: 'nyt-world', name: 'NYT World', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'dunya' },
  { id: 'aljazeera', name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', category: 'dunya' },
  { id: 'euronews-dunya', name: 'Euronews TR', url: 'https://tr.euronews.com/rss', category: 'dunya' },

  // ===== KÜLTÜR-SANAT (TR) =====
  { id: 'aa-kultur', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=kultur-sanat', category: 'kultur-sanat' },

  // ===== SAĞLIK (TR + EN) =====
  { id: 'aa-saglik', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=saglik', category: 'saglik' },
  { id: 'bbc-health', name: 'BBC Health', url: 'https://feeds.bbci.co.uk/news/health/rss.xml', category: 'saglik' },

  // ===== ÇEVRE (TR + EN) =====
  { id: 'aa-cevre', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=cevre', category: 'cevre' },
  { id: 'bbc-science', name: 'BBC Science', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml', category: 'cevre' },

  // ===== EĞİTİM (TR) =====
  { id: 'aa-egitim', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=egitim', category: 'egitim' },
];

export function getSourcesForCategory(category: string): Source[] {
  return SOURCES.filter(s => s.category === category);
}

export function getSourceById(id: string): Source | undefined {
  return SOURCES.find(s => s.id === id);
}

const sourceHealthMap = new Map<string, { status: 'ok' | 'fail'; lastFetch: number; errorCount: number }>();

export function recordSourceSuccess(sourceId: string) {
  const existing = sourceHealthMap.get(sourceId) || { status: 'ok' as const, lastFetch: 0, errorCount: 0 };
  sourceHealthMap.set(sourceId, { ...existing, status: 'ok', lastFetch: Date.now() });
}

export function recordSourceFailure(sourceId: string) {
  const existing = sourceHealthMap.get(sourceId) || { status: 'fail' as const, lastFetch: 0, errorCount: 0 };
  sourceHealthMap.set(sourceId, { ...existing, status: 'fail', lastFetch: Date.now(), errorCount: existing.errorCount + 1 });
}

export function getAllSourceHealth(): SourceHealth[] {
  return SOURCES.map(s => {
    const h = sourceHealthMap.get(s.id);
    return {
      id: s.id,
      name: s.name,
      url: s.url,
      category: s.category,
      status: h?.status || 'unknown',
      lastFetch: h?.lastFetch,
      errorCount: h?.errorCount || 0,
    };
  });
}

// Eğer health map boşsa (cold start), ilk çağrıda tüm kaynakları
// arka planda probe et ki sidebar ilk render'da doğru durumu gösterir.
let warmedUp = false;
export function ensureSourcesWarmedUp() {
  if (warmedUp) return;
  warmedUp = true;
  // Sadece cold start'ta, arka planda, fire-and-forget.
  Promise.allSettled(
    SOURCES.map(async (s) => {
      try {
        const res = await fetch(s.url, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        if (res.ok) recordSourceSuccess(s.id);
        else recordSourceFailure(s.id);
      } catch {
        recordSourceFailure(s.id);
      }
    })
  ).catch(() => {});
}
