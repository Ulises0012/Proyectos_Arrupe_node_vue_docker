# Build stage
FROM node:16 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for both frontend and backend
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy backend and frontend source files
COPY backend /app/backend
COPY frontend /app/frontend

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

# Copy built frontend and backend
COPY --from=build /app/backend /app/backend
COPY --from=build /app/frontend/build /app/frontend/build

# Expose ports
EXPOSE 3000 3001

# Start both services
CMD ["sh", "-c", "cd backend && npm start & cd /app/frontend/build && npx serve -s"]