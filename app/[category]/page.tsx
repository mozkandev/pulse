import { redirect } from 'next/navigation';

// Tüm kategoriler artık tek sayfada (client-side filter). Eski URL'ler
// buraya gelirse ana sayfaya yönlendir.
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  // İstersen ileride query string ile başlangıç kategorisi seçtirilebilir.
  // Şimdilik basit yönlendirme.
  redirect(`/?cat=${category}`);
}
