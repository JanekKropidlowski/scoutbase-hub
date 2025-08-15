# BazyHarcerskie.pl - System zarządzania bazami harcerskimi

Aplikacja webowa do zarządzania bazami harcerskimi z zaawansowanym systemem CMS i autoryzacji.

## 🚀 Funkcjonalności

### System autoryzacji
- ✅ Logowanie i rejestracja użytkowników
- ✅ Zarządzanie sesjami z Supabase Auth
- ✅ Role użytkowników (user, moderator, admin)
- ✅ Zabezpieczone trasy z ProtectedRoute
- ✅ Resetowanie hasła

### System CMS
- ✅ Zarządzanie bazami harcerskimi (CRUD)
- ✅ Zarządzanie użytkownikami
- ✅ System recenzji i ocen
- ✅ System rezerwacji
- ✅ Panel administracyjny z uprawnieniami
- ✅ Wyszukiwanie i filtrowanie

### Bazy harcerskie
- ✅ Szczegółowe informacje o bazach
- ✅ Zdjęcia i opisy
- ✅ Udogodnienia i cennik
- ✅ Lokalizacja i współrzędne
- ✅ System ocen i recenzji

## 🛠️ Technologie

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router DOM
- **State Management**: React Query + Context API
- **Forms**: React Hook Form + Zod validation

## 📋 Wymagania systemowe

- Node.js 18+
- npm, yarn lub bun
- Konto Supabase

## 🚀 Instalacja i uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone <repository-url>
cd bazyharcerskie
```

### 2. Instalacja zależności
```bash
npm install
# lub
yarn install
# lub
bun install
```

### 3. Konfiguracja Supabase

#### a) Utwórz projekt w Supabase
- Przejdź do [supabase.com](https://supabase.com)
- Utwórz nowy projekt
- Skopiuj URL i klucz anonimowy

#### b) Skonfiguruj zmienne środowiskowe
Utwórz plik `.env.local` w głównym katalogu:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### c) Uruchom migracje bazy danych
```bash
# Zaloguj się do Supabase CLI
supabase login

# Połącz z projektem
supabase link --project-ref your_project_ref

# Uruchom migracje
supabase db push
```

### 4. Uruchomienie aplikacji
```bash
npm run dev
# lub
yarn dev
# lub
bun dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:5173`

## 🗄️ Struktura bazy danych

### Tabela `bases`
- Podstawowe informacje o bazach harcerskich
- Zdjęcia, opisy, cennik
- Udogodnienia i lokalizacja
- System ocen i polecania

### Tabela `user_profiles`
- Profile użytkowników
- Role i uprawnienia
- Dane kontaktowe

### Tabela `reviews`
- Recenzje i oceny baz
- Komentarze użytkowników
- Powiązanie z bazami i użytkownikami

### Tabela `reservations`
- System rezerwacji
- Daty, liczba gości, status
- Specjalne wymagania

## 🔐 System autoryzacji

### Role użytkowników
- **user**: Podstawowy użytkownik, może przeglądać bazy, dodawać recenzje
- **moderator**: Może zarządzać bazami, recenzjami, rezerwacjami
- **admin**: Pełne uprawnienia, zarządzanie użytkownikami

### Zabezpieczone trasy
- `/profile` - wymaga logowania
- `/admin/*` - wymaga roli moderator/admin
- `/admin/users` - wymaga roli admin

## 📱 Funkcjonalności CMS

### Zarządzanie bazami
- Dodawanie nowych baz harcerskich
- Edycja istniejących baz
- Usuwanie baz
- Wyszukiwanie i filtrowanie
- Zarządzanie zdjęciami i opisami

### Zarządzanie użytkownikami
- Przeglądanie listy użytkowników
- Zmiana ról i uprawnień
- Zarządzanie profilami

### System recenzji
- Moderowanie recenzji użytkowników
- Zarządzanie ocenami
- Filtrowanie i wyszukiwanie

### Statystyki i raporty
- Liczba baz, użytkowników, recenzji
- Wykresy odwiedzin
- Analiza popularności baz

## 🎨 Komponenty UI

Aplikacja wykorzystuje bibliotekę shadcn/ui z komponentami:
- Formularze z walidacją
- Karty i layouty
- Przyciski i inputy
- Dialogi i modale
- Tabele i listy
- Badge'y i wskaźniki

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty React
│   ├── admin/          # Komponenty panelu admin
│   ├── auth/           # Komponenty autoryzacji
│   ├── layout/         # Komponenty layoutu
│   ├── providers/      # Context providers
│   └── ui/             # Komponenty UI (shadcn/ui)
├── hooks/              # Custom hooks React
├── integrations/       # Integracje zewnętrzne
│   └── supabase/       # Konfiguracja Supabase
├── pages/              # Strony aplikacji
│   └── admin/          # Strony panelu admin
├── services/           # Serwisy i API
├── types/              # Definicje typów TypeScript
└── App.tsx             # Główny komponent aplikacji
```

## 🔧 Skrypty npm

```bash
npm run dev          # Uruchomienie w trybie deweloperskim
npm run build        # Budowanie aplikacji produkcyjnej
npm run build:dev    # Budowanie w trybie deweloperskim
npm run preview      # Podgląd zbudowanej aplikacji
npm run lint         # Sprawdzenie kodu ESLint
```

## 🚀 Wdrażanie

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Supabase Edge Functions
```bash
supabase functions deploy
```

## 🤝 Współpraca

1. Fork projektu
2. Utwórz branch dla nowej funkcjonalności (`git checkout -b feature/amazing-feature`)
3. Commit zmian (`git commit -m 'Add amazing feature'`)
4. Push do brancha (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

## 📝 Licencja

Ten projekt jest objęty licencją MIT. Zobacz plik `LICENSE` dla szczegółów.

## 📞 Wsparcie

W przypadku pytań lub problemów:
- Otwórz issue w GitHub
- Skontaktuj się z zespołem deweloperskim
- Sprawdź dokumentację Supabase

## 🔮 Planowane funkcjonalności

- [ ] System powiadomień email
- [ ] Integracja z Google Maps
- [ ] System płatności online
- [ ] Aplikacja mobilna
- [ ] API REST dla zewnętrznych integracji
- [ ] System raportów i analityki
- [ ] Integracja z mediami społecznościowymi
