Link del proyecto: https://tarea03yh.netlify.app/

# Tarea 3 - Melodía Store en React

Universidad Mariano Gálvez, Centro Universitario El Naranjo

Carrera: Ingeniería en Sistemas de Información y Ciencias de la Computación

Nombre: Yelsyn Adrid Hernández Crúz

Carnet: 9490-17-969

Curso: Desarrollo web

Sección: A

## Descripción

Tienda en Línea desarrollada con **React**, **Bootstrap** y **React-Bootstrap**
usando **Vite**. Incluye 7 secciones modulares: Inicio, Percusión, Viento, Audio
Profesional, Iluminación, Cuerdas y Registro.

En esta entrega se agregó un **flujo de autenticación de usuarios (Login /
Logout / Perfil)** que sincroniza la interfaz en tiempo real mediante una
arquitectura de estado global.

## Gestión de estado global (Opción A: Context API + useReducer)

Se seleccionó la **Opción A** combinando las herramientas nativas de React
`useContext` y `useReducer`:

- **`AuthProvider`**: componente centralizado que envuelve toda la aplicación y
  encapsula el `useReducer`.
- **Estado inicial**: `isAuthenticated` (false), `usuario` (null) y
  `fechaAcceso` (null).
- **Reducer** (`src/contexto/AuthContext.jsx`) que gestiona 4 acciones:
  1. `LOGIN`: guarda la información del usuario y marca la sesión como activa.
  2. `LOGOUT`: limpia los datos de sesión y desactiva la sesión.
  3. `ACTUALIZAR_PERFIL`: actualiza parcialmente los datos del usuario.
  4. `RESTABLECER`: restaura el estado inicial.
- **Hook personalizado `useAuth`**: expone el estado global y las funciones
  `iniciarSesion`, `cerrarSesion` y `actualizarPerfil` a cualquier componente,
  sin pasar props manualmente.

### Páginas nuevas

- **Login**: formulario con React-Bootstrap que valida los campos y dispara la
  acción `LOGIN` al simular una autenticación exitosa.
- **Perfil**: extrae al usuario directamente del estado global y muestra su
  nombre, correo, tipo de membresía, fecha de acceso e historial de pedidos
  simulado, con botón de cerrar sesión.

### Cuentas de prueba

- `yelsyn@correo.com` / `123456`
- `maria@correo.com` / `123456`

## Cómo ejecutar

```bash
npm install
npm run dev
```