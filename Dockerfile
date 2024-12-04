# Устанавливаем базовый образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /src/app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем Prisma-схему
COPY prisma ./prisma


# Генерируем Prisma-клиент
RUN npx prisma generate

# Копируем остальные файлы проекта
COPY . .

# Указываем порт
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]