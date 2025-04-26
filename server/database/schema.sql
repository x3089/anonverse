-- Esquema de la base de datos para AnonymousVerse

CREATE DATABASE anonverse;

USE anonverse;

-- Tabla para almacenar los hilos
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  contenido TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agrega más tablas si es necesario
