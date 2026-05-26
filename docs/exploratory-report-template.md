# Bölüm B — Keşif Testi Raporu

> Bu doküman PDF'in istediği keşif (exploratory) test bulgu raporudur. Excel/Word'e aktarılacak. İki site için ayrı sekmeler:
> 1. **gnsmetal.com** — https://www.gnsmetal.com/home
> 2. **piton.com.tr** — https://piton.com.tr/

---

## Test Ortamı

| Bilgi | Değer |
|-------|-------|
| Tarih | 2026-05-26 |
| Tarayıcılar | Chrome ___, Firefox ___, Edge ___ |
| Çözünürlük | Desktop 1920×1080, Mobile 390×844 (iPhone 13) |
| OS | Windows 11 |
| Test eden | ____________ |

---

## Test Kapsamı (PDF Madde Madde)

- [ ] UX & kullanılabilirlik
- [ ] Navigasyon akışları (menü, yönlendirme, sayfa geçişleri)
- [ ] Broken link tespiti (tüm linkler)
- [ ] Form alanları (validasyon, zorunlu alan, hata mesajı)
- [ ] Görsel bütünlük & UI tutarlılık (responsive dahil)
- [ ] Sayfa yüklenme & performans
- [ ] Tarayıcı uyumluluğu

---

## Hata Raporu Şablonu (Her Bulgu İçin)

```
BUG ID: BUG-<SITE>-<NN>
Başlık: (Tek satırda problem)
Severity: Critical | High | Medium | Low
Priority: P1 | P2 | P3
Ortam: Chrome 132 / Windows 11 / Desktop
URL: https://...
Önkoşul: (Varsa)

Adımlar:
1.
2.
3.

Beklenen: ...
Gerçekleşen: ...
Ek (ekran görüntüsü/video): screenshots/bug-<id>.png
```

---

## gnsmetal.com Bulguları

| BUG ID | Başlık | Severity | Sayfa | Durum |
|--------|--------|----------|-------|-------|
| BUG-GNS-01 | _(örnek)_ Footer'daki LinkedIn bağlantısı 404 | High | /home | Open |
| | | | | |

## piton.com.tr Bulguları

| BUG ID | Başlık | Severity | Sayfa | Durum |
|--------|--------|----------|-------|-------|
| BUG-PTN-01 | _(örnek)_ Mobile menü 360px'te taşıyor | Medium | / | Open |
| | | | | |

---

## Özet İstatistik

| Site | Toplam Bulgu | Critical | High | Medium | Low |
|------|--------------|----------|------|--------|-----|
| gnsmetal.com | | | | | |
| piton.com.tr | | | | | |

---

## Sonuç & Öneri

(Genel kullanılabilirlik notu, kritik problemler, öncelikli düzeltme önerileri.)
