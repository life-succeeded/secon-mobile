# --- Stage 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# --- Stage 2: Serve Static ---
FROM node:20-alpine
RUN npm install -g serve
COPY --from=build /app/build /app/build
WORKDIR /app
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
