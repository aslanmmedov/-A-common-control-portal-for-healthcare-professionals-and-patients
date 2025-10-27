# Stage 1: build frontend
FROM node:20 AS frontend-build
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client/ ./client/
RUN cd client && npm run build

# Stage 2: backend + serve frontend
FROM node:20
WORKDIR /app

# Copy backend
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server/ ./server/

# Copy frontend build into backend folder
COPY --from=frontend-build /app/client/dist ./client/dist

EXPOSE 8080
CMD ["node", "server/index.js"]
