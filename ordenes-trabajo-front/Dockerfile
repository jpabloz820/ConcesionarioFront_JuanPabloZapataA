# Etapa 1: Construcción
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2: Servidor web (Nginx)
FROM nginx:stable-alpine

# Borra el archivo default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos compilados Angular al contenedor
COPY --from=builder /app/dist/ordenes-trabajo-front /usr/share/nginx/html

# Copia una configuración básica de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
