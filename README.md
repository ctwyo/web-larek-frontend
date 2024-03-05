# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

### Базовые компоненты

1. # Класс Component<T>
  Основной класс, предназначеный для остальных компонентов VIEW. Работа с DOM и поведением.

  ## Методы
  * **toggleClass** - переключение класса
  * **setText** - текстовое содержание элемента
  * **setDisabled** - устанавливает disabled элемента
  * **setHidden, setVisible** - скрывает элемент
  * **setImage** - устанавливает элементу src и alt
  * **render** - render элемента

2. # Класс Api, LarekApi
  Взаимодействие с сервером, работа с Api

  ## Данные
  * **baseUrl: string** - основной url
  * **options: RequestInit** - настройки запроса

  ## Методы
  * **handleResponse** - ответ сервера, ошибки
  * **get** - get запрос
  * **post** - post запрос

  * **getProducts** - get запрос на получение карточек
  * **makeOrder** - post запрос заказа на сервер

3. # Класс AppState
  Хранение данных

  ## Данные
  * **catalog: IProduct[]** - список товаров
  * **basketList: IProduct[]** - список товаров в корзине
  * **order: IOrder** - данные заказа
  * **formErrors: FormErrors** - ошибки форм 

  ## Методы
  * **getTotal** - возвращает кол-во товара
  * **getTOtalPrice** - возвращает общую сумму корзины
  * **setCatalog** - инициалазация события изменения каталога
  * **clearBasket** - очищение корзины
  * **addBasketList** - добавить в корзину
  * **changeBasketList** - удаляет item по id
  * **setOrderField, setContactsField** - сохранение заказа, данных и инициализация событий валидации
  * **validateOrder** - валидация заказа
  * **validateContacts** - валидация контактов

 4. # Класс Model<T>
  Создание модели и управление данными
  ## Данные
  * **IEvents** - управление событиями

  ## Методы
  * **emitChanges** - инициализирует событие и сообщает подписчикам об изменениях


5. # Класс EventEmitter
  Брокер событий

  ## Методы
  * **on** - устанавливает обработчик
  * **off** - снять обработчик
  * **emit** - Инициировать событие с данными
  * **onAll** - Слушать все события
  * **offAll** - Сбросить все обработчики
  * **trigger** - Коллбек триггер, генерирующий событие при вызове

 6. # Класс Page
  Главная страница

  ## Данные
  * **_counter: HTMLElement** - счётчик корзины
  * **_catalog: HTMLElement** - каталог товаров
  * **_wrapper: HTMLElement** - обёртка, lock страницы
  * **_basket: HTMLElement** - корзина

  ## Методы
  * **set counter** - счётчик корзины
  * **set catalog** - добавление карточек на страницу
  * **set locked** - lock интерфейса


7. # Класс Card<ICard>
  Карточка товара

  ## Данные
  * **_title: HTMLElement** - название товара
  * **_price: HTMLElement** - цена товара
  * **_category: HTMLElement** - категория товара
  * **_image?: HTMLImageElement** - картинка товара
  * **_button?: HTMLButtonElement** - кнопка действий с карточкой
  * **_index?: HTMLSpanElement** - id карточки

  # Методы
   * **set id, get id** - установка, возвращение id
   * **set title, get title** - установка, возвращение названия товара
   * **get price** - возвращает цену товара
   * **set category** - управление цветом категории
   * **set image** - установка изображения товара
   * **set button** - установка textContent кнопки управления товаром

8. # Класс Modal<IModalData>
  Модальное окно

  ## Данные
 * **_closeButton: HTMLButtonElement** - закрытие модального окна
 * **_content: HTMLElement** - контент модального окна

  ## Методы
  * **set content** - установливает данные
  * **open** - открыть модальное окно
  * **close** - закрыть модальное окно
  * **render** - render модального окна