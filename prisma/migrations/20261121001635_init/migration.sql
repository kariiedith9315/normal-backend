-- CreateTable
CREATE TABLE `User` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tutor` (
    `id_tutor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Tutor_dni_key`(`dni`),
    PRIMARY KEY (`id_tutor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alumno` (
    `id_alumno` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `id_tutor` INTEGER NULL,

    UNIQUE INDEX `Alumno_dni_key`(`dni`),
    PRIMARY KEY (`id_alumno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profesor` (
    `id_profesor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `especialidad` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Profesor_dni_key`(`dni`),
    UNIQUE INDEX `Profesor_email_key`(`email`),
    PRIMARY KEY (`id_profesor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id_materia` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `horarios` VARCHAR(191) NOT NULL,
    `id_profesor` INTEGER NOT NULL,

    PRIMARY KEY (`id_materia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nota` (
    `id_nota` INTEGER NOT NULL AUTO_INCREMENT,
    `id_alumno` INTEGER NOT NULL,
    `id_materia` INTEGER NOT NULL,
    `trimestre` VARCHAR(191) NOT NULL,
    `nota` DOUBLE NOT NULL,

    PRIMARY KEY (`id_nota`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencia` (
    `id_asistencia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_alumno` INTEGER NOT NULL,
    `id_materia` INTEGER NOT NULL,
    `fecha` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_asistencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `Tutor`(`id_tutor`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_id_profesor_fkey` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor`(`id_profesor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno`(`id_alumno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materia`(`id_materia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno`(`id_alumno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materia`(`id_materia`) ON DELETE RESTRICT ON UPDATE CASCADE;
