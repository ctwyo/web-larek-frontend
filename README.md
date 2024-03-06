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

# Архитектура MVP
  * Model - классы Model и AppState. 
    Слой данных и бизнес-логики. Модель отвечает за доступ к данным, их обработку и манипуляцию.

  * View - классы Component, Card, Page, Form, Basket.
    Отвечает за отображение данных пользователю и взаимодействие с пользователем. Визуальные элементы,
    компоненты пользовательского интерфейса

  * Present - классы Api, LarekApi.
    Служит в качестве посредника между Моделью и Представлением.

### Базовые компоненты

1. # Класс Component<T>
  <T> - 
  Основной класс, основа для остальных компонентов VIEW. Работа с DOM и поведением.

  ## Конструктор
  * **constructor(protected readonly container: HTMLElement)** - инициализация компонента в заданном контейнере

  ## Методы
  * **toggleClass** - переключение класса
  * **setText** - текстовое содержание элемента
  * **setDisabled** - устанавливает disabled элемента
  * **setHidden, setVisible** - скрывает элемент
  * **setImage** - устанавливает элементу src и alt
  * **render** - render элемента

2. # Класс Api, LarekApi
  Взаимодействие с сервером, работа с Api. LarekAPi расширяет класс Api 

  ## Конструктор Api
  * **constructor(baseUrl: string, options: RequestInit = {})** - инициализация класса с указанным url и настройками

  ## Конструктор LarekApi
  * **constructor(cdn: string)** - url для загрузки изображения

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

  ## Конструктор
  * **constructor()** - наследуется от Model

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

  ## Конструктор
  * **constructor(data: Partial<T>, protected events: IEvents)** - инициализирут модель данных, и подключает события

  ## Данные
  * **IEvents** - управление событиями

  ## Методы
  * **emitChanges** - инициализирует событие и сообщает подписчикам об изменениях


5. # Класс EventEmitter
  Брокер событий

  ## Конструктор
  * **constructor(_events)** - инициализация коллекции с событиями и подписчиками

  ## Методы
  * **on** - устанавливает обработчик
  * **off** - снять обработчик
  * **emit** - Инициировать событие с данными
  * **onAll** - Слушать все события
  * **offAll** - Сбросить все обработчики
  * **trigger** - Коллбек триггер, генерирующий событие при вызове

 6. # Класс Page
  Главная страница

  ## Конструктор
  * **constructor(container: HTMLElement, protected events: IEvents)** - инициализирует элементы страницы и объект управления событиями

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

  ## Конструктор
  * **constructor(container: HTMLElement, actions?: ICardActions)** - принимает карточку и действия с ней

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

  ## Конструктор
  * **constructor(container: HTMLElement, protected events: IEvents)** - принимает модальное окно и объект управления событиями

  ## Данные
 * **_closeButton: HTMLButtonElement** - закрытие модального окна
 * **_content: HTMLElement** - контент модального окна

  ## Методы
  * **set content** - установливает данные
  * **open** - открыть модальное окно
  * **close** - закрыть модальное окно
  * **render** - render модального окна

  9. # Класс Form<T>
  Предостовляет функционал для управления формами

  ## Конструктор
  * **constructor(protected container: HTMLFormElement, protected events: IEvents)** - принимает container и объект с событиями

  ## Данные
  * **_submit: HTMLButtonElement** - кнопка отправки формы
  * **_errors?: HTMLElement** - элемент отображения ошибок

  ## Методы
  * **onInputChange** - вызывается при изменении полей формы
  * **set valid** - установка валидности формы
  * **set errors** - установка текста ошибки
  * **render** - рендер формы с обновлённым состоянии валидности

  10. # Basket
    Корзина магазина

  ## Коннструктор
  * **constructor(container: HTMLElement, protected events: IEvents)** - принимает контейнер, и объект событий

  ## Данные
  * **_list: HTMLElement** - список элементов в корзине
  * **_total: HTMLElement** - стоимость покупки
  * **_button: HTMLElement** - кнопка оформления заказа

  ## Методы
  * **set items** - установка элементов корзины
  * **set selected** - контроль состояния кнопки в корзине
  * **set total** - установка текста общей стоимости