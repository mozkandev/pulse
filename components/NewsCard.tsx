'use client';

import type { NewsItem } from '@/lib/types';
import { categoryName, categoryAccent } from '@/lib/types';

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'az önce';
  if (min < 60) return `${min}dk`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}sa`;
  const d = Math.floor(h / 24);
  return `${d}g`;
}

// Kaynak adından tutarlı ama çeşitli gradient üret.
// Aynı kaynak hep aynı rengi alır (hash-based), farklı kaynaklar farklı renkler.
function gradientForSource(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const palettes: [string, string][] = [
    ['#1e1b4b', '#5e6ad2'], // indigo
    ['#1e3a8a', '#3b82f6'], // blue
    ['#831843', '#ec4899'], // pink
    ['#3f1d38', '#a855f7'], // purple
    ['#064e3b', '#10b981'], // emerald
    ['#7c2d12', '#f97316'], // orange
    ['#7f1d1d', '#ef4444'], // red
    ['#0c4a6e', '#06b6d4'], // cyan
    ['#365314', '#84cc16'], // lime
    ['#713f12', '#eab308'], // amber
    ['#1e293b', '#64748b'], // slate
  ];
  const [from, to] = palettes[Math.abs(hash) % palettes.length];
  // İki köşeli 135deg gradient — kaynak adının baş harfleri üstte
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
}

function sourceInitials(name: string): string {
  const parts = name.split(/[\s&]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function ImageArea({ item, large = false }: { item: NewsItem; large?: boolean }) {
  if (item.imageUrl) {
    return (
      <img
        src={item.imageUrl}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-[${large ? '1.02' : '1.03'}] transition-transform duration-500`}
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          t.style.display = 'none';
          t.parentElement?.classList.add('image-fallback-active');
        }}
      />
    );
  }
  return null;
}

// Image yokken veya yüklenemediğinde gradient + initial göster
function PlaceholderGradient({ item, large = false }: { item: NewsItem; large?: boolean }) {
  const initials = sourceInitials(item.source);
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: gradientForSource(item.source) }}
    >
      <div
        className={`absolute inset-0 opacity-50 ${large ? '' : ''}`}
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)',
        }}
      />
      <span
        className={`relative ${large ? 'text-[80px] sm:text-[120px]' : 'text-[40px] sm:text-[52px]'} font-bold text-white/30 tracking-tighter select-none`}
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.05em' }}
      >
        {initials}
      </span>
    </div>
  );
}

interface NewsCardProps {
  item: NewsItem;
  variant?: 'featured' | 'standard' | 'compact';
  onClick?: (item: NewsItem) => void;
}

export function NewsCard({ item, variant = 'standard', onClick }: NewsCardProps) {
  const accent = categoryAccent[item.category];

  if (variant === 'featured') {
    return (
      <article
        onClick={() => onClick?.(item)}
        className="group relative cursor-pointer rounded-2xl bg-panel border border-border overflow-hidden card-hover"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          <div className="md:col-span-3 aspect-[16/10] md:aspect-auto md:min-h-[320px] bg-surface relative overflow-hidden">
            <ImageArea item={item} large />
            <PlaceholderGradient item={item} large />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {item.isBreaking && (
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-break text-white text-[10px] font-semibold rounded tracking-[0.1em] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white breaking-pulse" />
                Son Dakika
              </span>
            )}
          </div>
          <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent }}
                />
                <span className="text-eyebrow text-text-2">{categoryName[item.category]}</span>
                <span className="text-text-4">·</span>
                <span className="text-[11px] text-text-3">{item.source}</span>
              </div>
              <h2 className="text-h1 text-text text-[24px] sm:text-[28px] leading-[1.1] mb-3 group-hover:text-text transition-colors">
                {item.title}
              </h2>
              <p className="text-[14px] text-text-3 leading-[1.6] line-clamp-4">
                {item.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-[11px] text-text-4">
              <span className="font-mono tabular-nums">{timeAgo(item.publishedTimestamp)}</span>
              <span className="text-accent-hi opacity-0 group-hover:opacity-100 transition-opacity">
                Oku →
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={() => onClick?.(item)}
        className="group cursor-pointer p-3.5 rounded-lg border border-border-subtle bg-panel/50 hover:bg-surface hover:border-border transition-colors"
      >
        <div className="flex items-center gap-1.5 text-[10px] text-text-3 mb-1.5">
          <span className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <span className="uppercase tracking-wider font-medium">{categoryName[item.category]}</span>
          <span className="text-text-4">·</span>
          <span>{item.source}</span>
          {item.isBreaking && <span className="ml-1 px-1 py-0.5 bg-break text-white text-[8px] font-semibold rounded">BREAK</span>}
        </div>
        <h3 className="text-[13px] text-text leading-[1.35] line-clamp-2 group-hover:text-text-2 transition-colors">
          {item.title}
        </h3>
        <div className="mt-1.5 text-[10px] text-text-4 font-mono tabular-nums">{timeAgo(item.publishedTimestamp)}</div>
      </article>
    );
  }

  // standard
  return (
    <article
      onClick={() => onClick?.(item)}
      className="group cursor-pointer rounded-xl bg-panel border border-border overflow-hidden card-hover flex flex-col"
    >
      <div className="aspect-[16/9] bg-surface relative overflow-hidden">
        <ImageArea item={item} />
        <PlaceholderGradient item={item} />
        {item.isBreaking && (
          <span className="absolute top-2.5 left-2.5 px-1.5 py-0.5 bg-break text-white text-[9px] font-semibold rounded tracking-wider uppercase flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-white breaking-pulse" />
            Son Dakika
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-[10px] text-text-3 mb-2">
          <span className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <span className="uppercase tracking-wider font-medium">{categoryName[item.category]}</span>
          <span className="text-text-4">·</span>
          <span>{item.source}</span>
        </div>
        <h3 className="text-h2 text-text text-[15px] sm:text-[16px] leading-[1.25] mb-2 line-clamp-3 group-hover:text-text-2 transition-colors">
          {item.title}
        </h3>
        <p className="text-[12.5px] text-text-3 leading-[1.55] line-clamp-3 mb-3 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between text-[10px] text-text-4 pt-2 border-t border-border-subtle">
          <span className="font-mono tabular-nums">{timeAgo(item.publishedTimestamp)}</span>
          <span className="text-accent-hi opacity-0 group-hover:opacity-100 transition-opacity">Oku →</span>
        </div>
      </div>
    </article>
  );
}
