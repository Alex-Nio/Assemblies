### Компоненты проекта

---

<span style="color:red;">Важно!</span>
Компоненты <b>Разделов</b> всегда должны начинаться с заглавной буквы.

##### Структура Папок:

`Chapters` - папка разделов проекта

> Пример:
    - Main
    - Support
    - Cart
    - Order
    - Product card
и так далее.

`Common` - папка с "глобальными" компонентами, такими как header или breadcrumbs. Эти компоненты предназначены преимущественно для использования на всех страницах.

> Пример:
    - head
    - header
    - breadcrumbs
    - footer
и так далее.

##### Примечание:

Компонент может включать в себя как single, так и multipart структуру.

<u>Single</u> структура предполагает, что компонент состоит из одного сегмента. В этом случае папка компонента будет иметь следующий вид:

```
├── Component
│   ├── component.html
│   ├── component.js
│   ├── component.scss
```

<u>Multipart</u> структура предполагает, что компонент состоит из нескольких сегментов. В этом случае папка компонента будет иметь следующий вид:

```
├── header
│   ├── entities
│   │   ├── header-actions
│   │   │   ├── header-actions.html
│   │   │   ├── header-actions.js
│   │   │   ├── header-actions.scss
│   ├── elements
│   │   ├── login
│   │   │   ├── login-button.html
│   │   ├── burger
│   │   │   ├── burger-button.html
│   ├── export
│   │   ├── header.html
│   │   ├── header.js
│   │   ├── header.scss
```

`entities` - сущности (составные части/сегменты компонента)

> Пример:
    - header-actions
    - panel-item
    - product-item
и так далее.

`elements` - самостоятельные, составные элементы пользовательского интерфейса (UI), более мелкие сущности, принадлежащие к конкретному компоненту.

`export` - основная папка, содержащая в себе главный компонент, включающий в себя все составные части из папки `entities`.

`Shared` - папка с типизированными UI компонентами. Исключение: папка <b>Other</b> (<span style="color: red;">Использовать в крайнем случае</span>). Могут включать в себя как <b>Single</b>, так и <b>Multipart</b> структуру.

> Пример:
    - Buttons/primary
    - Buttons/secondary
и так далее.
