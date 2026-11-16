-- Crear base de datos solo si no existe (evita el Error 1007)
CREATE DATABASE IF NOT EXISTS sangre_normalina;
USE sangre_normalina;

-- Eliminar tablas en orden inverso para evitar conflictos si ya las habías creado a medias
DROP TABLE IF EXISTS asistencias;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS alumnos;
DROP TABLE IF EXISTS materias;
DROP TABLE IF EXISTS tutores;
DROP TABLE IF EXISTS profesores;

-- Tabla: Profesores
CREATE TABLE profesores (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(30),
    especialidad VARCHAR(100) NOT NULL,
    direccion VARCHAR(150),
    fecha_ingreso DATE NOT NULL
);

-- Tabla: Tutores
CREATE TABLE tutores (
    id_tutor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    fecha_ingreso DATE NOT NULL
);

-- Tabla: Materias (id_profesor ahora es INT para coincidir perfectamente)
CREATE TABLE materias (
    id_materia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    horarios VARCHAR(100) NOT NULL,
    id_profesor INT NOT NULL,
    CONSTRAINT fk_materia_profesor FOREIGN KEY (id_profesor) 
        REFERENCES profesores(id_profesor) ON DELETE CASCADE
);

-- Tabla: Alumnos
CREATE TABLE alumnos (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(30),
    id_tutor INT NOT NULL,
    CONSTRAINT fk_alumno_tutor FOREIGN KEY (id_tutor) 
        REFERENCES tutores(id_tutor) ON DELETE CASCADE
);

-- Tabla: Notas
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

-- Tabla: Asistencias
CREATE TABLE asistencias (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_materia INT NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(20),
    CONSTRAINT fk_asistencia_alumno FOREIGN KEY (id_alumno) 
        REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    CONSTRAINT fk_asistencia_materia FOREIGN KEY (id_materia) 
        REFERENCES materias(id_materia) ON DELETE CASCADE
);

SELECT * FROM profesores;
SELECT * FROM tutores;
SELECT * FROM materias;
SELECT * FROM alumnos;
SELECT * FROM notas;
SELECT * FROM asistencias;