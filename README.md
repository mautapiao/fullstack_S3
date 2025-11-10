# 📚 CRUD de Libros - Angular + Spring Boot

Sistema de gestión de libros desarrollado con **Angular 19** (standalone components) en el frontend y **Spring Boot** en el backend.

## 🎯 Características

### ✅ Funcionalidades CRUD
- **Crear** (C): Formulario para agregar nuevos libros
- **Leer** (R): Listado completo de todos los libros
- **Actualizar** (U): Edición de datos existentes
- **Eliminar** (D): Eliminación de libros con confirmación

### 🎨 UI/UX
- Interfaz moderna con **Bootstrap 5**
- Alertas interactivas con **SweetAlert2**
- Validación de formularios en tiempo real
- Indicadores de carga y estados
- Mensajes de error y éxito personalizados
- Diseño responsivo (mobile, tablet, desktop)

### 🔧 Características técnicas
- Componentes standalone (Angular 19+)
- Two-way binding con `FormsModule`
- Inyección de dependencias
- Manejo de errores HTTP
- Comunicación REST con el backend
- CORS habilitado Backend

---

## 📋 Requisitos previos

### Frontend
- Node.js 18+ y npm
- Angular CLI 19+
- Navegador moderno

### Backend
- Java 17
- Spring Boot 3+
- Maven
- Base de datos (Oracle Cloud)

---

## 🚀 Instalación y configuración

### 1. Clonar y configurar el proyecto Angular

```bash
# Clonar repositorio
git clone https://github.com/mautapiao/fullstack_S3.git

# Instalar dependencias
npm install

# Instalar SweetAlert2
npm install sweetalert2
```

### 2. Configurar el backend Spring Boot

Asegúrate de que tu backend tenga CORS habilitado:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

### 3. Iniciar el servidor Angular

```bash
ng serve -i

# con polling para mejor detección de cambios
ng serve -i --poll 2000
```

La aplicación estará disponible en: `http://localhost:4200`

---

## 📁 Estructura del proyecto

```
src/app/
├── components/
│   ├── libros-lista/              # Listado de libros
│   │   ├── libros-lista.component.ts
│   │   ├── libros-lista.component.html
│   │   └── libros-lista.component.css
│   ├── libros-crear/              # Crear nuevo libro
│   │   ├── libros-crear.component.ts
│   │   ├── libros-crear.component.html
│   │   └── libros-crear.component.css
│   └── libros-editar/             # Editar libro existente
│       ├── libros-editar.component.ts
│       ├── libros-editar.component.html
│       └── libros-editar.component.css
├── services/
│   └── libros.service.ts          # Servicio HTTP
├── models/
│   └── libro.ts                   # Interfaz del modelo
├── app.component.ts               # Componente raíz
├── app.component.html             # Template raíz
├── app.routes.ts                  # Configuración de rutas
├── main.ts                        # Punto de entrada
└── app.config.ts                  # Configuración de la app
```

---

## 🔌 API Endpoints

Los endpoints esperados en el backend son:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/libros` | Obtener todos los libros |
| GET | `/api/libros/{id}` | Obtener un libro por ID |
| POST | `/api/libros` | Crear un nuevo libro |
| PUT | `/api/libros/{id}` | Actualizar un libro |
| DELETE | `/api/libros/{id}` | Eliminar un libro |

### Modelo de datos (Libro)

```typescript
interface Libro {
  id?: number;              // Identificador único (opcional al crear)
  titulo: string;           // Título del libro
  autor: string;            // Autor del libro
  genero: string;           // Género literario
  anioPublicacion: number;  // Año de publicación
}
```

### Géneros disponibles

- Autoayuda
- Biografía
- Ciencia Ficción
- Educativo
- Fantasía
- Ficción
- Histórico
- Misterio
- No Ficción
- Romance
- Técnico
- Thriller

---

## 📖 Guía de uso

### 📚 Listado de libros
- Acceso: `/libros`
- Muestra tabla con todos los libros
- Botones **Editar** y **Eliminar** por libro
- Botón **Nuevo Libro** para crear uno

### ➕ Crear libro
- Acceso: `/libros/nuevo`
- Completa los campos del formulario
- Validación automática de campos
- SweetAlert confirma éxito o error
- Redirige al listado después de crear

### ✏️ Editar libro
- Acceso: `/libros/editar/{id}`
- Carga automáticamente los datos del libro
- Modifica los campos necesarios
- Validación en tiempo real
- Botón **Revertir** para descartar cambios
- Confirmación SweetAlert al guardar

### 🗑️ Eliminar libro
- Click en botón **Eliminar** en la tabla
- Confirmación con SweetAlert
- Eliminación inmediata si se confirma
- Actualización automática de la lista

---

## 🛠️ Servicios

### LibrosService

```typescript
constructor(private http: HttpClient) {}

// Obtener todos los libros
getAll(): Observable<Libro[]>

// Obtener un libro por ID
getById(id: number): Observable<Libro>

// Crear un nuevo libro
create(libro: Libro): Observable<Libro>

// Actualizar un libro existente
update(id: number, libro: Libro): Observable<Libro>

// Eliminar un libro
delete(id: number): Observable<void>
```

---

### app.routes.ts
Rutas necesarias:

```typescript
export const routes: Routes = [
  { path: 'libros', component: LibrosListaComponent },
  { path: 'libros/nuevo', component: LibrosCrearComponent },
  { path: 'libros/editar/:id', component: LibrosEditarComponent },
  { path: '', redirectTo: '/libros', pathMatch: 'full' }
];
```

---

### Logs importantes
```
🔍 ngOnInit ejecutándose...
✅ Libros obtenidos: [...]
❌ Error al obtener libros: ...
```

---

## 📝 Validaciones

### Campos obligatorios
- **Título**: No puede estar vacío
- **Autor**: No puede estar vacío
- **Género**: Debe seleccionar de la lista
- **Año**: Debe estar entre 1000 y el año actual en revisión

### Mensajes de error
Los errores se muestran en rojo bajo cada campo y en un modal SweetAlert

---

## 📚 Tecnologías utilizadas

### Frontend
- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5** - Estilos CSS
- **SweetAlert2** - Alertas interactivas
- **RxJS** - Manejo de observables, Mecanismo reactivo para respuestas asíncronas

### Backend
- **Spring Boot 3** - Framework Java
- **Spring Data REST** - APIs REST automáticas
- **Spring Web** - Controladores web
- **Oracle** - Base de datos

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👨‍💻 Autor

Desarrollado como parte del curso de **Fullstack 3 - Semana 3**.