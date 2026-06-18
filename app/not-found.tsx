import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-display text-text-4 text-[80px] leading-none mb-3">404</div>
        <h1 className="text-h1 text-text text-[20px] mb-2">Sayfa bulunamadı</h1>
        <p className="text-[13px] text-text-3 mb-5">
          Aradığınız kategori mevcut değil.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-md bg-accent text-white text-[13px] font-medium hover:bg-accent-hi transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
