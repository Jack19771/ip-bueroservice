# IP Büroservice – Izabela Pluszczak

Strona internetowa dla biura usługowo‑podatkowego w Hamm (DE), obsługującego klientów w całych Niemczech online. Strona dwujęzyczna: **niemiecka (główna)** i **polska**.

## Struktura plików

```
Strona/
├── index.html          ← wersja niemiecka (https://domena.de/)
├── pl/
│   └── index.html      ← wersja polska   (https://domena.de/pl/)
├── style.css           ← wspólny styl
├── script.js           ← wspólny JS
├── image001.jpg        ← logo IP Büroservice
├── Foto.jpeg           ← zdjęcie Pani Izabeli (hero + sekcja "O mnie")
├── sitemap.xml         ← mapa strony dla Google
├── robots.txt          ← reguły dla robotów wyszukiwarek
├── vercel.json         ← konfiguracja Vercela (nagłówki, cache)
├── .gitignore
└── README.md
```

## Co dalej – krok po kroku

### 1. GitHub

```bash
cd "C:\Users\arrat\Desktop\Strona"
git init
git add .
git commit -m "Initial commit – IP Büroservice site"
git branch -M main
# Utwórz repo na github.com (np. ip-bueroservice), potem:
git remote add origin https://github.com/TWOJ_LOGIN/ip-bueroservice.git
git push -u origin main
```

### 2. Vercel

1. Wejdź na https://vercel.com → **Add New → Project**
2. Wybierz repo z GitHuba
3. **Framework Preset:** `Other` (to jest static site, bez build step)
4. **Root Directory:** zostaw domyślnie
5. Kliknij **Deploy**

Po 30 s strona działa pod adresem typu `ip-bueroservice.vercel.app`.

### 3. Domena

Najlepiej kupić **`ip-bueroservice.de`** (na rynek niemiecki Google preferuje `.de`).

W Vercelu: **Settings → Domains** → dodaj domenę → ustaw rekordy DNS (Vercel pokaże dokładnie co wpisać u rejestratora).

> **WAŻNE:** Po podpięciu prawdziwej domeny **zaktualizuj** wszystkie wystąpienia `https://ip-bueroservice.de/` w plikach: `index.html`, `pl/index.html`, `sitemap.xml`. Jeśli kupisz inną domenę, zrób globalny find/replace (search: `ip-bueroservice.de`, replace: nowa domena).

---

## SEO – co zostało zrobione w kodzie

✅ Tytuły i opisy nasycone frazami kluczowymi (DE: "Steuererklärung Hamm", "Steuererklärung online"; PL: "rozliczenie podatku Niemcy", "polska księgowa Hamm")
✅ `<html lang>` poprawnie ustawione DE / PL
✅ Tagi `hreflang` na obie wersje + `x-default`
✅ Schema.org `AccountingService` z pełnymi danymi NAP, godzinami, językami
✅ Open Graph + Twitter Card (linki w Messengerze/WhatsAppie/Twitterze pokażą podgląd)
✅ Semantyczny HTML (`<article>`, `<nav>`, `<section>`, `aria-*`)
✅ Alty na obrazach
✅ `sitemap.xml` + `robots.txt`
✅ Mobile-first, fast LCP (preconnect do fontów, lazy-friendly)
✅ Bezpieczne nagłówki HTTP (HSTS, X-Frame-Options) przez `vercel.json`

## SEO – co MUSISZ zrobić ręcznie po deployu (krytyczne dla pozycjonowania!)

Sam kod stronie nie wystarczy do **1. miejsca w Google**. Trzeba jeszcze:

### 🥇 Google Business Profile (najwazniejsze!)
- https://business.google.com → załóż profil "IP Büroservice – Izabela Pluszczak"
- Adres: Paul-Klee-Weg 26, 59063 Hamm
- Kategorie: **Steuerberatung** + **Buchhaltungsbüro**
- Dodaj zdjęcia, godziny, opis (DE + PL)
- Poproś pierwszych klientów o **opinie** – Google waży je bardzo mocno przy lokalnym SEO ("Steuererklärung Hamm")

### 🥈 Google Search Console
- https://search.google.com/search-console → dodaj domenę
- Wgraj `sitemap.xml` (Sitemaps → wpisz `sitemap.xml`)
- Wymuś indeksowanie (URL Inspection → Request Indexing) dla `/` i `/pl/`

### 🥉 Bing Webmaster Tools
- https://www.bing.com/webmasters – ten sam proces, mniejszy ruch ale szybciej indeksuje

### Linki zwrotne (backlinks)
Wpisanie firmy do katalogów dla budowania autorytetu domeny:
- **Gelbe Seiten** (gelbeseiten.de)
- **11880.com**
- **Das Örtliche** (dasoertliche.de)
- **Cylex.de**, **Yelp.de**
- **Polskie portale w DE**: mojeniemcy.de, polonia.de, polonika.de
- Facebook Page firmy (linkuj stronę)

### Treść (najtrudniejsze, ale najskuteczniejsze)
Google promuje strony z **dużą ilością przydatnej treści**. Dodanie sekcji **blog/poradnik** (np. "Jakie ulgi w niemieckim PIT 2026?", "Klasy podatkowe Steuerklasse – wszystko, co musisz wiedzieć", "Pendlerpauschale dla Polaków") da **drastyczny wzrost** pozycji na long‑tail frazy. Mogę dodać taką sekcję — daj znać.

---

## Frazy, na które ma się pozycjonować

**Niemieckie:**
- Steuererklärung Hamm
- Steuererklärung online
- polnische Buchhaltung Hamm
- Steuererklärung auf Polnisch
- Lohnsteuerhilfe Hamm

**Polskie:**
- rozliczenie podatku Niemcy
- rozliczenie podatkowe Niemcy online
- polska księgowa Hamm
- polska księgowa Niemcy
- Steuererklärung po polsku
- zwrot podatku z Niemiec

---

## Formularz kontaktowy

Aktualnie formularz tylko *symuluje* wysyłkę (pokazuje sukces po 1.2 s). Żeby wiadomości faktycznie trafiały na e-mail Pani Izabeli, trzeba podpiąć usługę.

**Najprostsza opcja: Formspree** (darmowy do 50 wiadomości/miesiąc):
1. Zarejestruj się na https://formspree.io
2. Stwórz formularz, dostaniesz endpoint typu `https://formspree.io/f/xxxxx`
3. W `index.html` i `pl/index.html` zmień `<form id="contactForm" novalidate>` na `<form id="contactForm" novalidate action="https://formspree.io/f/xxxxx" method="POST">`
4. W `script.js` zamień blok `setTimeout(...)` na realny `fetch()` POST – mogę to zrobić, daj znać

**Alternatywa:** Vercel Functions (więcej pracy, ale bezpłatne i własne).

---

## Lokalne uruchomienie

Możesz po prostu otworzyć `index.html` w przeglądarce. Dla testów linków DE↔PL lepiej przez serwer:

```bash
# Python (w folderze Strona/)
python -m http.server 8000

# albo Node
npx serve .
```

Otwórz http://localhost:8000

---

## Kontakt techniczny

Strona zaprojektowana z myślą o:
- mobile-first (testowane: 320px / 375px / 414px / 768px / 1024px / 1440px)
- prefers-reduced-motion (dostępność)
- Dark Mode logo: jeśli logo ma się pojawiać też na ciemnym tle, to obecne `image001.jpg` ma białe tło – w razie potrzeby przygotujemy wersję PNG z przezroczystym tłem.
