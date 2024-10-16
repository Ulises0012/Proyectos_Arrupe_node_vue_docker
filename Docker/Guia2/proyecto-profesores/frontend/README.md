# Proyecto FullStack - React, MySQL y Docker

## Descripción
Este proyecto fullstack utiliza **React** en el frontend y **MySQL** como base de datos. Todos los servicios se gestionan mediante Docker usando `docker-compose`.

## Estructura del proyecto
- **Backend:** Contiene la lógica del servidor (API REST).
- **Frontend:** Interfaz gráfica con React.
- **Base de Datos:** MySQL.

## Requisitos
- Docker y Docker Compose instalados.

## Uso
 descargar las imagenes 
 docker pull ulis3s0012/proyecto-profesores-backend:latest
 docker pull ulis3s0012/proyecto-profesores-frontend
1. Levantar los servicios con Docker Compose:
   ```bash 
   docker-compose up
2. Acceder al frontend en http://localhost:3000.

3. La API estará disponible en http://localhost:8080.

4. configurar variables de entonor
```MYSQL_ROOT_PASSWORD=tu_password MYSQL_DATABASE=nombre_bd MYSQL_USER=tu_usuario MYSQL_PASSWORD=tu_password
