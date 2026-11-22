CREATE DATABASE IF NOT EXISTS sangre_normalina;
USE sangre_normalina;

DROP TABLE IF EXISTS asistencias;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS alumnos;
DROP TABLE IF EXISTS materias;
DROP TABLE IF EXISTS tutores;
DROP TABLE IF EXISTS profesores;
DROP TABLE IF EXISTS usuarios;

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

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('DIRECTOR', 'PROFESOR', 'ALUMNO', 'TUTOR') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tutores (
    id_tutor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    fecha_ingreso DATE NOT NULL
);

CREATE TABLE materias (
    id_materia INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    horarios VARCHAR(100) NOT NULL,
    id_profesor INT NOT NULL,
    CONSTRAINT fk_materia_profesor FOREIGN KEY (id_profesor) 
        REFERENCES profesores(id_profesor) ON DELETE CASCADE
);

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

USE sangre_normalina;

INSERT INTO Tutor (nombre, apellido, dni, email, telefono) VALUES
('Jorge', 'Martín', '20111222', 'jorge.martin@gmail.com', '3816000001'),
('Elena', 'Condori', '21222333', 'elena.condori@gmail.com', '3816000002'),
('Marcos', 'González', '22333444', 'marcos.gonzalez@gmail.com', '3816000003'),
('Silvia', 'Carrera', '23444555', 'silvia.carrera@gmail.com', '3816000004'),
('Diego', 'Lazarte', '24555666', 'diego.lazarte@gmail.com', '3816000005');

UPDATE Alumno SET id_tutor = 1 WHERE id_alumno = 1;
UPDATE Alumno SET id_tutor = 2 WHERE id_alumno = 2;
UPDATE Alumno SET id_tutor = 3 WHERE id_alumno = 3;
UPDATE Alumno SET id_tutor = 4 WHERE id_alumno = 4;
UPDATE Alumno SET id_tutor = 5 WHERE id_alumno = 5;

INSERT INTO Materia (nombre, horarios, id_profesor) VALUES
('Matemáticas', 'Lunes y Miércoles 08:00 - 09:20', 1),
('Lengua y Literatura', 'Martes y Jueves 08:00 - 09:20', 2),
('Historia', 'Lunes y Viernes 09:30 - 10:50', 3),
('Biología', 'Miércoles y Viernes 11:00 - 12:20', 4),
('Inglés', 'Martes y Jueves 09:30 - 10:50', 5);

INSERT INTO Nota (id_alumno, id_materia, trimestre, nota) VALUES
(1, 1, '1° Trimestre', 8.5),
(2, 2, '1° Trimestre', 9.0),
(3, 3, '1° Trimestre', 7.5),
(4, 4, '1° Trimestre', 8.0),
(5, 5, '1° Trimestre', 9.5);

INSERT INTO Asistencia (id_alumno, id_materia, fecha, estado) VALUES
(1, 1, '2026-11-10', 'Presente'),
(2, 2, '2026-11-10', 'Presente'),
(3, 3, '2026-11-11', 'Tardanza'),
(4, 4, '2026-11-11', 'Justificado'),
(5, 5, '2026-11-12', 'Presente');