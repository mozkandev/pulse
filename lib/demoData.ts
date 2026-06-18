import type { NewsItem, CategorySlug } from './types';

const now = Date.now();
const hours = (h: number) => now - h * 60 * 60 * 1000;
const days = (d: number) => now - d * 24 * 60 * 60 * 1000;

function makeItem(
  i: number,
  category: CategorySlug,
  source: string,
  sourceId: string,
  title: string,
  description: string,
  publishedAt: number,
  imageHue?: number
): NewsItem {
  const id = `demo-${category}-${i}`;
  const hue = imageHue ?? Math.floor((i * 47 + category.length * 13) % 360);
  return {
    id,
    title,
    link: `https://example.com/p/${id}`,
    description,
    source,
    sourceId,
    category,
    publishedAt: new Date(publishedAt).toISOString(),
    publishedTimestamp: publishedAt,
    isBreaking: now - publishedAt < 30 * 60 * 1000,
    imageUrl: `https://placehold.co/800x500/${hue.toString(16).padStart(3, '0')}1a/${hue.toString(16).padStart(3, '0')}33?text=${encodeURIComponent(source)}`,
  };
}

export const DEMO_DATA: NewsItem[] = [
  // GÜNDEM (4)
  makeItem(1, 'gundem', 'Anadolu Ajansı', 'aa-guncel', 'Cumhurbaşkanı kabine toplantısı sonrası açıklamalarda bulundu', 'Cumhurbaşkanı, başkanlık sarayında düzenlenen kabine toplantısının ardından basın mensuplarına gündeme ilişkin değerlendirmelerde bulundu. Toplantıda ekonomi, dış politika ve bölgesel gelişmeler ele alındı.', hours(0.4)),
  makeItem(2, 'gundem', 'NTV', 'ntv-gundem', 'İstanbul\'da metro hattında arıza: Seferler aksadı', 'Sabah saatlerinde İstanbul metrosunun M2 hattında yaşanan teknik arıza nedeniyle seferler geçici olarak durduruldu. Ekiplerin müdahalesi sonrası seferler normale döndü.', hours(2)),
  makeItem(3, 'gundem', 'BBC Türkçe', 'bbc-tr', 'Türkiye ile AB arasında yeni dönem: Vize liberalizasyonu masada', 'Ankara ile Brüksel arasında yeniden canlanan ilişkiler çerçevesinde vize liberalizasyonu sürecinin hızlandırılması gündemde. Diplomatik kaynaklar önümüzdeki ay yeni bir zirve planlandığını bildirdi.', hours(5)),
  makeItem(4, 'gundem', 'Euronews TR', 'euronews-tr', 'Eğitim sendikasından uyarı grevi: "Şartlar iyileştirilsin"', 'Türkiye genelinde on binlerce öğretmen, çalışma koşullarının iyileştirilmesi talebiyle bir günlük uyarı grevi gerçekleştirdi. Sendika yetkilileri yeni eylem takvimi açıkladı.', days(1)),

  // EKONOMİ (4)
  makeItem(1, 'ekonomi', 'Bloomberg HT', 'bloomberght', 'Merkez Bankası faiz kararı bekleniyor: Piyasalar nefesini tuttu', 'Para Politikası Kurulu toplantısı öncesi ekonomistler faiz indirimi beklentilerini yukarı yönlü revize etti. Analistler karar metnindeki ton değişikliğine odaklanacak.', hours(0.8)),
  makeItem(2, 'ekonomi', 'Anadolu Ajansı', 'aa-ekonomi', 'BIST 100 tarihi zirveyi güncelledi: Bankacılık öncü oldu', 'Borsa İstanbul\'da BIST 100 endeksi güçlü alımlarla tarihi zirvesini yeniledi. Bankacılık sektörü endeksi yüzde 3\'ün üzerinde değer kazandı.', hours(3)),
  makeItem(3, 'ekonomi', 'Bloomberg HT', 'bloomberght', 'Dolar/TL dar bantta seyrediyor: Gözler ABD verisinde', 'Kur sabah saatlerinde 32,80 seviyesinin hemen altında yatay bir seyir izliyor. ABD tarım dışı istihdam verisi öncesi küresel piyasalarda temkinli bir bekleyiş hakim.', hours(4)),
  makeItem(4, 'ekonomi', 'Anadolu Ajansı', 'aa-ekonomi', 'İhracat rakamları açıklandı: Yıllık bazda yüzde 8 artış', 'Türkiye\'nin ihracatı geçen yıla göre yüzde 8 artarak 22 milyar dolara ulaştı. Otomotiv ve kimya sektörleri öne çıktı.', days(2)),

  // SPOR (4)
  makeItem(1, 'spor', 'Fanatik', 'fanatik', 'Galatasaray Avrupa\'da kritik maça çıkıyor: 11 belli oldu', 'Sarı-kırmızılılar Şampiyonlar Ligi grup maçında yarın akşam sahne alacak. Teknik direktör maç öncesi kadro tercihini açıkladı, sürpriz isim kadroda.', hours(0.6)),
  makeItem(2, 'spor', 'TRT Spor', 'trtspor', 'Milli Takım\'da hedef 2026: Yeni kamp programı açıklandı', 'A Milli Futbol Takımı 2026 Dünya Kupası hazırlıkları kapsamında üç hazırlık maçı oynayacak. Kamp 15 gün sürecek, genç oyuncular da davet edildi.', hours(4)),
  makeItem(3, 'spor', 'Fanatik', 'fanatik', 'Basketbol süper liginde derbi günü: Fenerbahçe-Beşiktaş', 'ING Basketbol Süper Ligi\'nde haftanın derbisinde Fenerbahçe evinde Beşiktaş\'ı ağırlayacak. Karşılaşma 19:00\'da başlayacak.', hours(7)),
  makeItem(4, 'spor', 'TRT Spor', 'trtspor', 'Voleybol Kadın Milli Takımı\'ndan altın madalya', 'A Milli Kadın Voleybol Takımı, Avrupa Şampiyonası finalinde İtalya\'yı 3-1 mağlup ederek altın madalyanın sahibi oldu. Filenin Sultanları tarih yazdı.', days(1)),

  // TEKNOLOJİ (4)
  makeItem(1, 'teknoloji', 'Webrazzi', 'webrazzi', 'Yapay zeka destekli Türk girişimi 50 milyon dolar yatırım aldı', 'İstanbul merkezli yapay zeka girişimi, ABD\'li bir fondan 50 milyon dolarlık Seri B yatırımı aldığını duyurdu. Şirketin değerlemesi 500 milyon dolara ulaştı.', hours(1)),
  makeItem(2, 'teknoloji', 'Chip', 'chip', 'Apple yeni MacBook Pro modellerini tanıttı: M4 çipi öne çıkıyor', 'Apple, yeni nesil MacBook Pro modellerini duyurdu. M4 çipiyle donatılan cihazlar yüzde 25 daha hızlı performans vaat ediyor. Türkiye fiyatı belli oldu.', hours(5)),
  makeItem(3, 'teknoloji', 'Webrazzi', 'webrazzi', 'Türkiye\'de e-ticaret hacmi 1 trilyon TL\'yi aştı', 'Türkiye e-ticaret pazarı 2024 yılında yüzde 65 büyüyerek 1 trilyon TL hacmi aştı. Kategori bazında en hızlı büyüme elektronik ve giyimde.', hours(8)),
  makeItem(4, 'teknoloji', 'Chip', 'chip', 'PlayStation 6 sızıntıları: Çıkış tarihi ve özellikler netleşiyor', 'Sony\'nin yeni nesil konsolu PlayStation 6 hakkında yeni sızıntılar ortaya çıktı. 8K desteği, gerçek zamanlı ışın izleme ve 2027 çıkış tarihi iddiaları güçleniyor.', days(2)),

  // POLİTİKA (4)
  makeItem(1, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Meclis kürsüsünde yeni anayasa tartışması: Komisyon kuruluyor', 'TBMM Genel Kurulu\'nda yeni anayasa çalışmalarına ilişkin komisyon kurulması kararı kabul edildi. Komisyon 15 üyeden oluşacak, çalışmalara 1 ay içinde başlanacak.', hours(2)),
  makeItem(2, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Yerel seçim startı: Adaylık başvuruları bugün başladı', 'Yerel seçimler için adaylık başvuru süreci bugün başladı. YSK açıklamasına göre son başvuru tarihi 5 gün olarak belirlendi. Adaylık için 50 bin imza şartı aranıyor.', hours(6)),
  makeItem(3, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Diplomasi trafiği: Dışişleri Bakanı 4 ülkeyi ziyaret edecek', 'Dışişleri Bakanı önümüzdeki hafta Ukrayna, Romanya, Bulgaristan ve Yunanistan\'ı kapsayan dört ülkelik bir tur gerçekleştirecek. Gündemde enerji ve ticaret konuları var.', hours(12)),
  makeItem(4, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Siyasi partilerin seçim beyannamesi çalışmaları sürüyor', 'Tüm siyasi partiler seçim beyannamelerini hazırlık çalışmalarına hız verdi. Ekonomik vaatler ve sosyal politikalar ön plana çıkıyor.', days(3)),

  // DÜNYA (4)
  makeItem(1, 'dunya', 'BBC Türkçe', 'bbc-tr-dunya', 'Avrupa Birliği yaptırım kararı aldı: 7 kişi ve 3 kurum listede', 'AB Konseyi, insan hakları ihlalleri nedeniyle 7 kişi ve 3 kuruma yaptırım kararı aldı. Karar Resmi Gazete\'de yayımlandı, seyahat yasağı ve mal varlığı dondurma uygulanacak.', hours(1)),
  makeItem(2, 'dunya', 'Euronews TR', 'euronews-dunya', 'Almanya\'da koalisyon krizi: Hükümet düşebilir', 'Almanya\'da üç partili koalisyon hükümeti bütçe görüşmelerinde anlaşmazlığa düştü. Federal Meclis\'te yapılacak oylama öncesi hükümetin düşebileceği belirtiliyor.', hours(3)),
  makeItem(3, 'dunya', 'BBC Türkçe', 'bbc-tr-dunya', 'Orta Doğu\'da gerilim: ABD\'den kritik diplomatik hamle', 'Bölgede artan gerilim üzerine ABD Dışişleri Bakanı sürpriz bir ziyaret gerçekleştirdi. Taraflar arasında ateşkes görüşmeleri hızlandırılmaya çalışılıyor.', hours(7)),
  makeItem(4, 'dunya', 'Euronews TR', 'euronews-dunya', 'İklim zirvesi başladı: 60 ülke katılıyor', 'BM İklim Zirvesi bugün başladı. 60\'tan fazla ülke temsilcisinin katıldığı zirvede karbon emisyonu hedefleri ve fosil yakıt dönüşümü ele alınacak.', days(2)),

  // KÜLTÜR-SANAT (4)
  makeItem(1, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'İstanbul Film Festivali başladı: 80 film gösterilecek', '43. İstanbul Film Festivali bu akşam yapılan açılış galasıyla başladı. 10 gün sürecek festivalde 80 film sinemaseverlerle buluşacak. Yönetmenler kırmızı halıda yürüdü.', hours(1)),
  makeItem(2, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'Türk dizisi dünya listesinde: 7 ülkede yayında', 'Türkiye\'nin en çok izlenen dizilerinden biri, 7 ülkede eş zamanlı yayınlanmaya başladı. Yapım şirketi 2. sezon onayını da verdi.', hours(6)),
  makeItem(3, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'Tiyatro sezonu başlıyor: Devlet sahneleri 30 yeni oyun', 'Devlet tiyatroları yeni sezonda 30 yeni oyunu sahneleyecek. Sezon açılışı İstanbul Devlet Tiyatrosu\'nda yapılacak, biletler yarın satışa açılacak.', hours(14)),
  makeItem(4, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'Osmanlı eserleri restore edildi: 3 yıllık çalışma tamamlandı', 'Topkapı Sarayı\'ndaki 3 önemli Osmanlı eseri 3 yıllık titiz restorasyon çalışmasının ardından yeniden ziyarete açıldı. Eserler özel sergi salonunda sergileniyor.', days(4)),

  // SAĞLIK (4)
  makeItem(1, 'saglik', 'Anadolu Ajansı', 'aa-saglik', 'Yeni aşı çalışması: Türk bilim insanları geliştirdi', 'Türk bilim insanlarının geliştirdiği yeni aşı, uluslararası tıp dergisinde yayımlandı. Aşının klinik denemeleri 3 ay içinde başlayacak.', hours(3)),
  makeItem(2, 'saglik', 'Anadolu Ajansı', 'aa-saglik', 'Sağlık Bakanlığı\'ndan grip uyarısı: Aşı olun', 'Sağlık Bakanlığı sonbahar ayları öncesi grip aşısı uyarısı yaptı. Özellikle kronik rahatsızlığı bulunanların aşılanması istendi.', hours(8)),
  makeItem(3, 'saglik', 'Anadolu Ajansı', 'aa-saglik', 'Şehir hastanelerinde yeni dönem: 7/24 acil servis', 'Şehir hastanelerinin acil servisleri 7/24 kesintisiz hizmet verecek. Yeni uygulama bugün itibarıyla başladı, 60 hastane kapsamda.', hours(15)),
  makeItem(4, 'saglik', 'Anadolu Ajansı', 'aa-saglik', 'Kanser tedavisinde devrim: Yeni ilaç onaylandı', 'Türkiye İlaç ve Tıbbi Cihaz Kurumu, kanser tedavisinde kullanılan yeni bir ilacı onayladı. İlaç akıllı tedavi yöntemi olarak biliniyor.', days(2)),

  // ÇEVRE (4)
  makeItem(1, 'cevre', 'Anadolu Ajansı', 'aa-cevre', 'İklim değişikliği raporu: Türkiye\'nin durumu kritik', 'Türkiye İklim Değişikliği raporu yayımlandı. Sıcaklık ortalaması son 50 yılda 1,5 derece arttı, kuraklık riski en üst seviyede.', hours(2)),
  makeItem(2, 'cevre', 'Anadolu Ajansı', 'aa-cevre', 'Yenilenebilir enerji kapasitesi 30 GW\'ı aştı', 'Türkiye\'nin yenilenebilir enerji kurulu gücü 30 GW\'ı aşarak rekor kırdı. Güneş enerjisi öne çıktı, rüzgar da hızla büyüyor.', hours(10)),
  makeItem(3, 'cevre', 'Anadolu Ajansı', 'aa-cevre', 'Sıfır atık projesiyle 5 milyon ton atık geri dönüştürüldü', 'Çevre Bakanlığı\'nın sıfır atık projesi kapsamında 5 yılda 5 milyon ton atık geri dönüştürüldü. 81 ilde uygulama tamamlandı.', hours(18)),
  makeItem(4, 'cevre', 'Anadolu Ajansı', 'aa-cevre', 'Mavi vatan koruma operasyonu: 50 gemi katıldı', 'Türk Deniz Kuvvetleri\'nin düzenlediği Mavi Vatan koruma tatbikatı tamamlandı. 50 gemi ve 10 denizaltının katıldığı tatbikat 3 gün sürdü.', days(3)),

  // EĞİTİM (4)
  makeItem(1, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'YKS sonuçları açıklandı: 2.5 milyon adayın heyecanı sona erdi', 'Yükseköğretim Kurumları Sınavı sonuçları açıklandı. Türkiye genelinde 2.5 milyon adayın katıldığı sınavda en yüksek puanlı aday İstanbul\'dan çıktı.', hours(0.5)),
  makeItem(2, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'Yeni müfredat onaylandı: Yapay zeka dersi zorunlu oldu', 'Milli Eğitim Bakanlığı lise müfredatında köklü değişikliğe gitti. Yapay zeka ve kodlama dersi zorunlu hale getirildi, değişiklik 2025-2026 eğitim yılında uygulanacak.', hours(4)),
  makeItem(3, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'Üniversite yerleştirme sonuçları: 1.2 milyon öğrenci yerleşti', 'Ölçme, Seçme ve Yerleştirme Merkezi, üniversite yerleştirme sonuçlarını açıkladı. 1.2 milyon öğrenci lisans, önlisans ve açıköğretim programlarına yerleştirildi.', hours(12)),
  makeItem(4, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'Öğretmen atamaları: 20 bin yeni kadro ilan edildi', 'Milli Eğitim Bakanlığı 20 bin sözleşmeli öğretmen ataması için ilana çıktı. Başvurular 10 gün içinde alınacak, atamalar KPSS puanına göre yapılacak.', days(2)),
];

export function getDemoDataForCategory(category: string): NewsItem[] {
  return DEMO_DATA.filter(item => item.category === category);
}
