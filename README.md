# Getting Started

Измените файл `.env`

```sh
NODE_ENV=development <- "Изменить на production"
SECRET=7ytraRf7SmkqdGa6MN9KnEAWFyXm9jumue8fswVSXMXHwpsG
DB_NAME=app
DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=localhost
DB_PORT=5432
GOOGLE_USER=lettonchannel@gmail.com
GOOGLE_PASSWORD="Ваш пароль от почты, сгенерированный в паролях приложений Google"
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
