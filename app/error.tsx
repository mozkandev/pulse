'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-[64px] font-semibold text-text-4 mb-2">!</div>
        <h1 className="text-h1 text-text text-[20px] mb-2">Bir şeyler ters gitti</h1>
        <p className="text-[13px] text-text-3 mb-5">
          {error.message || 'Beklenmeyen bir hata oluştu. Sayfayı yenilemeyi deneyin.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md bg-accent text-white text-[13px] font-medium hover:bg-accent-hi transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}
