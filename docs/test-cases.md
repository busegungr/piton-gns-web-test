# Test Senaryoları — DemoQA UI Otomasyonu

> Bu dosya `docs/test-analiz-dokumani.xlsx` Excel dokümanının markdown kaynağıdır. PDF'in istediği 6 kolon: **Test ID | Test Case Başlığı | Açıklama & Preconditions | Test Adımları | Beklenen Sonuç | Gerçekleşen Sonuç**.

## Elements (10 senaryo)

| Test ID | Başlık | Açıklama & Preconditions | Test Adımları | Beklenen Sonuç |
|---------|--------|--------------------------|---------------|----------------|
| TC-ELE-P-01 | Text Box geçerli verilerle gönderim | Pre: demoqa.com/text-box açık | 1) Full Name, Email, Current Address, Permanent Address doldur 2) Submit | Output bloğunda 4 alan doğru gösterilir |
| TC-ELE-N-02 | Text Box geçersiz email | Pre: demoqa.com/text-box | 1) Email alanına `abc@` yaz 2) Submit | Email input `field-error` class alır, output basılmaz |
| TC-ELE-P-03 | Check Box Workspace seçimi | Pre: demoqa.com/checkbox | 1) Expand All 2) Workspace checkbox tıkla | `#result` "workspace" metnini içerir |
| TC-ELE-P-04 | Radio Button Yes/Impressive seçim, No disabled | Pre: demoqa.com/radio-button | 1) Yes tıkla 2) Impressive tıkla 3) No durumunu kontrol | Sonuç metni "Yes" → "Impressive"; No disabled |
| TC-ELE-P-05 | Web Tables yeni kayıt ekleme | Pre: demoqa.com/webtables | 1) Add bas 2) 6 alanı doldur 3) Submit | Yeni satır tabloda görünür |
| TC-ELE-N-06 | Web Tables geçersiz email | Pre: demoqa.com/webtables | 1) Add 2) Email "hatali-email" yaz 3) Submit | Modal kapanmaz, form invalid |
| TC-ELE-P-07 | Buttons double / right / dynamic click | Pre: demoqa.com/buttons | 1) Double-click 2) Right-click 3) Dynamic-click | 3 mesaj DOM'da görünür |
| TC-ELE-P-08 | Dynamic Properties enable-after | Pre: demoqa.com/dynamic-properties | 1) Sayfa aç 2) #enableAfter durumu | İlk başta disabled, 5sn sonra enabled |
| TC-ELE-N-09 | Broken Images naturalWidth=0 | Pre: demoqa.com/broken | 1) Broken image locator 2) naturalWidth oku | naturalWidth === 0 |
| TC-ELE-P-10 | File upload — dosya adı görünür | Pre: demoqa.com/upload-download | 1) #uploadFile setInputFiles | #uploadedFilePath dosya adını içerir |

## Forms (6 senaryo)

| Test ID | Başlık | Açıklama & Preconditions | Test Adımları | Beklenen Sonuç |
|---------|--------|--------------------------|---------------|----------------|
| TC-FRM-P-01 | Zorunlu alanlarla form gönderim | Pre: /automation-practice-form | 1) Ad, Soyad, Gender, Mobile(10) 2) Submit | Modal açılır; Student Name & Mobile doğru |
| TC-FRM-P-02 | Tüm alanlarla E2E form gönderim | Pre: aynı | 1) Tüm alanlar (DOB, Subjects, Hobbies, State/City) 2) Submit | Modal'da her satır beklenen değer |
| TC-FRM-N-03 | Mobile 9 hane | Pre: aynı | 1) Mobile `123456789` 2) Submit | Modal açılmaz, input invalid |
| TC-FRM-N-04 | Tüm zorunlu alanlar boş | Pre: aynı | 1) Submit (boş) | Modal açılmaz |
| TC-FRM-P-05 | Picture upload | Pre: aynı | 1) Upload .png | Input value `files.length === 1` |
| TC-FRM-N-06 | Mobile harf girişi | Pre: aynı | 1) Mobile "abcdefghij" 2) Submit | Modal açılmaz |

## Widgets (9 senaryo)

| Test ID | Başlık | Açıklama & Preconditions | Test Adımları | Beklenen Sonuç |
|---------|--------|--------------------------|---------------|----------------|
| TC-WGT-P-01 | Date Picker tarih girişi | Pre: /date-picker | 1) `05/23/2026` yaz 2) Enter | Input value "05/23/2026" |
| TC-WGT-P-02 | Date & Time Picker değişimi | Pre: aynı | 1) "May 26, 2026 12:00 PM" yaz | Value değişti |
| TC-WGT-P-03 | Slider değer ayarlama | Pre: /slider | 1) Slider'a 50 yaz | sliderValue = 50 |
| TC-WGT-P-04 | Progress Bar %100 + Reset | Pre: /progress-bar | 1) Start 2) %100 bekle | Reset butonu görünür |
| TC-WGT-N-05 | Progress Bar %100 öncesi Stop | Pre: /progress-bar | 1) Start 2) >%10 olunca Stop | value < 100, Reset yok |
| TC-WGT-P-06 | Tabs Origin geçişi | Pre: /tabs | 1) Origin tab tıkla | Panel görünür, aria-selected=true |
| TC-WGT-N-07 | Tabs More disabled | Pre: /tabs | 1) More tab durumu | aria-disabled="true" |
| TC-WGT-P-08 | Auto Complete Multi 3 ekle/1 sil | Pre: /auto-complete | 1) Red+Green+Blue 2) Green sil | chip sayısı 3 → 2, Green yok |
| TC-WGT-P-09 | Tool Tips hover | Pre: /tool-tips | 1) Button üzerine hover | `.tooltip-inner` görünür |

---

**TOPLAM: 25 senaryo** — 17 pozitif + 8 negatif. Her modül PDF'in 5–10 aralığında.
