import type { Source, SourceHealth } from './types';

export const SOURCES: Source[] = [
  // Gündem
  { id: 'aa-guncel', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=guncel', category: 'gundem' },
  { id: 'ntv-gundem', name: 'NTV', url: 'https://www.ntv.com.tr/gundem.rss', category: 'gundem' },
  { id: 'bbc-tr', name: 'BBC Türkçe', url: 'https://feeds.bbci.co.uk/turkce/rss.xml', category: 'gundem' },
  { id: 'euronews-tr', name: 'Euronews TR', url: 'https://tr.euronews.com/rss', category: 'gundem' },

  // Ekonomi
  { id: 'bloomberght', name: 'Bloomberg HT', url: 'https://www.bloomberght.com/rss', category: 'ekonomi' },
  { id: 'aa-ekonomi', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=ekonomi', category: 'ekonomi' },

  // Spor
  { id: 'fanatik', name: 'Fanatik', url: 'https://www.fanatik.com.tr/rss/anasayfa.xml', category: 'spor' },
  { id: 'trtspor', name: 'TRT Spor', url: 'https://www.trtspor.com.tr/rss/anasayfa.xml', category: 'spor' },

  // Teknoloji
  { id: 'webrazzi', name: 'Webrazzi', url: 'https://webrazzi.com/feed', category: 'teknoloji' },
  { id: 'chip', name: 'Chip', url: 'https://www.chip.com.tr/rss', category: 'teknoloji' },

  // Politika
  { id: 'aa-siyaset', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=politika', category: 'politika' },

  // Dünya
  { id: 'bbc-tr-dunya', name: 'BBC Türkçe', url: 'https://feeds.bbci.co.uk/turkce/rss.xml', category: 'dunya' },
  { id: 'euronews-dunya', name: 'Euronews TR', url: 'https://tr.euronews.com/rss', category: 'dunya' },

  // Kültür-Sanat
  { id: 'aa-kultur', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=kultur-sanat', category: 'kultur-sanat' },

  // Sağlık
  { id: 'aa-saglik', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=saglik', category: 'saglik' },

  // Çevre
  { id: 'aa-cevre', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=cevre', category: 'cevre' },

  // Eğitim
  { id: 'aa-egitim', name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/rss/default?cat=egitim', category: 'egitim' },
];

export function getSourcesForCategory(category: string): Source[] {
  return SOURCES.filter(s => s.category === category);
}

export function getSourceById(id: string): Source | undefined {
  return SOURCES.find(s => s.id === id);
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

const sourceHealthMap = new Map<string, { status: 'ok' | 'fail'; lastFetch: number; errorCount: number }>();

export function recordSourceSuccess(sourceId: string) {
  const existing = sourceHealthMap.get(sourceId) || { status: 'ok' as const, lastFetch: 0, errorCount: 0 };
  sourceHealthMap.set(sourceId, { ...existing, status: 'ok', lastFetch: Date.now() });
}

export function recordSourceFailure(sourceId: string) {
  const existing = sourceHealthMap.get(sourceId) || { status: 'fail' as const, lastFetch: 0, errorCount: 0 };
  sourceHealthMap.set(sourceId, { ...existing, status: 'fail', lastFetch: Date.now(), errorCount: existing.errorCount + 1 });
}
