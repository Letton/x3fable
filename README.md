# Инструкция по работе с проектом

## База данных

Установите [Postgres](https://www.postgresql.org/)

С помощью [Postgres](https://www.postgresql.org/) создайте базу данных для проекта

## Node.js

Уставноите [Node.js](https://nodejs.org/)

> Минимальная версия [Node.js](https://nodejs.org/) - `16.14.2`

## Настройка конфигурации

Создайте файл `.env` или задайте переменные окружения

```sh
NODE_ENV="Для продакшн версии задайте значение - production"
SECRET="Секретный ключ для подписи JWT"
DB_USER="Пользователь базы данных"
DB_PASSWORD="Пароль от базы данных"
DB_HOST="Хост базы данных, для примера - localhost"
DB_PORT="Порт базы данных"
GOOGLE_USER="Ваша почта"
GOOGLE_PASSWORD="Ваш пароль от почты, сгенерированный в паролях приложений Google"
HOST="Хост, для примера - localhost:3000"
PORT="Порт"
```

## Работа с проектом

Установите зависимости проекта

```sh
npm i
# or
yarn
```

### Для запуска проекта

#### Запуск в production режиме

> Убедитесь что переменная окружения `NODE_ENV=production`

Соберите проект

```sh
npm run build
# or
yarn build
```

Запустите проект

```sh
npm run build
# or
yarn build
```

#### Запуск в development режиме

```sh
npm run dev
# or
yarn dev
```

Откройте http://localhost:3000 с помощью браузера, чтобы увидеть результат
