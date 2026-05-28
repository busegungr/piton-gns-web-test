# Piton & GNS Web Test

PITON Technology aday case study — **DemoQA UI Otomasyonu** (Playwright + JavaScript, Page Object Model) ve **kurumsal sitelerde keşif testleri** (gnsmetal.com, piton.com.tr).

## Kapsam

### Bölüm A — UI Otomasyonu (DemoQA)
- **Hedef:** https://demoqa.com/
- **Modüller:** `Elements`, `Forms`, `Widgets`
- **Toplam senaryo:** **25** (17 pozitif + 8 negatif), modül başına 5–10 sınırında
- **Teknoloji:** Playwright + JavaScript, POM mimarisi, custom fixture'lar

### Bölüm B — Keşif Testi (Manuel)
- **Hedefler:** https://www.gnsmetal.com/home, https://piton.com.tr/
- **Yaklaşım:** Exploratory testing → UX, navigasyon, broken link, form validasyon, responsive, performans
- **Çıktı:** `docs/` altında 3 formatta keşif test raporu
  - `docs/PTN-GNS-Manuel-KeşifTestRaporu.docx`
  - `docs/PTN-GNS-Manuel-KeşifTestRaporu.xlsx`
  - `docs/PTN-GNS-Manuel-KeşifTestRaporu.pdf`

## Kurulum

```bash
npm install
npx playwright install --with-deps
```

## Çalıştırma

```bash
npm test                  # tüm testler (chromium + firefox)
npm run test:chromium     # sadece chromium
npm run test:elements     # sadece Elements modülü
npm run test:forms        # sadece Forms modülü
npm run test:widgets      # sadece Widgets modülü
npm run test:headed       # tarayıcı açık (debug)
npm run test:ui           # Playwright UI mode
npm run report            # HTML raporu görüntüle
npm run codegen           # selector keşfi
```

## Mimari

```
piton-gns-web-test/
├── tests/                       # Test spec dosyaları (modül bazlı)
│   ├── elements/elements.spec.js
│   ├── forms/forms.spec.js
│   └── widgets/widgets.spec.js
├── pages/                       # Page Object Model
│   ├── BasePage.js              # Ortak goto / scroll / ad-blocker / safeClick
│   ├── ElementsPage.js          # Tüm Elements alt sayfaları
│   ├── FormsPage.js             # Practice Form (DOB, hobbies, upload, state/city)
│   └── WidgetsPage.js           # Date picker, slider, progress, tabs, auto-complete...
├── fixtures/test-fixtures.js    # Page object'leri inject eden custom fixture
├── utils/testUtils.js           # removeAds, uniqueEmail, randomDigits, pixelBuffer
├── test-data/users.json         # Deterministic test verisi
├── docs/
│   ├── test-analiz-dokumani.xlsx       # PDF zorunlu: 6 kolonlu Excel test analizi
│   ├── test-cases.md                   # 25 senaryonun markdown kaynağı
│   └── PTN-GNS-Manuel-KeşifTestRaporu.{docx,xlsx,pdf}  # Bölüm B keşif raporu çıktıları
├── reports/                     # HTML & JSON çıktılar (gitignore)
├── .github/workflows/playwright.yml  # CI/CD (bonus)
└── playwright.config.js
```

## POM İlkesi

Her test **sadece akışı anlatır**; lokatorlar ve sayfa etkileşimleri page object sınıflarında durur.

```js
// POM ihlali — lokator testin içinde
await page.fill('#firstName', 'Ali');
await page.click('#submit');

// POM uyumlu
await formsPage.fillForm({ firstName: 'Ali', ... });
await formsPage.submit();
```

## Test ID Format

`TC-<MODÜL>-<TİP>-<NN>`
- `MODÜL`: **ELE** (Elements) / **FRM** (Forms) / **WGT** (Widgets)
- `TİP`: **P** (Pozitif) / **N** (Negatif)
- Örnek: `TC-ELE-P-01`, `TC-FRM-N-03`, `TC-WGT-P-08`

## CI/CD

`.github/workflows/playwright.yml` — her push ve PR'da otomatik çalışarak **chromium + firefox** matrisi ile HTML raporunu 14 gün boyunca, hata olursa trace'leri de artifact olarak saklar.

## Senaryo Özeti

| Modül | Pozitif | Negatif | Toplam |
|-------|---------|---------|--------|
| Elements | 7 | 3 | **10** |
| Forms | 3 | 3 | **6** |
| Widgets | 7 | 2 | **9** |
| **Toplam** | **17** | **8** | **25** |

Tüm senaryolar `docs/test-cases.md` ve `docs/test-analiz-dokumani.xlsx` içinde adım adım dokümante.

## Video

Proje tanıtım videosu:

- **Link 1:** https://www.loom.com/share/2f9f97c9153940be8fb68bfa9ad7f95b
- **Link 2:** https://www.loom.com/share/885a1321de424ced931f826ad1aaf9d1
