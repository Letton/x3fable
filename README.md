# Getting Started

Установите Postgres

Создайте базу данных

Измените файл `.env`

```sh
NODE_ENV=development <- "Изменить на production"
SECRET=7ytraRf7SmkqdGa6MN9KnEAWFyXm9jumue8fswVSXMXHwpsG
DB_NAME="Название базы данных"
DB_USER=postgres
DB_PASSWORD="Пароль от базы данных"
DB_HOST=localhost
DB_PORT=5432
GOOGLE_USER="Ваша почта"
GOOGLE_PASSWORD="Ваш пароль от почты, сгенерированный в паролях приложений Google"
HOST=localhost:3000
```

Установите зависимости проекта

```sh
npm i
# or
yarn
```

Соберите проект

```sh
npm run build
# or
yarn build
```

Запустите сервер:

```sh
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.
