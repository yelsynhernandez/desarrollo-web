# Tarea 5 — Melodía Store (React + Node.js/Express + MongoDB + JWT)

Universidad Mariano Gálvez, Centro Universitario El Naranjo · Ingeniería en Sistemas de
Información y Ciencias de la Computación · Curso: Desarrollo web · Sección: A

Esta entrega evoluciona la aplicación de la Tarea 4 con un esquema de seguridad **sin estado
(stateless) basado en JSON Web Tokens**: el login firma un token con expiración de
**5 minutos**, las rutas protegidas de la API lo exigen en el encabezado
`Authorization: Bearer <token>` y el frontend detecta la caducidad de la sesión, avisa al
usuario y lo redirige automáticamente a `/login`.

Link del repositorio de git: https://github.com/yelsynhernandez/desarrollo-web

## Aplicaciones desplegadas

| Servicio | URL |
| --- | --- |
| Frontend (Render Static) | https://desarrollo-web-gdj0.onrender.com/ |
| Backend (Render) | https://be-melodia-store.onrender.com/ |


## Seguridad con JWT: explicación técnica

### Expiración en el backend

1. `POST /api/auth/login` valida las credenciales con bcrypt y firma el token con
   `jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })`
   (`backend/src/controllers/auth.controller.js`). Con `JWT_EXPIRES_IN=5m`, la librería
   `jsonwebtoken` escribe en el payload el claim `exp = iat + 300` segundos.
2. El middleware `verificarToken` (`backend/src/middlewares/auth.middleware.js`) lee el
   encabezado `Authorization: Bearer <token>` y ejecuta `jwt.verify` con la misma clave.
   - Sin encabezado o sin token → `401` `{ "error": "token_missing", ... }`.
   - Token vencido (`TokenExpiredError`) → `401` con
     `{ "error": "token_expired", "message": "La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente." }`.
   - Firma inválida o token alterado → `401` `{ "error": "token_invalid", ... }`.
   - Token válido → el payload queda en `req.usuario` y continúa al controlador.
3. El middleware se aplica en `backend/src/routes/producto.routes.js` a POST, PUT, PATCH,
   DELETE y a la consulta privada `GET /admin/listado`. El servidor no guarda sesiones:
   toda la validación depende de la firma y del `exp` del token (stateless).

### Intercepción y redirección en el frontend

1. **Persistencia y estado global**: al iniciar sesión, `Login.jsx` dispara `LOGIN` en
   `AuthContext` con el usuario y el token. El contexto sincroniza `{ token, usuario }` con
   `localStorage` (clave `melodia_sesion`) y lo restaura al recargar la página.
2. **Inyección del token**: `frontend/src/api/cliente.js` es el envoltorio centralizado de
   `fetch`. Cada petición lee el token y agrega `Authorization: Bearer <token>`.
3. **Interceptor de 401**: si una respuesta llega con `401` (fuera de `/auth/*`, donde el
   401 significa credenciales inválidas), el cliente invoca el manejador registrado por
   `AuthContext` mediante `configurarSesionExpirada`. Ese manejador:
   - elimina el token y el usuario de `localStorage`;
   - despacha `LOGOUT` con `expirada: true` en el estado global;
   - redirige con `useNavigate()` de React Router a `/login`.
4. **Notificación**: `Login.jsx` muestra un `Alert` de React-Bootstrap con el texto
   *"Su sesión ya no es válida o ha caducado"* cuando `sesionExpirada` es verdadero.

Así, si el usuario está en el panel de administración y pasan los 5 minutos, la siguiente
acción (listar, crear, editar o eliminar) recibe el 401, cierra la sesión y lo envía al login
con el aviso.

### Cuentas de prueba (se crean en el primer arranque del backend)

- `yelsyn@correo.com` / `123456` (rol admin)
- `maria@correo.com` / `123456` (rol cliente)


## Integrantes

| Nombre completo | Carné | Responsabilidades y componentes desarrollados |
| --- | --- | --- |
| Yelsyn Adrid Hernández Crúz | 9490-17-969 | Backend: firma del JWT en `POST /api/auth/login` (payload `id`, `email`, `role`, expiración de 5 minutos), middleware `verificarToken` con manejo de `TokenExpiredError`, protección de POST/PUT/PATCH/DELETE y de la consulta privada `GET /api/productos/admin/listado`, variables `JWT_SECRET` y `JWT_EXPIRES_IN`. Frontend: migración a React Router, persistencia del token en `localStorage` + `AuthContext`, cliente HTTP con inyección del Bearer Token e interceptor de 401, aviso de sesión caducada y redirección a `/login` con `useNavigate`. Colección de Postman de la Tarea 5. |
