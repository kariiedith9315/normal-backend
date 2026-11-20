🎓 Portal Académico - Backend (Escuela Normal)

API REST desarrollada con NestJS y TypeScript (ES Modules) para la gestión académica de la Escuela Normal. El backend implementa una arquitectura modular orientada a servicios para la administración de roles (Director, Profesores y Alumnos), carga de notas, gestión de asistencias y control de usuarios.

👥 Integrantes del Equipo
Karina Condori
Ramiro Martin
Nicolas Gonzalez
Tecnologías y Herramientas
Framework: NestJS
Lenguaje: TypeScript (configurado como ESM)
Validación: class-validator y class-transformer (DTOs)
Base de datos: PostgreSQL
Pruebas de API: Thunder Client (extensión de VS Code)
Requisitos previos
Node.js (versión LTS) y npm
PostgreSQL instalado y en ejecución
Git
Instalación y puesta en marcha
bash
# 1. Clonar el repositorio
git clone https://github.com/kariiedith9315/normal-backend.git
cd normal-backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env        # en PowerShell: copy .env.example .env
# Editar .env con los datos reales de tu base de datos

# 4. Crear la base de datos ejecutando el script database/schema_sangre-normalina.sql
#    en tu gestor de base de datos

# 5. Ejecutar en modo desarrollo
npm run start:dev

La API queda disponible en http://localhost:4000/.

Variables de entorno
Variable	Descripción	Ejemplo
PORT	Puerto en el que corre la API	4000
DATABASE_URL	Cadena de conexión a PostgreSQL	postgresql://usuario:password@localhost:5432/sangre_normalina
API_BASE_URL	URL base de la API	http://localhost:4000/

El archivo .env no se versiona; usar .env.example como plantilla.

Estructura del proyecto
src/
├── main.ts
└── modules/
    ├── app/
    ├── alumnos/
    ├── asistencias/
    ├── auth/
    ├── direccion/
    ├── notas/
    ├── profesores/
    └── users/
database/
└── schema_sangre-normalina.sql

Cada módulo tiene su propia carpeta dto/ con los DTOs de validación.

Base de datos

Tablas: profesores, usuarios, tutores, materias, alumnos, notas y asistencias, con sus claves primarias y foráneas. El script database/schema_sangre-normalina.sql crea las tablas.

Endpoints
Módulo	Método	Ruta
Alumnos	POST / GET / GET / PATCH / DELETE	/alumnos, /alumnos/:id
Profesores	POST / GET / GET / PATCH / DELETE	/profesores, /profesores/:id
Notas	GET / GET / POST	/notas, /notas/alumno/:id
Asistencias	GET / GET / POST	/asistencias, /asistencias/alumno/:id
Users	POST / GET / GET / PATCH / DELETE	/users, /users/:id
Auth	POST	/auth/login
Dirección	POST / PATCH	/direccion, /direccion/:id

Los endpoints se prueban con Thunder Client, la extensión de VS Code.

Validación de datos

Los datos de entrada se validan con DTOs y un ValidationPipe global (whitelist y transform activados). Ante datos inválidos la API responde 400 Bad Request con el detalle de cada campo.

Flujo de trabajo con Git
Rama	Uso
main	Rama estable
dev	Integración del desarrollo
feature/nombre	Nuevas funcionalidades
fix/nombre	Correcciones
refactor/nombre	Reorganización o mejora del código
docs/nombre	Cambios en documentación

Los cambios se integran mediante Pull Requests con commits descriptivos.

Scripts disponibles
Comando	Descripción
npm run start:dev	Ejecuta en modo desarrollo con recarga
npm run build	Compila el proyecto
npm run start:prod	Ejecuta la versión compilada
npm run test	Ejecuta las pruebas