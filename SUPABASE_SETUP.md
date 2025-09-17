# 🚀 Supabase Setup Guide - Krok po kroku

## 1. Reset bazy danych

**ZAWSZE uruchom reset przed utworzeniem nowej bazy:**

1. Idź do Supabase dashboard → **SQL Editor**
2. Skopiuj całą zawartość pliku `database-reset.sql`
3. Wklej i kliknij **Run**
4. Skopiuj całą zawartość pliku `database.sql`
5. Wklej w nowym oknie SQL Editor i kliknij **Run**

**Ważne**: Nowa wersja `database.sql` ma automatyczny trigger tworzący profile użytkowników!

## 2. Znajdź właściwe klucze API

W Supabase dashboard:

1. Idź do **Settings** → **API**
2. Znajdź sekcję **Project API keys**
3. **Skopiuj ANON KEY** (nie service_role!)

### ❌ BŁĘDNY klucz (service_role):
```
sb_secret_YdX1bBZQOzGE5TAeb4P3-Q_p00408k-
```

### ✅ PRAWIDŁOWY klucz (anon):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...
```

## 3. Zaktualizuj Netlify Environment Variables

1. Idź do Netlify dashboard
2. Wybierz swoją stronę
3. **Site settings** → **Environment variables**
4. Edytuj `VITE_SUPABASE_ANON_KEY`
5. Wklej ANON key (ten długi zaczynający się od `eyJhbGciOiJIUzI1NiI...`)
6. Kliknij **Save**

## 4. Redeploy strony

1. W Netlify idź do **Deploys**
2. Kliknij **Trigger deploy** → **Deploy site**
3. Czekaj aż deployment się skończy

## 5. Utwórz pierwszego admina

1. Idź na stronę i zarejestruj się (zwykły signup)
2. W Supabase dashboard idź do **Table Editor** → **users**
3. Znajdź swój rekord
4. Zmień `role` z `user` na `admin`
5. Zapisz
6. Odśwież stronę - pojawi się "Admin Panel"

## 6. Testowanie

- Sprawdź czy możesz się zalogować
- Sprawdź czy admin widzi "Admin Panel" w navbar
- Sprawdź czy zwykli użytkownicy nie mają dostępu do `/admin`

## Najczęstsze błędy:

### "Forbidden use of secret API key"
- Używasz service_role key zamiast anon key
- Rozwiązanie: Użyj klucza zaczynającego się od `eyJhbGciOiJIUzI1NiI...`

### "Database connection not configured"
- Klucze API nie są ustawione w environment variables
- Rozwiązanie: Sprawdź Netlify environment variables

### Użytkownik nie pojawia się w tabeli users
- Tabela users nie istnieje lub ma błędne foreign keys
- Rozwiązanie: Uruchom database-reset.sql i potem database.sql

## Twoje aktualne dane:

- **URL**: `https://shtosekuooswpviohpvw.supabase.co` ✅
- **Current Key**: `sb_secret_YdX1bBZQOzGE5TAeb4P3-Q_p00408k-` ❌ (to service_role!)
- **Potrzebujesz**: ANON key z Supabase dashboard