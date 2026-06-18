import type { NewsItem } from '@/lib/types';
import { NewsCard } from './NewsCard';

interface MasonryGridProps {
  items: NewsItem[];
  onItemClick?: (item: NewsItem) => void;
}

export function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-text-3">
        <p className="text-[14px]">Bu kategoride henüz haber bulunamadı.</p>
        <p className="text-[12px] text-text-4 mt-1">Yakında yeni içerikler eklenecek.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
      {items.map((item, i) => (
        <div key={item.id} className="break-inside-avoid mb-4">
          <NewsCard item={item} variant="standard" onClick={onItemClick} />
        </div>
      ))}
    </div>
  );
}
