# 🔍 Debug - Brak profilu użytkownika po rejestracji

## Problem
✅ Rejestracja działa - użytkownik w auth.users  
❌ Profil nie został utworzony w tabeli users  
❌ GET request zwraca 0 rows dla users tabeli  

## Możliwe przyczyny:

### 1. Email Confirmation (najprawdopodobniej)
Supabase może wymagać potwierdzenia emaila przed pełną aktywacją:

**Sprawdź w Supabase dashboard:**
1. Authentication → Settings → User Signups  
2. Sprawdź czy "Enable email confirmations" jest włączone
3. Jeśli TAK - użytkownik musi potwierdzić email zanim profil zostanie utworzony

**Rozwiązanie:**
- **Option A**: Wyłącz email confirmations (dla testów)
- **Option B**: Potwierdź email i spróbuj ponownie zalogować

### 2. RLS Policies blokują INSERT
Aplikacja może nie móc zapisać do tabeli users przez polityki RLS:

**Sprawdź w Supabase:**
1. Table Editor → users → RLS policies
2. Sprawdź czy polityka pozwala na INSERT dla authenticated users

### 3. Timing Issue
Aplikacja sprawdza profil zaraz po signup, ale przed jego utworzeniem.

## Kroki debugowania:

### A. Wyłącz Email Confirmation (najszybsze):
1. Supabase dashboard → Authentication → Settings
2. User Signups → Wyłącz "Enable email confirmations"  
3. Usuń testowego użytkownika z Authentication → Users
4. Spróbuj zarejestrować się ponownie

### B. Sprawdź RLS Policies:
1. Supabase → Table Editor → users
2. Kliknij "RLS" tab
3. Sprawdź czy jest polityka: "Allow all for authenticated users"

### C. Manual Profile Creation Test:
1. Idź do Supabase Table Editor → users
2. Ręcznie dodaj rekord:
   - id: `dc34dded-c969-4d1a-b466-f77b5caf3a3c`
   - email: `zeemej@mytemails.com`  
   - full_name: `testowiec`
   - role: `user`
3. Spróbuj zalogować się do aplikacji

## Next Steps:
Sprawdź najpierw email confirmation settings i wyłącz je dla testów.