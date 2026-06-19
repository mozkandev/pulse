export type CategorySlug =
  | 'gundem'
  | 'ekonomi'
  | 'spor'
  | 'teknoloji'
  | 'politika'
  | 'dunya'
  | 'kultur-sanat'
  | 'saglik'
  | 'cevre'
  | 'egitim';

export const CATEGORY_SLUGS: CategorySlug[] = [
  'gundem', 'ekonomi', 'spor', 'teknoloji', 'politika',
  'dunya', 'kultur-sanat', 'saglik', 'cevre', 'egitim',
];

export interface Source {
  id: string;
  name: string;
  url: string;
  category: CategorySlug;
  /**
   * Manuel logo URL — Wikimedia/brand CDN'den.
   * Belirtilmemişse `logoDomain` clearbit'e gider, o da yoksa gradient placeholder.
   */
  logoUrl?: string;
  /**
   * Clearbit fallback domain — örn. "espn.com".
   * `logoUrl` yoksa kullanılır.
   */
  logoDomain?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  description: string;
  source: string;
  sourceId: string;
  category: CategorySlug;
  publishedAt: string;       // ISO
  publishedTimestamp: number; // ms epoch
  isBreaking: boolean;
  imageUrl?: string;
}

export interface FeedMeta {
  category: CategorySlug;
  fetchedAt: number;
  sourceCount: number;
  unavailable: string[];
  fromCache: boolean;
  total: number;
}

export interface FeedResponse {
  items: NewsItem[];
  meta: FeedMeta;
}

export interface SourceHealth {
  id: string;
  name: string;
  url: string;
  category: CategorySlug;
  status: 'ok' | 'fail' | 'unknown';
  lastFetch?: number;
  errorCount: number;
}

export interface SourcesResponse {
  sources: SourceHealth[];
  lastUpdate: number;
}

export const categoryName: Record<CategorySlug, string> = {
  'gundem': 'Gündem',
  'ekonomi': 'Ekonomi',
  'spor': 'Spor',
  'teknoloji': 'Teknoloji',
  'politika': 'Politika',
  'dunya': 'Dünya',
  'kultur-sanat': 'Kültür & Sanat',
  'saglik': 'Sağlık',
  'cevre': 'Çevre',
  'egitim': 'Eğitim',
};

export const categoryAccent: Record<CategorySlug, string> = {
  'gundem': '#5e6ad2',
  'ekonomi': '#10b981',
  'spor': '#f59e0b',
  'teknoloji': '#7170ff',
  'politika': '#ec4899',
  'dunya': '#06b6d4',
  'kultur-sanat': '#a78bfa',
  'saglik': '#22c55e',
  'cevre': '#84cc16',
  'egitim': '#fb923c',
};

export const categoryIcon: Record<CategorySlug, string> = {
  'gundem': '◉',
  'ekonomi': '₺',
  'spor': '⚽',
  'teknoloji': '⌬',
  'politika': '▲',
  'dunya': '◐',
  'kultur-sanat': '✦',
  'saglik': '✚',
  'cevre': '❀',
  'egitim': '◈',
};
