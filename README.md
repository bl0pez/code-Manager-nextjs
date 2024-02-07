# Descripción:

Este es un proyecto para control y manejo de código de un hospital.

# Instalación en desarrollo:

1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. remplazar el archivo `.env.example` por `.env` y llenar las variables de entorno
4. Levantar el servidor de base de datos con `docker-compose up -d`
5. Correr las migraciones de prisma con `npx prisma migrate dev`
6. Ejecutar el seed con `npm run seed`
7. Correr el proyecto con `npm run dev`
