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

// Yeni global kaynaklar için demo data — gerçek feed boşsa burası devreye girer.
// Mustafa "Elon Musk Cursor" örneği vermişti; buraya benzer örnekler koyduk ki
// teknoloji/dünya kategorileri her zaman dolu görünsün.
export const DEMO_DATA: NewsItem[] = [
  // ===== GÜNDEM (TR) =====
  makeItem(1, 'gundem', 'Anadolu Ajansı', 'aa-guncel', 'Cumhurbaşkanı kabine toplantısı sonrası açıklamalarda bulundu', 'Cumhurbaşkanı, başkanlık sarayında düzenlenen kabine toplantısının ardından basın mensuplarına gündeme ilişkin değerlendirmelerde bulundu. Toplantıda ekonomi, dış politika ve bölgesel gelişmeler ele alındı.', hours(0.4)),
  makeItem(2, 'gundem', 'NTV', 'ntv-gundem', "İstanbul'da metro hattında arıza: Seferler aksadı", 'Sabah saatlerinde İstanbul metrosunun M2 hattında yaşanan teknik arıza nedeniyle seferler geçici olarak durduruldu. Ekiplerin müdahalesi sonrası seferler normale döndü.', hours(2)),
  makeItem(3, 'gundem', 'BBC Türkçe', 'bbc-tr', 'Türkiye ile AB arasında yeni dönem: Vize liberalizasyonu masada', 'Ankara ile Brüksel arasında yeniden canlanan ilişkiler çerçevesinde vize liberalizasyonu sürecinin hızlandırılması gündemde. Diplomatik kaynaklar önümüzdeki ay yeni bir zirve planlandığını bildirdi.', hours(5)),
  makeItem(4, 'gundem', 'Euronews TR', 'euronews-tr', 'Eğitim sendikasından uyarı grevi: "Şartlar iyileştirilsin"', 'Türkiye genelinde on binlerce öğretmen, çalışma koşullarının iyileştirilmesi talebiyle bir günlük uyarı grevi gerçekleştirdi. Sendika yetkilileri yeni eylem takvimi açıkladı.', days(1)),
  makeItem(5, 'gundem', 'NTV', 'ntv-gundem', 'Hakkari\'de korkutan patlama: 2 yaralı', 'Hakkari merkezde bir iş yerinde meydana gelen patlamada 2 kişi yaralandı. Olay yerine sağlık ve jandarma ekipleri sevk edildi.', hours(0.2)),
  makeItem(6, 'gundem', 'Anadolu Ajansı', 'aa-guncel', 'Hava durumu uyarısı: İstanbul ve Ankara için kuvvetli yağış', 'Meteoroloji Genel Müdürlüğü, Marmara ve İç Anadolu bölgeleri için kuvvetli yağış uyarısı yaptı. Sel ve su baskını riskine karşı vatandaşlar uyarıldı.', hours(3.5)),

  // ===== EKONOMİ =====
  makeItem(1, 'ekonomi', 'Bloomberg HT', 'bloomberght', 'Merkez Bankası faiz kararı bekleniyor: Piyasalar nefesini tuttu', 'Para Politikası Kurulu toplantısı öncesi ekonomistler faiz indirimi beklentilerini yukarı yönlü revize etti. Analistler karar metnindeki ton değişikliğine odaklanacak.', hours(0.8)),
  makeItem(2, 'ekonomi', 'Anadolu Ajansı', 'aa-ekonomi', 'BIST 100 tarihi zirveyi güncelledi: Bankacılık öncü oldu', "Borsa İstanbul'da BIST 100 endeksi güçlü alımlarla tarihi zirvesini yeniledi. Bankacılık sektörü endeksi yüzde 3'ün üzerinde değer kazandı.", hours(3)),
  makeItem(3, 'ekonomi', 'Bloomberg HT', 'bloomberght', 'Dolar/TL dar bantta seyrediyor: Gözler ABD verisinde', 'Kur sabah saatlerinde 32,80 seviyesinin hemen altında yatay bir seyir izliyor. ABD tarım dışı istihdam verisi öncesi küresel piyasalarda temkinli bir bekleyiş hakim.', hours(4)),
  makeItem(4, 'ekonomi', 'Anadolu Ajansı', 'aa-ekonomi', 'İhracat rakamları açıklandı: Yıllık bazda yüzde 8 artış', "Türkiye'nin ihracatı geçen yıla göre yüzde 8 artarak 22 milyar dolara ulaştı. Otomotiv ve kimya sektörleri öne çıktı.", days(2)),
  makeItem(5, 'ekonomi', 'BBC Business', 'bbc-business', 'Federal Reserve signals pause in rate cuts amid inflation concerns', 'Fed officials indicated they may hold rates steady as core inflation remains sticky. Markets pared back expectations for a December cut, with Fed funds futures pricing 35% odds.', hours(2.5)),
  makeItem(6, 'ekonomi', 'Bloomberg HT', 'bloomberght', 'Altın gram fiyatı yeni rekor: 2.650 TL\'yi aştı', 'Ons altının küresel piyasalarda 2.380 doları aşmasıyla gram altın Türkiye\'de yeni tarihi zirvesini güncelledi. Uzmanlar yıl sonuna kadar 2.800 TL hedefini mümkün görüyor.', hours(6)),

  // ===== SPOR =====
  makeItem(1, 'spor', 'Fanatik', 'fanatik', "Galatasaray Avrupa'da kritik maça çıkıyor: 11 belli oldu", 'Sarı-kırmızılılar Şampiyonlar Ligi grup maçında yarın akşam sahne alacak. Teknik direktör maç öncesi kadro tercihini açıkladı, sürpriz isim kadroda.', hours(0.6)),
  makeItem(2, 'spor', 'TRT Spor', 'trtspor', "Milli Takım'da hedef 2026: Yeni kamp programı açıklandı", 'A Milli Futbol Takımı 2026 Dünya Kupası hazırlıkları kapsamında üç hazırlık maçı oynayacak. Kamp 15 gün sürecek, genç oyuncular da davet edildi.', hours(4)),
  makeItem(3, 'spor', 'Fanatik', 'fanatik', 'Basketbol süper liginde derbi günü: Fenerbahçe-Beşiktaş', "ING Basketbol Süper Ligi'nde haftanın derbisinde Fenerbahçe evinde Beşiktaş'ı ağırlayacak. Karşılaşma 19:00'da başlayacak.", hours(7)),
  makeItem(4, 'spor', 'TRT Spor', 'trtspor', "Voleybol Kadın Milli Takımı'ndan altın madalya", "A Milli Kadın Voleybol Takımı, Avrupa Şampiyonası finalinde İtalya'yı 3-1 mağlup ederek altın madalyanın sahibi oldu. Filenin Sultanları tarih yazdı.", days(1)),
  makeItem(5, 'spor', 'ESPN', 'espn', 'NBA Finals: Celtics-Lakers rematch set for Thursday primetime', 'The NBA Finals tip off Thursday with the league\'s most storied rivalry renewing. Jayson Tatum and LeBron James headline the marquee matchup at TD Garden.', hours(1.5)),
  makeItem(6, 'spor', 'BBC Sport', 'bbc-sport', 'Champions League final preview: Real Madrid vs Manchester City', 'Real Madrid defend their title against Manchester City at Wembley on Saturday. Bellingham and Haaland lead the line for their respective sides in the 21:00 kickoff.', hours(5)),

  // ===== TEKNOLOJİ (yeni global kaynaklar dahil) =====
  makeItem(1, 'teknoloji', 'Webrazzi', 'webrazzi', 'Yapay zeka destekli Türk girişimi 50 milyon dolar yatırım aldı', "İstanbul merkezli yapay zeka girişimi, ABD'li bir fondan 50 milyon dolarlık Seri B yatırımı aldığını duyurdu. Şirketin değerlemesi 500 milyon dolara ulaştı.", hours(1)),
  makeItem(2, 'teknoloji', 'Chip', 'chip', 'Apple yeni MacBook Pro modellerini tanıttı: M4 çipi öne çıkıyor', 'Apple, yeni nesil MacBook Pro modellerini duyurdu. M4 çipiyle donatılan cihazlar yüzde 25 daha hızlı performans vaat ediyor. Türkiye fiyatı belli oldu.', hours(5)),
  makeItem(3, 'teknoloji', 'Webrazzi', 'webrazzi', "Türkiye'de e-ticaret hacmi 1 trilyon TL'yi aştı", 'Türkiye e-ticaret pazarı 2024 yılında yüzde 65 büyüyerek 1 trilyon TL hacmi aştı. Kategori bazında en hızlı büyüme elektronik ve giyimde.', hours(8)),
  makeItem(4, 'teknoloji', 'Chip', 'chip', 'PlayStation 6 sızıntıları: Çıkış tarihi ve özellikler netleşiyor', "Sony'nin yeni nesil konsolu PlayStation 6 hakkında yeni sızıntılar ortaya çıktı. 8K desteği, gerçek zamanlı ışın izleme ve 2027 çıkış tarihi iddiaları güçleniyor.", days(2)),
  makeItem(5, 'teknoloji', 'TechCrunch', 'techcrunch', "Elon Musk's xAI acquires Anysphere (Cursor) in $30B deal", 'Elon Musk\'s xAI has agreed to acquire Anysphere, the maker of AI coding assistant Cursor, in a massive $30 billion all-stock deal. The acquisition marks xAI\'s boldest move yet into the developer tools market and signals a major consolidation in the AI coding space.', hours(0.3)),
  makeItem(6, 'teknoloji', 'The Verge', 'theverge', 'DeepSeek unveils Vision: open-source multimodal model that beats GPT-4o on benchmarks', 'Chinese AI lab DeepSeek released Vision, a new open-source multimodal model that achieves state-of-the-art performance on vision-language benchmarks. The release is available on Hugging Face with permissive licensing.', hours(0.8)),
  makeItem(7, 'teknoloji', 'Ars Technica', 'arstechnica', 'NASA picks Eric Schmidt\'s rocket company for Mars mission, setting up a race with SpaceX', 'NASA awarded a $4.4B contract to Eric Schmidt\'s secretive launch company for a 2028 Mars sample return mission. The decision directly challenges SpaceX\'s Starship-based architecture and signals new competition in the deep-space launch market.', hours(2)),
  makeItem(8, 'teknoloji', 'Hacker News', 'hn-frontpage', 'Show HN: I built a fully local AI agent that replaces my entire SaaS stack', 'A solo developer built a 100% local AI agent using open-source models that handles email, calendar, invoicing, and CRM. The system runs on a single M4 Mac mini and costs $0/month to operate.', hours(4)),
  makeItem(9, 'teknoloji', 'MacRumors', 'macrumors', 'iOS 19 leak reveals new AI-powered Siri with on-device LLM', 'Internal iOS 19 build strings reference a new "Siri LLM" framework that runs entirely on the Neural Engine. Apple plans to ship the feature with iPhone 17 Pro models in September.', hours(6)),
  makeItem(10, 'teknoloji', 'BleepingComputer', 'bleepingcomputer', 'Critical zero-day in OpenSSH affects millions of Linux servers', 'Security researchers disclosed CVE-2026-4129, a critical remote code execution vulnerability in OpenSSH that allows unauthenticated attackers to gain root access. Patches are available for major distributions.', hours(3)),
  makeItem(11, 'teknoloji', 'BBC Technology', 'bbc-tech', 'EU passes landmark AI Act amendments: open-source models get exemption', 'The European Parliament voted to exempt most open-source AI models from the AI Act\'s strictest requirements, in a win for the open-source community. The vote came after intense lobbying from Mistral, Meta, and the Linux Foundation.', hours(7)),
  makeItem(12, 'teknoloji', 'Lobsters', 'lobsters', 'Why SQLite is beating Postgres for AI workloads (2026)', 'A deep technical essay argues that vector + small-data workloads are shifting back to SQLite due to its simpler operational story and now-competitive vector search performance via sqlite-vec.', hours(11)),

  // ===== POLİTİKA =====
  makeItem(1, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Meclis kürsüsünde yeni anayasa tartışması: Komisyon kuruluyor', 'TBMM Genel Kurulu\'nda yeni anayasa çalışmalarına ilişkin komisyon kurulması kararı kabul edildi. Komisyon 15 üyeden oluşacak, çalışmalara 1 ay içinde başlanacak.', hours(2)),
  makeItem(2, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Yerel seçim startı: Adaylık başvuruları bugün başladı', 'Yerel seçimler için adaylık başvuru süreci bugün başladı. YSK açıklamasına göre son başvuru tarihi 5 gün olarak belirlendi. Adaylık için 50 bin imza şartı aranıyor.', hours(6)),
  makeItem(3, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Diplomasi trafiği: Dışişleri Bakanı 4 ülkeyi ziyaret edecek', 'Dışişleri Bakanı önümüzdeki hafta Ukrayna, Romanya, Bulgaristan ve Yunanistan\'ı kapsayan dört ülkelik bir tur gerçekleştirecek. Gündemde enerji ve ticaret konuları var.', hours(12)),
  makeItem(4, 'politika', 'Anadolu Ajansı', 'aa-siyaset', 'Siyasi partilerin seçim beyannamesi çalışmaları sürüyor', 'Tüm siyasi partiler seçim beyannamelerini hazırlık çalışmalarına hız verdi. Ekonomik vaatler ve sosyal politikalar ön plana çıkıyor.', days(3)),

  // ===== DÜNYA =====
  makeItem(1, 'dunya', 'BBC World', 'bbc-world', 'UN Security Council passes Gaza ceasefire resolution after US abstains', 'The UN Security Council passed a resolution demanding an immediate and sustained ceasefire in Gaza after the United States abstained from the vote. The 14-0 vote marks a major shift in US Middle East policy.', hours(0.5)),
  makeItem(2, 'dunya', 'NYT World', 'nyt-world', 'Putin and Xi announce joint military exercises in South China Sea', 'Russia and China unveiled plans for joint naval exercises in the disputed South China Sea next month, signaling deepening military cooperation amid tensions with the US and its allies.', hours(1.5)),
  makeItem(3, 'dunya', 'Al Jazeera', 'aljazeera', 'EU agrees to open accession talks with Ukraine and Moldova', 'European Union leaders agreed to formally open EU accession negotiations with Ukraine and Moldova, in a historic decision that marks the first expansion of accession talks since 2013.', hours(3)),
  makeItem(4, 'dunya', 'BBC Türkçe', 'bbc-tr-dunya', 'Avrupa Birliği yaptırım kararı aldı: 7 kişi ve 3 kurum listede', 'AB Konseyi, insan hakları ihlalleri nedeniyle 7 kişi ve 3 kuruma yaptırım kararı aldı. Karar Resmi Gazete\'de yayımlandı, seyahat yasağı ve mal varlığı dondurma uygulanacak.', hours(4)),
  makeItem(5, 'dunya', 'NYT World', 'nyt-world', 'Argentina pulls out of BRICS, citing economic sovereignty concerns', 'Argentina formally withdrew from the BRICS bloc, becoming the first member to leave the group. President Milei cited concerns about the alliance\'s impact on Argentine economic sovereignty.', hours(7)),
  makeItem(6, 'dunya', 'Euronews TR', 'euronews-dunya', "Almanya'da koalisyon krizi: Hükümet düşebilir", "Almanya'da üç partili koalisyon hükümeti bütçe görüşmelerinde anlaşmazlığa düştü. Federal Meclis'te yapılacak oylama öncesi hükümetin düşebileceği belirtiliyor.", hours(5)),
  makeItem(7, 'dunya', 'Al Jazeera', 'aljazeera', 'India becomes world\'s most populous country with 1.44 billion people', 'India officially surpassed China to become the world\'s most populous nation. The milestone carries significant implications for global labor markets, resource consumption, and geopolitical influence.', days(1)),
  makeItem(8, 'dunya', 'BBC World', 'bbc-world', 'COP31: Climate summit host country to be decided in unprecedented vote', 'For the first time in UN climate conference history, the host country for COP31 will be decided by a vote among member states, as Australia and Turkey both push competing bids.', days(2)),

  // ===== KÜLTÜR-SANAT =====
  makeItem(1, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'İstanbul Film Festivali başladı: 80 film gösterilecek', '43. İstanbul Film Festivali bu akşam yapılan açılış galasıyla başladı. 10 gün sürecek festivalde 80 film sinemaseverlerle buluşacak. Yönetmenler kırmızı halıda yürüdü.', hours(1)),
  makeItem(2, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'Türk dizisi dünya listesinde: 7 ülkede yayında', 'Türkiye\'nin en çok izlenen dizilerinden biri, 7 ülkede eş zamanlı yayınlanmaya başladı. Yapım şirketi 2. sezon onayını da verdi.', hours(6)),
  makeItem(3, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'Tiyatro sezonu başlıyor: Devlet sahneleri 30 yeni oyun', 'Devlet tiyatroları yeni sezonda 30 yeni oyunu sahneleyecek. Sezon açılışı İstanbul Devlet Tiyatrosu\'nda yapılacak, biletler yarın satışa açılacak.', hours(14)),
  makeItem(4, 'kultur-sanat', 'Anadolu Ajansı', 'aa-kultur', 'Osmanlı eserleri restore edildi: 3 yıllık çalışma tamamlandı', 'Topkapı Sarayı\'ndaki 3 önemli Osmanlı eseri 3 yıllık titiz restorasyon çalışmasının ardından yeniden ziyarete açıldı. Eserler özel sergi salonunda sergileniyor.', days(4)),

  // ===== SAĞLIK =====
  makeItem(1, 'saglik', 'Anadolu Ajansı', 'aa-saglik', 'Yeni aşı çalışması: Türk bilim insanları geliştirdi', 'Türk bilim insanlarının geliştirdiği yeni aşı, uluslararası tıp dergisinde yayımlandı. Aşının klinik denemeleri 3 ay içinde başlayacak.', hours(3)),
  makeItem(2, 'saglik', 'Anadolu Ajansı', 'aa-saglik', "Sağlık Bakanlığı'ndan grip uyarısı: Aşı olun", 'Sağlık Bakanlığı sonbahar ayları öncesi grip aşısı uyarısı yaptı. Özellikle kronik rahatsızlığı bulunanların aşılanması istendi.', hours(8)),
  makeItem(3, 'saglik', 'BBC Health', 'bbc-health', 'WHO declares mpox global health emergency as new strain spreads', 'The World Health Organization declared mpox a Public Health Emergency of International Concern after a new, more transmissible strain was detected in 14 countries. The declaration unlocks global coordination and funding for response.', hours(2.5)),
  makeItem(4, 'saglik', 'Anadolu Ajansı', 'aa-saglik', 'Şehir hastanelerinde yeni dönem: 7/24 acil servis', 'Şehir hastanelerinin acil servisleri 7/24 kesintisiz hizmet verecek. Yeni uygulama bugün itibarıyla başladı, 60 hastane kapsamda.', hours(15)),
  makeItem(5, 'saglik', 'Anadolu Ajansı', 'aa-saglik', 'Kanser tedavisinde devrim: Yeni ilaç onaylandı', 'Türkiye İlaç ve Tıbbi Cihaz Kurumu, kanser tedavisinde kullanılan yeni bir ilacı onayladı. İlaç akıllı tedavi yöntemi olarak biliniyor.', days(2)),

  // ===== ÇEVRE =====
  makeItem(1, 'cevre', 'Anadolu Ajansı', 'aa-cevre', "İklim değişikliği raporu: Türkiye'nin durumu kritik", 'Türkiye İklim Değişikliği raporu yayımlandı. Sıcaklık ortalaması son 50 yılda 1,5 derece arttı, kuraklık riski en üst seviyede.', hours(2)),
  makeItem(2, 'cevre', 'Anadolu Ajansı', 'aa-cevre', 'Yenilenebilir enerji kapasitesi 30 GW\'ı aştı', 'Türkiye\'nin yenilenebilir enerji kurulu gücü 30 GW\'ı aşarak rekor kırdı. Güneş enerjisi öne çıktı, rüzgar da hızla büyüyor.', hours(10)),
  makeItem(3, 'cevre', 'BBC Science', 'bbc-science', 'Antarctic sea ice reaches record low for third consecutive year', 'Antarctic sea ice extent fell to a record low for the third year in a row, confirming a long-term decline that scientists say is now irreversible. The data has major implications for global sea level rise projections.', hours(4)),
  makeItem(4, 'cevre', 'Anadolu Ajansı', 'aa-cevre', 'Sıfır atık projesiyle 5 milyon ton atık geri dönüştürüldü', 'Çevre Bakanlığı\'nın sıfır atık projesi kapsamında 5 yılda 5 milyon ton atık geri dönüştürüldü. 81 ilde uygulama tamamlandı.', hours(18)),
  makeItem(5, 'cevre', 'Anadolu Ajansı', 'aa-cevre', 'Mavi vatan koruma operasyonu: 50 gemi katıldı', "Türk Deniz Kuvvetleri'nin düzenlediği Mavi Vatan koruma tatbikatı tamamlandı. 50 gemi ve 10 denizaltının katıldığı tatbikat 3 gün sürdü.", days(3)),

  // ===== EĞİTİM =====
  makeItem(1, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'YKS sonuçları açıklandı: 2.5 milyon adayın heyecanı sona erdi', "Yükseköğretim Kurumları Sınavı sonuçları açıklandı. Türkiye genelinde 2.5 milyon adayın katıldığı sınavda en yüksek puanlı aday İstanbul'dan çıktı.", hours(0.5)),
  makeItem(2, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'Yeni müfredat onaylandı: Yapay zeka dersi zorunlu oldu', 'Milli Eğitim Bakanlığı lise müfredatında köklü değişikliğe gitti. Yapay zeka ve kodlama dersi zorunlu hale getirildi, değişiklik 2025-2026 eğitim yılında uygulanacak.', hours(4)),
  makeItem(3, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'Üniversite yerleştirme sonuçları: 1.2 milyon öğrenci yerleşti', 'Ölçme, Seçme ve Yerleştirme Merkezi, üniversite yerleştirme sonuçlarını açıkladı. 1.2 milyon öğrenci lisans, önlisans ve açıköğretim programlarına yerleştirildi.', hours(12)),
  makeItem(4, 'egitim', 'Anadolu Ajansı', 'aa-egitim', 'Öğretmen atamaları: 20 bin yeni kadro ilan edildi', 'Milli Eğitim Bakanlığı 20 bin sözleşmeli öğretmen ataması için ilana çıktı. Başvurular 10 gün içinde alınacak, atamalar KPSS puanına göre yapılacak.', days(2)),
];

export function getDemoDataForCategory(category: string): NewsItem[] {
  return DEMO_DATA.filter(item => item.category === category);
}
