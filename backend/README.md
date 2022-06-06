[![Tests](https://github.com/RaSabirov/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/RaSabirov/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/RaSabirov/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/RaSabirov/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки
`/middlewares` — папка с мидлвэрами (авторизации, валидации, логирования, централизованная обработка ошибок)
`/errors` — папка с экземплярами ошибок (статусы)


Остальные директории вспомогательные, создаются при необходимости разработчиком

---

## Инструкция по установке и запуска проекта:
</br>
Клонировать репозиторий:

```no-highlight
git clone https://github.com/RaSabirov/express-mesto-gha.git
```

Перейти в директорию проекта:

```no-highlight
cd express-mesto-gha
```

Установить пакетный менеджер npm

```no-highlight
npm install
```

Установить MongoDB и запустить службу в терминале (MacOS):

```no-highlight
brew services start mongodb-community@5.0
```
Установить MongoDB и запустить службу в терминале (Windows):
```no-highlight
mongod
```

Запустить сервер в режиме hot-reload:

```no-highlight
npm run dev
```

Запустить сервер в обычном режиме:

```no-highlight
npm run start
```


