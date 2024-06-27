# Описание проекта

Этот проект - отличное решение для создания адаптивной и кроссбраузерной верстки с использованием Gulp, WebPack и Babel.

## Запуск проекта

Чтобы запустить проект, необходимо склонировать репозиторий с помощью команды `git clone`, установить зависимости с помощью `npm install`, а затем запустить сборщик с помощью команды `$ gulp`. (<u>Подробнее см. раздел **Команды**</u>).

## Gulp

Gulp выполняет несколько важных задач для сборки проекта.
Он сжимает HTML и SCSS файлы, добавляет вендорные префиксы, конвертирует шрифты в .ttf и woff/woff2, сжимает изображения и создает "svg cпрайты", запускает сервер с автоматической перезагрузкой окна в браузере при изменении файлов в проекте.

Gulp также очищает папку с финальным проектом перед каждым запуском сборщика, чтобы не собирать мусор. Сборщик также может выгружать финальный проект на хостинг с помощью команды `$ npm run deployFTP`.
Настройки для ftp содержатся в файле `ftp.js` в папке `gulp/config/`

### WebPack

WebPack занимается обработкой файлов c JavaScript и позволяет модульное подключение скриптов. Он также позволяет писать код на ES6+ и сжимает файлы JS в режиме "production".

### Деплой

Для деплоя папки `/dist` на GitHub Pages можно использовать gh-pages. Деплой осуществляется по пути, указанному в `package.json` в поле `homepage`.

## :open_file_folder: Файловая структура

> Примечание: Папка **#IGNORE** игнорируется по умолчанию. Все файлы, которые находятся в данной папке не подвержены компиляции. При запуске сборки командой `gulp build` происходит распаковка всех файлов и папок из папки **#IGNORE** в родительский каталог.

```
Poject
├── #files
├── dist
│   │   ├── assets
│   │   │   ├── fonts
│   │   │   ├── images
├── pages
│   ├── _ui.html
│   ├── main.html
├── styles
│   ├── css
│   ├── js
│   ├── json
├── index.html
├── gulp
│   ├── config
│   ├── tasks
│   │   ├── core
│   │   ├── custom
│   │   ├── default
│   │   ├── special
│   │   ├── tests
├── src
│   ├── app
│   ├── components
│   │   ├── Chapters
│   │   ├── Common
│   │   │   ├── Single-component
│   │   │   │   ├── component.html
│   │   │   │   ├── component.scss
│   │   │   │   ├── component.js
│   │   │   ├── Multipart-component
│   │   │   │   ├── json
│   │   │   │   ├── elements
│   │   │   │   │   ├── ui_element
│   │   │   │   ├── entities
│   │   │   │   │   ├── entity-folder
│   │   │   │   ├── export
│   │   │   │   │   ├── component.html
│   │   │   │   │   ├── component.scss
│   │   │   │   │   ├── component.js
│   │   ├── Shared
│   │   │   ├── Bars
│   │   │   ├── Headings
│   │   │   ├── e.t.c
│   ├── template
│   │   ├── #IGNORE
│   │   ├── Main
│   │   │   ├── public
│   │   │   │   ├── chapter.scss
│   │   │   │   ├── chapter.js
│   │   │   ├── sections
│   │   │   │   ├── _reused
│   │   │   │   │   ├── html
│   │   │   │   │   │   ├── section.html
│   │   │   │   │   ├── scss
│   │   │   │   │   │   ├── section.scss
│   │   │   │   ├── section
│   │   │   │   │   ├── html
│   │   │   │   │   │   ├── section.html
│   │   │   │   │   ├── scss
│   │   │   │   │   │   ├── section.scss
│   │   │   ├── views
│   │   │   │   ├── page.html
│   │   ├── Test
│   │   │   ├── public
│   │   │   │   ├── _ui.scss
│   │   │   ├── views
│   │   │   │   ├── _ui.html
│   ├── index.html
├── .babelrc
├── .gitignore
├── .eslintrc.json
├── .htmlhintrc
├── .prettierrc.json
├── gulpfile.js
├── package-lock.json
├── package.json
├── README.md
├── LICENSE
└── webpack.config.js
```

### Описание файловой структуры:

- `dist` - папка, в которой находятся сгенерированные файлы после выполнения задач с помощью Gulp
- `gulp` - папка с конфигурацией задач Gulp, разделенной на config и tasks
- `src` - папка, в которой находятся исходные файлы проекта
- `assets` - папка, в которой находятся шрифты и изображения
- `#files` - папка, в которой находятся другие файлы, такие как JSON-файлы \* или XML-файлы
- `styles` - папка, в которой находятся файлы стилей
- `js` - папка, в которой находятся файлы JavaScript, такие как imports.js и main.js
- `scss` - папка, в которой находятся файлы SCSS стилей, разделенных на конфигурационные, вспомогательные, библиотеки, разделы и основной файл main.scss
- `html` - папка, в которой находятся HTML-файлы, разделенные на компоненты, секции и другие страницы (views)
- `components` - папка, в которой находятся файлы HTML, JavaScript и SCSS для компонентов, таких как кнопки, формы и т.д.
- `sections` - папка, в которой находятся файлы для секций
- `views` - папка, в которой находятся HTML-файлы страниц проекта
- `index.html` - основной HTML-файл проекта
- `.babelrc` - конфигурационный файл для Babel, который может использоваться для преобразования кода ECMAScript 2015+ в код, который может работать в браузерах
- `.gitignore` - файл, который говорит Git, какие файлы и папки должны быть проигнорированы при коммите изменений в репозиторий Git
- `gulpfile.js` - файл, в котором находятся задачи Gulp, их конфигурация и запуск

---

## Команды:

<details>
<summary>gulp</summary>

Запускает тестовый сервер для разработки проекта.

</details>

<details>
<summary>gulp build</summary>

Сборка для продакшн, стандартная:

- Минифицирует css.
- Оптимизирует изображения.
- Форматирует html удаляя пустые строки и пробелы.
</details>

<details>

### Создание файлов компонента:

<details>
<summary>gulp add-s --folder --component-name </summary>

- Эта команда позволяет создавать новые компоненты для проекта.
- Для использования таска необходимо выполнить команду `gulp add-s --folder --component-name`, где **component-name** - имя компонента, а **folder** - название `Shared` категории.
- Таск создает три файла: `my-component.html`, `my-component.scss` и `my-component.js`. Файлы будут созданы в директории `src/components/Shared`.
</details>

<details>
<summary>gulp add-c --common-name </summary>

- Эта команда позволяет создавать новые компоненты для проекта.
- Для использования таска необходимо выполнить команду `gulp add-c --common-name`, где **component-name** - имя компонента.
- Таск создает три файла: `my-component.html`, `my-component.scss` и `my-component.js`. Файлы будут созданы в директории `src/components/Common`.
</details>

<details>

<summary>gulp repack</summary>

Распаковывает папку `#IGNORE`.

</details>

---

### Updates:

- 25.12.2023 Проведен глобальный update всей сборки
