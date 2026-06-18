'use client';

import { useState, useEffect, useRef } from 'react';
import type { NewsItem } from '@/lib/types';
import { categoryName, categoryAccent } from '@/lib/types';

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'az önce';
  if (min < 60) return `${min} dakika önce`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} saat önce`;
  const d = Math.floor(h / 24);
  return `${d} gün önce`;
}

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NewsModal({ item, onClose }: { item: NewsItem | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const accent = categoryAccent[item.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-panel border border-border rounded-2xl shadow-2xl"
      >
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-border-subtle bg-panel/95 backdrop-blur">
          <div className="flex items-center gap-2.5 text-[11px] text-text-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: accent }}
            />
            <span className="font-semibold uppercase tracking-wider text-text-2">
              {categoryName[item.category]}
            </span>
            <span className="text-text-4">·</span>
            <span>{item.source}</span>
            {item.isBreaking && (
              <>
                <span className="text-text-4">·</span>
                <span className="px-1.5 py-0.5 bg-break text-white text-[9px] font-semibold rounded tracking-wider">
                  SON DAKİKA
                </span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-text-3 hover:text-text hover:bg-surface transition-colors"
            aria-label="Kapat"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <article className="px-6 py-6 sm:px-8 sm:py-8">
          <h1 className="text-h1 text-text text-[28px] sm:text-[34px] leading-[1.1] mb-4">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-[12px] text-text-3 mb-6">
            <span className="font-mono tabular-nums">{formatDate(item.publishedTimestamp)}</span>
            <span className="text-text-4">·</span>
            <span>{timeAgo(item.publishedTimestamp)}</span>
            <span className="text-text-4">·</span>
            <span>{item.source}</span>
          </div>

          {item.imageUrl && (
            <div className="mb-6 rounded-xl overflow-hidden border border-border-subtle bg-surface aspect-[16/9]">
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-text-2 text-[15px] leading-[1.7]">
            <p>{item.description || 'Bu haber için ek açıklama bulunmuyor.'}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-[12px] text-text-4">
              İçerik kaynağın sitesinden alınmıştır.
            </p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-white text-[13px] font-medium hover:bg-accent-hi transition-colors"
            >
              Kaynağa git
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
