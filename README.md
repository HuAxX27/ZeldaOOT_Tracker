# Ocarina 100% — tracker de Zelda: Ocarina of Time

Sitio estático (HTML + JS sin build). Datos y cuentas en Supabase (proyecto `zelda-oot-tracker`).

## Probar en tu computadora
Necesita un servidor local porque la página usa módulos de JavaScript (abrir `index.html` con doble clic no funciona).

```
npm start          # o: python -m http.server 8000
```

Abre la dirección que muestre la terminal (normalmente http://localhost:3000).
Sin cuenta, el progreso se guarda en el navegador. Si el servidor de cuentas no está disponible,
la página sigue funcionando en ese modo.

## Publicar en Vercel
Importa el repositorio en vercel.com/new (Framework: "Other", sin comando de build ni variables de entorno).
Cada `git push` a `main` vuelve a publicar la página. También funciona en GitHub Pages o cualquier hosting estático,
incluso dentro de una subcarpeta.

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
