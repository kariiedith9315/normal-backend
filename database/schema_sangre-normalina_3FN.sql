-- =====================================================================
-- sangre_normalina - versión normalizada hasta Tercera Forma Normal (3FN)
-- Sintaxis MySQL (igual que el script original)
-- =====================================================================
CREATE DATABASE IF NOT EXISTS sangre_normalina;
USE sangre_normalina;

-- Eliminar tablas en orden inverso a sus dependencias
DROP TABLE IF EXISTS asistencias;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS alumnos;
DROP TABLE IF EXISTS horarios_materia;
DROP TABLE IF EXISTS materias;
DROP TABLE IF EXISTS tutores;
DROP TABLE IF EXISTS profesores;
DROP TABLE IF EXISTS estados_asistencia;
DROP TABLE IF EXISTS especialidades;
DROP TABLE IF EXISTS direcciones;
DROP TABLE IF EXISTS usuarios;

-- ---------------------------------------------------------------------
-- Usuarios (cuenta de acceso). El email vive SOLO acá (3FN).
-- ---------------------------------------------------------------------
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('DIRECTOR', 'PROFESOR', 'ALUMNO', 'TUTOR') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- 1FN: la dirección deja de ser un texto único y se divide en campos atómicos
-- ---------------------------------------------------------------------
CREATE TABLE direcciones (
    id_direccion INT AUTO_INCREMENT PRIMARY KEY,
    calle VARCHAR(100) NOT NULL,
    numero VARCHAR(10),
    localidad VARCHAR(80) NOT NULL,
    provincia VARCHAR(80) NOT NULL
);

-- ---------------------------------------------------------------------
-- 3FN: la especialidad se repetía como texto libre en cada profesor
-- ---------------------------------------------------------------------
CREATE TABLE especialidades (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- ---------------------------------------------------------------------
-- Profesores
-- 3FN: se quita "email" (dependía de id_usuario -> email); se obtiene desde usuarios
-- ---------------------------------------------------------------------
CREATE TABLE profesores (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(30),
    id_especialidad INT NOT NULL,
    id_direccion INT NULL,
    fecha_ingreso DATE NOT NULL,
    CONSTRAINT fk_profesor_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_profesor_especialidad FOREIGN KEY (id_especialidad)
        REFERENCES especialidades(id_especialidad),
    CONSTRAINT fk_profesor_direccion FOREIGN KEY (id_direccion)
        REFERENCES direcciones(id_direccion) ON DELETE SET NULL
);

-- ---------------------------------------------------------------------
-- Tutores (3FN: sin email propio, se obtiene desde usuarios)
-- ---------------------------------------------------------------------
CREATE TABLE tutores (
    id_tutor INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    CONSTRAINT fk_tutor_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

-- ---------------------------------------------------------------------
-- Materias (1FN: se quita "horarios", que guardaba varios valores en una celda)
-- ---------------------------------------------------------------------
CREATE TABLE materias (
    id_materia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_profesor INT NOT NULL,
    CONSTRAINT fk_materia_profesor FOREIGN KEY (id_profesor)
        REFERENCES profesores(id_profesor) ON DELETE CASCADE
);

-- Un registro por cada día/franja horaria de la materia
CREATE TABLE horarios_materia (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_materia INT NOT NULL,
    dia_semana ENUM('LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CONSTRAINT uq_horario UNIQUE (id_materia, dia_semana, hora_inicio),
    CONSTRAINT fk_horario_materia FOREIGN KEY (id_materia)
        REFERENCES materias(id_materia) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- Alumnos (id_usuario opcional: un alumno puede o no tener cuenta de acceso)
-- ---------------------------------------------------------------------
CREATE TABLE alumnos (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(30),
    id_tutor INT NOT NULL,
    CONSTRAINT fk_alumno_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    CONSTRAINT fk_alumno_tutor FOREIGN KEY (id_tutor)
        REFERENCES tutores(id_tutor) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- Notas (sin cambios de estructura: ya cumplía 3FN)
-- ---------------------------------------------------------------------
CREATE TABLE notas (
    id_nota INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_materia INT NOT NULL,
    trimestre INT,
    nota DECIMAL(4,2),
    fecha_examen DATE NOT NULL,
    CONSTRAINT fk_nota_alumno FOREIGN KEY (id_alumno)
        REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    CONSTRAINT fk_nota_materia FOREIGN KEY (id_materia)
        REFERENCES materias(id_materia) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- Asistencias: "estado" pasa de texto libre a una tabla de catálogo
-- ---------------------------------------------------------------------
CREATE TABLE estados_asistencia (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO estados_asistencia (nombre) VALUES
    ('PRESENTE'), ('AUSENTE'), ('TARDE'), ('JUSTIFICADO');

CREATE TABLE asistencias (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_materia INT NOT NULL,
    fecha DATE NOT NULL,
    id_estado INT NOT NULL,
    CONSTRAINT uq_asistencia UNIQUE (id_alumno, id_materia, fecha),
    CONSTRAINT fk_asistencia_alumno FOREIGN KEY (id_alumno)
        REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    CONSTRAINT fk_asistencia_materia FOREIGN KEY (id_materia)
        REFERENCES materias(id_materia) ON DELETE CASCADE,
    CONSTRAINT fk_asistencia_estado FOREIGN KEY (id_estado)
        REFERENCES estados_asistencia(id_estado)
);

SELECT * FROM usuarios;
SELECT * FROM profesores;
SELECT * FROM tutores;
SELECT * FROM materias;
SELECT * FROM horarios_materia;
SELECT * FROM alumnos;
SELECT * FROM notas;
SELECT * FROM asistencias;
