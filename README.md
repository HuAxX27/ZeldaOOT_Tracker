# Ocarina 100% — tracker de Zelda: Ocarina of Time

Sitio estático (HTML + JS sin build). Datos y cuentas en Supabase (proyecto `zelda-oot-tracker`).

## Publicar en Vercel
Crea un proyecto vacío en Vercel (Framework: "Other", sin comando de build) y sube esta carpeta,
o arrástrala en vercel.com/new. No necesita variables de entorno.

## Activar "Entrar con Google" (una sola vez)
1. Google Cloud Console → APIs y servicios → Credenciales → Crear ID de cliente OAuth (Aplicación web).
   - URI de redireccionamiento autorizado: https://pfqsdiunpfpjlbhojimh.supabase.co/auth/v1/callback
2. Supabase → proyecto zelda-oot-tracker → Authentication → Sign In / Providers → Google:
   pega el Client ID y el Client Secret y actívalo.
3. Supabase → Authentication → URL Configuration:
   - Site URL: la URL de Vercel (p. ej. https://ocarina-100.vercel.app)
   - Redirect URLs: la misma URL.

Mientras Google no esté activado, la página funciona igual guardando el progreso en el navegador;
al iniciar sesión ofrece pasar esas partidas a la cuenta.
