# 🎓 Portal Académico - Backend (Escuela Normal)

API REST desarrollada con **NestJS** y **TypeScript** (ES Modules) para la gestión académica de la Escuela Normal. El backend implementa una arquitectura modular orientada a servicios con persistencia en base de datos relacional (**MySQL** + **Prisma ORM**) y autenticación mediante **JWT** para la administración de usuarios, roles (**Director**, **Profesores**, **Alumnos** y **Tutores**), carga de notas y registro de asistencias.

---

## 👥 Integrantes del Equipo
- Karina Condori
- Ramiro Martin
- Nicolas Gonzalez

---

## 🛠️ Tecnologías y Herramientas

- **Framework Core:** [NestJS v12](https://nestjs.com/) (`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`)
- **Lenguaje:** [TypeScript v6](https://www.typescriptlang.org/) configurado como ESM (`"type": "module"`)
- **Base de Datos y ORM:** [MySQL](https://www.mysql.com/) + [Prisma ORM v7](https://www.prisma.io/) (`@prisma/client`, `@prisma/adapter-mariadb`)
- **Autenticación y Seguridad:** [JWT](https://jwt.io/) (`@nestjs/jwt`) y [bcrypt](https://www.npmjs.com/package/bcrypt) para el hasheo de contraseñas
- **Validación de Datos:** `class-validator` y `class-transformer`
- **Testing y Calidad de Código:** [Vitest](https://vitest.dev/), [Oxlint](https://oxc.rs/) y [Prettier](https://prettier.io/)

---

## 📁 Estructura del Proyecto

```text
src/
├── main.ts                      # Punto de entrada y configuración global (ValidationPipe)
├── generated/prisma/            # Cliente generado de Prisma
├── prisma/                      # Módulo y servicio global de conexión a MySQL
└── modules/
    ├── app/                     # Módulo raíz (Controller, Module, Service)
    ├── auth/                    # Registro, inicio de sesión y emisión de JWT
    ├── users/                   # Gestión de usuarios y roles del sistema
    ├── alumnos/                 # CRUD y consulta de alumnos
    ├── profesores/              # CRUD y gestión de plantilla docente
    ├── notas/                   # Carga y consulta de calificaciones por alumno
    └── asistencias/             # Registro y consulta de asistencias por alumno

 ⚙️ Configuración del Entorno (.env)
  DATABASE_URL="mysql://usuario:password@localhost:3306/sangre_normalina"
  JWT_SECRET="tu_clave_secreta_para_firmar_tokens"

🚀 Instalación y Ejecución
1. Clonar el repositorio e instalar dependencias
git clone <URL_DEL_REPOSITORIO>
cd normal-backend
npm install

2. Generar el cliente de Prisma y sincronizar la base de datos
npx prisma generate
npx prisma migrate deploy

3. Levantar el servidor
# Modo desarrollo (con recarga automática)
npm run start:dev

# Compilar para producción
npm run build
npm run start:prod

🧪 Pruebas de Endpoints
Las rutas de la API fueron probadas localmente mediante Thunder Client / Postman en http://localhost:3000, verificando validaciones de entrada (ValidationPipe), persistencia en MySQL mediante Prisma y generación de tokens JWT en /auth/login.