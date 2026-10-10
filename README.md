# Tarea 4 — Melodía Store (React + Node.js/Express + MongoDB)

Universidad Mariano Gálvez, Centro Universitario El Naranjo · Ingeniería en Sistemas de
Información y Ciencias de la Computación · Curso: Desarrollo web · Sección: A

En esta entrega el frontend en React de la Tarea 3 se conecta a una API RESTful propia
construida con **Node.js, Express y MongoDB (Mongoose)**, reemplazando los datos y la
autenticación simulados por peticiones asíncronas contra el backend y sincronizando las
respuestas con el estado global (`useContext` + `useReducer`).

## Aplicaciones desplegadas

| Servicio | URL |
| --- | --- |
| Frontend (Render Static) | _pendiente de publicar_ |
| Backend (Render) | _pendiente de publicar_ |

En local: frontend `http://localhost:5173` · backend `http://localhost:5000`.

## Estructura del monorepo

```
desarrollo-web/
├── backend/     API REST (Node.js + Express + MongoDB)
├── frontend/    SPA (React + Vite + React-Bootstrap)
├── postman/     Colección de pruebas de endpoints
├── compose.yml  Levanta mongo + backend + frontend sin Dockerfiles
└── README.md
```

Cada stack se publica como un servicio independiente. En **Render** se crea un *Web
Service* con **Root Directory `backend/`** (`npm install` / `npm start`) y un *Static Site*
con **Root Directory `frontend/`** (`npm run build`, publicar `dist`, variable
`VITE_API_URL` = URL del backend). En Netlify/Vercel se usa `frontend/` como directorio base.

## Arquitectura del backend

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                     Conexión persistente a MongoDB con control de errores
│   ├── models/
│   │   ├── User.js                   nombre, correo, contraseña (hash), rol, timestamps
│   │   └── Producto.js               entidad de negocio del catálogo + timestamps
│   ├── controllers/
│   │   ├── auth.controller.js        lógica de register y login
│   │   └── producto.controller.js    lógica del CRUD de productos
│   ├── routes/
│   │   ├── auth.routes.js            POST /register, POST /login
│   │   └── producto.routes.js        CRUD del recurso de negocio
│   ├── seed/
│   │   ├── data.js                   catálogo inicial (30 productos)
│   │   └── index.js                  siembra solo si la base está vacía
│   └── server.js                     app Express, middlewares y montaje de rutas
├── example.env
└── package.json
```

Separación de responsabilidades: rutas → controladores → modelos, con la configuración de
conexión aislada en `config/db.js`.

## Variables de entorno

Cada carpeta incluye un `example.env`; se debe copiar a `.env` (backend) o `.env.local`
(frontend) y completar valores. No se sube ningún `.env` real al repositorio.

**`backend/example.env`**

```
PORT=5000
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/melodia_store
```

**`frontend/example.env`**

```
VITE_API_URL=http://localhost:5000/api
```

## Endpoints (con payloads de ejemplo)

La entidad de negocio del proyecto es **Producto**, expuesta en `/api/productos` (y su
alias `/api/recursos`, tal como aparece en el enunciado).

| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | `/api/auth/register` | Registra un usuario en MongoDB |
| POST | `/api/auth/login` | Valida credenciales y retorna el usuario (401 si son inválidas) |
| GET | `/api/productos?categoria=percusion&busqueda=guitarra` | Listado con filtrado y búsqueda |
| GET | `/api/productos/:id` | Consulta por path parameter |
| POST | `/api/productos` | Crea un producto desde el request body |
| PUT / PATCH | `/api/productos/:id` | Actualiza un producto |
| DELETE | `/api/productos/:id` | Elimina un producto |

**Register**

```json
{ "nombre": "Yelsyn Adrid Hernández Crúz", "correo": "yelsyn@correo.com", "contrasena": "123456", "rol": "admin" }
```

**Login**

```json
{ "correo": "yelsyn@correo.com", "contrasena": "123456" }
```

**Crear / actualizar producto**

```json
{
  "nombre": "Teclado Sintetizador 61 Teclas",
  "categoria": "audio",
  "precio": "Q 2,150.00",
  "descripcion": "Sintetizador portátil con 61 teclas.",
  "especificaciones": [{ "etiqueta": "Teclas", "valor": "61" }],
  "imagen": "image/mesa-mezcladora.png"
}
```

La colección lista para importar en Postman/Thunder Client está en
`postman/melodia-store-tarea4.postman_collection.json`.

### Cuentas de prueba (se crean en el primer arranque del backend)

- `yelsyn@correo.com` / `123456` (rol admin)
- `maria@correo.com` / `123456` (rol cliente)

## Cómo ejecutar

**Con Docker Compose (mongo + backend + frontend):**

```bash
docker compose up
```

**Manual (dos terminales):**

```bash
# backend/  -> requiere MONGODB_URI (backend/.env) o el mongo de compose en localhost:27017
npm install && npm run dev

# frontend/
npm install && npm run dev
```

## Integrantes

| Nombre completo | Carné | Secciones, endpoints y componentes desarrollados |
| --- | --- | --- |
| Yelsyn Adrid Hernández Crúz | 9490-17-969 | Backend: conexión a MongoDB, modelos `User` y `Producto`, controladores y rutas de autenticación (`/api/auth`) y del CRUD (`/api/productos`), seed del catálogo. Frontend: cliente de API, `AuthContext`, Login y Registro contra la API, Perfil desde MongoDB, panel de administración con CRUD (tabla, formularios y modales) y catálogo dinámico por categorías. |
